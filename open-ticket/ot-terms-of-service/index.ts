import { api, opendiscord, openticketUtils, utilities } from "#opendiscord"
import * as discord from "discord.js"
import fs from "fs"
import path from "path"
import crypto from "crypto"

//DECLARATION
export interface OTTermsAcceptance {
    userId:string,
    accepted:boolean,
    date:number,
    termsHash:string //deny on change of terms
}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-terms-of-service":api.ODPlugin
    }
    export interface ODSlashCommandManagerIdMappings {
        "ot-terms-of-service:terms":api.ODSlashCommand
    }
    export interface ODCommandResponderManagerIdMappings {
        "ot-terms-of-service:terms":{origin:"slash"|"text", params:{}, workers:"ot-terms-of-service:terms"|"ot-terms-of-service:logs"},
    }
    export interface ODEmbedManagerIdMappings {
        "ot-terms-of-service:terms-embed":{origin:"slash"|"text"|"other", params:{}, workers:"ot-terms-of-service:terms-embed"},
    }
    export interface ODButtonManagerIdMappings {
        "ot-terms-of-service:accept-button":{origin:"slash"|"text"|"other", params:{private:boolean}, workers:"ot-terms-of-service:accept-button"},
        "ot-terms-of-service:deny-button":{origin:"slash"|"text"|"other", params:{private:boolean}, workers:"ot-terms-of-service:deny-button"},
    }
    export interface ODConfigManagerIdMappings {
        "ot-terms-of-service:config":OTTermsOfServiceConfig
    }
    export interface ODCheckerManagerIdMappings {
        "ot-terms-of-service:config":api.ODChecker
    }
    export interface ODUsersDatabaseIdMappings {
        "ot-terms-of-service:acceptance":OTTermsAcceptance;
    }
    export interface ODButtonResponderManagerIdMappings {
        "ot-terms-of-service:decision":{origin:"button", params:{}, workers:"ot-terms-of-service:decision"},
    }
}
class OTTermsOfServiceConfig extends api.ODJsonCommentsConfig<{
    restrictTickets:boolean,
    ignoredTicketOptionIds:string[],
    resetOnChangedTerms:boolean,
    assignedRoles:string[],
    command:{
        enabled:boolean,
        adminRoles:string[]
    },
    termsEmbed:{
        title:string,
        emoji:string,
        customColor:string,
        url:string,

        image:string,
        thumbnail:string,

        footer:string
    }
}> {}


//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTTermsOfServiceConfig("ot-terms-of-service:config", "config.jsonc", "./plugins/ot-terms-of-service/"))
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-terms-of-service:config")
    checkers.add(new api.ODChecker("ot-terms-of-service:config", checkers.storage, 0, config, new api.ODCheckerObjectStructure("ot-terms-of-service:config", {children:[
        {key:"restrictTickets", checker:new api.ODCheckerBooleanStructure("ot-terms-of-service:restrict-tickets", {})},
        {key:"ignoredTicketOptionIds", checker:new api.ODCheckerCustomStructure_UniqueIdArray("opendiscord:ignored-ticket-options", "openticket", "option-ids", "option-ids-used", {allowDoubles:false, maxLength:25, cliDisplayPropertyName:"option"}, {cliDisplayName:"Option ID", cliDisplayDescription:"A valid option ID from the options.jsonc config.", cliAutocompleteFunc:async () => {
            const uncheckedRawData = opendiscord.configs.get("opendiscord:options").data
            if (!Array.isArray(uncheckedRawData)) return null
            const idList = uncheckedRawData.filter((option) => typeof option === "object" && typeof option["id"] === "string").map((option) => option.id)
            return (idList.length > 0) ? idList : null
        }})},
        {key:"resetOnChangedTerms", checker:new api.ODCheckerBooleanStructure("ot-terms-of-service:reset-on-change", {})},
        {key:"assignedRoles", checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-terms-of-service:assigned-roles", "role", [], {})},
        {key:"command", checker:new api.ODCheckerEnabledObjectStructure("ot-terms-of-service:command", {property:"enabled", enabledValue:true, ignoreCheckIfDisabled:true, checker:new api.ODCheckerObjectStructure("ot-terms-of-service:command", {children:[
            {key:"adminRoles", checker:new api.ODCheckerCustomStructure_DiscordIdArray("ot-terms-of-service:command-allowed-roles", "role", [], {})}
        ]})})},
        {key:"termsEmbed", checker:new api.ODCheckerObjectStructure("ot-terms-of-service:terms-embed", {children:[
            {key:"title", checker:new api.ODCheckerStringStructure("opendiscord:terms-embed-text", {maxLength:256, cliDisplayName:"Title", cliDisplayDescription:"The title of this embed."})},
            {key:"emoji", checker:new api.ODCheckerCustomStructure_EmojiString("opendiscord:terms-embed-emoji", 0, 1, true, {})},
            {key:"customColor", checker:new api.ODCheckerCustomStructure_HexColor("opendiscord:terms-embed-color", true, true, {cliDisplayName:"Custom Color", cliDisplayDescription:"Set a custom color for this embed. When empty, the default bot color will be used."})},
            {key:"url", checker:new api.ODCheckerCustomStructure_UrlString("opendiscord:terms-embed-url", true, {allowHttp:false}, {cliDisplayName:"URL", cliDisplayDescription:"Set a URL which will be displayed in the title of the embed."})},

            {key:"image", checker:new api.ODCheckerCustomStructure_UrlString("opendiscord:terms-embed-image", true, {allowHttp:false, allowedExtensions:[".png", ".jpg", ".jpeg", ".webp", ".gif"]}, {cliDisplayName:"Image", cliDisplayDescription:"Add an image to the embed using an image URL."})},
            {key:"thumbnail", checker:new api.ODCheckerCustomStructure_UrlString("opendiscord:terms-embed-thumbnail", true, {allowHttp:false, allowedExtensions:[".png", ".jpg", ".jpeg", ".webp", ".gif"]}, {cliDisplayName:"Thumbnail", cliDisplayDescription:"Add a thumbnail to the embed using an image URL."})},

            {key:"footer", checker:new api.ODCheckerStringStructure("opendiscord:terms-embed-footer", {maxLength:2048, cliDisplayName:"Footer", cliDisplayDescription:"The footer of this embed."})}
        ]})}
    ]})))
})

