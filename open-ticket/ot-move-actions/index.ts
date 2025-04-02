import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
class OTMoveActionsConfig extends api.ODJsonConfig {
    declare data: {
        unclaimOnMove:boolean,
        unpinOnMove:boolean,
        unclaimOnCategoryChange:boolean,
        unpinOnCategoryChange:boolean,
    }
}
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-move-actions":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-move-actions:config": OTMoveActionsConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-move-actions:config": api.ODChecker
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTMoveActionsConfig("ot-move-actions:config","config.json","./plugins/ot-move-actions/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-move-actions:config")
    checkers.add(new api.ODChecker("ot-move-actions:config",checkers.storage,0,config,new api.ODCheckerObjectStructure("ot-move-actions:config",{children:[
        {key:"unclaimOnMove",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-move-actions:unclaim-on-move",{})},
        {key:"unpinOnMove",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-move-actions:unpin-on-move",{})},
        {key:"unclaimOnCategoryChange",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-move-actions:unclaim-on-category-change",{})},
        {key:"unpinOnCategoryChange",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-move-actions:unpin-on-category-change",{})}
    ]})))
})

//TRIGGER AFTER TICKET MOVED
opendiscord.events.get("afterTicketMoved").listen((ticket,mover,channel,reason) => {
    const config = opendiscord.configs.get("ot-move-actions:config")

    //unclaim ticket
    if (config.data.unclaimOnMove && ticket.get("opendiscord:claimed").value){
        opendiscord.actions.get("opendiscord:unclaim-ticket").run("other",{guild:channel.guild,channel,user:mover,ticket,reason:"Auto Unclaim (Ticket Moved)",sendMessage:true})
    }

    //unpin ticket
    if (config.data.unpinOnMove && ticket.get("opendiscord:pinned").value){
        opendiscord.actions.get("opendiscord:unpin-ticket").run("other",{guild:channel.guild,channel,user:mover,ticket,reason:"Auto Unpin (Ticket Moved)",sendMessage:true})
    }
})

//TRIGGER ON TICKET CHANNEL MOVED
opendiscord.events.get("onClientReady").listen((client) => {
    const config = opendiscord.configs.get("ot-move-actions:config")
    
    client.client.on("channelUpdate",(oldChannel,newChannel) => {
        if (oldChannel.isDMBased() || newChannel.isDMBased() || !newChannel.isTextBased()) return

        //ticket has been moved to another category
        const ticket = opendiscord.tickets.get(newChannel.id)
        if (ticket && oldChannel.parentId !== newChannel.parentId){
            
            //unclaim ticket
            if (config.data.unclaimOnCategoryChange && ticket.get("opendiscord:claimed").value){
                opendiscord.actions.get("opendiscord:unclaim-ticket").run("other",{guild:newChannel.guild,channel:newChannel,user:client.client.user,ticket,reason:"Auto Unclaim (Category Change)",sendMessage:true,allowCategoryChange:false})
            }

            //unpin ticket
            if (config.data.unpinOnCategoryChange && ticket.get("opendiscord:pinned").value){
                opendiscord.actions.get("opendiscord:unpin-ticket").run("other",{guild:newChannel.guild,channel:newChannel,user:client.client.user,ticket,reason:"Auto Unpin (Category Change)",sendMessage:true})
            }
        }
    })
})