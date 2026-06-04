import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

const pluginConfigId = "ticket-analytics-plugin:config"

opendiscord.events.get("onConfigLoad").listen((configManager) => {
    configManager.add(new api.ODJsonConfig(pluginConfigId,"config.json","./plugins/ticket-analytics-plugin/"))
})

function formatDuration(ms:number): string {
    if (ms <= 0) return "0m"
    const totalMinutes = Math.floor(ms / 60000)
    const days = Math.floor(totalMinutes / 1440)
    const hours = Math.floor((totalMinutes % 1440) / 60)
    const minutes = totalMinutes % 60

    const chunks: string[] = []
    if (days > 0) chunks.push(days+"d")
    if (hours > 0) chunks.push(hours+"h")
    if (minutes > 0 || chunks.length < 1) chunks.push(minutes+"m")
    return chunks.join(" ")
}

async function buildTopSupportLines(guild:discord.Guild): Promise<string> {
    const counts = new Map<string, number>()
    for (const ticket of opendiscord.tickets.getAll()){
        const closerId = ticket.get("opendiscord:closed-by").value as string|null
        if (!closerId) continue
        counts.set(closerId,(counts.get(closerId) ?? 0)+1)
    }

    const top = [...counts.entries()].sort((a,b) => b[1]-a[1]).slice(0,3)
    if (top.length < 1) return "No resolved tickets yet."

    const lines: string[] = []
    for (let i = 0; i < top.length; i++){
        const [userId,total] = top[i]
        const member = await opendiscord.client.fetchGuildMember(guild,userId)
        const display = member ? member.displayName : userId
        lines.push(`${i+1}. ${display} - ${total}`)
    }
    return lines.join("\n")
}

async function buildAnalyticsMessage(guild:discord.Guild){
    const tickets = opendiscord.tickets.getAll()
    const total = tickets.length
    const closed = tickets.filter((ticket) => ticket.get("opendiscord:closed").value === true).length
    const open = total - closed
    const closedRatio = total > 0 ? ((closed / total) * 100).toFixed(1) : "0.0"

    const resolutionTimes: number[] = []
    for (const ticket of tickets){
        const openedOn = ticket.get("opendiscord:opened-on").value as number|null
        const closedOn = ticket.get("opendiscord:closed-on").value as number|null
        const isClosed = ticket.get("opendiscord:closed").value === true
        if (!isClosed || !openedOn || !closedOn || closedOn <= openedOn) continue
        resolutionTimes.push(closedOn - openedOn)
    }

    const averageResolutionMs = resolutionTimes.length > 0
        ? Math.floor(resolutionTimes.reduce((a,b) => a+b,0) / resolutionTimes.length)
        : 0

    const topSupport = await buildTopSupportLines(guild)

    const embed = new discord.EmbedBuilder()
        .setTitle("Ticket Analytics")
        .setColor(0x2f855a)
        .addFields(
            { name:"Ticket Volume", value:`${total}`, inline:true },
            { name:"Open / Closed", value:`${open} / ${closed}`, inline:true },
            { name:"Closed Ratio", value:`${closedRatio}%`, inline:true },
            { name:"Avg Resolution", value:formatDuration(averageResolutionMs), inline:true },
            { name:"Top 3 Support Members", value:topSupport, inline:false }
        )
        .setTimestamp(new Date())

    return {
        id:new api.ODId("ticket-analytics-plugin:analytics-response"),
        ephemeral: opendiscord.configs.get(pluginConfigId)?.data?.ephemeralResponse ?? true,
        message:{ embeds:[embed] }
    }
}

opendiscord.events.get("onSlashCommandLoad").listen((slashManager) => {
    slashManager.add(new api.ODSlashCommand("ticket-analytics-plugin:slash-command",{
        type:discord.ApplicationCommandType.ChatInput,
        name:"ticket-analytics",
        description:"Show live ticket analytics.",
        contexts:[discord.InteractionContextType.Guild],
        integrationTypes:[discord.ApplicationIntegrationType.GuildInstall]
    }))
})

opendiscord.events.get("onTextCommandLoad").listen((textManager) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    if (!generalConfig) return

    textManager.add(new api.ODTextCommand("ticket-analytics-plugin:text-command",{
        prefix:generalConfig.data.prefix,
        name:"ticket-analytics",
        dmPermission:false,
        guildPermission:true,
        allowBots:false,
        options:[]
    }))
})

opendiscord.events.get("onCommandResponderLoad").listen((commandResponders) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const pluginConfig = opendiscord.configs.get(pluginConfigId)
    if (!generalConfig || !pluginConfig) return

    commandResponders.add(new api.ODCommandResponder("ticket-analytics-plugin:command-responder",generalConfig.data.prefix,/^ticket-analytics$/))
    commandResponders.get("ticket-analytics-plugin:command-responder")?.workers.add([
        new api.ODWorker("ticket-analytics-plugin:run",0,async (instance,params,source,cancel) => {
            const { guild, user, member, channel } = instance
            if (!guild){
                await instance.reply({
                    id:new api.ODId("ticket-analytics-plugin:not-in-guild"),
                    ephemeral:true,
                    message:{ content:"This command can only be used in a server." }
                })
                return cancel()
            }

            const permissionMode = pluginConfig.data.requiredPermission ?? "support"
            const permsResult = await opendiscord.permissions.checkCommandPerms(permissionMode,"support",user,member,channel,guild)
            if (!permsResult.hasPerms){
                await instance.reply({
                    id:new api.ODId("ticket-analytics-plugin:no-perms"),
                    ephemeral:true,
                    message:{ content:"You do not have permission to view ticket analytics." }
                })
                return cancel()
            }

            await instance.reply(await buildAnalyticsMessage(guild))
        })
    ])
})