//GET TERMS OF SERVICE
function fetchTermsOfServiceMarkdown() {
    if (!fs.existsSync(path.join(process.cwd(), "./plugins/ot-terms-of-service/TERMS.md"))) throw new api.ODPluginError("./plugins/ot-terms-of-service/TERMS.md not found. Unable to load terms of service.")

    const contents = fs.readFileSync(path.join(process.cwd(), "./plugins/ot-terms-of-service/TERMS.md")).toString().slice(0, 4090)
    return contents
}
function createTermsHash(terms:string) {
    return crypto.createHash("sha256").update(terms).digest("hex")
}
function isTermsHashUpToDate(hash:string) {
    const config = opendiscord.configs.get("ot-terms-of-service:config")
    return (hash === createTermsHash(fetchTermsOfServiceMarkdown())) || !config.data.resetOnChangedTerms
}

async function getTermsAcceptance(user:discord.User): Promise<OTTermsAcceptance|null> {
    const database = opendiscord.databases.get("opendiscord:users")
    return await database.get("ot-terms-of-service:acceptance", user.id) ?? null
}
async function setTermsAcceptance(user:discord.User, accepted:boolean) {
    const database = opendiscord.databases.get("opendiscord:users")
    const terms: OTTermsAcceptance = {
        userId:user.id,
        accepted,
        date:new Date().getTime(),
        termsHash:createTermsHash(fetchTermsOfServiceMarkdown())
    }

    await database.set("ot-terms-of-service:acceptance", user.id, terms)
    opendiscord.log(user.displayName + " " + (accepted ? "accepted" : "denied") + " the Terms of Service", "plugin", [
        {key:"user", value:user.username},
        {key:"userid", value:user.id, hidden:true}
    ])
}

