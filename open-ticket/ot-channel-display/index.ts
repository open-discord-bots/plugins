import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-channel-display":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-channel-display:config":OTChannelDisplayConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-channel-display:config":api.ODChecker
    }
}

export const allVariables = [
    "guild.members.all",
    "guild.members.online",
    "guild.members.offline",
    "guild.admins.all",
    "guild.admins.online",
    "guild.admins.offline",
    "guild.bots",
    "guild.roles",
    "guild.channels",
    "stats.tickets.created",
    "stats.tickets.closed",
    "stats.tickets.deleted",
    "stats.tickets.reopened",
    "stats.tickets.autoclosed",
    "stats.tickets.autodeleted",
    "stats.tickets.claimed",
    "stats.tickets.pinned",
    "stats.tickets.moved",
    "stats.users.blacklisted",
    "stats.transcripts.created",
    "tickets.open",
    "tickets.closed",
    "tickets.claimed",
    "tickets.pinned",
    "system.version",
    "system.uptime.minutes",
    "system.uptime.hours",
    "system.uptime.days",
    "system.plugins",
    "system.tickets",
    "system.questions",
    "system.options",
    "system.panels"
]

export type OTChannelDisplayAllVariables = (
    "guild.members.all"|
    "guild.members.online"|
    "guild.members.offline"|
    "guild.admins.all"|
    "guild.admins.online"|
    "guild.admins.offline"|
    "guild.bots"|
    "guild.roles"|
    "guild.channels"|
    "stats.tickets.created"|
    "stats.tickets.closed"|
    "stats.tickets.deleted"|
    "stats.tickets.reopened"|
    "stats.tickets.autoclosed"|
    "stats.tickets.autodeleted"|
    "stats.tickets.claimed"|
    "stats.tickets.pinned"|
    "stats.tickets.moved"|
    "stats.users.blacklisted"|
    "stats.transcripts.created"|
    "tickets.open"|
    "tickets.closed"|
    "tickets.claimed"|
    "tickets.pinned"|
    "system.version"|
    "system.uptime.minutes"|
    "system.uptime.hours"|
    "system.uptime.days"|
    "system.plugins"|
    "system.tickets"|
    "system.questions"|
    "system.options"|
    "system.panels"
)

export const channelDisplayConfigStructure = new api.ODCheckerObjectStructure("ot-channel-display:config",{children:[
    {key:"_INFO",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-channel-display:info",{})},

    {key:"channels",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-channel-display:channels",{disableEmpty:true,allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-channel-display:channel",{children:[
        {key:"id",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_DiscordId("ot-channel-display:channel-id","channel",false,[])},
        {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-channel-display:channel-name",{minLength:3,maxLength:50})},
    ]})})},

    {key:"variables",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-channel-display:variables",{disableEmpty:true,allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-channel-display:variable",{children:[
        {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-channel-display:variable-name",{minLength:3,startsWith:"{",endsWith:"}"})},
        {key:"variable",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-channel-display:variable-variable",{choices:allVariables})},
    ]})})},
]})

//REGISTER CONFIG
export class OTChannelDisplayConfig extends api.ODJsonConfig {
    declare data: {
        _INFO:string,
        channels:{
            id:string,
            name:string
        }[],
        variables:{
            name:string,
            variable:OTChannelDisplayAllVariables
        }[]
    }
}
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTChannelDisplayConfig("ot-channel-display:config","config.json","./plugins/ot-channel-display/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    checkers.add(new api.ODChecker("ot-channel-display:config",checkers.storage,0,opendiscord.configs.get("ot-channel-display:config"),channelDisplayConfigStructure))
})

//GET ALL ADMIN MEMBERS
async function getAdminGuildMembers(): Promise<discord.GuildMember[]> {
    const globalAdminIds = opendiscord.configs.get("opendiscord:general").data.globalAdmins
    const ticketAdminIds = opendiscord.configs.get("opendiscord:options").data.filter((opt) => opt.type == "ticket").map((opt) => opt.ticketAdmins.concat(opt.readonlyAdmins))

    const finalAdminIds: string[] = [...globalAdminIds]
    ticketAdminIds.forEach((optAdmins) => {
        optAdmins.forEach((id) => {
            if (!finalAdminIds.includes(id)) finalAdminIds.push(id)
        })
    })

    //return when not in main server
    const mainServer = opendiscord.client.mainServer
    if (!mainServer) return []

    //collect all members
    const members: discord.GuildMember[] = []
    for (const roleId of finalAdminIds){
        try{
            const role = await mainServer.roles.fetch(roleId)
            if (role) role.members.forEach((member) => {
                if (!members.find((m) => m.id == member.id)) members.push(member)
            })
        }catch{}
    }

    return members
}

