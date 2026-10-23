import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
import * as fs from "fs"
import * as path from "path"

if (opendiscord.project !== "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket.")

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-ai-assistant":api.ODPlugin;
    }
    export interface ODConfigManagerIdMappings {
        "ot-ai-assistant:config":api.ODJsonConfig<PluginConfig>;
    }
}

export interface TicketOption {
    id:string;
    systemPrompt:string;
    embedTitle:string;
    embedColor:string;
    questionIndexes:number[] | "all";
    readBotEmbeds:boolean;
    maxTokens:number;
}

export interface PluginConfig {
    openrouter: {
        apiKey:string;
        model:string;
        fallbackModels:string[];
        baseUrl:string;
    };
    chatbot: {
        channelId:string;
        systemPrompt:string;
        maxContextMessages:number;
        typingIndicator:boolean;
        respondToMentionsOnly:boolean;
        vipUserIds:string[];
    };
    giphy: {
        enabled:boolean;
        apiKey:string;
        gifChance:number;
    };
    ticketAI: {
        enabled:boolean;
        summaryDelayMs:number;
        options:TicketOption[];
    };
    automod: {
        enabled:boolean;
        monitoredChannels:string[];
        exemptRoles:string[];
        exemptUsers:string[];
        logChannelId:string;
        deleteMessage:boolean;
        timeoutDurationSec:number;
        publicEmbedChannelId:string;
        offenseResetSec:number;
        blocklist:string[];
    };
    conversation: {
        maxTokens:number;
        temperature:number;
    };
}

type ChatMessage = {role:"user" | "assistant" | "system"; content:string}

//Register config
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new api.ODJsonConfig<PluginConfig>("ot-ai-assistant:config", "config.json", "./plugins/ot-ai-assistant/"))
})

function loadConfig(): PluginConfig | null {
    const registered = opendiscord.configs.get("ot-ai-assistant:config")
    const cfg = registered?.data
    if (!cfg?.openrouter?.apiKey || cfg.openrouter.apiKey === "sk-or-v1-YOUR_KEY_HERE"){
        opendiscord.log("ot-ai-assistant: OpenRouter API key is not configured in config.json.", "error")
        return null
    }
    return cfg
}

function loadKnowledge(config: PluginConfig): string {
    const parts: string[] = []
    for (const p of ["./plugins/ot-ai-assistent/knowledge/FAQ.md", "./plugins/ot-ai-assistent/knowledge/SERVER_INFO.md"]){
        try {
            const resolved = path.resolve(p)
            if (fs.existsSync(resolved)){
                parts.push(fs.readFileSync(resolved, "utf-8").trim())
            }
        }catch {}
    }
    return parts.join("\n\n")
}

//OpenRouter / OpenAI-compatible API call with model fallback
async function tryModel(apiKey: string,
    baseUrl: string,
    model: string,
    systemPrompt: string,
    messages: ChatMessage[],
    maxTokens: number,
    temperature: number): Promise<{text:string} | {error:string}> {
    try {
        const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
            method:"POST",
            headers:{
                "Authorization":`Bearer ${apiKey}`,
                "Content-Type":"application/json",
                "HTTP-Referer":"https://openticket.dj-dj.be",
                "X-Title":"OT AI Assistant"
            },
            body:JSON.stringify({
                model,
                messages:[{role:"system", content:systemPrompt}, ...messages],
                max_tokens:maxTokens,
                temperature
            }),
            signal:AbortSignal.timeout(30_000)
        })

        const data: any = await res.json().catch(() => null)
        if (!res.ok){
            const detail = data?.error?.message ?? data?.message ?? res.statusText
            return {error:`[${res.status}] ${detail}`}
        }

        const text = data?.choices?.[0]?.message?.content?.trim()
        if (!text) return {error:"Empty response from model"}
        return {text}
    }catch(e: any){
        return {error:e?.message ?? "Request failed"}
    }
}

