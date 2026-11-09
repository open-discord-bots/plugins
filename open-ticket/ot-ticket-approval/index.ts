import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
if (opendiscord.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket.")

/**## OTApprovalRequestData `type`
 * The ticket request that is stored in the message state of the staff approval message.
 * It contains everything that is needed to create the ticket once a staff member approves it.
 */
export type OTApprovalRequestData = {
    /**The ID of the member that requested the ticket. */
    userId:string,
    /**The ID of the ticket option ("category") that was selected. */
    optionId:string,
    /**The answers of the questions that were asked to the requester. */
    answers:api.ODQuestionAnswer[],
    /**The method that was used to request the ticket. */
    origin:"panel-button"|"panel-dropdown"|"slash"|"text"|"other",
    /**The date (UNIX TIMESTAMP) this request was submitted. */
    createdAt:number,
    /**The status of this request. */
    status:"pending"|"approved"|"rejected",
    /**The ID of the staff member that approved or rejected this request. */
    handledById:string|null,
    /**The date (UNIX TIMESTAMP) this request was approved or rejected. */
    handledAt:number|null,
    /**The reason a staff member gave when rejecting this request. */
    rejectReason:string|null
}

class OTApprovalConfig extends api.ODJsonCommentsConfig<{
    enabled:boolean,
    approvalChannelId:string,
    notifyRoleId:string,
    extraApproverRoleIds:string[],
    staffBypassApproval:boolean,
    allowTicketsWhenChannelInvalid:boolean,
    requireReasonOnReject:boolean,
    dmRequesterOnApprove:boolean,
    dmRequesterOnReject:boolean,
    requestExpiryHours:number,
    maxAnswersShown:number
}> {}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-ticket-approval":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-ticket-approval:config":OTApprovalConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-ticket-approval:config":api.ODChecker
    }
    export interface ODStateManagerIdMappings {
        "ot-ticket-approval:requests":OTApprovalRequestState
    }
    export interface ODEmbedManagerIdMappings {
        "ot-ticket-approval:request-embed":{origin:"other"|"button"|"modal", params:{guild:discord.Guild, channel:discord.TextBasedChannel, request:OTApprovalRequestData}, workers:"ot-ticket-approval:request-embed"},
    }
    export interface ODMessageManagerIdMappings {
        "ot-ticket-approval:request-message":{origin:"other"|"button"|"modal", params:{guild:discord.Guild, channel:discord.TextBasedChannel, request:OTApprovalRequestData}, workers:"ot-ticket-approval:request-message"},
    }
    export interface ODButtonManagerIdMappings {
        "ot-ticket-approval:approve-button":{origin:"other"|"button"|"modal", params:{guild:discord.Guild, channel:discord.TextBasedChannel, request:OTApprovalRequestData}, workers:"ot-ticket-approval:approve-button"},
        "ot-ticket-approval:reject-button":{origin:"other"|"button"|"modal", params:{guild:discord.Guild, channel:discord.TextBasedChannel, request:OTApprovalRequestData}, workers:"ot-ticket-approval:reject-button"},
    }
    export interface ODButtonResponderManagerIdMappings {
        "ot-ticket-approval:approve":{origin:"button", params:{}, workers:"ot-ticket-approval:approve"},
        "ot-ticket-approval:reject":{origin:"button", params:{}, workers:"ot-ticket-approval:reject"},
    }
    export interface ODModalResponderManagerIdMappings {
        "ot-ticket-approval:reject-reason":{origin:"modal", params:{}, workers:"ot-ticket-approval:reject-reason"},
    }
    export interface ODModalComponentManagerIdMappings {
        "ot-ticket-approval:reject-reason":{origin:"other", params:{guild:discord.Guild, channel:discord.TextBasedChannel, messageId:string}, workers:"ot-ticket-approval:reject-reason"},
    }
}

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTApprovalConfig("ot-ticket-approval:config","config.jsonc","./plugins/ot-ticket-approval/"))
})

