import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
import axios from "axios"
import * as fs from "fs"
import * as path from "path"

if (utilities.project != "openticket")
    throw new api.ODPluginError("This plugin only works in Open Ticket!")

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-ai-assistant": api.ODPlugin
    }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TicketOption {
    id:              string
    systemPrompt:    string
    embedTitle:      string
    embedColor:      string
    questionIndexes: number[] | "all"
    readBotEmbeds:   boolean
    maxTokens:       number
}

interface PluginConfig {
    openrouter: {
        apiKey:         string
        model:          string
        fallbackModels: string[]
        baseUrl:        string
    }
    chatbot: {
        channelId:             string
        systemPrompt:          string
        maxContextMessages:    number
        typingIndicator:       boolean
        respondToMentionsOnly: boolean
        vipUserIds:            string[]
    }
    giphy: {
        enabled:   boolean
        apiKey:    string
        gifChance: number
    }
    knowledge: {
        serverInfoPath: string
        faqPath:        string
    }
    ticketAI: {
        enabled:        boolean
        summaryDelayMs: number
        options:        TicketOption[]
    }
    automod: {
        enabled:              boolean
        monitoredChannels:    string[]
        exemptRoles:          string[]
        exemptUsers:          string[]
        logChannelId:         string
        deleteMessage:        boolean
        timeoutDurationSec:   number
        publicEmbedChannelId: string
        offenseResetSec:      number
        blocklist:            string[]   // custom words/phrases to always flag (supports Arabic)
    }
    conversation: {
        maxTokens:   number
        temperature: number
    }
}

type ChatMessage = { role: "user" | "assistant" | "system"; content: string }

// ─── Config loader ────────────────────────────────────────────────────────────

function loadConfig(): PluginConfig | null {
    try {
        const raw = fs.readFileSync(
            path.resolve("./plugins/ot-ai-assistant/config.json"),
            "utf-8"
        )
        const cfg = JSON.parse(raw) as PluginConfig
        if (!cfg?.openrouter?.apiKey || cfg.openrouter.apiKey === "sk-or-v1-YOUR_KEY_HERE") {
            opendiscord.log("AI Chatbot: no OpenRouter API key set!", "error")
            return null
        }
        return cfg
    } catch (e: any) {
        opendiscord.log(`AI Chatbot: config.json error - ${e.message}`, "error")
        return null
    }
}

// ─── Knowledge loader ─────────────────────────────────────────────────────────

function loadKnowledge(config: PluginConfig): string {
    const parts: string[] = []
    for (const p of [config.knowledge.serverInfoPath, config.knowledge.faqPath]) {
        try {
            if (fs.existsSync(p)) parts.push(fs.readFileSync(p, "utf-8").trim())
        } catch { }
    }
    return parts.join("\n\n")
}

// ─── OpenRouter API call with fallback model chain ────────────────────────────

async function tryModel(
    apiKey: string, baseUrl: string, model: string,
    systemPrompt: string, messages: ChatMessage[],
    maxTokens: number, temperature: number
): Promise<{ text: string } | { error: string }> {
    try {
        const res = await axios.post(
            `${baseUrl}/chat/completions`,
            { model, messages: [{ role: "system", content: systemPrompt }, ...messages], max_tokens: maxTokens, temperature },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://openticket.bot",
                    "X-Title": "Server AI Chatbot"
                },
                timeout: 30_000
            }
        )
        const text = res.data.choices?.[0]?.message?.content?.trim()
        if (!text) return { error: "Empty response from model" }
        return { text }
    } catch (e: any) {
        const status = e.response?.status ?? "no status"
        const detail = e.response?.data?.error?.message ?? e.response?.data?.message ?? e.message ?? "Unknown error"
        return { error: `[${status}] ${detail}` }
    }
}

