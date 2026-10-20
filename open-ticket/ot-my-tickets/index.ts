import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-my-tickets":api.ODPlugin
    }
    export interface ODSlashCommandManagerIdMappings {
        "ot-my-tickets:my-tickets":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIdMappings {
        "ot-my-tickets:my-tickets":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIdMappings {
        "ot-my-tickets:my-tickets":{origin:"slash"|"text", params:{}, workers:"ot-my-tickets:my-tickets"|"ot-my-tickets:logs"},
    }
    export interface ODMessageManagerIdMappings {
        "ot-my-tickets:my-tickets-message":{origin:"slash"|"text"|"other", params:{user:discord.User, member:discord.GuildMember}, workers:"ot-my-tickets:my-tickets-message"},
    }
    export interface ODEmbedManagerIdMappings {
        "ot-my-tickets:my-tickets-embed":{origin:"slash"|"text"|"other", params:{user:discord.User, member:discord.GuildMember}, workers:"ot-my-tickets:my-tickets-embed"},
    }
}

//REGISTER SLASH COMMAND
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    slash.add(new api.ODSlashCommand("ot-my-tickets:my-tickets", {
        name:"my-tickets",
        description:"List all your tickets, your claimed tickets and participated tickets.",
        type:discord.ApplicationCommandType.ChatInput,
        contexts:[discord.InteractionContextType.Guild],
        integrationTypes:[discord.ApplicationIntegrationType.GuildInstall]
    }))
})

//REGISTER TEXT COMMAND
opendiscord.events.get("onTextCommandLoad").listen((text) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    text.add(new api.ODTextCommand("ot-my-tickets:my-tickets", {
        name:"my-tickets",
        prefix:generalConfig.data.prefix,
        dmPermission:false,
        guildPermission:true
    }))
})

//REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-my-tickets:my-tickets", 0, {
        slashName:"my-tickets",
        textName:"my-tickets",
        slashDescription:"List all your tickets, your claimed tickets and participated tickets.",
        textDescription:"List all your tickets, your claimed tickets and participated tickets."
    }))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("ot-my-tickets:my-tickets-embed"))
    embeds.get("ot-my-tickets:my-tickets-embed").workers.add(new api.ODWorker("ot-my-tickets:my-tickets-embed", 0, (instance, params, origin, cancel) => {
        const generalConfig = opendiscord.configs.get("opendiscord:general")
        const {user, member} = params

        instance.setTitle(utilities.emojiTitle("🎫", "Your Tickets"))
        instance.setColor(generalConfig.data.mainColor)

        const myTickets = opendiscord.tickets.getFiltered((t) => t.get("opendiscord:opened-by").value === user.id)
        const claimedTickets = opendiscord.tickets.getFiltered((t) => t.get("opendiscord:claimed-by").value === user.id)

        const renderedMyTickets = (myTickets.length > 0) ? myTickets.map((t) => "- " + discord.channelMention(t.id.value)).join("\n") : "*No tickets created.*"
        const renderedClaimedTickets = (claimedTickets.length > 0) ? claimedTickets.map((t) => "- " + discord.channelMention(t.id.value)).join("\n") : "*No tickets claimed.*"

        instance.addFields({name:"Created Tickets", value:renderedMyTickets})
        instance.addFields({name:"Claimed Tickets", value:renderedClaimedTickets})
    }))
})

//REGISTER MESSAGE BUILDER
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-my-tickets:my-tickets-message"))
    messages.get("ot-my-tickets:my-tickets-message").workers.add(new api.ODWorker("ot-my-tickets:my-tickets-message", 0, async (instance, params, origin, cancel) => {
        instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-my-tickets:my-tickets-embed").build(origin, params))
        instance.setEphemeral(true)
    }))
})

//REGISTER COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    commands.add(new api.ODCommandResponder("ot-my-tickets:my-tickets", generalConfig.data.prefix, "my-tickets"))
    commands.get("ot-my-tickets:my-tickets").workers.add([
        new api.ODWorker("ot-my-tickets:my-tickets", 0, async (instance, params, origin, cancel) => {
            const {guild, channel, user, member} = instance
            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(origin, {channel, user}))
                return cancel()
            }
            await instance.reply(await opendiscord.builders.messages.getSafe("ot-my-tickets:my-tickets-message").build(origin, {user, member}))
        }),
        new api.ODWorker("ot-my-tickets:logs", -1, (instance, params, origin, cancel) => {
            opendiscord.log(instance.user.displayName + " used the 'my-tickets' command!", "plugin", [
                {key:"user", value:instance.user.username},
                {key:"userid", value:instance.user.id, hidden:true},
                {key:"channelid", value:instance.channel.id, hidden:true},
                {key:"method", value:origin}
            ])
        })
    ])
})