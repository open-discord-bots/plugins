import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"

//DECLARATIONS
interface OTAdvancedCategory {
    optionId:string,
    closedCategory:{
        enabled:boolean,
        categoryId:string
    },
    backupCategory:{
        enabled:boolean,
        categoryId:string
    },
    claimedCategories:{user:string,category:string}[]
}
class OTAdvancedCategoriesConfig extends api.ODJsonCommentsConfig<OTAdvancedCategory[]> {}
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-advanced-categories":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-advanced-categories:config":OTAdvancedCategoriesConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-advanced-categories:config":api.ODChecker
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen(() => {
    opendiscord.configs.add(new OTAdvancedCategoriesConfig("ot-advanced-categories:config","config.jsonc","./plugins/ot-advanced-categories/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen(() => {
    const config = opendiscord.configs.get("ot-advanced-categories:config")
    opendiscord.checkers.add(new api.ODChecker("ot-advanced-categories:config",opendiscord.checkers.storage,-1,config,new api.ODCheckerArrayStructure("ot-advanced-categories:config",{
        allowedTypes:["object"],
        cliDisplayName:"Advanced Categories",
        cliDisplayDescription:"Add custom category settings for a individual ticket options.",
        cliDisplayPropertyName:"advanced category",
        propertyChecker:new api.ODCheckerObjectStructure("ot-advanced-categories:category",{children:[
            {key:"optionId",checker:new api.ODCheckerStringStructure("ot-advanced-categories:option-id",{custom:(checker,value,locationTrace,locationId,locationDocs) => {
                const lt = checker.locationTraceDeref(locationTrace)
                if (typeof value != "string") return false
                
                const optionList: string[] = (checker.storage.get("openticket","option-ids") === null) ? [] : checker.storage.get("openticket","option-ids")
                if (optionList.includes(value)){
                    //exists
                    return true
                }else{
                    //doesn't exist
                    checker.createMessage("ot-advanced-categories:id-non-existent","error",`The ticket option id "${value}" doesn't exist anywhere.`,lt,null,[`"${value}"`],locationId,locationDocs)
                    return false
                }
            }})},
            {key:"closedCategory",checker:new api.ODCheckerEnabledObjectStructure("ot-advanced-categories:closed-category",{property:"enabled",enabledValue:true,ignoreCheckIfDisabled:true,checker:new api.ODCheckerObjectStructure("ot-advanced-categories:closed-category",{children:[
                {key:"enabled",checker:new api.ODCheckerBooleanStructure("ot-advanced-categories:closed-category-enabled",{cliDisplayName:"Enabled",cliDisplayDescription:"Enable/disable closed category."})},
                {key:"categoryId",checker:new api.ODCheckerCustomStructure_DiscordId("ot-advanced-categories:closed-category","category",true,[],{cliDisplayName:"Closed Category",cliDisplayDescription:"An additional category where tickets will be moved to when closed."})},
            ],cliDisplayName:"Closed Category",cliDisplayDescription:"An additional category where tickets will be moved to when closed."}),cliDisplayName:"Closed Category",cliDisplayDescription:"An additional category where tickets will be moved to when closed."})},
            
            {key:"backupCategory",checker:new api.ODCheckerEnabledObjectStructure("ot-advanced-categories:backup-category",{property:"enabled",enabledValue:true,ignoreCheckIfDisabled:true,checker:new api.ODCheckerObjectStructure("ot-advanced-categories:backup-category",{children:[
                {key:"enabled",checker:new api.ODCheckerBooleanStructure("ot-advanced-categories:backup-category-enabled",{cliDisplayName:"Enabled",cliDisplayDescription:"Enable/disable backup category."})},
                {key:"categoryId",checker:new api.ODCheckerCustomStructure_DiscordId("ot-advanced-categories:backup-category","category",true,[],{cliDisplayName:"Backup Category",cliDisplayDescription:"An additional category where tickets will be created in when the original category is full (50 channels)."})},
            ],cliDisplayName:"Backup Category",cliDisplayDescription:"An additional category where tickets will be created in when the original category is full (50 channels)."}),cliDisplayName:"Backup Category",cliDisplayDescription:"An additional category where tickets will be created in when the original category is full (50 channels)."})},
            
            {key:"claimedCategories",checker:new api.ODCheckerArrayStructure("ot-advanced-categories:claimed-categories",{allowDoubles:false,allowedTypes:["object"],cliDisplayPropertyName:"claim category",propertyChecker:new api.ODCheckerObjectStructure("ot-advanced-categories:claimed-category",{children:[
                {key:"user",checker:new api.ODCheckerCustomStructure_DiscordId("ot-advanced-categories:claimed-user","user",false,[],{cliDisplayName:"User",cliDisplayDescription:"The discord user ID of a ticket claimer."})},
                {key:"category",checker:new api.ODCheckerCustomStructure_DiscordId("ot-advanced-categories:claimed-category","category",false,[],{cliDisplayName:"Category",cliDisplayDescription:"The discord category ID to move the ticket to."})}
            ],cliDisplayName:"Claimed Category",cliDisplayDescription:"Move claimed tickets to the matching channel category of the user that claimed the ticket.",cliDisplayKeyInParentArray:"user",cliDisplayAdditionalKeysInParentArray:["user","category"]}),cliDisplayName:"Claimed Categories",cliDisplayDescription:"Move claimed tickets to the matching channel category of the user that claimed the ticket."})},
        ],cliDisplayName:"Advanced Category",cliDisplayDescription:"Custom category settings for a single ticket option.",})
    })))
})

opendiscord.events.get("afterActionsLoaded").listen((actions) => {
    const config = opendiscord.configs.get("ot-advanced-categories:config")
    actions.get("opendiscord:calculate-ticket-category").workers.add([
        new api.ODWorker("ot-advanced-categories:close-category",-1,async (instance,params,origin,cancel) => {
            //handle close category for individual options
            const {guild,user,channel,option,ticket,currentCategoryId} = params
            if (!ticket) return
            if (!ticket.get("opendiscord:closed").value) return
            const advancedCategory = config.data.find((ac) => ac.optionId === option.id.value)
            if (!advancedCategory || !advancedCategory.closedCategory.enabled) return

            const closeCategoryId = advancedCategory.closedCategory.categoryId
            if (!closeCategoryId) return
            const closeCategory = await opendiscord.client.fetchGuildCategoryChannel(guild,closeCategoryId)
            if (closeCategory){
                //close category is enabled
                instance.newCategoryId = closeCategoryId
                instance.newCategoryMode = "close"
                instance.newCategory = closeCategory
                instance.shouldChangeCategory = (instance.newCategoryId !== currentCategoryId)
            }else{
                //close category is not found (do not switch categories)
                opendiscord.log("Unable to find ticket category '"+closeCategoryId+"' #2","error",[
                    {key:"categoryid",value:closeCategoryId},
                    {key:"type",value:"close"}
                ])
                instance.newCategoryId = null
                instance.newCategoryMode = null
                instance.newCategory = null
                instance.shouldChangeCategory = false
            }
        }),
        new api.ODWorker("ot-advanced-categories:claim-category",-2,async (instance,params,origin,cancel) => {
            //handle claim category for individual options
            const {guild,user,channel,option,ticket,currentCategoryId} = params
            if (!ticket) return
            if (!ticket.get("opendiscord:claimed").value) return
            const advancedCategory = config.data.find((ac) => ac.optionId === option.id.value)
            if (!advancedCategory || advancedCategory.claimedCategories.length == 0) return

            const claimedCategoryIds = advancedCategory.claimedCategories
            const claimCategoryId = claimedCategoryIds.find((c) => c.user == user.id)?.category
            if (!claimCategoryId) return
            const claimCategory = await opendiscord.client.fetchGuildCategoryChannel(guild,claimCategoryId)
            if (claimCategory){
                //claim category is enabled
                instance.newCategoryId = claimCategoryId
                instance.newCategoryMode = "claim"
                instance.newCategory = claimCategory
                instance.shouldChangeCategory = (instance.newCategoryId !== currentCategoryId)
            }else{
                //claim category is not found (do not switch categories)
                opendiscord.log("Unable to find ticket category '"+claimCategoryId+"' #3","error",[
                    {key:"categoryid",value:claimCategoryId},
                    {key:"type",value:"claim"}
                ])
                instance.newCategoryId = null
                instance.newCategoryMode = null
                instance.newCategory = null
                instance.shouldChangeCategory = false
            }
        }),
        new api.ODWorker("ot-advanced-categories:backup-category",-200,async (instance,params,origin,cancel) => {
            //handle backup category
            const {guild,user,channel,option,ticket,currentCategoryId} = params
            if (!instance.newCategory || !instance.newCategoryId || !instance.shouldChangeCategory) return
            if (instance.newCategory.children.cache.size < 50) return
            const advancedCategory = config.data.find((ac) => ac.optionId === option.id.value)
            if (!advancedCategory || !advancedCategory.backupCategory.enabled) return

            const backupCategoryId = advancedCategory.backupCategory.categoryId
            if (!backupCategoryId) return
            const backupCategory = await opendiscord.client.fetchGuildCategoryChannel(guild,backupCategoryId)
            if (backupCategory){
                //backup category is enabled
                instance.newCategoryId = backupCategoryId
                instance.newCategoryMode = "backup"
                instance.newCategory = backupCategory
                instance.shouldChangeCategory = (instance.newCategoryId !== currentCategoryId)
            }else{
                //backup category is not found (do not switch categories)
                opendiscord.log("Unable to find ticket category '"+backupCategoryId+"' #4","error",[
                    {key:"categoryid",value:backupCategoryId},
                    {key:"type",value:"backup"}
                ])
                instance.newCategoryId = null
                instance.newCategoryMode = null
                instance.newCategory = null
                instance.shouldChangeCategory = false
            }
        })
    ])
})