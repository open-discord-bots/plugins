import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";

// Check Open Ticket
if (!opendiscord.tickets) {
    throw new api.ODPluginError("This plugin only works in Open Ticket.");
}

// Configuration types
export interface EmbedConfig {
    title: string;
    description: string;
    footer: string;
    image: string;
    thumbnail: string;
    color: string;
}

export interface OTCloseRequestConfigData {
    admin_roles: string[];
    ticket_options: string[];
    log_channel_id: string;
    embeds: {
        request: EmbedConfig;
        agreed: EmbedConfig;
        declined: EmbedConfig;
    };
}

// Type declarations
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-close-request": api.ODPlugin;
    }
    export interface ODConfigManagerIds_Default {
        "ot-close-request:config": api.ODJsonConfig<OTCloseRequestConfigData>;
    }
    export interface ODCheckerManagerIds_Default {
        "ot-close-request:config": api.ODChecker;
    }
    export interface ODSlashCommandManagerIds_Default {
        "ot-close-request:close-request": api.ODSlashCommand;
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-close-request:close-request": api.ODTextCommand;
    }
    export interface ODCommandResponderManagerIds_Default {
        "ot-close-request:close-request": {
            source: "slash" | "text";
            params: {};
            workers: "ot-close-request:close-request" | "ot-close-request:logs";
        };
    }
    export interface ODButtonResponderManagerIds_Default {
        "ot-close-request:agree": {
            source: "button";
            params: {};
            workers: "ot-close-request:agree";
        };
        "ot-close-request:decline": {
            source: "button";
            params: {};
            workers: "ot-close-request:decline";
        };
    }
    export interface ODMessageManagerIds_Default {
        "ot-close-request:success-message": {
            source: "slash" | "text" | "other";
            params: {};
            workers: "ot-close-request:success-message";
        };
    }
}

// Register config
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new api.ODJsonConfig<OTCloseRequestConfigData>("ot-close-request:config", "config.json", "./plugins/ot-close-request/"));
});

// Register config checker
function createEmbedCheckerStructure(id: string) {
    return new api.ODCheckerObjectStructure(id, {
        children: [
            { key: "title", optional: false, priority: 0, checker: new api.ODCheckerStringStructure(`${id}-title`, { maxLength: 256 }) },
            { key: "description", optional: false, priority: 0, checker: new api.ODCheckerStringStructure(`${id}-description`, { maxLength: 4096 }) },
            { key: "footer", optional: false, priority: 0, checker: new api.ODCheckerStringStructure(`${id}-footer`, { maxLength: 2048 }) },
            { key: "image", optional: false, priority: 0, checker: new api.ODCheckerCustomStructure_UrlString(`${id}-image`, true, { allowHttp: false }) },
            { key: "thumbnail", optional: false, priority: 0, checker: new api.ODCheckerCustomStructure_UrlString(`${id}-thumbnail`, true, { allowHttp: false }) },
            { key: "color", optional: false, priority: 0, checker: new api.ODCheckerStringStructure(`${id}-color`, { regex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})?$/ }) }
        ]
    });
}

opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-close-request:config");
    if (!config) return;
    const structure = new api.ODCheckerObjectStructure("ot-close-request:config", {
        children: [
            { key: "admin_roles", optional: false, priority: 0, checker: new api.ODCheckerCustomStructure_DiscordIdArray("ot-close-request:admin-roles", "role", [], { allowDoubles: false }) },
            { key: "ticket_options", optional: false, priority: 0, checker: new api.ODCheckerArrayStructure("ot-close-request:ticket-options", { allowedTypes: ["string"], propertyChecker: new api.ODCheckerStringStructure("ot-close-request:ticket-option", { minLength: 1 }) }) },
            { key: "log_channel_id", optional: false, priority: 0, checker: new api.ODCheckerCustomStructure_DiscordId("ot-close-request:log-channel", "channel", true, [], {}) },
            {
                key: "embeds",
                optional: false,
                priority: 0,
                checker: new api.ODCheckerObjectStructure("ot-close-request:embeds", {
                    children: [
                        { key: "request", optional: false, priority: 0, checker: createEmbedCheckerStructure("ot-close-request:embed-request") },
                        { key: "agreed", optional: false, priority: 0, checker: createEmbedCheckerStructure("ot-close-request:embed-agreed") },
                        { key: "declined", optional: false, priority: 0, checker: createEmbedCheckerStructure("ot-close-request:embed-declined") }
                    ]
                })
            }
        ]
    });
    checkers.add(new api.ODChecker("ot-close-request:config", checkers.storage, 0, config, structure));
});

interface ParsedEmbedConfig {
    title: string;
    description: string;
    footer: string;
    image: string;
    thumbnail: string;
    color: number;
}

