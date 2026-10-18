import { api, opendiscord, utilities } from "#opendiscord"

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-rename-keep-prefix":api.ODPlugin
    }
}

//REGISTER WORKER
opendiscord.events.get("afterActionsLoaded").listen((actions) => {
    //get ticket rename action
    //add new worker with priority 3 (above default ones)
    actions.get("opendiscord:rename-ticket").workers.add(new api.ODWorker("ot-rename-keep-prefix:keep", 3, (instance, params, source, cancel) => {
        //get ticket prefix
        const prefix = params.ticket.option.get("opendiscord:channel-prefix").value
        //update data before rename workers are executed
        params.data = prefix + params.data
    }))
})

//UPDATE REPLY EMBED
opendiscord.events.get("afterEmbedBuildersLoaded").listen((embeds) => {
    //get ticket rename embed
    //add new worker with priority 1 (above default ones)
    embeds.get("opendiscord:rename-message").workers.add(new api.ODWorker("opendiscord:channel-prefix", 1, (instance, params, source, cancel) => {
        //get ticket prefix
        const prefix = params.ticket.option.get("opendiscord:channel-prefix").value

        //rewrite the embed description with the updated data
        const data = prefix + params.data
        instance.setDescription(opendiscord.languages.getTranslationWithParams("actions.descriptions.rename", ["`#" + data + "`"]))
    }))
})