//REGISTER REQUEST STATE
export class OTApprovalRequestState extends api.ODState<OTApprovalRequestData,false,false> {
    constructor(id:api.ODValidId, client:api.ODClientManager, database:api.ODDatabase) {
        super(id, client, database, {autodeleteOnRestart:false})
    }
}
opendiscord.events.get("onStateLoad").listen((states) => {
    states.add(new OTApprovalRequestState("ot-ticket-approval:requests", opendiscord.client, opendiscord.databases.get("opendiscord:message-states")))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-ticket-approval:config")
    checkers.add(new api.ODChecker("ot-ticket-approval:config", checkers.storage, 0, config, new api.ODCheckerObjectStructure("ot-ticket-approval:config", {children:[
        {key:"enabled", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:enabled", {})},
        {key:"approvalChannelId", checker:new api.ODCheckerCustomStructure_DiscordId("ot-ticket-approval:approval-channel", "channel", true, [])},
        {key:"notifyRoleId", checker:new api.ODCheckerCustomStructure_DiscordId("ot-ticket-approval:notify-role", "role", true, [])},
        {key:"extraApproverRoleIds", checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-ticket-approval:extra-approver-roles", "role", [], {})},
        {key:"staffBypassApproval", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:staff-bypass", {})},
        {key:"allowTicketsWhenChannelInvalid", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:allow-tickets-when-channel-invalid", {})},
        {key:"requireReasonOnReject", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:require-reason", {})},
        {key:"dmRequesterOnApprove", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:dm-on-approve", {})},
        {key:"dmRequesterOnReject", checker:new api.ODCheckerBooleanStructure("ot-ticket-approval:dm-on-reject", {})},
        {key:"requestExpiryHours", checker:new api.ODCheckerNumberStructure("ot-ticket-approval:expiry-hours", {min:0})},
        {key:"maxAnswersShown", checker:new api.ODCheckerNumberStructure("ot-ticket-approval:max-answers", {min:1, max:25})}
    ]})))
})

/**Ticket creations that were just approved by staff (prevents an approval loop). */
const approvedCreations = new Set<string>()

/**Requests that this plugin just blocked, used to replace the reply the requester receives. */
const requesterNotices = new Map<string,{time:number, kind:"queued"|"duplicate"|"blocked"}>()

/**The key used to mark a ticket creation as already approved. */
function creationKey(userId:string, optionId:string) {
    return userId+"|"+optionId
}

/**Remember what the requester should be told when Open Ticket replies to their ticket creation. */
function setRequesterNotice(userId:string, kind:"queued"|"duplicate"|"blocked") {
    const now = new Date().getTime()

    //notices are only used for a few seconds, remove anything older
    for (const [id,notice] of requesterNotices) {
        if (now-notice.time > 60000) requesterNotices.delete(id)
    }

    requesterNotices.set(userId, {time:now, kind})
}

/**Get & remove the notice of this requester. Notices are only valid for a few seconds. */
function takeRequesterNotice(userId:string) {
    const notice = requesterNotices.get(userId)
    requesterNotices.delete(userId)
    if (!notice) return null
    if (new Date().getTime()-notice.time > 15000) return null
    return notice
}

/**Check if this user is allowed to approve or reject ticket requests. */
async function isApprover(user:discord.User, member:discord.GuildMember|null, channel:discord.TextBasedChannel|null, guild:discord.Guild|null) {
    const config = opendiscord.configs.get("ot-ticket-approval:config")

    //use the Open Ticket permission system (global & channel admin/support roles)
    const permissions = await opendiscord.permissions.getPermissions(user, channel, guild)
    if (opendiscord.permissions.hasPermissions("support", permissions)) return true

    //additional roles from the config of this plugin
    if (member && config.data.extraApproverRoleIds.some((roleId) => member.roles.cache.has(roleId))) return true

    return false
}

/**Check if this request is still waiting for a decision. */
async function findPendingRequest(userId:string, optionId:string) {
    const state = opendiscord.states.get("ot-ticket-approval:requests")
    for (const {value} of await state.listMsgStates()) {
        if (value.data.userId != userId) continue
        if (value.data.optionId != optionId) continue
        if (value.data.status != "pending") continue
        return value
    }
    return null
}

/**Check if a request is too old to be approved or rejected. */
function isExpired(createdAt:number) {
    const config = opendiscord.configs.get("ot-ticket-approval:config")
    if (config.data.requestExpiryHours <= 0) return false
    return new Date().getTime() > createdAt+(config.data.requestExpiryHours*60*60*1000)
}

/**A small embed that tells a user or staff member what happened. */
async function createNoticeEmbed(user:discord.User, kind:"queued"|"duplicate"|"blocked") {
    const config = opendiscord.configs.get("ot-ticket-approval:config")
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const approvalChannel = (/^\d{1,20}$/.test(config.data.approvalChannelId)) ? `<#${config.data.approvalChannelId}>` : "the staff team"

    const data = (kind == "queued") ? {
        color:generalConfig.data.mainColor,
        title:utilities.emojiTitle("📨","Ticket request submitted"),
        description:`Your ticket request was sent to staff for approval and will be opened as soon as a staff member approves it.\n\nYou can follow your request in ${approvalChannel}.`
    } : (kind == "duplicate") ? {
        color:generalConfig.data.mainColor,
        title:utilities.emojiTitle("⏳","Request already pending"),
        description:`You already have a ticket request that is waiting for staff approval.\nPlease wait until a staff member approves or rejects it before submitting a new one.`
    } : {
        color:"Orange",
        title:utilities.emojiTitle("⚠️","Ticket request failed"),
        description:`Your ticket request could not be submitted to the staff approval channel.\nPlease try again later or contact a staff member directly.`
    }

    return await new api.ODQuickEmbed("ot-ticket-approval:notice-embed", {
        ...data,
        authorText:user.displayName,
        authorImage:user.displayAvatarURL(),
        timestamp:new Date()
    }).build()
}

/**A small message that tells a user or staff member what happened. */
async function createNoticeMessage(user:discord.User, kind:"queued"|"duplicate"|"blocked") {
    return await new api.ODQuickMessage("ot-ticket-approval:notice-message", {
        ephemeral:true,
        embeds:[await createNoticeEmbed(user, kind)]
    }).build()
}

/**Build the staff approval message of a request. */
async function buildRequestMessage(guild:discord.Guild, channel:discord.TextBasedChannel, request:OTApprovalRequestData) {
    return await opendiscord.builders.messages.getSafe("ot-ticket-approval:request-message").build("other", {guild, channel, request})
}

/**The answers of a request, ready to be shown in an embed. */
function getRequestAnswers(request:OTApprovalRequestData) {
    const answers:{name:string, value:string}[] = []
    let files = 0

    for (const answer of request.answers) {
        if (answer.type == "file-upload") {
            files += answer.files.length
            continue
        }
        if (!answer.value || answer.value.length == 0) continue
        answers.push({name:answer.name, value:answer.value})
    }

    return {answers, files}
}

//REGISTER APPROVE/REJECT BUTTONS
opendiscord.events.get("onButtonBuilderLoad").listen((buttons) => {
    buttons.add(new api.ODButton("ot-ticket-approval:approve-button"))
    buttons.get("ot-ticket-approval:approve-button").workers.add(
        new api.ODWorker("ot-ticket-approval:approve-button",0,(instance,params) => {
            instance.setMode("button")
            instance.setColor("green")
            instance.setEmoji("✅")
            instance.setLabel("Approve")
            instance.setCustomId("ot-ticket-approval:approve")
            instance.setDisabled(params.request.status != "pending")
        })
    )

    buttons.add(new api.ODButton("ot-ticket-approval:reject-button"))
    buttons.get("ot-ticket-approval:reject-button").workers.add(
        new api.ODWorker("ot-ticket-approval:reject-button",0,(instance,params) => {
            instance.setMode("button")
            instance.setColor("red")
            instance.setEmoji("❌")
            instance.setLabel("Reject")
            instance.setCustomId("ot-ticket-approval:reject")
            instance.setDisabled(params.request.status != "pending")
        })
    )
})

//REGISTER THE STAFF REQUEST EMBED
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("ot-ticket-approval:request-embed"))
    embeds.get("ot-ticket-approval:request-embed").workers.add(
        new api.ODWorker("ot-ticket-approval:request-embed",0,async (instance,params) => {
            const {guild, request} = params
            const config = opendiscord.configs.get("ot-ticket-approval:config")
            const generalConfig = opendiscord.configs.get("opendiscord:general")

            const requester = await opendiscord.client.fetchUser(request.userId)
            const option = opendiscord.options.get(request.optionId)
            const ticketOption = (option instanceof api.ODTicketOption) ? option : null

            //title & color follow the status of the request
            if (request.status == "approved") {
                instance.setTitle(utilities.emojiTitle("✅","Ticket request approved"))
                instance.setColor("Green")
            } else if (request.status == "rejected") {
                instance.setTitle(utilities.emojiTitle("❌","Ticket request rejected"))
                instance.setColor("Red")
            } else {
                instance.setTitle(utilities.emojiTitle("📨","New ticket request"))
                instance.setColor(generalConfig.data.mainColor)
            }

            if (requester) {
                instance.setAuthor(requester.displayName, requester.displayAvatarURL())
                instance.setThumbnail(requester.displayAvatarURL())
            }

            //who requested which category
            instance.setFields([
                {name:"Requested by", value:(requester ? `${requester} (\`${requester.username}\`)` : "Unknown user")+`\n\`${request.userId}\``, inline:false},
                {name:"Ticket category", value:(ticketOption && ticketOption.exists("opendiscord:name")) ? `\`${ticketOption.get("opendiscord:name").value}\`\n\`${request.optionId}\`` : `Unknown category\n\`${request.optionId}\``, inline:false},
                {name:"Requested via", value:`\`${request.origin}\``, inline:false}
            ])

            //the discord category this option will use
            if (ticketOption && ticketOption.exists("opendiscord:channel-category")) {
                const categoryId = ticketOption.get("opendiscord:channel-category").value
                const category = (categoryId.length > 0) ? await opendiscord.client.fetchGuildCategoryChannel(guild.id, categoryId) : null
                if (category) instance.addFields({name:"Discord category", value:`**${category.name}**`, inline:false})
            }

            //the reason the member gave
            const {answers, files} = getRequestAnswers(request)
            const shown = answers.slice(0, config.data.maxAnswersShown)
            for (const answer of shown) {
                instance.addFields({name:answer.name.slice(0, 256) || "Reason", value:answer.value.slice(0, 1024), inline:false})
            }
            if (answers.length > shown.length) instance.addFields({name:"And more", value:`${answers.length-shown.length} additional answer(s) are hidden.`, inline:false})
            if (files > 0) instance.addFields({name:"Attachments", value:`${files} file(s) were uploaded with this request.`, inline:false})
            if (answers.length == 0 && files == 0) instance.addFields({name:"Reason", value:"/ (nothing was answered)", inline:false})

            //who approved or rejected this request
            if (request.status != "pending") {
                const handler = (request.handledById) ? await opendiscord.client.fetchUser(request.handledById) : null
                const handledAt = (request.handledAt) ? `<t:${Math.floor(request.handledAt/1000)}:F>` : "unknown time"
                instance.addFields({
                    name:(request.status == "approved") ? "Approved by" : "Rejected by",
                    value:(handler ? `${handler} (\`${handler.username}\`)` : `Unknown staff (\`${request.handledById ?? "unknown"}\`)`)+`\n${handledAt}`,
                    inline:false
                })
                if (request.status == "rejected") instance.addFields({name:"Rejection reason", value:(request.rejectReason ?? "/").slice(0, 1024), inline:false})
            }

            instance.setFooter("Request submitted")
            instance.setTimestamp(new Date(request.createdAt))
        })
    )
})

//REGISTER THE STAFF REQUEST MESSAGE
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-ticket-approval:request-message"))
    messages.get("ot-ticket-approval:request-message").workers.add(
        new api.ODWorker("ot-ticket-approval:request-message",0,async (instance,params,origin) => {
            const {guild, channel, request} = params
            const config = opendiscord.configs.get("ot-ticket-approval:config")

            //mention the requester and optionally ping a staff role
            const content = [discord.userMention(request.userId)]
            if (request.status == "pending" && config.data.notifyRoleId.length > 0) content.push(discord.roleMention(config.data.notifyRoleId))
            instance.setContent(content.join(" "))

            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-ticket-approval:request-embed").build(origin, {guild, channel, request}))
            instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-ticket-approval:approve-button").build(origin, {guild, channel, request}))
            instance.addComponent(await opendiscord.builders.buttons.getSafe("ot-ticket-approval:reject-button").build(origin, {guild, channel, request}))
        })
    )
})

//REPLACE THE REPLY MEMBERS RECEIVE WHEN THEIR TICKET CREATION IS BLOCKED
opendiscord.events.get("afterMessageBuildersLoaded").listen((messages) => {
    const errorBuilder = messages.get("opendiscord:error")
    if (!errorBuilder) return

    errorBuilder.workers.add(
        new api.ODWorker("ot-ticket-approval:requester-notice",-100,async (instance,params) => {
            //Open Ticket uses this error when a ticket creation worker cancels the creation
            if (!params.error.includes("Unable to receive ticket or channel from callback")) return
            const notice = takeRequesterNotice(params.user.id)
            if (!notice) return

            instance.setEmbeds(await createNoticeEmbed(params.user, notice.kind))
            instance.setComponents()
            instance.setEphemeral(true)
        })
    )
})

//REGISTER THE REJECTION REASON MODAL
opendiscord.events.get("onModalComponentLoad").listen(() => {
    const modals = opendiscord.components.modals

    modals.add(new api.ODComponentFactory("ot-ticket-approval:reject-reason"))
    modals.get("ot-ticket-approval:reject-reason").workers.add(
        new api.ODWorker("ot-ticket-approval:reject-reason",0,(instance,params) => {
            const {channel, messageId} = params
            const config = opendiscord.configs.get("ot-ticket-approval:config")

            const modal = instance.setComponent(new api.ODModalComponent("ot-ticket-approval:reject-reason",{
                customId:`ot-ticket-approval:reject-reason|${channel.id}|${messageId}`,
                title:"Reject ticket request"
            }))

            const reasonComponent = new api.ODLabelComponent("reason",{
                title:"Reason for rejecting",
                description:"This reason is sent to the member in a direct message."
            })
            reasonComponent.setComponent(new api.ODParagraphInputComponent("reason",{
                customId:"reason",
                required:config.data.requireReasonOnReject,
                placeholder:"Example: this question is answered in our FAQ channel."
            }))
            modal.addComponent(reasonComponent,"end")
        })
    )
})

//REQUIRE STAFF APPROVAL BEFORE A TICKET CAN BE CREATED
opendiscord.events.get("afterActionsLoaded").listen((actions) => {
    actions.get("opendiscord:create-ticket").workers.add(
        new api.ODWorker("ot-ticket-approval:require-approval",100,async (instance,params,origin,cancel) => {
            const config = opendiscord.configs.get("ot-ticket-approval:config")
            if (!config.data.enabled) return

            const {guild, user, option, answers} = params

            //this ticket was just approved by a staff member
            if (approvedCreations.delete(creationKey(user.id, option.id.value))) return

            //staff members can skip the approval
            if (config.data.staffBypassApproval && await isApprover(user, null, null, guild)) return

            //find the approval channel
            const channel = await opendiscord.client.fetchGuildTextChannel(guild.id, config.data.approvalChannelId)
            if (!channel) {
                opendiscord.log("Ticket approval error: the approval channel could not be found!","error",[
                    {key:"userid",value:user.id,hidden:true},
                    {key:"channelid",value:config.data.approvalChannelId,hidden:true},
                    {key:"option",value:option.id.value}
                ])
                if (config.data.allowTicketsWhenChannelInvalid) return
                setRequesterNotice(user.id, "blocked")
                return cancel()
            }

            //don't queue the same request twice
            if (await findPendingRequest(user.id, option.id.value)) {
                setRequesterNotice(user.id, "duplicate")
                return cancel()
            }

            //create the request and send it to the staff approval channel
            const request:OTApprovalRequestData = {
                userId:user.id,
                optionId:option.id.value,
                answers:answers,
                origin:(origin == "panel-button" || origin == "panel-dropdown" || origin == "slash" || origin == "text") ? origin : "other",
                createdAt:new Date().getTime(),
                status:"pending",
                handledById:null,
                handledAt:null,
                rejectReason:null
            }

            try {
                const build = await buildRequestMessage(guild, channel, request)
                const message = await channel.send(build.message)
                await opendiscord.states.get("ot-ticket-approval:requests").setMsgState({channel:message.channel, message}, request, false)
            } catch (err) {
                opendiscord.log("Ticket approval error: unable to send the request to the approval channel!","error",[
                    {key:"userid",value:user.id,hidden:true},
                    {key:"error",value:String(err)}
                ])
                if (config.data.allowTicketsWhenChannelInvalid) return
                setRequesterNotice(user.id, "blocked")
                return cancel()
            }

            opendiscord.log(user.displayName+" requested a ticket!","info",[
                {key:"user",value:user.username},
                {key:"userid",value:user.id,hidden:true},
                {key:"option",value:option.id.value},
                {key:"method",value:origin}
            ])

            setRequesterNotice(user.id, "queued")
            cancel()
        })
    )
})

//RESPOND TO THE APPROVE & REJECT BUTTONS
opendiscord.events.get("onButtonResponderLoad").listen((buttons) => {
    buttons.add(new api.ODButtonResponder("ot-ticket-approval:approve","ot-ticket-approval:approve"))
    buttons.get("ot-ticket-approval:approve").workers.add(
        new api.ODWorker("ot-ticket-approval:approve",0,async (instance,params,origin,cancel) => {
            const {guild, channel, user, member, message} = instance
            const config = opendiscord.configs.get("ot-ticket-approval:config")

            //this plugin only works inside a server
            if (!guild || channel.isDMBased()) return cancel()

            //only staff members may approve requests
            if (!await isApprover(user, member, channel, guild)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:["support"]}))
                return cancel()
            }

            //get the request of this approval message
            const state = opendiscord.states.get("ot-ticket-approval:requests")
            const msgState = await state.getMsgState({channel, message})
            if (!msgState) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"Message State Expired", error:"This approval message is no longer valid."}))
                return cancel()
            }

            const request = msgState.data
            if (request.status != "pending") {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"Already handled", error:`This request was already ${(request.status == "approved") ? "approved" : "rejected"}.`}))
                return cancel()
            }
            if (isExpired(msgState.createdDate)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"Request expired", error:"This ticket request is too old to be approved. Ask the member to request again."}))
                return cancel()
            }

            //validate the category & requester before creating the ticket
            const option = opendiscord.options.get(request.optionId)
            if (!option || !(option instanceof api.ODTicketOption)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-option-unknown").build(origin, {guild, channel, user}))
                return cancel()
            }
            const requester = await opendiscord.client.fetchUser(request.userId)
            if (!requester) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"User unavailable", error:"The requester of this ticket could no longer be found."}))
                return cancel()
            }
            if (!await opendiscord.client.fetchGuildMember(guild.id, requester.id)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"User unavailable", error:`${requester.displayName} left this server, so the ticket can't be opened.`}))
                return cancel()
            }

            //create the ticket
            await instance.defer("update",false)
            const key = creationKey(requester.id, option.id.value)
            approvedCreations.add(key)

            let result:Partial<api.ODActionManagerIdMappings["opendiscord:create-ticket"]["result"]>|null = null
            try {
                result = await opendiscord.actions.get("opendiscord:create-ticket").run(request.origin, {guild, user:requester, option, answers:request.answers})
            } finally {
                approvedCreations.delete(key)
            }

            if (!result || !result.channel || !result.ticket) {
                await channel.send((await createNoticeMessage(user, "blocked")).message)
                return cancel()
            }

            //show who approved this request
            request.status = "approved"
            request.handledById = user.id
            request.handledAt = new Date().getTime()
            await state.setMsgState({channel, message}, request, false)
            await instance.update(await buildRequestMessage(guild, channel, request))

            //tell the requester their ticket is open
            if (config.data.dmRequesterOnApprove) {
                const generalConfig = opendiscord.configs.get("opendiscord:general")
                const dm = await new api.ODQuickMessage("ot-ticket-approval:approved-dm", {
                    embeds:[await new api.ODQuickEmbed("ot-ticket-approval:approved-dm-embed", {
                        color:generalConfig.data.mainColor,
                        title:utilities.emojiTitle("✅","Your ticket request was approved"),
                        description:`${result.channel} is now open. Go ahead and describe your issue there!`,
                        timestamp:new Date()
                    }).build()]
                }).build()
                const sent = await opendiscord.client.sendUserDm(requester, dm)
                if (!sent.success) {
                    await channel.send((await new api.ODQuickMessage("ot-ticket-approval:dm-failed", {
                        embeds:[await new api.ODQuickEmbed("ot-ticket-approval:dm-failed-embed", {
                            color:"Orange",
                            title:utilities.emojiTitle("⚠️","Direct message blocked"),
                            description:`The ticket was created for ${requester}, but they can't be notified because their direct messages are closed.`
                        }).build()]
                    }).build()).message)
                }
            }

            opendiscord.log(user.displayName+" approved a ticket request!","info",[
                {key:"staff",value:user.username},
                {key:"staffid",value:user.id,hidden:true},
                {key:"user",value:requester.username},
                {key:"userid",value:requester.id,hidden:true},
                {key:"option",value:option.id.value},
                {key:"channel",value:"#"+result.channel.name},
                {key:"channelid",value:result.channel.id,hidden:true}
            ])
        })
    )

    buttons.add(new api.ODButtonResponder("ot-ticket-approval:reject","ot-ticket-approval:reject"))
    buttons.get("ot-ticket-approval:reject").workers.add(
        new api.ODWorker("ot-ticket-approval:reject",0,async (instance,params,origin,cancel) => {
            const {guild, channel, user, member, message} = instance

            if (!guild || channel.isDMBased()) return cancel()
            if (!await isApprover(user, member, channel, guild)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:["support"]}))
                return cancel()
            }

            const state = opendiscord.states.get("ot-ticket-approval:requests")
            const msgState = await state.getMsgState({channel, message})
            if (!msgState) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"Message State Expired", error:"This approval message is no longer valid."}))
                return cancel()
            }
            if (msgState.data.status != "pending") {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel, user, layout:"simple", customTitle:"Already handled", error:`This request was already ${(msgState.data.status == "approved") ? "approved" : "rejected"}.`}))
                return cancel()
            }

            //ask the staff member for a rejection reason
            await instance.modal(await opendiscord.components.modals.get("ot-ticket-approval:reject-reason").build("other", {guild, channel, messageId:message.id}))
        })
    )
})