async function askAI(config: PluginConfig, systemPrompt: string, messages: ChatMessage[], maxTokens?: number): Promise<string | null> {
    const models = [config.openrouter.model, ...(config.openrouter.fallbackModels ?? [])]
    const tokens = maxTokens ?? config.conversation.maxTokens
    const errors: string[] = []

    for (const model of models) {
        opendiscord.log(`[CHATBOT] trying model ${model}`, "plugin")
        const result = await tryModel(config.openrouter.apiKey, config.openrouter.baseUrl, model, systemPrompt, messages, tokens, config.conversation.temperature)
        if ("text" in result) {
            if (model !== config.openrouter.model)
                opendiscord.log(`[CHATBOT] fallback to ${model} succeeded`, "plugin")
            return result.text
        }
        opendiscord.log(`[CHATBOT] model ${model} failed - ${result.error}`, "error")
        errors.push(`${model}: ${result.error}`)
    }

    opendiscord.log(`[CHATBOT] all models failed - ${errors.join(" | ")}`, "error")
    return null
}

// ─── Per-user conversation history ───────────────────────────────────────────

const convHistory = new Map<string, ChatMessage[]>()

function getHistory(userId: string, max: number): ChatMessage[] {
    return (convHistory.get(userId) ?? []).slice(-(max * 2))
}

function pushHistory(userId: string, role: "user" | "assistant", content: string): void {
    if (!convHistory.has(userId)) convHistory.set(userId, [])
    const arr = convHistory.get(userId)!
    arr.push({ role, content })
    if (arr.length > 60) arr.splice(0, arr.length - 60)
}

// ─── Giphy GIF fetcher ────────────────────────────────────────────────────────
// The AI can append [GIF:search term] at the end of chatbot replies.
// We strip the tag, fetch a random GIF from Giphy, and send it after the reply.
// GIF tags are always stripped from ticket summaries so they never appear there.

const GIF_TAG_REGEX = /\[GIF:([^\]]+)\]/i

async function fetchGiphyGif(query: string, apiKey: string): Promise<string | null> {
    try {
        const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: { api_key: apiKey, q: query, limit: 10, rating: "pg-13", lang: "en" },
            timeout: 8_000
        })
        const results: any[] = res.data?.data ?? []
        if (results.length === 0) return null
        const pick = results[Math.floor(Math.random() * results.length)]
        return pick?.images?.original?.url ?? pick?.images?.downsized?.url ?? null
    } catch (e: any) {
        opendiscord.log(`[CHATBOT] Giphy error - ${e.message}`, "error")
        return null
    }
}

// ─── Embed → plain text ───────────────────────────────────────────────────────

function embedToText(embed: discord.Embed): string {
    const lines: string[] = []
    if (embed.title)        lines.push(`=== ${embed.title} ===`)
    if (embed.description)  lines.push(embed.description)
    for (const f of embed.fields) lines.push(`[${f.name}]\n${f.value}`)
    if (embed.footer?.text) lines.push(`(${embed.footer.text})`)
    return lines.join("\n")
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)) }
function cap(text: string, max: number): string { return text.length > max ? text.slice(0, max - 3) + "..." : text }
function hexToInt(hex: string): number { return parseInt(hex.replace("#", ""), 16) }

// ─── Chatbot reply handler ────────────────────────────────────────────────────