//REGISTER SLASH COMMAND
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    const config = opendiscord.configs.get("ot-terms-of-service:config")

    if (config.data.command.enabled) slash.add(new api.ODSlashCommand("ot-terms-of-service:terms", {
        name:"terms",
        description:"Send or manage the Terms Of Service.",
        type:discord.ApplicationCommandType.ChatInput,
        contexts:[discord.InteractionContextType.Guild],
        integrationTypes:[discord.ApplicationIntegrationType.GuildInstall],
        options:[
            {
                type:discord.ApplicationCommandOptionType.Subcommand,
                name:"view",
                description:"View and accept the Terms Of Service privately."
            },
            {
                type:discord.ApplicationCommandOptionType.Subcommand,
                name:"send",
                description:"Send the Terms Of Service in this channel.",
                options:[
                    {
                        type:discord.ApplicationCommandOptionType.Boolean,
                        name:"withoutbuttons",
                        description:"Send the Terms Of Service without buttons (embed only).",
                        required:false
                    }
                ]
            },
            {
                type:discord.ApplicationCommandOptionType.Subcommand,
                name:"check",
                description:"Check if someone has accepted the Terms Of Service.",
                options:[
                    {
                        type:discord.ApplicationCommandOptionType.User,
                        name:"user",
                        description:"The user to check.",
                        required:true
                    }
                ]
            },
            {
                type:discord.ApplicationCommandOptionType.Subcommand,
                name:"accept",
                description:"Manually accept the Terms Of Service for a user.",
                options:[
                    {
                        type:discord.ApplicationCommandOptionType.User,
                        name:"user",
                        description:"The user to change.",
                        required:true
                    }
                ]
            },
            {
                type:discord.ApplicationCommandOptionType.Subcommand,
                name:"deny",
                description:"Manually deny the Terms Of Service for a user.",
                options:[
                    {
                        type:discord.ApplicationCommandOptionType.User,
                        name:"user",
                        description:"The user to change.",
                        required:true
                    }
                ]
            }
        ]
    }))
})

//REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-terms-of-service:terms", 0, {
        slashName:"terms",
        slashDescription:"Send or manage the Terms Of Service."
    }))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const config = opendiscord.configs.get("ot-terms-of-service:config")
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    embeds.add(new api.ODEmbed("ot-terms-of-service:terms-embed"))
    embeds.get("ot-terms-of-service:terms-embed").workers.add(new api.ODWorker("ot-terms-of-service:terms-embed", 0, (instance, params, origin, cancel) => {
        instance.setTitle(utilities.emojiTitle(config.data.termsEmbed.emoji, config.data.termsEmbed.title))
        instance.setColor((config.data.termsEmbed.customColor || generalConfig.data.mainColor))
        instance.setDescription(fetchTermsOfServiceMarkdown())

        if (config.data.termsEmbed.url) instance.setUrl(config.data.termsEmbed.url)
        if (config.data.termsEmbed.image) instance.setImage(config.data.termsEmbed.image)
        if (config.data.termsEmbed.thumbnail) instance.setThumbnail(config.data.termsEmbed.thumbnail)
        if (config.data.termsEmbed.footer) instance.setFooter(config.data.termsEmbed.footer)
    }))
})

//REGISTER BUTTON BUILDER
opendiscord.events.get("onButtonBuilderLoad").listen((buttons) => {
    const config = opendiscord.configs.get("ot-terms-of-service:config")
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    buttons.add(new api.ODButton("ot-terms-of-service:accept-button"))
    buttons.get("ot-terms-of-service:accept-button").workers.add(new api.ODWorker("ot-terms-of-service:accept-button", 0, (instance, params, origin, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("✅")
        instance.setLabel("Accept Terms")
        instance.setCustomId("ot-terms-of-service:accept" + ((params.private) ? "|private" : ""))
    }))

    buttons.add(new api.ODButton("ot-terms-of-service:deny-button"))
    buttons.get("ot-terms-of-service:deny-button").workers.add(new api.ODWorker("ot-terms-of-service:deny-button", 0, (instance, params, origin, cancel) => {
        instance.setMode("button")
        instance.setColor("gray")
        instance.setEmoji("❌")
        instance.setLabel("Deny Terms")
        instance.setCustomId("ot-terms-of-service:deny" + ((params.private) ? "|private" : ""))
    }))
})

