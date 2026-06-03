import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"

//DECLARATIONS
interface OTCustomPriority {
    id:string,
    level:number,
    name:string,
    displayEmoji:string,
    channelEmoji:string
}
class OTCustomPrioritiesConfig extends api.ODJsonCommentsConfig<{
    defaultPriorities:{
        disableUrgent:boolean,
        disableVeryHigh:boolean,
        disableHigh:boolean,
        disableNormal:boolean,
        disableLow:boolean,
        disableVeryLow:boolean
    },
    customPriorities:{
        enabled:boolean,
        levels:OTCustomPriority[]
    }
}> {}
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-custom-priorities":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-custom-priorities:config":OTCustomPrioritiesConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-custom-priorities:config":api.ODChecker
    }
    export interface ODCheckerFunctionManagerIdMappings {
        "ot-custom-priorities:check-priority-levels":api.ODCheckerFunction
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen(() => {
    opendiscord.configs.add(new OTCustomPrioritiesConfig("ot-custom-priorities:config","config.jsonc","./plugins/ot-custom-priorities/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen(() => {
    const config = opendiscord.configs.get("ot-custom-priorities:config")
    opendiscord.checkers.add(new api.ODChecker("ot-custom-priorities:config",opendiscord.checkers.storage,-1,config,new api.ODCheckerObjectStructure("ot-custom-priorities:config",{cliDisplayName:"Custom Priorities Config",cliDisplayDescription:"Create or customise priority levels including name and emoji.",children:[
        {key:"defaultPriorities",checker:new api.ODCheckerObjectStructure("ot-custom-priorities:default-priorities",{children:[
            {key:"disableUrgent",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-urgent",{cliDisplayName:"Disable built-in 'Urgent' priority level."})},
            {key:"disableVeryHigh",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-very-high",{cliDisplayName:"Disable built-in 'Very High' priority level."})},
            {key:"disableHigh",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-high",{cliDisplayName:"Disable built-in 'High' priority level."})},
            {key:"disableNormal",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-normal",{cliDisplayName:"Disable built-in 'Normal' priority level."})},
            {key:"disableLow",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-low",{cliDisplayName:"Disable built-in 'Urgent' Low level."})},
            {key:"disableVeryLow",checker:new api.ODCheckerBooleanStructure("ot-custom-priorities:disable-very-low",{cliDisplayName:"Disable built-in 'Very Low' priority level."})},
        ],cliDisplayName:"Default Priorities",cliDisplayDescription:"Disable built-in priority levels. They can be replaced with custom priorities."})},
        
        {key:"customPriorities",checker:new api.ODCheckerEnabledObjectStructure("ot-custom-priorities:custom-priorities",{property:"enabled",enabledValue:true,ignoreCheckIfDisabled:true,checker:new api.ODCheckerObjectStructure("ot-custom-priorities:custom-priorities",{children:[
            {key:"levels",checker:new api.ODCheckerArrayStructure("ot-custom-priorities:levels",{
                allowedTypes:["object"],
                cliDisplayName:"Priority Levels",
                cliDisplayDescription:"Create custom priority levels.",
                cliDisplayPropertyName:"priority level",
                propertyChecker:new api.ODCheckerObjectStructure("ot-custom-priorities:custom-priority",{children:[
                    {key:"id",checker:new api.ODCheckerCustomStructure_UniqueId("ot-custom-priorities:id","ot-custom-priorities","custom-priority",{regex:/^[A-Za-z0-9-éèçàêâôûî]+$/,minLength:3,maxLength:40,cliDisplayName:"Id",cliDisplayDescription:"The id of this custom priority."})},
                    {key:"level",checker:new api.ODCheckerNumberStructure("ot-custom-priorities:level",{floatAllowed:false,negativeAllowed:false,zeroAllowed:true,cliDisplayName:"Level",cliDisplayDescription:"Higher levels are higher priorities and will be ranked higher."})},
                    {key:"name",checker:new api.ODCheckerStringStructure("ot-custom-priorities:name",{minLength:1,maxLength:100,cliDisplayName:"Name",cliDisplayDescription:"The name of this priority level."})},
                    {key:"displayEmoji",checker:new api.ODCheckerCustomStructure_EmojiString("ot-custom-priorities:display-emoji",0,1,false,{cliDisplayName:"Display Emoji",cliDisplayDescription:"Optional emoji of this priority level shown in embeds and dropdowns."})},
                    {key:"channelEmoji",checker:new api.ODCheckerCustomStructure_EmojiString("ot-custom-priorities:channel-emoji",0,1,false,{cliDisplayName:"Channel Emoji",cliDisplayDescription:"Optional emoji to be shown in the channel name."})},
                ],cliDisplayName:"Custom Priority Level",cliDisplayDescription:"A custom priority level."})
            })}
        ],cliDisplayName:"Custom Priorities",cliDisplayDescription:"Create custom priority levels."}),cliDisplayName:"Custom Priorities",cliDisplayDescription:"Create custom priority levels."})},
    ]}),{cliDisplayName:"Custom Priorities Config",cliDisplayDescription:"Create or customise priority levels including name and emoji."}))
})

//REGISTER CONFIG CHECKER FUNCTIONS (additional checks)
opendiscord.events.get("onCheckerFunctionLoad").listen((functions) => {
    const config = opendiscord.configs.get("ot-custom-priorities:config")
    functions.add(new api.ODCheckerFunction("ot-custom-priorities:check-priority-levels",(checkers,functions) => {
        const usedLevels: Set<number> = new Set()
        
        if (!config.data?.defaultPriorities?.disableUrgent) usedLevels.add(5)
        if (!config.data?.defaultPriorities?.disableVeryHigh) usedLevels.add(4)
        if (!config.data?.defaultPriorities?.disableHigh) usedLevels.add(3)
        if (!config.data?.defaultPriorities?.disableNormal) usedLevels.add(2)
        if (!config.data?.defaultPriorities?.disableLow) usedLevels.add(1)
        if (!config.data?.defaultPriorities?.disableVeryLow) usedLevels.add(0)

        if (!config.data.customPriorities.enabled) return {valid:true,messages:[]}
        if (!Array.isArray(config.data.customPriorities.levels)) return {valid:false,messages:[]}

        const messages: api.ODCheckerMessage[] = []
        let valid: boolean = true
        let i = 0;
        for (const customPrio of config.data.customPriorities.levels){
            if (typeof customPrio.level !== "number"){
                i++
                continue
            }
            if (usedLevels.has(customPrio.level)){
                messages.push(functions.createMessage("ot-custom-priorities:config","ot-custom-priorities:duplicate-priority-levels",config.path,"error",`The priority level "${customPrio.level}" is already used by another priority level!`,["customPriorities","levels",i,"level"],null,[`"${customPrio.level}"`],new api.ODId("ot-custom-priorities:duplicate-priority-levels"),null))
                valid = false
            }else usedLevels.add(customPrio.level)
            i++
        }
        return {valid,messages}
    }))
})

//REGISTER NEW PRIORITIES
opendiscord.events.get("onPriorityLoad").listen((priorities) => {
    const config = opendiscord.configs.get("ot-custom-priorities:config")
    if (!config.data.customPriorities.enabled) return
    for (const customPrio of config.data.customPriorities.levels){
        const channelEmoji = customPrio.channelEmoji ? customPrio.channelEmoji : null
        const displayEmoji = customPrio.displayEmoji ? customPrio.displayEmoji : null
        priorities.add(new api.ODPriorityLevel("ot-custom-priorities:"+customPrio.id,customPrio.level,customPrio.id,customPrio.name,displayEmoji,channelEmoji))
    }
})

//MODIFY EXISTING PRIORITIES
opendiscord.events.get("afterPrioritiesLoaded").listen((priorities) => {
    const config = opendiscord.configs.get("ot-custom-priorities:config")
    if (config.data.defaultPriorities.disableUrgent) priorities.remove("opendiscord:urgent")
    if (config.data.defaultPriorities.disableVeryHigh) priorities.remove("opendiscord:very-high")
    if (config.data.defaultPriorities.disableHigh) priorities.remove("opendiscord:high")
    if (config.data.defaultPriorities.disableNormal) priorities.remove("opendiscord:normal")
    if (config.data.defaultPriorities.disableLow) priorities.remove("opendiscord:low")
    if (config.data.defaultPriorities.disableVeryLow) priorities.remove("opendiscord:very-low")
})