async function handleChatMessage(msg: discord.Message, config: PluginConfig): Promise<void> {
    const text = msg.content.replace(/<@!?\d+>/g, "").trim()
    if (!text) return

    try {
        if (config.chatbot.typingIndicator)
            await (msg.channel as discord.TextChannel).sendTyping()

        const knowledge    = loadKnowledge(config)
        const giphyEnabled = config.giphy?.enabled && !!config.giphy?.apiKey

        const gifInstruction = giphyEnabled
            ? "\n\nGIF RULE: If the conversation is fun, playful, or you just roasted someone nicely — you MAY add [GIF:short search term] at the very end of your response. Only when it genuinely fits the vibe. Never for serious/support questions. One GIF max per reply. Example: [GIF:minecraft creeper explode]"
            : ""

        const systemText = [
            config.chatbot.systemPrompt + gifInstruction,
            "--- SERVER KNOWLEDGE ---",
            knowledge || "(no knowledge files loaded)",
            "---",
            "Keep replies under 2000 characters. If the answer is not in your knowledge, say so clearly."
        ].join("\n\n")

        const history  = getHistory(msg.author.id, config.chatbot.maxContextMessages)
        const rawReply = await askAI(config, systemText, [...history, { role: "user", content: text }])

        if (!rawReply) {
            await msg.reply({ content: "⚠️ I couldn't get a response right now. Please try again in a moment.", allowedMentions: { repliedUser: false } })
            return
        }

        // Parse out [GIF:...] tag and clean the reply text
        const gifMatch   = rawReply.match(GIF_TAG_REGEX)
        const cleanReply = rawReply.replace(GIF_TAG_REGEX, "").trim()

        pushHistory(msg.author.id, "user",      text)
        pushHistory(msg.author.id, "assistant", cleanReply)

        // Send the text reply
        await msg.reply({ content: cap(cleanReply, 2000), allowedMentions: { repliedUser: false } })

        // Send GIF if AI suggested one and chance roll passes
        if (giphyEnabled && gifMatch) {
            const gifQuery  = gifMatch[1].trim()
            const threshold = config.giphy.gifChance ?? 0.85

            if (Math.random() <= threshold) {
                const gifUrl = await fetchGiphyGif(gifQuery, config.giphy.apiKey)
                if (gifUrl) {
                    if ("send" in msg.channel) await (msg.channel as discord.TextChannel).send({ content: gifUrl })
                    opendiscord.log(`[CHATBOT] sent GIF for "${gifQuery}"`, "plugin")
                }
            }
        }

        opendiscord.log(`[CHATBOT] ${msg.author.username}: "${text.slice(0, 70)}"`, "plugin")
    } catch (e: any) {
        opendiscord.log(`[CHATBOT] messageCreate error - ${e.message}`, "error")
        await msg.reply({ content: "⚠️ Something went wrong. Please try again.", allowedMentions: { repliedUser: false } }).catch(() => {})
    }
}

// ─── Automod ──────────────────────────────────────────────────────────────────

// ── Offense tracker ───────────────────────────────────────────────────────────

const offenseTracker = new Map<string, { count: number; lastTs: number }>()

function recordOffense(userId: string): number {
    const entry = offenseTracker.get(userId) ?? { count: 0, lastTs: 0 }
    entry.count += 1
    entry.lastTs = Date.now()
    offenseTracker.set(userId, entry)
    return entry.count
}

function formatDuration(seconds: number): string {
    if (seconds < 60)    return `${seconds}s`
    if (seconds < 3600)  return `${Math.round(seconds / 60)}m`
    if (seconds < 86400) return `${Math.round(seconds / 3600)}h`
    return `${Math.round(seconds / 86400)}d`
}

// ── Normalization ─────────────────────────────────────────────────────────────
// Applied to BOTH the input message and blocklist entries before any matching.
// This collapses leet, franco-Arabic, invisible chars, and separators into a
// canonical form so variants can't slip through.

function normalizeLeet(text: string): string {
    return text
        .toLowerCase()
        // ── Strip invisible bypass chars ──────────────────────────────────────
        .replace(/[\u200B-\u200D\uFEFF\u00AD\u200E\u200F]/g, "")
        // ── English leet ──────────────────────────────────────────────────────
        .replace(/\$/g, "s")
        .replace(/@/g, "a")
        .replace(/!/g, "i")
        .replace(/1/g, "i")
        .replace(/0/g, "o")
        .replace(/4/g, "a")
        .replace(/\+/g, "t")
        // ── Franco-Arabic mappings ────────────────────────────────────────────
        // These are the standard franco-Arabic conventions used in Egyptian/Levantine chat.
        // Order matters: longer patterns first.
        .replace(/gh/g, "gh")   // keep as-is (already latin)
        .replace(/kh/g, "x")    // خ → x (canonical)
        .replace(/sh/g, "sh")   // keep
        .replace(/th/g, "th")   // keep
        .replace(/5/g, "x")     // خ (kh sound)
        .replace(/7/g, "h")     // ح (heavy h)
        .replace(/8/g, "gh")    // غ (ghain)
        .replace(/6/g, "t")     // ط (heavy t)
        .replace(/9/g, "q")     // ق (qaf)
        .replace(/3/g, "a")     // ع (ain → a)
        .replace(/2/g, "a")     // ء/أ (hamza → a)
        // ── Collapse separators between letters (n.i.g → nig) ────────────────
        .replace(/(?<=[a-z\u0600-\u06FF])[\s.\-_*,]+(?=[a-z\u0600-\u06FF])/g, "")
        // ── Collapse runs of 3+ same char ("niiig" → "niig") ─────────────────
        .replace(/(.)\1{2,}/g, "$1$1")
}

