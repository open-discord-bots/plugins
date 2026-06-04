import { api, opendiscord, utilities } from "#opendiscord"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

const pluginConfigId = "welcome-dm-plugin:config"

opendiscord.events.get("onConfigLoad").listen((configManager) => {
    configManager.add(new api.ODJsonConfig(pluginConfigId,"config.json","./plugins/welcome-dm-plugin/"))
})

function applyPlaceholders(template:string, data:{user:string,guild:string,channel:string}): string {
    return template
        .replaceAll("{user}",data.user)
        .replaceAll("{guild}",data.guild)
        .replaceAll("{channel}",data.channel)
}

opendiscord.events.get("afterTicketCreated").listen(async (ticket,creator,channel) => {
    try{
        const pluginConfig = opendiscord.configs.get(pluginConfigId)
        if (!pluginConfig || !pluginConfig.data.enabled) return

        const guildName = channel.guild?.name ?? "your server"
        const channelRef = `#${channel.name}`
        const userName = creator.displayName ?? creator.username

        const mainText = applyPlaceholders(pluginConfig.data.message,{user:userName,guild:guildName,channel:channelRef})
        const footerText = pluginConfig.data.footer ?? ""
        const finalText = footerText.length > 0 ? `${mainText}\n\n${footerText}` : mainText

        await creator.send({ content: finalText })
    }catch(err){
        // Ignore DM delivery failures (privacy settings, blocked DMs, etc.)
    }
})