async function askAI(config: PluginConfig, systemPrompt: string, messages: ChatMessage[], maxTokens?: number): Promise<string | null> {
    const models = [config.openrouter.model, ...(config.openrouter.fallbackModels ?? [])].filter(Boolean)
    const tokens = maxTokens ?? config.conversation.maxTokens
    const errors: string[] = []

    for (const model of models){
        const result = await tryModel(config.openrouter.apiKey, config.openrouter.baseUrl, model, systemPrompt, messages, tokens, config.conversation.temperature)
        if ("text" in result){
            if (model !== config.openrouter.model){
                opendiscord.log(`ot-ai-assistant: fallback model ${model} succeeded.`, "plugin")
            }
            return result.text
        }
        errors.push(`${model}: ${result.error}`)
    }

    opendiscord.log(`ot-ai-assistant: all models failed (${errors.join(" | ")})`, "error")
    return null
}

//Per-user conversation history (bounded to 500 users)
const convHistory = new Map<string, ChatMessage[]>()

function getHistory(userId: string, max: number): ChatMessage[] {
    return (convHistory.get(userId) ?? []).slice(-(max * 2))
}

function pushHistory(userId: string, role: "user" | "assistant", content: string): void {
    let arr = convHistory.get(userId)
    if (!arr){
        if (convHistory.size >= 500){
            const oldestKey = convHistory.keys().next().value
            if (oldestKey) convHistory.delete(oldestKey)
        }
        arr = []
        convHistory.set(userId, arr)
    }
    arr.push({role, content})
    if (arr.length > 40) arr.splice(0, arr.length - 40)
}

//Giphy GIF search
const GIF_TAG_REGEX = /\[GIF:([^\]]+)\]/i

async function fetchGiphyGif(query: string, apiKey: string): Promise<string | null> {
    try {
        const url = new URL("https://api.giphy.com/v1/gifs/search")
        url.searchParams.set("api_key", apiKey)
        url.searchParams.set("q", query)
        url.searchParams.set("limit", "10")
        url.searchParams.set("rating", "pg-13")
        url.searchParams.set("lang", "en")

        const res = await fetch(url, {signal:AbortSignal.timeout(8_000)})
        if (!res.ok) return null
        const data: any = await res.json()
        const results: any[] = data?.data ?? []
        if (results.length === 0) return null
        const pick = results[Math.floor(Math.random() * results.length)]
        return pick?.images?.original?.url ?? pick?.images?.downsized?.url ?? null
    }catch {
        return null
    }
}

//Helpers
function embedToText(embed: discord.Embed): string {
    const lines: string[] = []
    if (embed.title) lines.push(`=== ${embed.title} ===`)
    if (embed.description) lines.push(embed.description)
    for (const f of embed.fields) lines.push(`[${f.name}]\n${f.value}`)
    if (embed.footer?.text) lines.push(`(${embed.footer.text})`)
    return lines.join("\n")
}

function formatAnswer(ans: api.ODQuestionAnswer, index: number): string {
    const label = ans.name || `Q${index + 1}`
    if (ans.type === "file-upload"){
        const files = ans.files.map((f) => f.name).join(", ")
        return `  ${label}: ${files || "(no files uploaded)"}`
    }
    return `  ${label}: ${ans.value?.trim() || "(no answer provided)"}`
}

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms))
}

function cap(text: string, max: number): string {
    return text.length > max ? text.slice(0, max - 3) + "..." : text
}

