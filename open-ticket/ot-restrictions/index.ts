import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
import ansis from "ansis"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
export interface OTRestrictionData {
    optionId:string,
    enableWhitelist:boolean,
    whitelistedRoles:string[],
    enableBlacklist:boolean,
    blacklistedRoles:string[]
}
export class OTRestrictionsConfig extends api.ODJsonConfig {
    declare data: {
        priority:"whitelist"|"blacklist",
        restrictions:OTRestrictionData[]
    }
}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-restrictions":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-restrictions:config":OTRestrictionsConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-restrictions:config":api.ODChecker
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((config) => {
    config.add(new api.ODJsonConfig("ot-restrictions:config","config.json","./plugins/ot-restrictions/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    checkers.add(new api.ODChecker("ot-restrictions:config",checkers.storage,0,opendiscord.configs.get("ot-restrictions:config"),new api.ODCheckerObjectStructure("ot-restrictions:config",{children:[
        {key:"priority",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-restrictions:priority",{choices:["whitelist","blacklist"]})},
        {key:"restrictions",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-restrictions:restrictions",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-restrictions:restriction",{children:[
            {key:"optionId",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-restrictions:option-id",{custom:(checker,value,locationTrace,locationId,locationDocs) => {
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
            {key:"enableWhitelist",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-restrictions:enable-whitelist",{})},
            {key:"whitelistedRoles",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-restrictions:whitelist-roles","role",[],{allowDoubles:false,allowedTypes:["string"]})},
            {key:"enableBlacklist",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-restrictions:enable-blacklist",{})},
            {key:"blacklistedRoles",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-restrictions:blacklist-roles","role",[],{allowDoubles:false,allowedTypes:["string"]})},
        ]})})}
    ]})))
})

function determineAllowedAccess(priority:"whitelist"|"blacklist",enableBlacklist:boolean,enableWhitelist:boolean,isBlacklisted:boolean|null,isWhitelisted:boolean|null): boolean {
    if (!enableBlacklist && isWhitelisted !== null){
        //blacklist is disabled, whitelist must be enabled
        return isWhitelisted ? true : false
    }
    if (!enableWhitelist && isBlacklisted !== null){
        //whitelist is disabled, blacklist must be enabled
        return isBlacklisted ? false : true
    }

    //multi processing
    if (priority == "blacklist"){
        if (isBlacklisted) return false
        else if (isWhitelisted) return true
        else return false
    }else{
        if (isWhitelisted) return true
        else if (isBlacklisted) return false
        else return false
    }
}

//REGISTER WHITE/BLACKLIST CHECKER
opendiscord.events.get("afterActionsLoaded").listen(async (actions) => {
    const restrictionConfig = opendiscord.configs.get("ot-restrictions:config")

    actions.get("opendiscord:create-ticket-permissions").workers.add([
        new api.ODWorker("ot-restrictions:check",5,async (instance,params,source,cancel) => {
            const {option,user,guild} = params
            const restriction = restrictionConfig.data.restrictions.find((r) => r.optionId === option.id.value)
            if (!restriction || (!restriction.enableBlacklist && !restriction.enableWhitelist)) return
            
            //null == not applied
            let isBlacklisted: null|boolean = null
            let isWhitelisted: null|boolean = null

            //check blacklist
            if (restriction.enableBlacklist){
                for (const roleId of restriction.blacklistedRoles){
                    const role = await opendiscord.client.fetchGuildRole(guild,roleId)
                    if (!role) continue
                    if (role.members.has(user.id)) isBlacklisted = true
                }
                if (isBlacklisted === null) isBlacklisted = false
            }

            //check whitelist
            if (restriction.enableWhitelist){
                for (const roleId of restriction.whitelistedRoles){
                    const role = await opendiscord.client.fetchGuildRole(guild,roleId)
                    if (!role) continue
                    if (role.members.has(user.id)) isWhitelisted = true
                }
                if (isWhitelisted === null) isWhitelisted = false
            }

            //compare and use priority
            const accessAllowed = determineAllowedAccess(restrictionConfig.data.priority,restriction.enableBlacklist,restriction.enableWhitelist,isBlacklisted,isWhitelisted)
            if (!accessAllowed){
                instance.valid = false
                instance.reason = "custom" 
                instance.customReason = "You don't have the correct roles to create this ticket."
                opendiscord.log(params.user.displayName+" tried to create a ticket but is restricted!","info",[
                    {key:"user",value:params.user.username},
                    {key:"userid",value:params.user.id,hidden:true},
                    {key:"option",value:params.option.id.value},
                    {key:"isWhitelisted",value:(isWhitelisted ?? "/").toString()},
                    {key:"isBlacklisted",value:(isBlacklisted ?? "/").toString()},
                ])
                return cancel()
            }
        }),
    ])
})