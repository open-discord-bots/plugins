import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
import {AltDetector, AltDetectorResult} from "discord-alt-detector"

///////// ADVANCED ///////////
const showRawOutput = false //show the raw alt detector output in the embed.
//////////////////////////////

//DECLARATION
export class ODAltDetector extends api.ODManagerData {
    detector: AltDetector

    constructor(id:api.ODValidId,detector:AltDetector){
        super(id)
        this.detector = detector
    }
}
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "od-alt-detector":api.ODPlugin
    }
    export interface ODMessageManagerIds_Default {
        "od-alt-detector:log-message":{source:"other",params:{member:discord.GuildMember,result:AltDetectorResult},workers:"od-alt-detector:log-message"},
    }
    export interface ODEmbedManagerIds_Default {
        "od-alt-detector:log-embed":{source:"other",params:{member:discord.GuildMember,result:AltDetectorResult},workers:"od-alt-detector:log-embed"},
    }
    export interface ODEventIds_Default {
        "od-alt-detector:onAltDetect":api.ODEvent_Default<(member:discord.GuildMember) => api.ODPromiseVoid>
        "od-alt-detector:afterAltDetected":api.ODEvent_Default<(member:discord.GuildMember, result:AltDetectorResult) => api.ODPromiseVoid>
    }
    export interface ODPluginClassManagerIds_Default {
        "od-alt-detector:detector": ODAltDetector
    }
}

//ACCESS PRESENCE INTENTS
opendiscord.events.get("onClientLoad").listen((client) => {
    client.privileges.push("Presence")
    client.intents.push("GuildPresences")
})

//REGISTER PLUGIN CLASS
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
    classes.add(new ODAltDetector("od-alt-detector:detector",new AltDetector()))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("od-alt-detector:log-embed"))
    embeds.get("od-alt-detector:log-embed").workers.add(
        new api.ODWorker("od-alt-detector:log-embed",0,(instance,params,source,cancel) => {
            const {result,member} = params
            const generalConfig = opendiscord.configs.get("opendiscord:general")
            const {detector} = opendiscord.plugins.classes.get("od-alt-detector:detector")
            
            const category = detector.getCategory(result)
            const details = JSON.stringify(result.categories)

            instance.setTitle(utilities.emojiTitle("📌","Alt Detector Logs"))
            instance.setColor(generalConfig.data.mainColor)
            instance.setDescription(discord.userMention(member.id)+" joined the server!")
            instance.setThumbnail(member.displayAvatarURL())
            instance.setAuthor(member.displayName,member.displayAvatarURL())
            instance.setFooter(member.user.username+" - "+member.id)
            instance.setTimestamp(new Date())

            instance.addFields(
                {name:"Account Age",value:discord.time(member.user.createdAt,"f"),inline:true},
                {name:"Trust Level",value:"```"+category+"```",inline:true},
            )
            if (showRawOutput) instance.addFields({name:"Trust Details",value:"```"+details+"```",inline:false})
        })
    )
})

//REGISTER MESSAGE BUILDER
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("od-alt-detector:log-message"))
    messages.get("od-alt-detector:log-message").workers.add(
        new api.ODWorker("od-alt-detector:log-message",0,async (instance,params,source,cancel) => {
            const {result,member} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-alt-detector:log-embed").build(source,{result,member}))
        })
    )
})

//LISTEN FOR MEMBER JOIN
opendiscord.events.get("onClientReady").listen((clientManager) => {
    const {client} = clientManager
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const {detector} = opendiscord.plugins.classes.get("od-alt-detector:detector")

    //send result to log channel when logging is enabled
    client.on("guildMemberAdd",async (member) => {
        if (generalConfig.data.system.logs.enabled){
            const logChannel = opendiscord.posts.get("opendiscord:logs")
            if (!logChannel) return
            
            const result = detector.check(member)
            await logChannel.send(await opendiscord.builders.messages.getSafe("od-alt-detector:log-message").build("other",{result,member}))
        }
    })
})