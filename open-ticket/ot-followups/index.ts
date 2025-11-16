import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
import ansis from "ansis"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
export interface OTFollowUpsEmbedData {
    enabled:boolean,
    title:string,
    url:string,
    description:string,
    customColor:discord.ColorResolvable,

    image:string,
    thumbnail:string,
    authorText:string,
    authorImage:string,
    footerText:string,
    footerImage:string,
    
    timestamp:boolean,
    fields:{name:string,value:string,inline:boolean}[],
}
export interface OTFollowUpsMessageData {
    id:string
    content:string
    embed:OTFollowUpsEmbedData;
    ping:{
        "@here":boolean,
        "@everyone":boolean,
        custom:string[]
    }
}
export class OTFollowUpsDefaultConfig extends api.ODJsonConfig {
    declare data: {
        optionId:string,
        messages:string[]
    }[]
}
export class OTFollowUpsMessagesConfig extends api.ODJsonConfig {
    declare data: OTFollowUpsMessageData[]
}
export class OTFollowUp extends api.ODManagerData {
    data: OTFollowUpsMessageData
    constructor(id:api.ODValidId,data:OTFollowUpsMessageData){
        super(id)
        this.data = data
    }
}

export class OTFollowUpsManager extends api.ODManager<OTFollowUp> {
    id: api.ODId = new api.ODId("ot-followups:manager")
    defaults: {ticketFollowupsLoading:boolean} = {
        ticketFollowupsLoading:true
    }

    constructor(debug:api.ODDebugger){
        super(debug,"ticket follow-ups")
    }
}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-followups":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-followups:config":OTFollowUpsDefaultConfig,
        "ot-followups:messages":OTFollowUpsMessagesConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-followups:config":api.ODChecker,
        "ot-followups:messages":api.ODChecker
    }
    export interface ODMessageManagerIds_Default {
        "ot-followups:message":{source:"slash"|"other",params:{message:OTFollowUpsMessageData},workers:"ot-followups:message"}
    }
    export interface ODEmbedManagerIds_Default {
        "ot-followups:embed":{source:"slash"|"other",params:{embed:OTFollowUpsEmbedData},workers:"ot-followups:embed"}
    }
    export interface ODPluginClassManagerIds_Default {
        "ot-followups:manager":OTFollowUpsManager
    }
    export interface ODEventIds_Default {
        "ot-followups:onMessagesLoad":api.ODEvent_Default<(messages:OTFollowUpsManager) => api.ODPromiseVoid>
        "ot-followups:afterMessagesLoaded":api.ODEvent_Default<(messages:OTFollowUpsManager) => api.ODPromiseVoid>
    }
}

