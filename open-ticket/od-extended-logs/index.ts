import {api, opendiscord, utilities} from "#opendiscord"
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "od-extended-logs": api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "od-extended-logs:config":ExtendedLogsConfig
    }
    export interface ODCheckerManagerIds_Default {
        "od-extended-logs:config": api.ODChecker
    }
    export interface ODMessageManagerIds_Default {
        "od-extended-logs:msg":{source:"source",params:{msg:string},workers:"od-extended-logs:msg"},
    }
}

class ExtendedLogsConfig extends api.ODJsonConfig {
    declare data: {
        addtimestamp:boolean,
        channel: string
    }
}

const orgConsoleLog = console.log.bind(console);
const orgOpendiscordLog = opendiscord.console.log.bind(opendiscord.console);
const getDate = (): string => new Date().toISOString().slice(0, 23).replace('T', ' ');

opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new ExtendedLogsConfig("od-extended-logs:config","config.json","./plugins/od-extended-logs/"))
})

opendiscord.events.get("onPostLoad").listen(() => {
    const config = opendiscord.configs.get("od-extended-logs:config").data
    if (config.channel.length >= 6) opendiscord.posts.add(new api.ODPost("od-extended-logs:channel",config.channel));
});

opendiscord.events.get("onMessageBuilderLoad").listen((messages,builders) => {
    messages.add(new api.ODMessage("od-extended-logs:msg"))
    messages.get("od-extended-logs:msg").workers.add(new api.ODWorker("od-extended-logs:msg",0,(i,p,s) => {
        i.setContent(p.msg.slice(1,-1).replace( /\\u001b\[[0-9;]*m/g, ''));
    }))
});

opendiscord.events.get("onReadyForUsage").listen(async () => {
    opendiscord.console.log = (message, type?, params?) => {
        const config = opendiscord.configs.get("od-extended-logs:config").data
        if (config.addtimestamp) {
            orgOpendiscordLog(`[${getDate()}] `+message, type, params);
            return;
        }
        orgOpendiscordLog(message, type, params);
    };
    console.log = async (...args: any[]) => {
        const logChannel = opendiscord.posts.get("od-extended-logs:channel");
        if (logChannel) logChannel.send(await opendiscord.builders.messages.getSafe("od-extended-logs:msg").build("source",{msg:args.map(arg => JSON.stringify(arg)).join(' ')}))
        await orgConsoleLog(...args);
    };
})