// ── EN_SLUR_REGEX ─────────────────────────────────────────────────────────────
// High-confidence English roots only. Kept minimal intentionally —
// everything else belongs in the config blocklist.

const EN_SLUR_REGEX = /\b(nigge?r|nigg[ae]|fagg?ot|kike|cunt|retard|spick?|wetback|kys)\b/

// ── Blocklist regex builder ───────────────────────────────────────────────────
// Normalizes each blocklist entry the same way as input text, then builds a
// single regex. Supports English, Arabic (Unicode), and franco-Arabic.

function buildBlocklistRegex(words: string[]): RegExp | null {
    if (!words || words.length === 0) return null
    const patterns = words.map(w => {
        const normalized = normalizeLeet(w)
        // Escape regex special chars (important for Arabic punctuation)
        const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        // Allow optional separators between every character to catch spaced variants
        return escaped.split("").join("[\\s.\\-_]*")
    })
    return new RegExp(`(${patterns.join("|")})`, "i")
}

// ── Unified pre-filter ────────────────────────────────────────────────────────
// Single flow: normalize → EN_SLUR_REGEX → blocklist regex.
// No Arabic special-casing. Arabic and franco-Arabic go through blocklist only.

function passesPrefilter(content: string, blocklistRegex: RegExp | null): boolean {
    const normalized = normalizeLeet(content)
    if (EN_SLUR_REGEX.test(normalized))                    return true
    if (blocklistRegex && blocklistRegex.test(normalized)) return true
    return false
}

// ── AI confirmation ───────────────────────────────────────────────────────────
// Only called when pre-filter fires. Keeps API usage minimal.

async function isMessageToxic(content: string, config: PluginConfig): Promise<boolean> {
    const result = await askAI(
        config,
        [
            "You are a moderation classifier for an online community server.",
            "Decide if the message contains slurs, hate speech, or targeted harassment in ANY language.",
            "Reply with ONLY the word YES or NO. No explanation.",
            "When in doubt, reply NO to avoid false positives."
        ].join("\n"),
        [{ role: "user", content: `Message: "${content}"` }],
        5
    )
    return result?.trim().toUpperCase() === "YES"
}

