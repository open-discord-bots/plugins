import {api, opendiscord, utilities} from "#opendiscord"

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-no-slash-clear":api.ODPlugin
    }
}

//DISABLE SLASH COMMAND REMOVAL
opendiscord.sharedFuses.setFuse("allowSlashCommandRemoval",false)

//Yep, this is everything this plugin does :)