function hexToInt(hex: string): number {
    const parsed = parseInt(hex.replace(/^#/, ""), 16)
    return isNaN(parsed) ? 0x5865f2 : parsed
}

//Chatbot reply handler
async function handleChatMessage(msg: discord.Message, config: PluginConfig, cachedKnowledge: string): Promise<void> {
    const text = msg.content.replace(/<@!?\d+>/g, "").trim()
    if (!text) return

    try {
        if (config.chatbot.typingIndicator && "sendTyping" in msg.channel){
            await (msg.channel as discord.TextChannel).sendTyping().catch(() => {})
        }

        const giphyEnabled = Boolean(config.giphy?.enabled && config.giphy?.apiKey && config.giphy.apiKey !== "YOUR_GIPHY_API_KEY_HERE")
        const gifInstruction = giphyEnabled
            ? "\n\nGIF RULE: If the conversation is light or playful, you may append [GIF:short search term] at the end of your reply. Never use it for serious support questions. Maximum one tag per reply."
            : ""

        const systemText = [
            config.chatbot.systemPrompt + gifInstruction,
            "--- SERVER KNOWLEDGE ---",
            cachedKnowledge || "(no knowledge files loaded)",
            "---",
            "Keep replies under 2000 characters. If the answer is not in your knowledge, say so."
        ].join("\n\n")

        const history = getHistory(msg.author.id, config.chatbot.maxContextMessages)
        const rawReply = await askAI(config, systemText, [...history, {role:"user", content:text}])

        if (!rawReply){
            await msg.reply({content:"Could not get a response right now. Try again in a moment.", allowedMentions:{repliedUser:false}})
            return
        }

        const gifMatch = rawReply.match(GIF_TAG_REGEX)
        const cleanReply = rawReply.replace(GIF_TAG_REGEX, "").trim()

        pushHistory(msg.author.id, "user", text)
        pushHistory(msg.author.id, "assistant", cleanReply)

        await msg.reply({content:cap(cleanReply, 2000), allowedMentions:{repliedUser:false}})

        if (giphyEnabled && gifMatch){
            const gifQuery = gifMatch[1].trim()
            const threshold = config.giphy.gifChance ?? 0.85
            if (Math.random() <= threshold){
                const gifUrl = await fetchGiphyGif(gifQuery, config.giphy.apiKey)
                if (gifUrl && "send" in msg.channel){
                    await (msg.channel as discord.TextChannel).send({content:gifUrl}).catch(() => {})
                }
            }
        }
    }catch(e: any){
        opendiscord.log(`ot-ai-assistant: chatbot error (${e.message})`, "error")
    }
}

//Automod offense tracker (bounded to 1000 users)
const offenseTracker = new Map<string, {count:number; lastTs:number}>()

function recordOffense(userId: string, resetMs: number): number {
    const now = Date.now()
    const existing = offenseTracker.get(userId)
    const count = existing && (now - existing.lastTs) <= resetMs ? existing.count + 1 : 1

    if (!existing && offenseTracker.size >= 1000){
        const oldestKey = offenseTracker.keys().next().value
        if (oldestKey) offenseTracker.delete(oldestKey)
    }

    offenseTracker.set(userId, {count, lastTs:now})
    return count
}

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`
    if (seconds < 86400) return `${Math.round(seconds / 3600)}h`
    return `${Math.round(seconds / 86400)}d`
}

//Text normalization for leet-speak, Franco-Arabic, and separator bypasses
function normalizeLeet(text: string): string {
    return text
        .toLowerCase()
        .replace(/[\u200B-\u200D\uFEFF\u00AD\u200E\u200F]/g, "")
        .replace(/\$/g, "s")
        .replace(/@/g, "a")
        .replace(/!/g, "i")
        .replace(/1/g, "i")
        .replace(/0/g, "o")
        .replace(/4/g, "a")
        .replace(/\+/g, "t")
        .replace(/kh/g, "x")
        .replace(/5/g, "x")
        .replace(/7/g, "h")
        .replace(/8/g, "gh")
        .replace(/6/g, "t")
        .replace(/9/g, "q")
        .replace(/3/g, "a")
        .replace(/2/g, "a")
        .replace(/(?<=[a-z\u0600-\u06FF])[\s.\-_*,]+(?=[a-z\u0600-\u06FF])/g, "")
        .replace(/(.)\1{2,}/g, "$1$1")
}

const EN_SLUR_REGEX = /\b(nigge?r|nigg[ae]|fagg?ot|kike|cunt|retard|spick?|wetback|kys)\b/

function buildBlocklistRegex(words: string[]): RegExp | null {
    const valid = (words ?? []).filter((w) => w && w !== "example-slur-1" && w !== "example-slur-2")
    if (valid.length === 0) return null
    const patterns = valid.map((w) => {
        const normalized = normalizeLeet(w)
        const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        return escaped.split("").join("[\\s.\\-_]*")
    })
    return new RegExp(`(${patterns.join("|")})`, "i")
}

function passesPrefilter(content: string, blocklistRegex: RegExp | null): boolean {
    const normalized = normalizeLeet(content)
    if (EN_SLUR_REGEX.test(normalized)) return true
    if (blocklistRegex && blocklistRegex.test(normalized)) return true
    return false
}

async function isMessageToxic(content: string, config: PluginConfig): Promise<boolean> {
    const result = await askAI(config, [
        "You are a moderation classifier for an online community server.",
        "Decide if the message contains slurs, hate speech, or targeted harassment in any language.",
        "Reply with ONLY YES or NO.",
        "When in doubt, reply NO."
    ].join("\n"), [{role:"user", content:`Message: "${content}"`}], 5)
    return result?.trim().toUpperCase() === "YES"
}

async function handleAutomod(msg: discord.Message, config: PluginConfig, cachedBlocklistRegex: RegExp | null): Promise<void> {
    const am = config.automod
    if (!am?.enabled || msg.author.bot || !msg.guild) return

    if (am.monitoredChannels?.length > 0 && !am.monitoredChannels.includes(msg.channelId)) return
    if (am.exemptUsers?.includes(msg.author.id)) return

    const member = msg.member ?? await msg.guild.members.fetch(msg.author.id).catch(() => null)
    if (!member) return
    if (am.exemptRoles?.some((r) => member.roles.cache.has(r))) return

    if (!passesPrefilter(msg.content, cachedBlocklistRegex)) return

    const toxic = await isMessageToxic(msg.content, config)
    if (!toxic) return

    if (am.deleteMessage) await msg.delete().catch(() => {})

    const resetMs = (am.offenseResetSec ?? 3600) * 1000
    const offenses = recordOffense(msg.author.id, resetMs)

    const baseSec = am.timeoutDurationSec ?? 300
    const multiplier = offenses === 1 ? 1 : offenses === 2 ? 2 : 4
    const durationSec = baseSec * multiplier

    let actionTaken = "warned"
    if (msg.guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers)){
        await member.timeout(durationSec * 1000, `Automod: prohibited language (offense #${offenses})`).catch(() => {})
        actionTaken = `timed out for ${formatDuration(durationSec)}`
    }

    const offenseLabel = offenses === 1 ? "1st offense" : offenses === 2 ? "2nd offense" : `offense #${offenses}`

    const publicChannelId = (am.publicEmbedChannelId && am.publicEmbedChannelId !== "YOUR_PUBLIC_LOG_CHANNEL_ID")
        ? am.publicEmbedChannelId
        : (am.logChannelId && am.logChannelId !== "YOUR_LOG_CHANNEL_ID" ? am.logChannelId : "")

    if (publicChannelId){
        const pubChannel = await msg.guild.channels.fetch(publicChannelId).catch(() => null)
        if (pubChannel && pubChannel.isTextBased()){
            const publicEmbed = new discord.EmbedBuilder()
                .setColor(0xe74c3c)
                .setTitle("Moderation Action")
                .setDescription(`<@${msg.author.id}> was **${actionTaken}** for using prohibited language.`)
                .addFields({name:"Offense", value:offenseLabel, inline:true})
                .setThumbnail(msg.author.displayAvatarURL())
                .setTimestamp()
            await (pubChannel as discord.TextChannel).send({embeds:[publicEmbed]}).catch(() => {})
        }
    }

    const staffLogId = am.logChannelId && am.logChannelId !== "YOUR_LOG_CHANNEL_ID" ? am.logChannelId : ""
    if (staffLogId && staffLogId !== publicChannelId){
        const logChannel = await msg.guild.channels.fetch(staffLogId).catch(() => null)
        if (logChannel && logChannel.isTextBased()){
            const logEmbed = new discord.EmbedBuilder()
                .setColor(0x992d22)
                .setTitle("Automod Log")
                .addFields({name:"User", value:`<@${msg.author.id}> (${msg.author.username})`, inline:true}, {name:"Channel", value:`<#${msg.channelId}>`, inline:true}, {name:"Offense", value:offenseLabel, inline:true}, {name:"Action", value:actionTaken, inline:true}, {name:"Message", value:`\`\`\`${msg.content.slice(0, 900)}\`\`\``})
                .setThumbnail(msg.author.displayAvatarURL())
                .setTimestamp()
            await (logChannel as discord.TextChannel).send({embeds:[logEmbed]}).catch(() => {})
        }
    }

    opendiscord.log(`ot-ai-assistant: ${msg.author.username} ${actionTaken} (offense #${offenses})`, "plugin")
}

//Initialize listeners when bot is ready
opendiscord.events.get("onReadyForUsage").listen(() => {
    const config = loadConfig()
    if (!config) return

    const cachedKnowledge = loadKnowledge(config)
    const vipIds = new Set<string>(config.chatbot?.vipUserIds ?? [])
    const cachedBlocklistRegex = buildBlocklistRegex(config.automod?.blocklist ?? [])

    opendiscord.client.client.on("messageCreate", async (msg: discord.Message) => {
        if (msg.author.bot) return

        await handleAutomod(msg, config, cachedBlocklistRegex)

        const botUser = opendiscord.client.client.user
        if (!botUser) return

        const mentioned = msg.mentions.has(botUser)
        if (vipIds.has(msg.author.id) && mentioned){
            await handleChatMessage(msg, config, cachedKnowledge)
            return
        }

        if (config.chatbot?.channelId && config.chatbot.channelId !== "YOUR_CHATBOT_CHANNEL_ID" && msg.channelId === config.chatbot.channelId){
            if (config.chatbot.respondToMentionsOnly && !mentioned) return
            await handleChatMessage(msg, config, cachedKnowledge)
        }
    })

    if (config.ticketAI?.enabled && Array.isArray(config.ticketAI.options) && config.ticketAI.options.length > 0){
        const optionMap = new Map<string, TicketOption>()
        for (const opt of config.ticketAI.options){
            if (opt.id && !opt.id.startsWith("YOUR-")) optionMap.set(opt.id, opt)
        }

        opendiscord.events.get("afterTicketCreated").listen(async (ticket, creator, channel) => {
            try {
                const optionCfg = optionMap.get(ticket.option.id.value)
                if (!optionCfg) return

                await sleep(config.ticketAI.summaryDelayMs ?? 350)

                const allAnswers = ticket.get("opendiscord:answers").value ?? []
                const selectedAnswers = optionCfg.questionIndexes === "all"
                    ? allAnswers
                    : optionCfg.questionIndexes.map((i) => allAnswers[i]).filter(Boolean)

                const answerLines = selectedAnswers.length > 0
                    ? selectedAnswers.map((a, i) => formatAnswer(a, i)).join("\n")
                    : "  (no answers recorded)"

                let botEmbeds = ""
                if (optionCfg.readBotEmbeds){
                    const botId = opendiscord.client.client.user?.id ?? ""
                    const recent = await channel.messages.fetch({limit:15})
                    botEmbeds = recent
                        .filter((m) => m.author.bot && m.author.id !== botId && m.embeds.length > 0)
                        .map((m) => m.embeds.map(embedToText).join("\n"))
                        .join("\n\n---\n\n")
                }

                const userPrompt = [
                    "A new ticket was opened. Analyze it according to your instructions.",
                    "",
                    "=== TICKET ANSWERS ===",
                    answerLines,
                    botEmbeds ? `\n=== ADDITIONAL INFO (from other bots) ===\n${botEmbeds}` : ""
                ].filter(Boolean).join("\n")

                const systemPrompt = [
                    optionCfg.systemPrompt,
                    "",
                    "--- SERVER KNOWLEDGE ---",
                    cachedKnowledge || "(no knowledge files loaded)"
                ].join("\n")

                if (config.chatbot?.typingIndicator && "sendTyping" in channel){
                    await (channel as discord.TextChannel).sendTyping().catch(() => {})
                }

                const summary = await askAI(config, systemPrompt, [{role:"user", content:userPrompt}], optionCfg.maxTokens)
                if (!summary){
                    await channel.send({content:"AI Assistant: Failed to generate ticket summary."})
                    return
                }

                const cleanSummary = summary.replace(GIF_TAG_REGEX, "").trim()
                const embed = new discord.EmbedBuilder()
                    .setTitle(optionCfg.embedTitle)
                    .setDescription(cap(cleanSummary, 4096))
                    .setColor(hexToInt(optionCfg.embedColor))
                    .setFooter({text:"AI Assistant"})
                    .setTimestamp()

                await channel.send({embeds:[embed]})
            }catch(e: any){
                opendiscord.log(`ot-ai-assistant: ticket summary error (${e.message})`, "error")
            }
        })
    }

    opendiscord.log(`Loaded ot-ai-assistant (model: ${config.openrouter.model}).`, "plugin")
})