//REGISTER COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const config = opendiscord.configs.get("ot-terms-of-service:config")

    if (config.data.command.enabled) commands.add(new api.ODCommandResponder("ot-terms-of-service:terms", generalConfig.data.prefix, /^terms/))
    if (config.data.command.enabled) commands.get("ot-terms-of-service:terms").workers.add([
        new api.ODWorker("ot-terms-of-service:terms", 0, async (instance, params, origin, cancel) => {
            const {guild, channel, user, member} = instance
            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(origin, {channel, user}))
                return cancel()
            }
            const subcommand = instance.options.getSubCommand() as "view"|"send"|"accept"|"deny"|"check"

            if (subcommand === "view"){
                //allow everyone to edit their own preference
                const currentState = await getTermsAcceptance(user)
                const isAccepted = (currentState && currentState.accepted && isTermsHashUpToDate(currentState.termsHash))

                await instance.reply(await new api.ODQuickMessage("ot-terms-of-service:terms-send", {
                    ephemeral:true,
                    embeds:[await opendiscord.builders.embeds.getSafe("ot-terms-of-service:terms-embed").build(origin, {})],
                    components:[
                        await opendiscord.builders.buttons.getSafe("ot-terms-of-service:deny-button").build(origin, {private:true}),
                        await opendiscord.builders.buttons.getSafe("ot-terms-of-service:accept-button").build(origin, {private:true})
                    ],
                    content:isAccepted ? "**Current Status:** ✅ Accepted" : "**Current Status:** ❌ Denied"
                }).build())

            }else{
                //check permissions
                if (!config.data.command.adminRoles.some((roleId) => member.roles.cache.has(roleId))){
                    instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin, {guild, channel, user, permissions:["admin"]}))
                    return cancel()
                }

                if (subcommand === "check"){
                    //check the terms status of a user
                    const termsUser = instance.options.getUser("user", true)
                    const currentState = await getTermsAcceptance(termsUser)
                    const isAccepted = (currentState && currentState.accepted && isTermsHashUpToDate(currentState.termsHash))

                    await instance.reply(await new api.ODQuickMessage("ot-terms-of-service:terms-send", {
                        ephemeral:true,
                        embeds:isAccepted ? [
                            await new api.ODQuickEmbed("ot-terms-of-service:check-accepted", {
                                title:utilities.emojiTitle("✅", "User Terms Accepted"),
                                description:discord.userMention(termsUser.id) + " has **accepted** the Terms Of Service.",
                                color:generalConfig.data.mainColor
                            }).build()
                        ] : [
                            await new api.ODQuickEmbed("ot-terms-of-service:check-denied", {
                                title:utilities.emojiTitle("❌", "User Terms Denied"),
                                description:discord.userMention(termsUser.id) + " has **denied** the Terms Of Service.",
                                color:generalConfig.data.mainColor,
                                footerText:"He/she may not be able to create tickets."
                            }).build()
                        ]
                    }).build())


                }else if (subcommand === "send"){
                    //send the terms embed globally with buttons
                    const withoutButtons = instance.options.getBoolean("withoutbuttons", false)
                    await instance.reply(await new api.ODQuickMessage("ot-terms-of-service:terms-send", {
                        content:"### The terms of service have been sent.",
                        ephemeral:true
                    }).build())

                    if (channel.isSendable()) await channel.send((await new api.ODQuickMessage("ot-terms-of-service:terms-send", {
                        embeds:[await opendiscord.builders.embeds.getSafe("ot-terms-of-service:terms-embed").build(origin, {})],
                        components:(withoutButtons) ? [] : [
                            await opendiscord.builders.buttons.getSafe("ot-terms-of-service:deny-button").build(origin, {private:false}),
                            await opendiscord.builders.buttons.getSafe("ot-terms-of-service:accept-button").build(origin, {private:false})
                        ]
                    }).build()).message)

                }else if (subcommand === "accept"){
                    //update the terms status of a user
                    const termsUser = instance.options.getUser("user", true)
                    await setTermsAcceptance(termsUser, true)
                    const termsMember = await opendiscord.client.fetchGuildMember(guild, termsUser.id)
                    if (termsMember && config.data.assignedRoles.length > 0) await termsMember.roles.add(config.data.assignedRoles)

                    await instance.reply(await new api.ODQuickMessage("ot-terms-of-service:user-accepted", {
                        ephemeral:true,
                        embeds:[await new api.ODQuickEmbed("ot-terms-of-service:user-accepted", {
                            title:utilities.emojiTitle("✅", "User Terms Accepted"),
                            description:discord.userMention(termsUser.id) + " has now accepted the terms of service.",
                            color:generalConfig.data.mainColor
                        }).build()]
                    }).build())

                }else if (subcommand === "deny"){
                    //update the terms status of a user
                    const termsUser = instance.options.getUser("user", true)
                    await setTermsAcceptance(termsUser, false)
                    const termsMember = await opendiscord.client.fetchGuildMember(guild, termsUser.id)
                    if (termsMember && config.data.assignedRoles.length > 0) await termsMember.roles.remove(config.data.assignedRoles)

                    await instance.reply(await new api.ODQuickMessage("ot-terms-of-service:user-denied", {
                        ephemeral:true,
                        embeds:[await new api.ODQuickEmbed("ot-terms-of-service:user-denied", {
                            title:utilities.emojiTitle("❌", "User Terms Denied"),
                            description:discord.userMention(termsUser.id) + " has now denied the terms of service.",
                            color:generalConfig.data.mainColor
                        }).build()]
                    }).build())

                }
            }
        }),
        new api.ODWorker("ot-terms-of-service:logs", -1, (instance, params, origin, cancel) => {
            const subcommand = instance.options.getSubCommand()!
            opendiscord.log(instance.user.displayName + " used the 'terms " + subcommand + "' command!", "plugin", [
                {key:"user", value:instance.user.username},
                {key:"userid", value:instance.user.id, hidden:true},
                {key:"channelid", value:instance.channel.id, hidden:true},
                {key:"method", value:origin}
            ])
        })
    ])
})