//RESPOND TO THE REJECTION REASON MODAL
opendiscord.events.get("onModalResponderLoad").listen((modals) => {
    modals.add(new api.ODModalResponder("ot-ticket-approval:reject-reason",/^ot-ticket-approval:reject-reason\|([^|]+)\|([^|]+)/))
    modals.get("ot-ticket-approval:reject-reason").workers.add(
        new api.ODWorker("ot-ticket-approval:reject-reason",0,async (instance,params,origin,cancel) => {
            const {guild, user} = instance

            const match = /^ot-ticket-approval:reject-reason\|([^|]+)\|([^|]+)/.exec(instance.interaction.customId)
            const fallbackChannel = instance.channel
            if (!match || !guild || !fallbackChannel) return cancel()

            const approvalChannel = await opendiscord.client.fetchGuildTextChannel(guild.id, match[1])
            const approvalMessage = await opendiscord.client.fetchChannelMessage(match[1], match[2])
            if (!approvalChannel || !approvalMessage) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel:fallbackChannel, user, layout:"simple", customTitle:"Message State Expired", error:"The approval message of this request could no longer be found."}))
                return cancel()
            }

            if (!await isApprover(user, instance.member, approvalChannel, guild)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel:approvalChannel, user, permissions:["support"]}))
                return cancel()
            }

            const state = opendiscord.states.get("ot-ticket-approval:requests")
            const msgState = await state.getMsgState({channel:approvalChannel, message:approvalMessage})
            if (!msgState) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel:approvalChannel, user, layout:"simple", customTitle:"Message State Expired", error:"This approval message is no longer valid."}))
                return cancel()
            }

            const request = msgState.data
            if (request.status != "pending") {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel:approvalChannel, user, layout:"simple", customTitle:"Already handled", error:`This request was already ${(request.status == "approved") ? "approved" : "rejected"}.`}))
                return cancel()
            }
            if (isExpired(msgState.createdDate)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(origin, {guild, channel:approvalChannel, user, layout:"simple", customTitle:"Request expired", error:"This ticket request is too old to be rejected."}))
                return cancel()
            }

            //save the rejection
            const config = opendiscord.configs.get("ot-ticket-approval:config")
            request.status = "rejected"
            request.handledById = user.id
            request.handledAt = new Date().getTime()
            request.rejectReason = instance.values.getTextField("reason", false) ?? "/"
            await state.setMsgState({channel:approvalChannel, message:approvalMessage}, request, false)

            await instance.defer("update",false)
            await instance.update(await buildRequestMessage(guild, approvalChannel, request))

            //dm the requester about the rejection
            const requester = await opendiscord.client.fetchUser(request.userId)
            if (requester && config.data.dmRequesterOnReject) {
                const generalConfig = opendiscord.configs.get("opendiscord:general")
                const dm = await new api.ODQuickMessage("ot-ticket-approval:rejected-dm", {
                    embeds:[await new api.ODQuickEmbed("ot-ticket-approval:rejected-dm-embed", {
                        color:generalConfig.data.mainColor,
                        title:utilities.emojiTitle("❌","Your ticket request was rejected"),
                        description:`Your ticket request was reviewed by our staff team and unfortunately rejected.\n\n**Reason:**\n${(request.rejectReason ?? "/").slice(0,900)}`,
                        timestamp:new Date()
                    }).build()]
                }).build()
                const sent = await opendiscord.client.sendUserDm(requester, dm)
                if (!sent.success) {
                    await approvalChannel.send((await new api.ODQuickMessage("ot-ticket-approval:dm-failed", {
                        embeds:[await new api.ODQuickEmbed("ot-ticket-approval:dm-failed-embed", {
                            color:"Orange",
                            title:utilities.emojiTitle("⚠️","Direct message blocked"),
                            description:`${requester} could not be notified of this rejection because their direct messages are closed.`
                        }).build()]
                    }).build()).message)
                }
            }

            opendiscord.log(user.displayName+" rejected a ticket request!","info",[
                {key:"staff",value:user.username},
                {key:"staffid",value:user.id,hidden:true},
                {key:"userid",value:request.userId,hidden:true},
                {key:"option",value:request.optionId},
                {key:"reason",value:request.rejectReason ?? "/"}
            ])
        })
    )
})
