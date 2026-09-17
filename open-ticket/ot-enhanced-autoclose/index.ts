import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

const pluginConfigId = "enhanced-autoclose-plugin:config"
let intervalHandle: NodeJS.Timeout|null = null

opendiscord.events.get("onConfigLoad").listen((configManager) => {
    configManager.add(new api.ODJsonConfig(pluginConfigId,"config.json","./plugins/enhanced-autoclose-plugin/"))
})

async function runAutoCloseCycle(){
    const pluginConfig = opendiscord.configs.get(pluginConfigId)
    if (!pluginConfig || !pluginConfig.data.enabled) return

    const checkThresholdMs = Math.max(1, Number(pluginConfig.data.inactivityMinutes ?? 240)) * 60000
    const shouldSkipCoreEnabled = pluginConfig.data.skipWhenCoreAutocloseEnabled === true
    const shouldSendNotice = pluginConfig.data.sendNoticeMessage === true
    const closeReason = String(pluginConfig.data.reason ?? "Enhanced plugin auto-close")

    for (const ticket of opendiscord.tickets.getAll()){
        try{
            if (ticket.get("opendiscord:closed").value === true) continue
            if (ticket.get("opendiscord:busy").value === true) continue

            if (shouldSkipCoreEnabled && ticket.get("opendiscord:autoclose-enabled").value === true) continue

            const channel = await opendiscord.tickets.getTicketChannel(ticket)
            if (!channel || channel.isDMBased() || channel.isThread()) continue

            const lastMessage = (await channel.messages.fetch({ limit:1 })).first()
            if (!lastMessage) continue

            const inactiveForMs = Date.now() - lastMessage.createdTimestamp
            if (inactiveForMs < checkThresholdMs) continue

            await opendiscord.actions.get("opendiscord:close-ticket").run("autoclose",{
                guild:channel.guild,
                channel,
                user:opendiscord.client.client.user,
                ticket,
                reason:closeReason,
                sendMessage:false
            })

            if (shouldSendNotice){
                await channel.send({
                    content:`This ticket was automatically closed after ${pluginConfig.data.inactivityMinutes} minutes of inactivity.`
                })
            }

            await opendiscord.stats.get("opendiscord:global").setStat("opendiscord:tickets-autoclosed",1,"increase")
        }catch(err){
            process.emit("uncaughtException",err as Error)
        }
    }
}

opendiscord.events.get("afterCodeExecuted").listen(() => {
    const pluginConfig = opendiscord.configs.get(pluginConfigId)
    if (!pluginConfig || !pluginConfig.data.enabled) return

    const intervalSeconds = Math.max(30, Number(pluginConfig.data.checkIntervalSeconds ?? 180))
    if (intervalHandle) clearInterval(intervalHandle)

    intervalHandle = setInterval(() => {
        utilities.runAsync(runAutoCloseCycle)
    },intervalSeconds * 1000)

    // Run one immediate cycle after startup.
    utilities.runAsync(runAutoCloseCycle)
})