function getConfig() {
    const cfg = opendiscord.configs.get("ot-close-request:config");
    const d: Partial<OTCloseRequestConfigData> = cfg ? cfg.data : {};

    const parseEmbed = (key: "request" | "agreed" | "declined", defTitle: string, defDesc: string, defColor: string, defFooter: string): ParsedEmbedConfig => {
        const e: Partial<EmbedConfig> = d.embeds?.[key] ?? {};
        const hex = (e.color ?? defColor).replace(/^#/, "");
        const colorNum = parseInt(hex, 16);
        return {
            title:       e.title       ?? defTitle,
            description: e.description ?? defDesc,
            footer:      e.footer      ?? defFooter,
            image:       e.image       ?? "",
            thumbnail:   e.thumbnail   ?? "",
            color:       isNaN(colorNum) ? parseInt(defColor, 16) : colorNum
        };
    };

    return {
        adminRoles:    Array.isArray(d.admin_roles) ? d.admin_roles.filter(Boolean) : [],
        ticketOptions: Array.isArray(d.ticket_options) ? d.ticket_options.filter(Boolean) : [],
        logChannelId:  d.log_channel_id ?? "",
        embeds: {
            request:  parseEmbed("request",  "Ticket Close Request",   "Staff requested to close this ticket.\n\n**Do you want to close this ticket?**", "5865F2", "Only the ticket creator can respond"),
            agreed:   parseEmbed("agreed",   "Close Request Accepted", "The ticket creator agreed to close this ticket.", "57F287", "Closing ticket"),
            declined: parseEmbed("declined", "Close Request Declined", "The ticket creator declined the request.", "ED4245", "Ticket remains open")
        }
    };
}

// Maps channelId -> active prompt messageId to prevent duplicate active prompts in the same channel
const pendingMessages = new Map<string, string>();

// Permission check
async function hasStaffPermission(user: discord.User, member: discord.GuildMember | null, channel: discord.GuildTextBasedChannel, guild: discord.Guild): Promise<boolean> {
    if (member && (member.permissions.has(discord.PermissionFlagsBits.Administrator) || member.permissions.has(discord.PermissionFlagsBits.ManageGuild))) {
        return true;
    }

    try {
        const perms = await opendiscord.permissions.getPermissions(user, channel, guild);
        if (opendiscord.permissions.hasPermissions("support", perms)) {
            return true;
        }
    } catch {}

    const config = getConfig();
    if (member && config.adminRoles.some(roleId => member.roles.cache.has(roleId))) {
        return true;
    }

    return false;
}

// Embeds and buttons
function applyVisuals(builder: discord.EmbedBuilder, config: ParsedEmbedConfig): discord.EmbedBuilder {
    if (config.title) builder.setTitle(config.title);
    if (config.description) builder.setDescription(config.description);
    builder.setColor(config.color);
    if (config.footer) builder.setFooter({ text: config.footer });
    if (config.image) builder.setImage(config.image);
    if (config.thumbnail) builder.setThumbnail(config.thumbnail);
    return builder;
}

function buildRequestEmbed(staffMember: discord.GuildMember | discord.User, ticketOwner: discord.User): discord.EmbedBuilder {
    const config = getConfig();
    const embed = applyVisuals(new discord.EmbedBuilder(), config.embeds.request);
    const staffTag = "tag" in staffMember ? staffMember.tag : staffMember.user.tag;

    return embed
        .addFields(
            { name: "Requested by", value: `<@${staffMember.id}> (${staffTag})`, inline: false },
            { name: "Ticket Creator", value: `<@${ticketOwner.id}> (respond below)`, inline: false }
        )
        .setTimestamp();
}

function buildResponseEmbed(key: "agreed" | "declined", ticketOwner: discord.User): discord.EmbedBuilder {
    const config = getConfig();
    return applyVisuals(new discord.EmbedBuilder(), config.embeds[key])
        .addFields({ name: "Responded by", value: `<@${ticketOwner.id}> (${ticketOwner.tag})`, inline: false })
        .setTimestamp();
}

function buildRequestButtons(ticketOwnerId: string, staffId: string): discord.ActionRowBuilder<discord.ButtonBuilder> {
    return new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
        new discord.ButtonBuilder()
            .setCustomId(`ot-close-request:agree:${ticketOwnerId}:${staffId}`)
            .setLabel("I Agree")
            .setEmoji("✅")
            .setStyle(discord.ButtonStyle.Success),
        new discord.ButtonBuilder()
            .setCustomId(`ot-close-request:decline:${ticketOwnerId}:${staffId}`)
            .setLabel("I Disagree")
            .setEmoji("❌")
            .setStyle(discord.ButtonStyle.Danger)
    );
}

