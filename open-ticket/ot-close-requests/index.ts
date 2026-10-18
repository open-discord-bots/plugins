import { api, opendiscord, openticketUtils, utilities } from "#opendiscord"
import * as discord from "discord.js"
if (opendiscord.project !== "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARATION
class OTRequestsConfig extends api.ODJsonCommentsConfig<{
    enableCloseRequest:boolean,
    enableDeleteRequest:boolean,
    ignoredRoles:string[]
}> {}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-close-requests":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-close-requests:config":OTRequestsConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-close-requests:config":api.ODChecker
    }
    export interface ODMessageManagerIdMappings {
        "ot-close-requests:close-request-message":{origin:"slash"|"text"|"other"|"ticket-message"|"reopen-message"|"autoclose", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:close-request-message"},
        "ot-close-requests:delete-request-message":{origin:"slash"|"text"|"other"|"ticket-message"|"close-message"|"reopen-message"|"autoclose-message"|"autodelete", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:delete-request-message"},
    }
    export interface ODEmbedManagerIdMappings {
        "ot-close-requests:close-request-embed":{origin:"slash"|"text"|"other"|"ticket-message"|"reopen-message"|"autoclose", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:close-request-embed"},
        "ot-close-requests:delete-request-embed":{origin:"slash"|"text"|"other"|"ticket-message"|"close-message"|"reopen-message"|"autoclose-message"|"autodelete", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:delete-request-embed"},
    }
    export interface ODButtonManagerIdMappings {
        "ot-close-requests:close-request-accepted-button":{origin:"slash"|"text"|"other"|"ticket-message"|"reopen-message"|"autoclose", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:close-request-accepted-button"},
        "ot-close-requests:close-request-denied-button":{origin:"slash"|"text"|"other"|"ticket-message"|"reopen-message"|"autoclose", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:close-request-denied-button"},
        "ot-close-requests:delete-request-accepted-button":{origin:"slash"|"text"|"other"|"ticket-message"|"close-message"|"reopen-message"|"autoclose-message"|"autodelete", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:delete-request-accepted-button"},
        "ot-close-requests:delete-request-denied-button":{origin:"slash"|"text"|"other"|"ticket-message"|"close-message"|"reopen-message"|"autoclose-message"|"autodelete", params:{guild:discord.Guild, channel:discord.TextBasedChannel, user:discord.User, ticket:api.ODTicket, reason:string|null}, workers:"ot-close-requests:delete-request-denied-button"},
    }
    export interface ODTicketIdMappings {
        "ot-close-requests:allow-close":api.ODTicketData<boolean>,
        "ot-close-requests:allow-delete":api.ODTicketData<boolean>,
    }
    export interface ODButtonResponderManagerIdMappings {
        "ot-close-requests:accept-close":{origin:"button", params:{}, workers:"ot-close-requests:accept-close"},
        "ot-close-requests:accept-delete":{origin:"button", params:{}, workers:"ot-close-requests:accept-delete"},
        "ot-close-requests:deny-close":{origin:"button", params:{}, workers:"ot-close-requests:deny-close"},
        "ot-close-requests:deny-delete":{origin:"button", params:{}, workers:"ot-close-requests:deny-delete"}
    }
    export interface ODStateManagerIdMappings {
        "ot-close-requests:close-request-message":ODCloseRequestMessageState
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTRequestsConfig("ot-close-requests:config", "config.jsonc", "./plugins/ot-close-requests/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-close-requests:config")
    checkers.add(new api.ODChecker("ot-close-requests:config", checkers.storage, 0, config, new api.ODCheckerObjectStructure("ot-close-requests:config", {children:[
        {key:"enableCloseRequest", checker:new api.ODCheckerBooleanStructure("ot-close-requests:enable-close-request", {})},
        {key:"enableDeleteRequest", checker:new api.ODCheckerBooleanStructure("ot-close-requests:enable-delete-request", {})},
        {key:"ignoredRoles", checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-close-requests:ignored-roles", "role", [], {})}
    ]})))
})

//REGISTER STATES
export class ODCloseRequestMessageState extends api.ODState<{
    /**A reason this close request message was generated. */
    messageReason:string|null,
    /**The original author of this close request message. */
    messageAuthor:string,
    /**The type of close request message. */
    type:"close"|"delete"
}, false, false> {
    constructor(id:api.ODValidId, client:api.ODClientManager, database:api.ODDatabase) {
        super(id, client, database, {})
    }
}
opendiscord.events.get("onStateLoad").listen((states) => {
    opendiscord.states.add(new ODCloseRequestMessageState("ot-close-requests:close-request-message", opendiscord.client, opendiscord.databases.get("opendiscord:message-states")))
})

//REGISTER BUTTON BUILDERS
opendiscord.events.get("onButtonBuilderLoad").listen((buttons) => {
    const lang = opendiscord.languages

    buttons.add(new api.ODButton("ot-close-requests:close-request-accepted-button"))
    buttons.get("ot-close-requests:close-request-accepted-button").workers.add(new api.ODWorker("ot-close-requests:close-request-accepted-button", 0, (instance, params, source, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("✅")
        instance.setLabel(lang.getTranslation("actions.buttons.close"))
        instance.setCustomId("ot-close-requests:accept-close")
    }))

    buttons.add(new api.ODButton("ot-close-requests:delete-request-accepted-button"))
    buttons.get("ot-close-requests:delete-request-accepted-button").workers.add(new api.ODWorker("ot-close-requests:delete-request-accepted-button", 0, (instance, params, source, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("✅")
        instance.setLabel(lang.getTranslation("actions.buttons.delete"))
        instance.setCustomId("ot-close-requests:accept-delete")
    }))

    buttons.add(new api.ODButton("ot-close-requests:close-request-denied-button"))
    buttons.get("ot-close-requests:close-request-denied-button").workers.add(new api.ODWorker("ot-close-requests:close-request-denied-button", 0, (instance, params, source, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("❌")
        instance.setLabel(lang.getTranslation("params.uppercase.cancel"))
        instance.setCustomId("ot-close-requests:deny-close")
    }))

    buttons.add(new api.ODButton("ot-close-requests:delete-request-denied-button"))
    buttons.get("ot-close-requests:delete-request-denied-button").workers.add(new api.ODWorker("ot-close-requests:delete-request-denied-button", 0, (instance, params, source, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("❌")
        instance.setLabel(lang.getTranslation("params.uppercase.cancel"))
        instance.setCustomId("ot-close-requests:deny-delete")
    }))
})

//REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const lang = opendiscord.languages

    embeds.add(new api.ODEmbed("ot-close-requests:close-request-embed"))
    embeds.get("ot-close-requests:close-request-embed").workers.add(new api.ODWorker("ot-close-requests:close-request-embed", 0, (instance, params, source, cancel) => {
        const {user, reason} = params

        instance.setTitle(utilities.emojiTitle("🔒", "Close Ticket Request"))
        instance.setColor(generalConfig.data.mainColor)
        instance.setDescription("We'd like to close this ticket. Are you ready to proceed? It will be closed upon approval.")
        instance.setAuthor(user.displayName, user.displayAvatarURL())

        if (params.reason || generalConfig.data.ticketSystem.alwaysShowReason) instance.addFields({name:lang.getTranslation("params.uppercase.reason") + ":", value:"```" + (reason ?? "/") + "```"})
    }))

    embeds.add(new api.ODEmbed("ot-close-requests:delete-request-embed"))
    embeds.get("ot-close-requests:delete-request-embed").workers.add(new api.ODWorker("ot-close-requests:delete-request-embed", 0, (instance, params, source, cancel) => {
        const {user, reason} = params

        instance.setTitle(utilities.emojiTitle("🗑️", "Delete Ticket Request"))
        instance.setColor(generalConfig.data.mainColor)
        instance.setDescription("We'd like to delete this ticket. Are you ready to proceed? It will be deleted upon approval.")
        instance.setAuthor(user.displayName, user.displayAvatarURL())

        if (params.reason || generalConfig.data.ticketSystem.alwaysShowReason) instance.addFields({name:lang.getTranslation("params.uppercase.reason") + ":", value:"```" + (reason ?? "/") + "```"})
    }))
})

//REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-close-requests:close-request-message"))
    messages.get("ot-close-requests:close-request-message").workers.add(new api.ODWorker("ot-close-requests:close-request-message", 0, async (instance, params, source, cancel) => {
        instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-close-requests:close-request-embed").build(source, params))
        instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-close-requests:close-request-denied-button").build(source, params))
        instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-close-requests:close-request-accepted-button").build(source, params))

        const creator = await opendiscord.tickets.getTicketUser(params.ticket, "creator")
        if (creator) instance.setContent(discord.userMention(creator.id))
    }))

    messages.add(new api.ODMessage("ot-close-requests:delete-request-message"))
    messages.get("ot-close-requests:delete-request-message").workers.add(new api.ODWorker("ot-close-requests:delete-request-message", 0, async (instance, params, source, cancel) => {
        instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-close-requests:delete-request-embed").build(source, params))
        instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-close-requests:delete-request-denied-button").build(source, params))
        instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-close-requests:delete-request-accepted-button").build(source, params))

        const creator = await opendiscord.tickets.getTicketUser(params.ticket, "creator")
        if (creator) instance.setContent(discord.userMention(creator.id))
    }))
})

//INJECT SCRIPTS INTO CLOSE/DELETE ACTIONS
opendiscord.events.get("afterTicketCreated").listen((ticket) => {
    ticket.add(new api.ODTicketData("ot-close-requests:allow-close", false))
    ticket.add(new api.ODTicketData("ot-close-requests:allow-delete", false))
})
opendiscord.events.get("afterActionsLoaded").listen((actions) => {
    const config = opendiscord.configs.get("ot-close-requests:config")

    //INJECT CLOSE REQUEST HANDLER
    if (config.data.enableCloseRequest) actions.get("opendiscord:close-ticket").workers.add(new api.ODWorker("ot-close-requests:prevent-close", 100, async (instance, params, origin, cancel) => {
        const {guild, ticket, channel, user, reason} = params
        if (!ticket.exists("ot-close-requests:allow-close")) ticket.add(new api.ODTicketData("ot-close-requests:allow-close", false))

        const creatorId = ticket.get("opendiscord:opened-by").value
        const memberStillInServer = (creatorId) ? (await opendiscord.client.fetchGuildMember(guild, creatorId) !== null) : false
        if (ticket.get("ot-close-requests:allow-close").value || !memberStillInServer) return

        cancel()
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")

        const sentMsg = await channel.send((await opendiscord.builders.messages.getSafe("ot-close-requests:close-request-message").build("ticket-message", {guild, channel, user, ticket, reason})).message)
        await closeReqMsgState.setMsgState({channel, message:sentMsg}, {
            messageAuthor:user.id,
            messageReason:reason,
            type:"close"
        }, false)
    }))

    //INJECT DELETE REQUEST HANDLER
    if (config.data.enableDeleteRequest) actions.get("opendiscord:delete-ticket").workers.add(new api.ODWorker("ot-close-requests:prevent-delete", 100, async (instance, params, origin, cancel) => {
        const {guild, ticket, channel, user, reason} = params
        if (!ticket.exists("ot-close-requests:allow-delete")) ticket.add(new api.ODTicketData("ot-close-requests:allow-delete", false))

        const creatorId = ticket.get("opendiscord:opened-by").value
        const memberStillInServer = (creatorId) ? (await opendiscord.client.fetchGuildMember(guild, creatorId) !== null) : false
        if (ticket.get("ot-close-requests:allow-delete").value || !memberStillInServer) return

        cancel()
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")

        const sentMsg = await channel.send((await opendiscord.builders.messages.getSafe("ot-close-requests:delete-request-message").build("ticket-message", {guild, channel, user, ticket, reason})).message)
        await closeReqMsgState.setMsgState({channel, message:sentMsg}, {
            messageAuthor:user.id,
            messageReason:reason,
            type:"delete"
        }, false)
    }))
})

async function createErrorMessage(type:"close"|"delete", user:discord.User) {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    return await new api.ODQuickMessage("ot-close-requests:denied", {
        embeds:[
            await new api.ODQuickEmbed("ot-close-requests:denied", {
                color:generalConfig.data.mainColor,
                title:utilities.emojiTitle("❌", (type === "close") ? "Close Request Canceled" : "Delete Request Canceled"),
                description:(type === "close") ? "The ticket will remain open." : "The ticket will not be deleted.",
                authorImage:user.displayAvatarURL(),
                authorText:user.displayName
            }).build()
        ]
    }).build()
}

//RESPOND TO CLOSE/DELETE BUTTONS
opendiscord.events.get("onButtonResponderLoad").listen((buttons) => {
    const lang = opendiscord.languages
    const config = opendiscord.configs.get("ot-close-requests:config")

    buttons.add(new api.ODButtonResponder("ot-close-requests:accept-close", "ot-close-requests:accept-close"))
    buttons.get("ot-close-requests:accept-close").workers.add(new api.ODWorker("ot-close-requests:accept-close", 0, async (instance, params, origin, cancel) => {
        const {guild, channel, user, message, member} = instance

        //responder checks
        const isInGuild = await openticketUtils.replyIsInGuild(instance, origin)
        if (!isInGuild || !guild || channel.isDMBased()) return cancel()

        const ticket = await openticketUtils.replyIsTicket(instance, origin)
        if (!ticket) return cancel()

        const isAvailable = await openticketUtils.replyTicketIsAvailable(instance, origin, ticket)
        if (!isAvailable) return cancel()

        const isTicketOpen = await openticketUtils.replyTicketMustBeOpen(instance, origin, ticket)
        if (!isTicketOpen) return cancel()

        const messagesHaveBeenSent = await openticketUtils.replyMessageMustBeSentBeforeClose(instance, origin, ticket, "close")
        if (!messagesHaveBeenSent) return cancel()

        //check state
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")
        const state = await closeReqMsgState.getMsgState({channel, message})
        if (!state){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, error:lang.getTranslationWithParams("errors.descriptions.stateExpired", ["/close"]), layout:"simple", customTitle:"Message State Expired"}))
            return cancel()
        }

        //permissions check if ticket creator
        const creatorId = ticket.get("opendiscord:opened-by").value
        const isAdmin = config.data.ignoredRoles.some((roleId) => member?.roles.cache.has(roleId))
        if (user.id !== creatorId && !isAdmin){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:[]}))
            return cancel()
        }

        //allow ticket closing
        if (!ticket.exists("ot-close-requests:allow-close")) ticket.add(new api.ODTicketData("ot-close-requests:allow-close", false))
        ticket.get("ot-close-requests:allow-close").value = true

        //start closing ticket
        await instance.defer("update", false)
        const closeUser = await opendiscord.client.fetchUser(state.data.messageAuthor) ?? user
        const reason = state.data.messageReason
        await opendiscord.actions.get("opendiscord:close-ticket").run("other", {guild, channel, user:closeUser, ticket, reason, sendMessage:false})

        //converted to close message
        closeReqMsgState.deleteMsgState({channel, message})
        const interactiveMsgState = opendiscord.states.get("opendiscord:interactive-message")
        const sentMsg = await instance.update(await opendiscord.builders.messages.getSafe("opendiscord:close-message").build("other", {guild, channel, user, ticket, reason}))
        if (sentMsg.success) await interactiveMsgState.setMsgState({channel, message:sentMsg.message}, {
            messageType:"close-message",
            messageOrigin:origin,
            messageAuthor:user.id,
            messageReason:reason
        }, sentMsg.ephemeral)
        ticket.get("ot-close-requests:allow-close").value = false
    }))

    buttons.add(new api.ODButtonResponder("ot-close-requests:deny-close", "ot-close-requests:deny-close"))
    buttons.get("ot-close-requests:deny-close").workers.add(new api.ODWorker("ot-close-requests:deny-close", 0, async (instance, params, origin, cancel) => {
        const {guild, channel, user, message, member} = instance

        //responder checks
        const isInGuild = await openticketUtils.replyIsInGuild(instance, origin)
        if (!isInGuild || !guild || channel.isDMBased()) return cancel()

        const ticket = await openticketUtils.replyIsTicket(instance, origin)
        if (!ticket) return cancel()

        const isAvailable = await openticketUtils.replyTicketIsAvailable(instance, origin, ticket)
        if (!isAvailable) return cancel()

        const isTicketOpen = await openticketUtils.replyTicketMustBeOpen(instance, origin, ticket)
        if (!isTicketOpen) return cancel()

        const messagesHaveBeenSent = await openticketUtils.replyMessageMustBeSentBeforeClose(instance, origin, ticket, "close")
        if (!messagesHaveBeenSent) return cancel()

        //check state
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")
        const state = await closeReqMsgState.getMsgState({channel, message})
        if (!state){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, error:lang.getTranslationWithParams("errors.descriptions.stateExpired", ["/close"]), layout:"simple", customTitle:"Message State Expired"}))
            return cancel()
        }

        //permissions check if ticket creator
        const creatorId = ticket.get("opendiscord:opened-by").value
        const isAdmin = config.data.ignoredRoles.some((roleId) => member?.roles.cache.has(roleId))
        if (user.id !== creatorId && !isAdmin){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:[]}))
            return cancel()
        }

        //send error
        await instance.defer("update", false)
        closeReqMsgState.deleteMsgState({channel, message})
        await instance.update(await createErrorMessage("close", user))
    }))

    buttons.add(new api.ODButtonResponder("ot-close-requests:accept-delete", "ot-close-requests:accept-delete"))
    buttons.get("ot-close-requests:accept-delete").workers.add(new api.ODWorker("ot-close-requests:accept-delete", 0, async (instance, params, origin, cancel) => {
        const {guild, channel, user, message, member} = instance

        //responder checks
        const isInGuild = await openticketUtils.replyIsInGuild(instance, origin)
        if (!isInGuild || !guild || channel.isDMBased()) return cancel()

        const ticket = await openticketUtils.replyIsTicket(instance, origin)
        if (!ticket) return cancel()

        const isAvailable = await openticketUtils.replyTicketIsAvailable(instance, origin, ticket)
        if (!isAvailable) return cancel()

        const messagesHaveBeenSent = await openticketUtils.replyMessageMustBeSentBeforeClose(instance, origin, ticket, "delete")
        if (!messagesHaveBeenSent) return cancel()

        //check state
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")
        const state = await closeReqMsgState.getMsgState({channel, message})
        if (!state){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, error:lang.getTranslationWithParams("errors.descriptions.stateExpired", ["/delete"]), layout:"simple", customTitle:"Message State Expired"}))
            return cancel()
        }

        //permissions check if ticket creator
        const creatorId = ticket.get("opendiscord:opened-by").value
        const isAdmin = config.data.ignoredRoles.some((roleId) => member?.roles.cache.has(roleId))
        if (user.id !== creatorId && !isAdmin){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:[]}))
            return cancel()
        }

        //allow ticket deletion
        if (!ticket.exists("ot-close-requests:allow-delete")) ticket.add(new api.ODTicketData("ot-close-requests:allow-delete", false))
        ticket.get("ot-close-requests:allow-delete").value = true

        //start deletion ticket
        await instance.defer("update", false)
        const deleteUser = await opendiscord.client.fetchUser(state.data.messageAuthor) ?? user
        const reason = state.data.messageReason
        closeReqMsgState.deleteMsgState({channel, message})
        opendiscord.actions.get("opendiscord:delete-ticket").run("other", {guild, channel, user:deleteUser, ticket, reason, sendMessage:false, withoutTranscript:false})

        //converted to delete message
        await instance.update(await opendiscord.builders.messages.getSafe("opendiscord:delete-message").build("other", {guild, channel, user, ticket, reason}))
    }))

    buttons.add(new api.ODButtonResponder("ot-close-requests:deny-delete", "ot-close-requests:deny-delete"))
    buttons.get("ot-close-requests:deny-delete").workers.add(new api.ODWorker("ot-close-requests:deny-delete", 0, async (instance, params, origin, cancel) => {
        const {guild, channel, user, message, member} = instance

        //responder checks
        const isInGuild = await openticketUtils.replyIsInGuild(instance, origin)
        if (!isInGuild || !guild || channel.isDMBased()) return cancel()

        const ticket = await openticketUtils.replyIsTicket(instance, origin)
        if (!ticket) return cancel()

        const isAvailable = await openticketUtils.replyTicketIsAvailable(instance, origin, ticket)
        if (!isAvailable) return cancel()

        const messagesHaveBeenSent = await openticketUtils.replyMessageMustBeSentBeforeClose(instance, origin, ticket, "delete")
        if (!messagesHaveBeenSent) return cancel()

        //check state
        const closeReqMsgState = opendiscord.states.get("ot-close-requests:close-request-message")
        const state = await closeReqMsgState.getMsgState({channel, message})
        if (!state){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, error:lang.getTranslationWithParams("errors.descriptions.stateExpired", ["/delete"]), layout:"simple", customTitle:"Message State Expired"}))
            return cancel()
        }

        //permissions check if ticket creator
        const creatorId = ticket.get("opendiscord:opened-by").value
        const isAdmin = config.data.ignoredRoles.some((roleId) => member?.roles.cache.has(roleId))
        if (user.id !== creatorId && !isAdmin){
            await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:[]}))
            return cancel()
        }

        //send error
        await instance.defer("update", false)
        closeReqMsgState.deleteMsgState({channel, message})
        await instance.update(await createErrorMessage("delete", user))
    }))
})