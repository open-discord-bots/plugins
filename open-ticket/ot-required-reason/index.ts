import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
if (opendiscord.project !== "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket.")

//DECLARATIONS
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-required-reason":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-required-reason:config":api.ODJsonConfig<{
            forceCloseReason:boolean,
            forceReopenReason:boolean,
            forceDeleteReason:boolean,
            forceClaimReason:boolean,
            forceUnclaimReason:boolean,
            forcePinReason:boolean,
            forceUnpinReason:boolean
        }>
    }
    export interface ODCheckerManagerIdMappings {
        "ot-required-reason:config":api.ODChecker
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new api.ODJsonConfig("ot-required-reason:config", "config.json", "./plugins/ot-required-reason/"))
})

//REGISTER CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-required-reason:config")
    checkers.add(new api.ODChecker("ot-required-reason:config", checkers.storage, 0, config, new api.ODCheckerObjectStructure("ot-required-reason:config", {children:[
        {key:"forceCloseReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-close-reason", {cliDisplayName:"Force Close Reason"})},
        {key:"forceReopenReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-reopen-reason", {cliDisplayName:"Force Reopen Reason"})},
        {key:"forceDeleteReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-delete-reason", {cliDisplayName:"Force Delete Reason"})},
        {key:"forceClaimReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-claim-reason", {cliDisplayName:"Force Claim Reason"})},
        {key:"forceUnclaimReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-unclaim-reason", {cliDisplayName:"Force Unclaim Reason"})},
        {key:"forcePinReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-pin-reason", {cliDisplayName:"Force Pin Reason"})},
        {key:"forceUnpinReason", checker:new api.ODCheckerBooleanStructure("ot-required-reason:force-unpin-reason", {cliDisplayName:"Force Unpin Reason"})}
    ], cliDisplayName:"Required Reason", cliDisplayDescription:"Force users to specify reasons for all ticket actions."}), {cliDisplayName:"Required Reason Config", cliDisplayDescription:"Force users to specify reasons for all ticket actions."}))
})

//FUNCTION IMPORTED FROM OPEN TICKET SOURCE CODE:
async function addVerifyButton(instance:api.ODMessageInstance|api.ODComponentFactoryInstance<api.ODMessageComponent>, params:{guild:discord.Guild|null, channel:discord.TextBasedChannel, user:discord.User, verifybar:api.ODVerifyBar<string>}, defaultButtonType:"✅"|"❌", useDefaultLabels:boolean, verifyButtonId:string, customLabel?:string, customColor?:api.ODValidButtonColor, customEmoji?:string) {
    const {guild, channel, user, verifybar} = params
    if (instance instanceof api.ODMessageInstance){
        //message builders
        instance.addComponent(await opendiscord.builders.buttons.getSafe("opendiscord:verifybar-button").build("verifybar", {
            guild, channel, user, verifybar,
            defaultButtonType, useDefaultLabels, customColor, customEmoji, customLabel,
            verifyButtonId
        }))
    }else{
        //message components
        throw new api.ODSystemError("OT Required Reasons => verifybar does not yet support ODComponents v2!")
    }
}

opendiscord.events.get("afterComponentModifiersLoaded").listen((modifiers) => {
    const config = opendiscord.configs.get("ot-required-reason:config")
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const lang = opendiscord.languages

    const closeVerifyBar = modifiers.get("opendiscord:close-ticket-verifybar")
    if (config.data.forceCloseReason){
        closeVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.close"))
        }))
    }

    const reopenVerifyBar = modifiers.get("opendiscord:reopen-ticket-verifybar")
    if (config.data.forceReopenReason){
        reopenVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.reopen"))
        }))
    }

    const deleteVerifyBar = modifiers.get("opendiscord:delete-ticket-verifybar")
    if (config.data.forceDeleteReason){
        deleteVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.delete"))
        }))
    }

    const claimVerifyBar = modifiers.get("opendiscord:claim-ticket-verifybar")
    if (config.data.forceClaimReason){
        claimVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.claim"))
        }))
    }

    const unclaimVerifyBar = modifiers.get("opendiscord:unclaim-ticket-verifybar")
    if (config.data.forceUnclaimReason){
        unclaimVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.unclaim"))
        }))
    }

    const pinVerifyBar = modifiers.get("opendiscord:pin-ticket-verifybar")
    if (config.data.forcePinReason){
        pinVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.pin"))
        }))
    }

    const unpinVerifyBar = modifiers.get("opendiscord:unpin-ticket-verifybar")
    if (config.data.forceUnpinReason){
        unpinVerifyBar.workers.add(new api.ODWorker("ot-required-reason:required-reason", 101, async (instance, params, origin, cancel) => {
            if (!(instance instanceof api.ODMessageInstance)){
                throw new api.ODSystemError("OT Required Reasons: verifybars do not yet support ODComponents v2!")
            }

            //replace buttons with cancel or accept with reason
            instance.data.components = [] //clear actionrow
            await addVerifyButton(instance, params, "❌", true, api.ODVerifyButtonId.Cancel)
            await addVerifyButton(instance, params, "✅", true, api.ODVerifyButtonId.AcceptWithReason, lang.getTranslation("actions.buttons.unpin"))
        }))
    }
})

