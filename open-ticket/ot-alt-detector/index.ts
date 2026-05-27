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
    export interface ODPluginManagerIdMappings {
        "ot-alt-detector":api.ODPlugin
    }
    export interface ODMessageManagerIdMappings {
        "ot-alt-detector:log-message":{origin:"other",params:{member:discord.GuildMember,result:AltDetectorResult},workers:"ot-alt-detector:log-message"},
    }
    export interface ODEmbedManagerIdMappings {
        "ot-alt-detector:log-embed":{origin:"other",params:{member:discord.GuildMember,result:AltDetectorResult},workers:"ot-alt-detector:log-embed"},
    }
    export interface ODEventManagerIdMappings {
        "ot-alt-detector:onAltDetect":api.ODEvent<(member:discord.GuildMember) => api.ODPromiseVoid>
        "ot-alt-detector:afterAltDetected":api.ODEvent<(member:discord.GuildMember, result:AltDetectorResult) => api.ODPromiseVoid>
    }
    export interface ODPluginClassManagerIdMappings {
        "ot-alt-detector:detector": ODAltDetector
    }
}

//ACCESS PRESENCE INTENTS
opendiscord.events.get("onClientLoad").listen((client) => {
    client.privileges.push("Presence")
    client.intents.push("GuildPresences")
})

//REGISTER PLUGIN CLASS
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
    classes.add(new ODAltDetector("ot-alt-detector:detector",new AltDetector()))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("ot-alt-detector:log-embed"))
    embeds.get("ot-alt-detector:log-embed").workers.add(
        new api.ODWorker("ot-alt-detector:log-embed",0,(instance,params,origin,cancel) => {
            const {result,member} = params
            const generalConfig = opendiscord.configs.get("opendiscord:general")
            const {detector} = opendiscord.plugins.classes.get("ot-alt-detector:detector")
            
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
    messages.add(new api.ODMessage("ot-alt-detector:log-message"))
    messages.get("ot-alt-detector:log-message").workers.add(
        new api.ODWorker("ot-alt-detector:log-message",0,async (instance,params,origin,cancel) => {
            const {result,member} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-alt-detector:log-embed").build(origin,{result,member}))
        })
    )
})

//LISTEN FOR MEMBER JOIN
opendiscord.events.get("onClientReady").listen((clientManager) => {
    const {client} = clientManager
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const {detector} = opendiscord.plugins.classes.get("ot-alt-detector:detector")

    //send result to log channel when logging is enabled
    client.on("guildMemberAdd",async (member) => {
        if (generalConfig.data.logs.enabled){
            const logChannel = opendiscord.posts.get("opendiscord:logs")
            if (!logChannel) return

            await opendiscord.events.get("ot-alt-detector:onAltDetect").emit([member])
            
            const result = detector.check(member)
            await logChannel.send(await opendiscord.builders.messages.getSafe("ot-alt-detector:log-message").build("other",{result,member}))

            await opendiscord.events.get("ot-alt-detector:afterAltDetected").emit([member,result])
        }
    })
})