//REGISTER BUTTON RESPONDER
opendiscord.events.get("onButtonResponderLoad").listen((buttons) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const config = opendiscord.configs.get("ot-terms-of-service:config")

    buttons.add(new api.ODButtonResponder("ot-terms-of-service:decision", /^ot-terms-of-service:(accept|deny)(\|private)?$/))
    buttons.get("ot-terms-of-service:decision").workers.add(new api.ODWorker("ot-terms-of-service:decision", 0, async (instance, params, origin, cancel) => {
        const {channel, user} = instance
        const guild = opendiscord.client.mainServer
        const member = (guild) ? await opendiscord.client.fetchGuildMember(guild, user.id) : null


        if (!guild || !member){
            instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(origin, {channel, user}))
            return cancel()
        }

        const isAccepted = instance.interaction.customId.includes(":accept")
        const isPrivate = instance.interaction.customId.includes("|private")
        await setTermsAcceptance(instance.user, isAccepted)

        if (isAccepted){
            if (config.data.assignedRoles.length > 0) await member.roles.add(config.data.assignedRoles)
        }else{
            if (config.data.assignedRoles.length > 0) await member.roles.remove(config.data.assignedRoles)
        }

        const msg = await new api.ODQuickMessage("ot-terms-of-service:result", {
            ephemeral:true,
            embeds:isAccepted ? [
                await new api.ODQuickEmbed("ot-terms-of-service:button-accepted", {
                    title:utilities.emojiTitle("✅", "Terms Accepted"),
                    description:"You have **accepted** the Terms Of Service.",
                    color:generalConfig.data.mainColor
                }).build()
            ] : [
                await new api.ODQuickEmbed("ot-terms-of-service:button-denied", {
                    title:utilities.emojiTitle("❌", "Terms Denied"),
                    description:"You have **denied** the Terms Of Service.",
                    color:generalConfig.data.mainColor,
                    footerText:"You may not be able to create tickets."
                }).build()
            ]
        }).build()
        if (isPrivate) await instance.update(msg)
        else await instance.reply(msg)
    }))
})

//TICKET RESTRICTIONS
opendiscord.events.get("afterActionsLoaded").listen((actions) => {
    const config = opendiscord.configs.get("ot-terms-of-service:config")

    actions.get("opendiscord:create-ticket-permissions").workers.add(new api.ODWorker("ot-terms-of-service:check-terms", 5, async (instance, params, origin, cancel) => {
        if (!config.data.restrictTickets) return
        if (config.data.ignoredTicketOptionIds.includes(params.option.id.value)) return

        const currentState = await getTermsAcceptance(params.user)
        const isAccepted = (currentState && currentState.accepted && isTermsHashUpToDate(currentState.termsHash))
        if (isAccepted) return

        //send DM with accept terms
        try {
            const dm = await params.user.createDM(true)
            await dm.send((await new api.ODQuickMessage("ot-terms-of-service:terms-send", {
                embeds:[await opendiscord.builders.embeds.getSafe("ot-terms-of-service:terms-embed").build("other", {})],
                components:[
                    await opendiscord.builders.buttons.getSafe("ot-terms-of-service:deny-button").build("other", {private:true}),
                    await opendiscord.builders.buttons.getSafe("ot-terms-of-service:accept-button").build("other", {private:true})
                ],
                content:isAccepted ? "**Current Status:** ✅ Accepted" : "**Current Status:** ❌ Denied"
            }).build()).message)
        }catch {
            opendiscord.log("Failed to send Terms Of Service in DM to " + params.user.displayName, "error")
        }

        instance.valid = false
        instance.reason = "custom"
        instance.customReason = "You have not accepted the Terms of Service yet."
        opendiscord.log(params.user.displayName + " tried to create a ticket, but has not accepted the Terms Of Service!", "info", [
            {key:"user", value:params.user.username},
            {key:"userid", value:params.user.id, hidden:true},
            {key:"option", value:params.option.id.value},
            {key:"limit", value:"terms-of-service"}
        ])
        return cancel()
    }))
})