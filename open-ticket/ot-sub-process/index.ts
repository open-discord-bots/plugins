import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-subprocess":api.ODPlugin
    }
}

//OVERWRITE CONFIG TO USE ENV 
opendiscord.events.get("afterConfigsInitiated").listen((configs) => {
    configs.get("opendiscord:general").data.tokenFromENV = true
})

//DISABLE SLASH COMMAND REMOVAL
opendiscord.sharedFuses.setFuse("allowSlashCommandRemoval",false)