function buildDisabledButtons(): discord.ActionRowBuilder<discord.ButtonBuilder> {
    return new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
        new discord.ButtonBuilder()
            .setCustomId("ot-close-request:agree:disabled")
            .setLabel("I Agree")
            .setEmoji("✅")
            .setStyle(discord.ButtonStyle.Success)
            .setDisabled(true),
        new discord.ButtonBuilder()
            .setCustomId("ot-close-request:decline:disabled")
            .setLabel("I Disagree")
            .setEmoji("❌")
            .setStyle(discord.ButtonStyle.Danger)
            .setDisabled(true)
    );
}

// Logging
async function logAction(guild: discord.Guild, embed: discord.EmbedBuilder): Promise<void> {
    const config = getConfig();

    if (config.logChannelId) {
        try {
            const channel = await guild.channels.fetch(config.logChannelId);
            if (channel && channel.isTextBased()) {
                await (channel as discord.TextChannel).send({ embeds: [embed] }).catch(() => {});
                return;
            }
        } catch {}
    }

    try {
        const otLogs = opendiscord.posts.get("opendiscord:logs");
        if (otLogs && otLogs.ready && otLogs.channel && otLogs.channel.isTextBased()) {
            await (otLogs.channel as discord.TextChannel).send({ embeds: [embed] }).catch(() => {});
        }
    } catch {}
}

// Slash command
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    slash.add(new api.ODSlashCommand("ot-close-request:close-request", {
        name: "close-request",
        description: "Ask the ticket creator to confirm closing this ticket.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall]
    }));
});

// Text command
opendiscord.events.get("onTextCommandLoad").listen((text) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");
    text.add(new api.ODTextCommand("ot-close-request:close-request", {
        name: "close-request",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true
    }));
});

// Help menu
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-close-request:close-request", 0, {
        slashName: "close-request",
        textName: "close-request",
        slashDescription: "Ask the ticket creator to confirm closing this ticket.",
        textDescription: "Ask the ticket creator to confirm closing this ticket."
    }));
});

// Message builder
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-close-request:success-message"));
    messages.get("ot-close-request:success-message")?.workers.add(
        new api.ODWorker("ot-close-request:success-message", 0, (instance) => {
            instance.setContent("Close request sent to the ticket creator.");
            instance.setEphemeral(true);
        })
    );
});

// Command responder
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    commands.add(new api.ODCommandResponder("ot-close-request:close-request", generalConfig.data.prefix, "close-request"));
    commands.get("ot-close-request:close-request")?.workers.add([
        new api.ODWorker("ot-close-request:close-request", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || channel.isDMBased()) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, { channel, user }));
                return cancel();
            }

            const ticket = opendiscord.tickets.get(channel.id);
            if (!ticket) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-ticket-unknown").build(source, { guild, channel, user }));
                return cancel();
            }

            const hasPerms = await hasStaffPermission(user, member, channel as discord.GuildTextBasedChannel, guild);
            if (!hasPerms) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {
                    guild,
                    channel,
                    user,
                    permissions: ["support"]
                }));
                return cancel();
            }

            if (ticket.get("opendiscord:busy").value) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-ticket-busy").build(source, { guild, channel, user }));
                return cancel();
            }

            if (ticket.get("opendiscord:closed").value) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {
                    guild,
                    channel,
                    user,
                    error: opendiscord.languages.getTranslation("errors.actionInvalid.close"),
                    layout: "simple"
                }));
                return cancel();
            }

            const config = getConfig();
            if (config.ticketOptions.length > 0 && !config.ticketOptions.includes(ticket.option.id.value)) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {
                    guild,
                    channel,
                    user,
                    error: "Close requests are disabled for this ticket type.",
                    layout: "simple"
                }));
                return cancel();
            }

            // Verify whether an existing prompt message is still present in the channel
            const existingMsgId = pendingMessages.get(channel.id);
            if (existingMsgId) {
                const existingMsg = await channel.messages.fetch(existingMsgId).catch(() => null);
                if (existingMsg) {
                    await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {
                        guild,
                        channel,
                        user,
                        error: "A close request is already pending in this ticket.",
                        layout: "simple"
                    }));
                    return cancel();
                }
                pendingMessages.delete(channel.id);
            }

            let ticketOwner: discord.User | null = await opendiscord.tickets.getTicketUser(ticket, "creator");
            if (!ticketOwner) {
                const creatorId = ticket.get("opendiscord:opened-by").value;
                if (creatorId) {
                    ticketOwner = await opendiscord.client.fetchUser(creatorId).catch(() => null);
                }
            }

            if (!ticketOwner) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {
                    guild,
                    channel,
                    user,
                    error: "Cannot find the creator of this ticket.",
                    layout: "simple"
                }));
                return cancel();
            }

            const promptMessage = await (channel as discord.TextChannel).send({
                content: `<@${ticketOwner.id}>`,
                embeds: [buildRequestEmbed(member ?? user, ticketOwner)],
                components: [buildRequestButtons(ticketOwner.id, user.id)]
            });

            pendingMessages.set(channel.id, promptMessage.id);
            await instance.reply(await opendiscord.builders.messages.getSafe("ot-close-request:success-message").build(source, {}));
        }),
        new api.ODWorker("ot-close-request:logs", -1, (instance, params, source) => {
            opendiscord.log(`${instance.user.displayName} used the 'close-request' command.`, "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source }
            ]);
        })
    ]);
});