//PROCESS VARIABLES
async function processVariables(variables:{name:string,variable:OTChannelDisplayAllVariables}[], text:string): Promise<string> {
    //return when not in main server
    const mainServer = opendiscord.client.mainServer
    if (!mainServer) return "<ERROR: mainServer>"

    let processedText = text
    for (const vari of variables){
        let content: string
        if (vari.variable == "guild.members.all") content = mainServer.memberCount.toString() ?? "0"
        else if (vari.variable == "guild.members.online") content = (await mainServer.members.list()).filter((m) => m.presence && m.presence.status == "online").size.toString()
        else if (vari.variable == "guild.members.offline") content = (await mainServer.members.list()).filter((m) => m.presence && m.presence.status == "offline").size.toString()
        else if (vari.variable == "guild.admins.all") content = (await getAdminGuildMembers()).length.toString()
        else if (vari.variable == "guild.admins.online") content = (await getAdminGuildMembers()).filter((m) => m.presence && m.presence.status == "online").length.toString()
        else if (vari.variable == "guild.admins.offline") content = (await getAdminGuildMembers()).filter((m) => m.presence && m.presence.status == "offline").length.toString()
        else if (vari.variable == "guild.bots") content = (await mainServer.members.list()).filter((m) => m.user.bot).size.toString()
        else if (vari.variable == "guild.roles") content = mainServer.roles.cache.size.toString()
        else if (vari.variable == "guild.channels") content = mainServer.channels.cache.size.toString()
        else if (vari.variable == "stats.tickets.created") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-created"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.closed") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-closed"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.deleted") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-deleted"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.reopened") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-reopened"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.autoclosed") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-autoclosed"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.autodeleted") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-autodeleted"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.claimed") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-claimed"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.pinned") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-pinned"))?.toString() ?? "0"
        else if (vari.variable == "stats.tickets.moved") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:tickets-moved"))?.toString() ?? "0"
        else if (vari.variable == "stats.users.blacklisted") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:users-blacklisted"))?.toString() ?? "0"
        else if (vari.variable == "stats.transcripts.created") content = (await opendiscord.stats.get("opendiscord:global").getStat("opendiscord:transcripts-created"))?.toString() ?? "0"
        else if (vari.variable == "tickets.open") content = opendiscord.tickets.getFiltered((ticket) => !ticket.get("opendiscord:closed").value).length.toString()
        else if (vari.variable == "tickets.closed") content = opendiscord.tickets.getFiltered((ticket) => ticket.get("opendiscord:closed").value).length.toString()
        else if (vari.variable == "tickets.claimed") content = opendiscord.tickets.getFiltered((ticket) => ticket.get("opendiscord:claimed").value).length.toString()
        else if (vari.variable == "tickets.pinned") content = opendiscord.tickets.getFiltered((ticket) => ticket.get("opendiscord:pinned").value).length.toString()
        else if (vari.variable == "system.version") content = opendiscord.versions.get("opendiscord:version").toString()
        else if (vari.variable == "system.uptime.minutes") content = Math.floor((new Date().getTime() - opendiscord.processStartupDate.getTime())/1000/60).toString()
        else if (vari.variable == "system.uptime.hours") content = Math.floor((new Date().getTime() - opendiscord.processStartupDate.getTime())/1000/60/60).toString()
        else if (vari.variable == "system.uptime.days") content = Math.floor((new Date().getTime() - opendiscord.processStartupDate.getTime())/1000/60/60/24).toString()
        else if (vari.variable == "system.plugins") content = opendiscord.plugins.getLength().toString()
        else if (vari.variable == "system.tickets") content = opendiscord.tickets.getLength().toString()
        else if (vari.variable == "system.questions") content = opendiscord.questions.getLength().toString()
        else if (vari.variable == "system.options") content = opendiscord.options.getLength().toString()
        else if (vari.variable == "system.panels") content = opendiscord.panels.getLength().toString()
        else content = ""

        processedText = processedText.replaceAll(vari.name,content)
    }

    return processedText
}

//REGISTER CHANNEL RENAMER
opendiscord.events.get("afterClientReady").listen(async (client) => {
    const config = opendiscord.configs.get("ot-channel-display:config")
    const channels = config.data.channels
    const variables = config.data.variables
    const channelCache: {channel:discord.GuildBasedChannel,name:string}[] = []
    const mainServer = client.mainServer
    if (!mainServer) return

    for (const c of channels){
        const channel = await client.fetchGuildChannel(mainServer,c.id)
        if (channel) channelCache.push({channel,name:c.name})
        else opendiscord.log("Can't find display channel with id "+c.id+"!","error")
    }

    async function updateChannels(){
        for (const c of channelCache){
            try{
                await utilities.timedAwait(c.channel.setName(await processVariables(variables,c.name)),3000,(err) => {})
                opendiscord.log("Updated channel display!","plugin",[{key:"channelid",value:c.channel.id}])
            }catch{
                opendiscord.log("Failed to rename channel display!","warning",[{key:"channelid",value:c.channel.id}])
            }
        }
    }

    //first rename starts after bot initialisation
    opendiscord.events.get("onReadyForUsage").listen(async () => {
        await updateChannels()
        setInterval(async () => {
            await updateChannels()
        },900*1000) //15 minutes
    })
})