//REGISTER PLUGIN CLASS
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
    classes.add(new OTFollowUpsManager(opendiscord.debug))
})

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((config) => {
    config.add(new api.ODJsonConfig("ot-followups:config","config.json","./plugins/ot-followups/"))
    config.add(new api.ODJsonConfig("ot-followups:messages","messages.json","./plugins/ot-followups/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const ticketFollowupsConfigStructure = new api.ODCheckerArrayStructure("ot-followups:config",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-followups:config",{children:[
        {key:"optionId",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:option-id",{custom:(checker,value,locationTrace,locationId,locationDocs) => {
            const lt = checker.locationTraceDeref(locationTrace)

            if (typeof value != "string") return false
            const uniqueArray: string[] = (checker.storage.get("openticket","option-ids") === null) ? [] : checker.storage.get("openticket","option-ids")

            if (uniqueArray.includes(value)){
                //exists
                return true
            }else{
                //doesn't exist
                checker.createMessage("opendiscord:id-non-existent","error",`The id "${value}" doesn't exist!`,lt,null,[`"${value}"`],locationId,locationDocs)
                return false
            }
        }})},
        {key:"messages",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UniqueIdArray("ot-followups:messages-ids","ot-followups","followup-ids","followup-ids-used",{allowDoubles:false,maxLength:5,allowedTypes:["string"]})},
    ]})})

    const ticketFollowupsMessageStructure = new api.ODCheckerArrayStructure("ot-followups:messages",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-followups:message",{children:[
        {key:"id",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UniqueId("ot-followups:message-id","ot-followups","followup-ids",{regex:/^[A-Za-z0-9-éèçàêâôûî]+$/,minLength:3,maxLength:40})},
        {key:"content",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:content",{maxLength:2000})},
        
        {key:"embed",optional:false,priority:0,checker:new api.ODCheckerEnabledObjectStructure("ot-followups:embed",{property:"enabled",enabledValue:true,checker:new api.ODCheckerObjectStructure("ot-followups:embed",{children:[
            {key:"enabled",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-followups:enabled",{})},
            {key:"title",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:title",{minLength:1,maxLength:256})},
            {key:"url",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-followups:url",true,{allowHttp:false})},
            {key:"description",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:description",{maxLength:4096})},
            {key:"customColor",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_HexColor("ot-followups:custom-color",true,true)},
        
            {key:"image",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-followups:image",true,{allowHttp:false,allowedExtensions:[".png",".jpg",".jpeg",".webp",".gif"]})},
            {key:"thumbnail",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-followups:thumbnail",true,{allowHttp:false,allowedExtensions:[".png",".jpg",".jpeg",".webp",".gif"]})},
            {key:"authorText",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:author-text",{maxLength:256})},
            {key:"authorImage",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-followups:author-image",true,{allowHttp:false,allowedExtensions:[".png",".jpg",".jpeg",".webp",".gif"]})},
            {key:"footerText",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:footer-text",{maxLength:2048})},
            {key:"footerImage",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-followups:footer-image",true,{allowHttp:false,allowedExtensions:[".png",".jpg",".jpeg",".webp",".gif"]})},
            
            {key:"timestamp",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-followups:timestamp",{})},
            {key:"fields",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-followups:fields",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-followups:field",{children:[
                {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:field-name",{minLength:1,maxLength:256})},
                {key:"value",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-followups:field-value",{minLength:1,maxLength:1024})},
                {key:"inline",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-followups:field-inline",{})}
            ]})})},
        ]})})},
        {key:"ping",optional:false,priority:0,checker:new api.ODCheckerObjectStructure("ot-followups:ping",{children:[
            {key:"@here",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-followups:ping-here",{})},
            {key:"@everyone",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-followups:ping-everyone",{})},
            {key:"custom",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-followups:ping-custom","role",[],{allowDoubles:false})},
        ]})}
    ]})})

    checkers.add(new api.ODChecker("ot-followups:messages",checkers.storage,1,opendiscord.configs.get("ot-followups:messages"),ticketFollowupsMessageStructure))
    checkers.add(new api.ODChecker("ot-followups:config",checkers.storage,0,opendiscord.configs.get("ot-followups:config"),ticketFollowupsConfigStructure))
})

//REGISTER BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("ot-followups:embed"))
    embeds.get("ot-followups:embed").workers.add(
        new api.ODWorker("ot-followups:embed",0,(instance,params,source,cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general")
            const {embed} = params

            if (embed.title) instance.setTitle(embed.title)
            if (embed.url) instance.setUrl(embed.url)
            instance.setColor(embed.customColor ? embed.customColor : generalConfig.data.mainColor)
            if (embed.description) instance.setDescription(embed.description)

            if (embed.image) instance.setImage(embed.image)
            if (embed.thumbnail) instance.setThumbnail(embed.thumbnail)
            if (embed.footerText) instance.setFooter(embed.footerText,(embed.footerImage) ? embed.footerImage : null)
            if (embed.authorText) instance.setAuthor(embed.authorText,(embed.authorImage) ? embed.authorImage : null)
                
            if (embed.timestamp) instance.setTimestamp(new Date())
            if (embed.fields.length > 0) instance.setFields(embed.fields)
        })
    )
})
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-followups:message"))
    messages.get("ot-followups:message").workers.add(
        new api.ODWorker("ot-followups:message",0,async (instance,params,source,cancel) => {
            const {message} = params

            if (message.embed.enabled) instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-followups:embed").build(source,{embed:message.embed}))

            const pings: string[] = []
            if (message.ping["@everyone"]) pings.push("@everyone")
            if (message.ping["@here"]) pings.push("@here")
            message.ping.custom.forEach((ping) => pings.push(discord.roleMention(ping)))
            const pingText = pings.length > 0 ? pings.join(" ") + "\n" : "";

            if (message.content !== "") instance.setContent(pingText + message.content)
            else if (pings.length > 0) instance.setContent(pingText)
        })
    )
})

//LOAD EMBEDS
opendiscord.events.get("afterBlacklistLoaded").listen(async () => {
    const followupsManager = opendiscord.plugins.classes.get("ot-followups:manager")
    const messagesConfig = opendiscord.configs.get("ot-followups:messages")

    opendiscord.log("Loading followup messages...","plugin")
    if (followupsManager.defaults.ticketFollowupsLoading){
        for (const msg of messagesConfig.data){
            followupsManager.add(new OTFollowUp(msg.id,msg))
        }
    }
    await opendiscord.events.get("ot-followups:onMessagesLoad").emit([followupsManager])
    await opendiscord.events.get("ot-followups:afterMessagesLoaded").emit([followupsManager])
});

//SEND FOLLOWUP MESSAGES
opendiscord.events.get("afterTicketMainMessageCreated").listen(async (ticket,message,channel,user) => {
    const config = opendiscord.configs.get("ot-followups:config")
    const followupsManager = opendiscord.plugins.classes.get("ot-followups:manager")

    const messages = config.data.find((c) => c.optionId === ticket.option.id.value)?.messages ?? []
    for (const messageId of messages){
        const followup = followupsManager.get(messageId)
        if (!followup) continue
        await channel.send((await opendiscord.builders.messages.getSafe("ot-followups:message").build("other",{message:followup.data})).message)
    }
})

//STARTUP SCREEN
opendiscord.events.get("onStartScreenLoad").listen((startscreen) => {
    const followupsManager = opendiscord.plugins.classes.get("ot-followups:manager")
    const stats = startscreen.get("opendiscord:stats")
    if (!stats) return

    //insert ticket followups startup info before "help" stat.
    const newProperties = [
        ...stats.properties.slice(0, 5),
        {key:"follow-ups",value:"loaded "+ansis.bold(followupsManager.getLength().toString())+" follow-up messages!",},
        ...stats.properties.slice(5),
    ]
    stats.properties = newProperties
})