// Shared button response handler
async function handleButtonResponse(mode: "agree" | "decline", instance: api.ODButtonResponderInstance, cancel: () => void) {
    const { guild, channel, user } = instance;
    const interaction = instance.interaction as discord.ButtonInteraction;
    const parts = interaction.customId.split(":");
    const ticketOwnerId = parts[2];
    const staffId = parts[3];

    if (!guild || !channel || channel.isDMBased() || !ticketOwnerId || !staffId) {
        await instance.defer("reply", true);
        await interaction.editReply({ content: "This close request is invalid." });
        return cancel();
    }

    const ticket = opendiscord.tickets.get(channel.id);
    if (!ticket || ticket.get("opendiscord:closed").value) {
        pendingMessages.delete(channel.id);
        await instance.defer("reply", true);
        await interaction.editReply({ content: "This ticket is already closed." });
        return cancel();
    }

    if (ticket.get("opendiscord:busy").value) {
        await instance.defer("reply", true);
        await interaction.editReply({ content: "This ticket is busy. Try again in a moment." });
        return cancel();
    }

    if (user.id !== ticketOwnerId) {
        await instance.defer("reply", true);
        await interaction.editReply({ content: "Only the ticket creator can respond to this request." });
        return cancel();
    }

    await instance.defer("update", false);
    pendingMessages.delete(channel.id);

    const isAgreed = mode === "agree";
    const responseEmbed = buildResponseEmbed(isAgreed ? "agreed" : "declined", user);
    await interaction.editReply({
        content: "",
        embeds: [responseEmbed],
        components: [buildDisabledButtons()]
    });

    if (!isAgreed) {
        await (channel as discord.TextChannel).send({
            content: `<@${staffId}> The ticket creator (<@${user.id}>) declined the close request.`
        }).catch(() => {});
    }

    opendiscord.log(`${user.displayName} ${isAgreed ? "accepted" : "declined"} the close request in #${(channel as any).name}`, "plugin", [
        { key: "user", value: user.username },
        { key: "userid", value: user.id, hidden: true },
        { key: "channelid", value: channel.id, hidden: true }
    ]);

    const logEmbed = new discord.EmbedBuilder(responseEmbed.data)
        .setTitle(isAgreed ? "Logs: Close Request Accepted" : "Logs: Close Request Declined")
        .addFields(
            { name: "Channel", value: `<#${channel.id}>`, inline: true },
            { name: "Ticket Creator", value: `<@${user.id}>`, inline: true },
            { name: "Requested by", value: `<@${staffId}>`, inline: true }
        )
        .setTimestamp();
    await logAction(guild, logEmbed);

    if (isAgreed) {
        const staffUser = await opendiscord.client.fetchUser(staffId).catch(() => null) ?? user;
        await opendiscord.actions.get("opendiscord:close-ticket").run("other", {
            guild,
            channel: channel as discord.GuildTextBasedChannel,
            user: staffUser,
            ticket,
            reason: "Ticket creator agreed to close request.",
            sendMessage: true
        });
    }
}

// Button responders
opendiscord.events.get("onButtonResponderLoad").listen((buttons) => {
    buttons.add(new api.ODButtonResponder("ot-close-request:agree", /^ot-close-request:agree:/));
    buttons.get("ot-close-request:agree")?.workers.add(
        new api.ODWorker("ot-close-request:agree", 0, async (instance, params, source, cancel) => {
            await handleButtonResponse("agree", instance, cancel);
        })
    );

    buttons.add(new api.ODButtonResponder("ot-close-request:decline", /^ot-close-request:decline:/));
    buttons.get("ot-close-request:decline")?.workers.add(
        new api.ODWorker("ot-close-request:decline", 0, async (instance, params, source, cancel) => {
            await handleButtonResponse("decline", instance, cancel);
        })
    );
});

// Lifecycle events
const clearPendingTicket = (ticket: api.ODTicket) => {
    pendingMessages.delete(ticket.id.value);
};
opendiscord.events.get("onTicketClose").listen(clearPendingTicket);
opendiscord.events.get("onTicketDelete").listen(clearPendingTicket);

// Plugin initialization
opendiscord.events.get("afterPluginsLoaded").listen(() => {
    opendiscord.log("Loaded ot-close-request.", "plugin");
});