opendiscord.events.get("afterSlashCommandsLoaded").listen((commands) => {
    const config = opendiscord.configs.get("ot-required-reason:config")

    const closeReason = commands.get("opendiscord:close").builder.options?.find((opt) => opt.name === "reason")
    const reopenReason = commands.get("opendiscord:reopen").builder.options?.find((opt) => opt.name === "reason")
    const deleteReason = commands.get("opendiscord:delete").builder.options?.find((opt) => opt.name === "reason")
    const claimReason = commands.get("opendiscord:claim").builder.options?.find((opt) => opt.name === "reason")
    const unclaimReason = commands.get("opendiscord:unclaim").builder.options?.find((opt) => opt.name === "reason")
    const pinReason = commands.get("opendiscord:pin").builder.options?.find((opt) => opt.name === "reason")
    const unpinReason = commands.get("opendiscord:unpin").builder.options?.find((opt) => opt.name === "reason")

    if (config.data.forceCloseReason && closeReason && closeReason.type === discord.ApplicationCommandOptionType.String) closeReason.required = true
    if (config.data.forceReopenReason && reopenReason && reopenReason.type === discord.ApplicationCommandOptionType.String) reopenReason.required = true
    if (config.data.forceDeleteReason && deleteReason && deleteReason.type === discord.ApplicationCommandOptionType.String) deleteReason.required = true
    if (config.data.forceClaimReason && claimReason && claimReason.type === discord.ApplicationCommandOptionType.String) claimReason.required = true
    if (config.data.forceUnclaimReason && unclaimReason && unclaimReason.type === discord.ApplicationCommandOptionType.String) unclaimReason.required = true
    if (config.data.forcePinReason && pinReason && pinReason.type === discord.ApplicationCommandOptionType.String) pinReason.required = true
    if (config.data.forceUnpinReason && unpinReason && unpinReason.type === discord.ApplicationCommandOptionType.String) unpinReason.required = true

    //reorder claim command options
    if (claimReason){
        const index = commands.get("opendiscord:claim").builder.options?.indexOf(claimReason) ?? -1
        const newClaimOptions = structuredClone(commands.get("opendiscord:claim").builder.options ?? []) as discord.ApplicationCommandOptionData[]
        newClaimOptions.splice(index, 1)
        newClaimOptions.unshift(claimReason)
        commands.get("opendiscord:claim").builder.options = newClaimOptions
    }
})
opendiscord.events.get("afterTextCommandsLoaded").listen((commands) => {
    const config = opendiscord.configs.get("ot-required-reason:config")

    const closeReason = commands.get("opendiscord:close").builder.options?.find((opt) => opt.name === "reason")
    const reopenReason = commands.get("opendiscord:reopen").builder.options?.find((opt) => opt.name === "reason")
    const deleteReason = commands.get("opendiscord:delete").builder.options?.find((opt) => opt.name === "reason")
    const claimReason = commands.get("opendiscord:claim").builder.options?.find((opt) => opt.name === "reason")
    const unclaimReason = commands.get("opendiscord:unclaim").builder.options?.find((opt) => opt.name === "reason")
    const pinReason = commands.get("opendiscord:pin").builder.options?.find((opt) => opt.name === "reason")
    const unpinReason = commands.get("opendiscord:unpin").builder.options?.find((opt) => opt.name === "reason")

    if (config.data.forceCloseReason && closeReason && closeReason.type === "string") closeReason.required = true
    if (config.data.forceReopenReason && reopenReason && reopenReason.type === "string") reopenReason.required = true
    if (config.data.forceDeleteReason && deleteReason && deleteReason.type === "string") deleteReason.required = true
    if (config.data.forceClaimReason && claimReason && claimReason.type === "string") claimReason.required = true
    if (config.data.forceUnclaimReason && unclaimReason && unclaimReason.type === "string") unclaimReason.required = true
    if (config.data.forcePinReason && pinReason && pinReason.type === "string") pinReason.required = true
    if (config.data.forceUnpinReason && unpinReason && unpinReason.type === "string") unpinReason.required = true
})