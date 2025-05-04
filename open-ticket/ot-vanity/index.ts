import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-vanity":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-vanity:config":OTVanityConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-vanity:config":api.ODChecker
    }
    export interface ODPostManagerIds_Default {
        "ot-vanity:logs":api.ODPost<discord.GuildTextBasedChannel>|null
    }
    export interface ODFormattedJsonDatabaseIds_DefaultGlobal {
        "ot-vanity:vanity":{startDate:number,rankIds:string[]}
    }
    export interface ODMessageManagerIds_Default {
        "ot-vanity:added-message":{source:"presence-update"|"other",params:{member:discord.GuildMember,startDate:Date},workers:"ot-vanity:added-message"},
        "ot-vanity:removed-message":{source:"presence-update"|"other",params:{member:discord.GuildMember,startDate:Date,rankNames:string,endDate:Date},workers:"ot-vanity:removed-message"},
        "ot-vanity:upgrade-message":{source:"presence-update"|"other",params:{member:discord.GuildMember,startDate:Date,rankId:string,rankName:string,roles:string[]},workers:"ot-vanity:upgrade-message"},
    }
}

//REGISTER CONFIG
export class OTVanityConfig extends api.ODJsonConfig {
    declare data: {
        vanityText:string,
        caseSensitive:boolean,
        matchWholeText:boolean,
        
        _INFO:string,
        rewardRoles:string[],
        timedRewardRoles:{
            id:string,
            name:string,
            delayValue:number,
            delayUnit:"minutes"|"hours"|"days",
            roles:string[]
        }[]
        
        logs:{
            enabled:boolean,
            channel:string
        }
    }
}
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTVanityConfig("ot-vanity:config","config.json","./plugins/ot-vanity/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-vanity:config")
    checkers.add(new api.ODChecker("ot-vanity:config",checkers.storage,0,config,new api.ODCheckerObjectStructure("ot-vanity:config",{children:[
        {key:"vanityText",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-vanity:text",{minLength:3})},
        {key:"caseSensitive",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-vanity:case-sensitive",{})},
        {key:"matchWholeText",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-vanity:match-whole-text",{})},
        
        {key:"_INFO",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-vanity:info",{})},
        {key:"rewardRoles",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-vanity:reward-roles",{allowedTypes:["string"],propertyChecker:new api.ODCheckerCustomStructure_DiscordId("ot-vanity:role","role",false,[])})},
        {key:"timedRewardRoles",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-vanity:timed-reward-roles",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-vanity:timed-role",{children:[
            {key:"id",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UniqueId("ot-vanity:timed-id","ot-vanity","timed-id")},
            {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-vanity:timed-name",{minLength:1})},
            {key:"delayValue",optional:false,priority:0,checker:new api.ODCheckerNumberStructure("ot-vanity:delay-value",{min:1,max:365,floatAllowed:false,negativeAllowed:false,zeroAllowed:false})},
            {key:"delayUnit",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-vanity:delay-unit",{choices:["minutes","hours","days"]})},
            {key:"roles",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-vanity:roles",{allowedTypes:["string"],propertyChecker:new api.ODCheckerCustomStructure_DiscordId("ot-vanity:role","role",false,[])})},
        ]})})},
    ]})))
})

//ADD PRIVILEGED GATEWAY INTENTS + NORMAL INTENTS
opendiscord.events.get("onClientLoad").listen((clientManager) => {
    clientManager.privileges.push("Presence")
    clientManager.intents.push("GuildPresences")
})

//REGISTER LOG CHANNEL
opendiscord.events.get("onPostLoad").listen((posts) => {
    const config = opendiscord.configs.get("ot-vanity:config")
    if (config.data.logs.enabled) opendiscord.posts.add(new api.ODPost("ot-vanity:logs",config.data.logs.channel))
})

//REGISTER MESSAGES
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const config = opendiscord.configs.get("ot-vanity:config")

    messages.add(new api.ODMessage("ot-vanity:added-message"))
    messages.get("ot-vanity:added-message").workers.add(new api.ODWorker("ot-vanity:added-message",0,async (instance,params,source) => {
        instance.addEmbed(await (new api.ODQuickEmbed("ot-vanity:added-embed",{
            title:utilities.emojiTitle("📢","Vanity Status Activated"),
            description:discord.userMention(params.member.id)+" has added the vanity text `"+config.data.vanityText+"` to their profile.",
            thumbnail:params.member.displayAvatarURL(),
            authorText:params.member.displayName,
            authorImage:params.member.displayAvatarURL(),
            fields:[
                {name:"Rewards:",value:config.data.rewardRoles.map((r) => discord.roleMention(r)).join(", ")}
            ],
            color:generalConfig.data.mainColor
        })).build())
    }))

    messages.add(new api.ODMessage("ot-vanity:removed-message"))
    messages.get("ot-vanity:removed-message").workers.add(new api.ODWorker("ot-vanity:removed-message",0,async (instance,params,source) => {
        instance.addEmbed(await (new api.ODQuickEmbed("ot-vanity:removed-embed",{
            title:utilities.emojiTitle("📢","Vanity Status Deactivated"),
            description:discord.userMention(params.member.id)+" has removed the vanity text `"+config.data.vanityText+"` from their profile.\nAll rewarded roles will be removed.",
            thumbnail:params.member.displayAvatarURL(),
            authorText:params.member.displayName,
            authorImage:params.member.displayAvatarURL(),
            fields:[
                {name:"Time:",value:discord.time(params.startDate,"f")+" ("+Math.round((params.endDate.getTime()-params.startDate.getTime())/(60*1000))+" minutes)"},
                {name:"Ranks:",value:params.rankNames}
            ],
            color:generalConfig.data.mainColor
        })).build())
    }))

    messages.add(new api.ODMessage("ot-vanity:upgrade-message"))
    messages.get("ot-vanity:upgrade-message").workers.add(new api.ODWorker("ot-vanity:upgrade-message",0,async (instance,params,source) => {
        instance.addEmbed(await (new api.ODQuickEmbed("ot-vanity:upgrade-embed",{
            title:utilities.emojiTitle("📢","Vanity Status Upgraded"),
            description:discord.userMention(params.member.id)+" has reached the vanity rank `"+params.rankName+"`.",
            thumbnail:params.member.displayAvatarURL(),
            authorText:params.member.displayName,
            authorImage:params.member.displayAvatarURL(),
            fields:[
                {name:"Time:",value:discord.time(params.startDate,"f")+" ("+Math.round((new Date().getTime()-params.startDate.getTime())/(60*1000))+" minutes)"},
                {name:"Rewards:",value:params.roles.map((r) => discord.roleMention(r)).join(", ")},
            ],
            color:generalConfig.data.mainColor
        })).build())
    }))
})

export function getTimedRanksFromDate(roles:{id:string,name:string,delayValue:number,delayUnit:"minutes"|"hours"|"days",roles:string[]}[],startDate:Date){
    const milliseconds = new Date().getTime() - startDate.getTime()
    const roleList = roles.map((role) => ({
        id:role.id,
        name:role.name,
        roles:role.roles,
        ms:(role.delayUnit == "minutes" ? role.delayValue*60*1000 : (role.delayUnit == "hours") ? role.delayValue*3600*1000 : role.delayValue*24*3600*1000)
    }))

    return roleList.filter((role) => role.ms < milliseconds)
}

//START LISTENING FOR PRESENCE UPDATES
opendiscord.events.get("onReadyForUsage").listen(() => {
    const config = opendiscord.configs.get("ot-vanity:config")
    const globalDatabase = opendiscord.databases.get("opendiscord:global")
    const logChannel = opendiscord.posts.get("ot-vanity:logs")
    const {client} = opendiscord.client
    const mainServer = opendiscord.client.mainServer
    if (!mainServer) return

    client.on("presenceUpdate",async (oldStatus,newStatus) => {
        newStatus.activities.forEach(async (activity) => {
            if (activity.state === null) return

            const member = newStatus.member
            if (!member) return opendiscord.log("Unable to detect presence update. Member not found in server!","error")
            
            if (activity.type == discord.ActivityType.Custom){
                const state = config.data.caseSensitive ? activity.state : activity.state.toLowerCase()
                const text = config.data.caseSensitive ? config.data.vanityText : config.data.vanityText.toLowerCase()

                if (config.data.matchWholeText ? state == text : state.includes(text)){
                    //vanity is activated
                    const startDate = new Date()
                    globalDatabase.set("ot-vanity:vanity",member.id,{startDate:startDate.getTime(),rankIds:[]})
                    for (const roleId of config.data.rewardRoles){
                        try{
                            await member.roles.add(roleId)
                        }catch{}
                    }
                    opendiscord.log(member.displayName+" activated vanity in their profile status!","plugin",[
                        {key:"userid",value:member.id,hidden:true},
                        {key:"user",value:member.user.username},
                    ])
                    if (logChannel) await logChannel.send(await opendiscord.builders.messages.get("ot-vanity:added-message").build("presence-update",{member,startDate}))
                }else{
                    //vanity is deactivated
                    const vanityData = await globalDatabase.get("ot-vanity:vanity",member.id)
                    await globalDatabase.delete("ot-vanity:vanity",member.id)
                    const startDate = vanityData ? new Date(vanityData.startDate) : new Date()
                    const endDate = new Date()
                    const rankNames = (vanityData && vanityData.rankIds.length > 0) ? "- "+vanityData.rankIds.map((r) => config.data.timedRewardRoles.find((tr) => tr.id == r)?.name ?? "<unknown-rank>").join("\n- ") : "/"

                    const roleIds = [...config.data.rewardRoles,...config.data.timedRewardRoles.map((r) => r.roles).flat()]
                    for (const roleId of roleIds){
                        try{
                            await member.roles.remove(roleId)
                        }catch{}
                    }
                    opendiscord.log(member.displayName+" deactivated vanity in their profile status!","plugin",[
                        {key:"userid",value:member.id,hidden:true},
                        {key:"user",value:member.user.username},
                    ])
                    if (logChannel) await logChannel.send(await opendiscord.builders.messages.get("ot-vanity:removed-message").build("presence-update",{member,startDate,endDate,rankNames}))
                }
            }
        })
        if (newStatus.activities.length < 1){
            //vanity is deactivated (removed status)
            const member = newStatus.member
            if (!member) return opendiscord.log("Unable to detect presence update. Member not found in server!","error")
            
            const vanityData = await globalDatabase.get("ot-vanity:vanity",member.id)
            await globalDatabase.delete("ot-vanity:vanity",member.id)
            const startDate = vanityData ? new Date(vanityData.startDate) : new Date()
            const endDate = new Date()
            const rankNames = (vanityData && vanityData.rankIds.length > 0) ? "- "+vanityData.rankIds.map((r) => config.data.timedRewardRoles.find((tr) => tr.id == r)?.name ?? "<unknown-rank>").join("\n- ") : "/"

            const roleIds = [...config.data.rewardRoles,...config.data.timedRewardRoles.map((r) => r.roles).flat()]
            for (const roleId of roleIds){
                try{
                    await member.roles.remove(roleId)
                }catch{}
            }
            opendiscord.log(member.displayName+" deactivated vanity in their profile status!","plugin",[
                {key:"userid",value:member.id,hidden:true},
                {key:"user",value:member.user.username},
            ])
            if (logChannel) await logChannel.send(await opendiscord.builders.messages.get("ot-vanity:removed-message").build("presence-update",{member,startDate,endDate,rankNames}))   
        }
    })

    //DETECT TIMED REWARD ROLES
    setInterval(async () => {
        const vanityUsers = await globalDatabase.getCategory("ot-vanity:vanity")
        if (!vanityUsers) return

        for (const vanity of vanityUsers){
            const vanityData = vanity.value
            const member = await opendiscord.client.fetchGuildMember(mainServer,vanity.key)
            if (member){
                const rawRanks = getTimedRanksFromDate(config.data.timedRewardRoles,new Date(vanityData.startDate))
                const ranks = rawRanks.filter((r) => !vanityData.rankIds.includes(r.id))
                
                vanityData.rankIds.push(...ranks.map((r) => r.id))
                globalDatabase.set("ot-vanity:vanity",member.id,vanityData)

                for (const roleId of ranks.map((r) => r.roles).flat()){
                    try{
                        await member.roles.add(roleId)
                    }catch{}
                }
                if (ranks.length > 0) opendiscord.log(member.displayName+" has reached a new vanity rank!","plugin",[
                    {key:"userid",value:member.id,hidden:true},
                    {key:"user",value:member.user.username},
                    {key:"ranks",value:ranks.map((r) => r.id).join(", ")},
                ])
                for (const rank of ranks){
                    if (logChannel) await logChannel.send(await opendiscord.builders.messages.get("ot-vanity:upgrade-message").build("presence-update",{member,startDate:new Date(vanityData.startDate),rankId:rank.id,rankName:rank.name,roles:rank.roles}))
                }
            }
        }

    },60*1000) //1 minute
})