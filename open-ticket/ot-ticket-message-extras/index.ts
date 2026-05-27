import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"

//DECLARATION
class OTTicketMessageExtrasConfig extends api.ODJsonConfig< {
    ticketCreatorPfpInThumbnail:boolean
}> {}
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-ticket-message-extras":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-ticket-message-extras:config": OTTicketMessageExtrasConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-ticket-message-extras:config": api.ODChecker
    }
}


//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTTicketMessageExtrasConfig("ot-ticket-message-extras:config","config.json","./plugins/ot-ticket-message-extras/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-ticket-message-extras:config")
    const structure = new api.ODCheckerObjectStructure("ot-ticket-message-extras:config",{children:[
        {key:"ticketCreatorPfpInThumbnail",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-feedback:ticket-creator-pfp-in-thumbnail",{})},
    ]})
    checkers.add(new api.ODChecker("ot-ticket-message-extras:config",checkers.storage,0,config,structure))
})

//FEATURE: ticketCreatorPfpInThumbnail
opendiscord.events.get("afterEmbedBuildersLoaded").listen((embeds) => {
    const config = opendiscord.configs.get("ot-ticket-message-extras:config")
    
    embeds.get("opendiscord:ticket-message").workers.add(new api.ODWorker("ot-ticket-message-extras:creator-pfp",1,(instance,params,origin,cancel) => {
        const {user} = params
        if (config.data.ticketCreatorPfpInThumbnail) instance.setThumbnail(user.displayAvatarURL())
    }))
})