async function handleAutomod(msg: discord.Message, config: PluginConfig, cachedBlocklistRegex: RegExp | null): Promise<void> {
    const am = config.automod
    if (!am?.enabled) return
    if (msg.author.bot) return
    if (!msg.guild)    return

    // Channel filter — empty array = monitor everywhere
    if (am.monitoredChannels?.length > 0 && !am.monitoredChannels.includes(msg.channelId)) return

    // Exempt users
    if (am.exemptUsers?.includes(msg.author.id)) return

    // Exempt roles
    const member = msg.member ?? await msg.guild.members.fetch(msg.author.id).catch(() => null)
    if (!member) return
    if (am.exemptRoles?.some(r => member.roles.cache.has(r))) return

    // Stage 1: unified pre-filter (normalize → EN_SLUR_REGEX → blocklist)
    if (!passesPrefilter(msg.content, cachedBlocklistRegex)) return

    opendiscord.log(`[AUTOMOD] pre-filter hit — checking "${msg.content.slice(0, 60)}" by ${msg.author.username}`, "plugin")

    // Stage 2: AI confirmation — only fires when pre-filter matched
    const toxic = await isMessageToxic(msg.content, config)
    opendiscord.log(`[AUTOMOD] AI verdict for ${msg.author.username}: ${toxic ? "TOXIC ✗" : "clean ✓"}`, "plugin")
    if (!toxic) return

    // Delete message
    if (am.deleteMessage) await msg.delete().catch(() => {})

    // Record offense and determine timeout duration
    const resetMs  = (am.offenseResetSec ?? 3600) * 1000
    const offenses = recordOffense(msg.author.id)

    // Scale timeout: 1st = base, 2nd = 2x, 3rd+ = 4x
    const baseSec     = am.timeoutDurationSec ?? 300
    const multiplier  = offenses === 1 ? 1 : offenses === 2 ? 2 : 4
    const durationSec = baseSec * multiplier
    const durationMs  = durationSec * 1_000

    let actionTaken = "warned"
    if (msg.guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers)) {
        await member.timeout(durationMs, `Automod: slur/harassment (offense #${offenses})`).catch(() => {})
        actionTaken = `timed out for ${formatDuration(durationSec)}`
    }

    const offenseLabel = offenses === 1 ? "1st offense" : offenses === 2 ? "2nd offense" : `offense #${offenses}`

    // ── Public embed ──────────────────────────────────────────────────────────
    const publicChannelId = am.publicEmbedChannelId || am.logChannelId
    if (publicChannelId) {
        const pubChannel = await msg.guild.channels.fetch(publicChannelId).catch(() => null)
        if (pubChannel && "send" in pubChannel) {
            const publicEmbed = new discord.EmbedBuilder()
                .setColor(0xe74c3c)
                .setTitle("🔨 Moderation Action")
                .setDescription(`<@${msg.author.id}> has been **${actionTaken}** for using prohibited language.`)
                .addFields({ name: "Offense", value: offenseLabel, inline: true })
                .setThumbnail(msg.author.displayAvatarURL())
                .setTimestamp()
            await (pubChannel as discord.TextChannel).send({ embeds: [publicEmbed] }).catch(() => {})
        }
    }

    // ── Private staff log embed ───────────────────────────────────────────────
    if (am.logChannelId && am.logChannelId !== publicChannelId) {
        const logChannel = await msg.guild.channels.fetch(am.logChannelId).catch(() => null)
        if (logChannel && "send" in logChannel) {
            const logEmbed = new discord.EmbedBuilder()
                .setColor(0x992d22)
                .setTitle("🚨 Automod Log")
                .addFields(
                    { name: "User",    value: `<@${msg.author.id}> (${msg.author.username})`, inline: true },
                    { name: "Channel", value: `<#${msg.channelId}>`,                          inline: true },
                    { name: "Offense", value: offenseLabel,                                   inline: true },
                    { name: "Action",  value: actionTaken,                                    inline: true },
                    { name: "Message", value: `\`\`\`${msg.content.slice(0, 900)}\`\`\`` }
                )
                .setThumbnail(msg.author.displayAvatarURL())
                .setTimestamp()
            await (logChannel as discord.TextChannel).send({ embeds: [logEmbed] }).catch(() => {})
        }
    }

    opendiscord.log(`[AUTOMOD] ${msg.author.username} ${actionTaken} (offense #${offenses})`, "plugin")
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

opendiscord.events.get("onConfigLoad")!.listen(async () => {
    const config = loadConfig()
    if (!config) return

    const knowledge  = loadKnowledge(config)
    const gifStatus  = config.giphy?.enabled && config.giphy?.apiKey ? "enabled" : "disabled"
    opendiscord.log(`[INIT] ready | model: ${config.openrouter.model} | knowledge: ${knowledge.length} chars | tickets: ${config.ticketAI.options?.length ?? 0} | GIFs: ${gifStatus}`, "plugin")

    const vipIds = new Set<string>(config.chatbot.vipUserIds ?? [])
    const botId  = () => opendiscord.client.client.user?.id ?? ""

    // Build blocklist regex once at startup — not rebuilt per message
    const cachedBlocklistRegex = buildBlocklistRegex(config.automod?.blocklist ?? [])
    if (config.automod?.enabled) {
        opendiscord.log(`[AUTOMOD] ready | blocklist: ${config.automod.blocklist?.length ?? 0} entries`, "plugin")
    }

    // ── 1. MESSAGE LISTENER ───────────────────────────────────────────────────

    opendiscord.client.client.on("messageCreate", async (msg: discord.Message) => {
        if (msg.author.bot) return

        // Automod runs on every non-bot message
        await handleAutomod(msg, config, cachedBlocklistRegex)

        const botUser   = opendiscord.client.client.user!
        const mentioned = msg.mentions.has(botUser)
        const isVip     = vipIds.has(msg.author.id)

        if (isVip && mentioned) { await handleChatMessage(msg, config); return }

        if (config.chatbot.channelId && msg.channelId === config.chatbot.channelId) {
            if (config.chatbot.respondToMentionsOnly && !mentioned) return
            await handleChatMessage(msg, config)
        }
    })

    opendiscord.log(config.chatbot.channelId ? `[INIT] chatbot active in channel ${config.chatbot.channelId}` : "[INIT] no chatbot channelId set.", "plugin")
    if (vipIds.size > 0) opendiscord.log(`[INIT] VIP users: ${[...vipIds].join(", ")}`, "plugin")

    // ── 2. TICKET SUMMARIZATION ───────────────────────────────────────────────

    if (!config.ticketAI.enabled) { opendiscord.log("[INIT] ticket AI disabled.", "plugin"); return }
    if (!config.ticketAI.options || config.ticketAI.options.length === 0) { opendiscord.log("[INIT] no ticket options configured.", "plugin"); return }

    const optionMap = new Map<string, TicketOption>()
    for (const opt of config.ticketAI.options) optionMap.set(opt.id, opt)
    opendiscord.log(`[INIT] watching ticket options: ${[...optionMap.keys()].join(", ")}`, "plugin")

    opendiscord.events.get("afterTicketCreated")!.listen(async (ticket, creator, channel) => {
        try {
            const optionId  = ticket.option.id.value as string
            const optionCfg = optionMap.get(optionId)
            if (!optionCfg) return

            await sleep(config.ticketAI.summaryDelayMs)

            const allAnswers: { value: string | null }[] = ticket.get("opendiscord:answers")?.value ?? []
            const selectedAnswers = optionCfg.questionIndexes === "all"
                ? allAnswers
                : (optionCfg.questionIndexes as number[]).map(i => allAnswers[i]).filter(Boolean)

            const answerLines = selectedAnswers.length > 0
                ? selectedAnswers.map((a, i) => `  Q${i + 1}: ${a.value?.trim() || "(no answer provided)"}`).join("\n")
                : "  (no answers recorded)"

            let botEmbeds = ""
            if (optionCfg.readBotEmbeds) {
                const recent = await channel.messages.fetch({ limit: 15 })
                botEmbeds = recent
                    .filter(m => m.author.bot && m.author.id !== botId() && m.embeds.length > 0)
                    .map(m => m.embeds.map(embedToText).join("\n"))
                    .join("\n\n---\n\n")
            }

            const userPrompt   = ["A new ticket was opened. Analyze it according to your instructions.", "", "=== TICKET ANSWERS ===", answerLines, "", botEmbeds ? `=== ADDITIONAL INFO (from other bots) ===\n${botEmbeds}` : ""].filter(Boolean).join("\n")
            const systemPrompt = [optionCfg.systemPrompt, "", "--- SERVER KNOWLEDGE ---", loadKnowledge(config) || "(no knowledge files loaded)"].join("\n")

            if (config.chatbot.typingIndicator) await (channel as discord.TextChannel).sendTyping().catch(() => {})

            const summary = await askAI(config, systemPrompt, [{ role: "user", content: userPrompt }], optionCfg.maxTokens)

            if (!summary) { await channel.send({ content: "⚠️ AI Chatbot: Failed to generate summary." }); return }

            // Always strip GIF tags from ticket summaries
            const cleanSummary = summary.replace(GIF_TAG_REGEX, "").trim()

            const embed = new discord.EmbedBuilder()
                .setTitle(optionCfg.embedTitle)
                .setDescription(cap(cleanSummary, 4096))
                .setColor(hexToInt(optionCfg.embedColor) as discord.ColorResolvable)
                .setFooter({ text: `AI Assistant` })
                .setTimestamp()

            await channel.send({ embeds: [embed] })
            opendiscord.log(`[TICKET] posted summary for "${optionId}" (ticket ${ticket.id.value})`, "plugin")
        } catch (e: any) {
            opendiscord.log(`[TICKET] summary error - ${e.message}`, "error")
        }
    })

    opendiscord.log("[TICKET] summarization active", "plugin")
})
