import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";

// ─── VERIFY THIS IS OPENTICKET ───────────────────────────────────────────────
if (utilities.project !== "openticket") {
    throw new api.ODPluginError("This plugin only works in Open Ticket!");
}

// ─── TYPE DECLARATIONS ────────────────────────────────────────────────────────
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-close-request": api.ODPlugin;
    }
    export interface ODSlashCommandManagerIds_Default {
        "ot-close-request:slash": api.ODSlashCommand;
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-close-request:text": api.ODTextCommand;
    }
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────
opendiscord.events.get("onConfigLoad")?.listen((configs) => {
    configs.add(new api.ODJsonConfig("ot-close-request:config", "config.json", `./plugins/ot-close-request/`));
});

interface EmbedConfig {
    title: string;
    description: string;
    footer: string;
    image: string;
    thumbnail: string;
    color: number;
}

function getConfig() {
    const cfg = opendiscord.configs.get("ot-close-request:config");
    const d = cfg?.data ?? {};
    
    const parseEmbed = (key: string, defColor: string): EmbedConfig => {
        const e = d.embeds?.[key] ?? {};
        return {
            title:       e.title       ?? "Untitled",
            description: e.description ?? "",
            footer:      e.footer      ?? "",
            image:       e.image       ?? "",
            thumbnail:   e.thumbnail   ?? "",
            color:       parseInt(e.color ?? defColor, 16)
        };
    };

    return {
        adminRoles:     (d.admin_roles      as string[]) ?? [],
        ticketOptions:  (d.ticket_options   as string[]) ?? [],
        logChannelId:   (d.log_channel_id   as string)   ?? "",
        embeds: {
            request:  parseEmbed("request",  "5865F2"),
            agreed:   parseEmbed("agreed",   "57F287"),
            declined: parseEmbed("declined", "ED4245")
        }
    };
}

// ─── TRACK PENDING REQUESTS ───────────────────────────────────────────────────
const pendingRequests = new Map<string, {
    messageId:      string;
    ticketOwnerId:  string;
    staffId:        string;
    channelId:      string;
    timestamp:      number;
}>();

// ─── PERMISSION HELPERS ───────────────────────────────────────────────────────
function isAdmin(member: discord.GuildMember): boolean {
    if (member.permissions.has(discord.PermissionFlagsBits.ManageGuild)) return true;
    const config = getConfig();
    return config.adminRoles.some(roleId => member.roles.cache.has(roleId));
}

function isTicketChannel(channel: discord.TextChannel): boolean {
    const config = getConfig();
    const ticket = (opendiscord as any).tickets?.get(channel.id);

    // If no specific options configured, fallback to basic name/parent check
    if (config.ticketOptions.length === 0) {
        return !!ticket || channel.name.startsWith("ticket-") || !!channel.parent?.name.toLowerCase().includes("ticket");
    }

    // Source of truth: Open Ticket's ticket manager
    if (ticket) {
        return config.ticketOptions.includes(ticket.option.id.value);
    }

    return false;
}

// ─── GET TICKET OWNER ─────────────────────────────────────────────────────────
async function getTicketOwner(channel: discord.TextChannel): Promise<discord.User | null> {
    try {
        const topic = channel.topic;
        if (topic) {
            const match = topic.match(/<@!?(\d+)>/) ?? topic.match(/(\d{17,19})/);
            if (match) {
                const user = await channel.client.users.fetch(match[1]).catch(() => null);
                if (user) return user;
            }
        }

        const nameMatch = channel.name.match(/ticket-(\d{17,19})/);
        if (nameMatch) {
            const user = await channel.client.users.fetch(nameMatch[1]).catch(() => null);
            if (user) return user;
        }

        for (const [id, overwrite] of channel.permissionOverwrites.cache) {
            if (overwrite.type !== discord.OverwriteType.Member) continue;
            if (!overwrite.allow.has(discord.PermissionFlagsBits.ViewChannel)) continue;
            const member = await channel.guild.members.fetch(id).catch(() => null);
            if (member && !member.user.bot) return member.user;
        }

        const messages = await channel.messages.fetch({ limit: 10 });
        for (const msg of messages.values()) {
            if (msg.author.bot) continue;
            const msgMember = await channel.guild.members.fetch(msg.author.id).catch(() => null);
            if (msgMember && isAdmin(msgMember)) continue;
            return msg.author;
        }

        return null;
    } catch (err) {
        console.error("[CloseRequest] Error getting ticket owner:", err);
        return null;
    }
}

// ─── LOGGING HELPER ───────────────────────────────────────────────────────────
async function logAction(guild: discord.Guild, embed: discord.EmbedBuilder) {
    const config = getConfig();
    let logChannel: discord.TextBasedChannel | null = null;

    // 1. Try Open Ticket default logs post
    const otLogs = opendiscord.posts.get("logs");
    if (otLogs?.ready && otLogs.channel?.isTextBased()) {
        logChannel = otLogs.channel as discord.TextBasedChannel;
    } 
    // 2. Try plugin config fallback
    else if (config.logChannelId) {
        const fallback = await guild.channels.fetch(config.logChannelId).catch(() => null);
        if (fallback?.isTextBased()) logChannel = fallback as discord.TextBasedChannel;
    }

    if (logChannel) {
        await (logChannel as any).send({ embeds: [embed] }).catch(() => {});
    }
}

// ─── EMBED BUILDERS ───────────────────────────────────────────────────────────
function applyVisuals(builder: discord.EmbedBuilder, config: EmbedConfig) {
    if (config.title)       builder.setTitle(config.title);
    if (config.description) builder.setDescription(config.description);
    builder.setColor(config.color);
    
    if (config.footer)      builder.setFooter({ text: config.footer });
    if (config.image)       builder.setImage(config.image);
    if (config.thumbnail)   builder.setThumbnail(config.thumbnail);
    return builder;
}

function buildRequestEmbed(staffMember: discord.GuildMember, ticketOwner: discord.User): discord.EmbedBuilder {
    const config = getConfig();
    const embed = new discord.EmbedBuilder();
    
    applyVisuals(embed, config.embeds.request);
    embed.addFields(
        { name: "📍  Requested by", value: `${staffMember} (${staffMember.user.tag})`, inline: false },
        { name: "👤  Ticket Owner", value: `${ticketOwner} — please respond below`, inline: false },
    );
    embed.setTimestamp();
    return embed;
}

function buildAgreedEmbed(ticketOwner: discord.User): discord.EmbedBuilder {
    const config = getConfig();
    const embed = new discord.EmbedBuilder();
    applyVisuals(embed, config.embeds.agreed);
    embed.addFields({ name: "👤  Responded by", value: `${ticketOwner} (${ticketOwner.tag})`, inline: false });
    embed.setTimestamp();
    return embed;
}

function buildDeclinedEmbed(ticketOwner: discord.User): discord.EmbedBuilder {
    const config = getConfig();
    const embed = new discord.EmbedBuilder();
    applyVisuals(embed, config.embeds.declined);
    embed.addFields({ name: "👤  Responded by", value: `${ticketOwner} (${ticketOwner.tag})`, inline: false });
    embed.setTimestamp();
    return embed;
}

// ─── BUTTON ROW BUILDERS ──────────────────────────────────────────────────────
function buildRequestButtons(requestId: string): discord.ActionRowBuilder<discord.ButtonBuilder> {
    return new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
        new discord.ButtonBuilder()
            .setCustomId(`close_req_agree:${requestId}`)
            .setLabel("I Agree")
            .setEmoji("✅")
            .setStyle(discord.ButtonStyle.Success),
        new discord.ButtonBuilder()
            .setCustomId(`close_req_decline:${requestId}`)
            .setLabel("I Disagree")
            .setEmoji("❌")
            .setStyle(discord.ButtonStyle.Danger),
    );
}

function buildDisabledButtons(): discord.ActionRowBuilder<discord.ButtonBuilder> {
    return new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
        new discord.ButtonBuilder()
            .setCustomId("close_req_agree_disabled")
            .setLabel("I Agree")
            .setEmoji("✅")
            .setStyle(discord.ButtonStyle.Success)
            .setDisabled(true),
        new discord.ButtonBuilder()
            .setCustomId("close_req_decline_disabled")
            .setLabel("I Disagree")
            .setEmoji("❌")
            .setStyle(discord.ButtonStyle.Danger)
            .setDisabled(true),
    );
}

// ─── CLOSE TICKET VIA OT ACTION SYSTEM ───────────────────────────────────────
async function closeTicket(channel: discord.TextChannel, staffMember: discord.GuildMember): Promise<boolean> {
    try {
        const closeAction = opendiscord.actions?.get("opendiscord:close-ticket") as any;
        const ticket = (opendiscord as any).tickets?.get(channel.id);

        if (closeAction && ticket) {
            await closeAction.run("other", {
                guild:       channel.guild,
                channel:     channel,
                user:        staffMember.user,
                ticket:      ticket,
                reason:      "Ticket owner agreed to the close request.",
                sendMessage: true,
            });
            return true;
        }

        return false;
    } catch (err) {
        console.error("[CloseRequest] Failed to close ticket:", err);
        return false;
    }
}

// ─── SLASH COMMAND REGISTRATION ───────────────────────────────────────────────
opendiscord.events.get("onSlashCommandLoad")?.listen((slash) => {
    slash.add(new api.ODSlashCommand("ot-close-request:slash", {
        name:             "close-request",
        description:      "🔔 Ask the ticket owner to confirm closing this ticket.",
        type:             discord.ApplicationCommandType.ChatInput,
        contexts:         [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
    }));
});

// ─── TEXT COMMAND REGISTRATION ────────────────────────────────────────────────
opendiscord.events.get("onTextCommandLoad")?.listen((text) => {
    const prefix = opendiscord.configs.get("opendiscord:general").data.prefix;
    text.add(new api.ODTextCommand("ot-close-request:text", {
        name:            "close-request",
        prefix,
        dmPermission:    false,
        guildPermission: true,
    }));
});

// ─── COMMAND RESPONDER ────────────────────────────────────────────────────────
opendiscord.events.get("onCommandResponderLoad")?.listen((responders) => {
    const prefix = opendiscord.configs.get("opendiscord:general").data.prefix;

    responders.add(new api.ODCommandResponder(
        "ot-close-request:command" as any,
        prefix,
        "close-request",
    ));

    responders.get("ot-close-request:command" as any)?.workers.add([
        new api.ODWorker("ot-close-request:command-handler" as any, 0, async (instance: any) => {
            const isSlash = instance.type === "interaction";
            if (isSlash) await instance.defer(true);

            const member  = instance.member  as discord.GuildMember | null;
            const channel = instance.channel as discord.TextChannel;

            const sendError = async (content: string): Promise<void> => {
                if (isSlash) {
                    await (instance.interaction as discord.ChatInputCommandInteraction)
                        .editReply({ content });
                } else {
                    await (instance.interaction as discord.Message)
                        .reply({ content });
                }
            };

            if (!member || !isAdmin(member)) {
                await sendError("❌ You don't have permission to use this command. Only staff can request ticket closure.");
                return;
            }

            if (!isTicketChannel(channel)) {
                const hint = "This command can only be used in ticket channels.";
                await sendError(`❌ ${hint}`);
                return;
            }

            const existing = [...pendingRequests.values()].find(r => r.channelId === channel.id);
            if (existing) {
                await sendError("⚠️ There is already a pending close request in this ticket.");
                return;
            }

            const ticketOwner = await getTicketOwner(channel);
            if (!ticketOwner) {
                await sendError(
                    "❌ Could not identify the ticket owner.\n\n" +
                    "**Troubleshooting:**\n" +
                    "• Ensure the channel topic contains the owner's user ID or mention\n" +
                    "• Add the ticket option ID to `ticket_options` in the plugin config\n" +
                    "• Make sure the ticket owner has posted at least one message",
                );
                return;
            }

            const requestId = `${channel.id}-${Date.now()}`;
            const sent = await channel.send({
                content:    `${ticketOwner}`,
                embeds:     [buildRequestEmbed(member, ticketOwner)],
                components: [buildRequestButtons(requestId)],
            });

            if (isSlash) {
                await (instance.interaction as discord.ChatInputCommandInteraction)
                    .deleteReply()
                    .catch(() => { /* ignore if already gone */ });
            }

            pendingRequests.set(requestId, {
                messageId:     sent.id,
                ticketOwnerId: ticketOwner.id,
                staffId:       member.id,
                channelId:     channel.id,
                timestamp:     Date.now(),
            });
        }),
    ]);
});

// ─── STALE REQUEST CLEANUP ────────────────────────────────────────────────────
setInterval(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    for (const [id, req] of pendingRequests.entries()) {
        if (now - req.timestamp > oneDay) pendingRequests.delete(id);
    }
}, 60 * 60 * 1000); // Check every hour

// ─── BUTTON RESPONDERS ────────────────────────────────────────────────────────
opendiscord.events.get("onClientReady")?.listen(() => {

    // ── Agree button ────────────────────────────────────────────────────────
    opendiscord.responders.buttons.add(
        new api.ODButtonResponder("ot-close-request:agree-btn" as any, /^close_req_agree:/),
    );
    opendiscord.responders.buttons.get("ot-close-request:agree-btn" as any)?.workers.add([
        new api.ODWorker("ot-close-request:agree-btn-handler" as any, 0, async (instance: any) => {
            const interaction = instance.interaction as discord.ButtonInteraction;
            const requestId   = interaction.customId.split(":")[1];
            const request     = pendingRequests.get(requestId);

            if (!request) {
                await instance.defer("reply", true);
                await interaction.editReply({ content: "❌ This close request has already expired or been responded to." });
                return;
            }

            if (instance.user.id !== request.ticketOwnerId) {
                await instance.defer("reply", true);
                await interaction.editReply({ content: "❌ Only the ticket owner can respond to this close request." });
                return;
            }

            await instance.defer("update", false);
            pendingRequests.delete(requestId);

            const agreedEmbed = buildAgreedEmbed(instance.user);
            await interaction.editReply({
                content:    "",
                embeds:     [agreedEmbed],
                components: [buildDisabledButtons()],
            });

            // Log the action
            if (interaction.guild) {
                const logEmbed = new discord.EmbedBuilder(agreedEmbed.data)
                    .setTitle("📝 Logs: Close Request Accepted")
                    .addFields({ name: "Channel", value: `${interaction.channel}`, inline: true })
                    .setTimestamp();
                await logAction(interaction.guild, logEmbed);
            }

            // ── Actually close the ticket ──────────────────────────────────
            const guild = instance.guild as discord.Guild | null;
            if (guild) {
                const staffMember = await guild.members.fetch(request.staffId).catch(() => null);
                if (staffMember) {
                    const closed = await closeTicket(instance.channel as discord.TextChannel, staffMember);
                    if (!closed) {
                        await (instance.channel as discord.TextChannel).send({
                            content: "⚠️ The ticket owner agreed to close, but automatic closure failed. Please close this ticket manually.",
                        }).catch(() => {});
                    }
                }
            }
        }),
    ]);

    // ── Decline button ──────────────────────────────────────────────────────
    opendiscord.responders.buttons.add(
        new api.ODButtonResponder("ot-close-request:decline-btn" as any, /^close_req_decline:/),
    );
    opendiscord.responders.buttons.get("ot-close-request:decline-btn" as any)?.workers.add([
        new api.ODWorker("ot-close-request:decline-btn-handler" as any, 0, async (instance: any) => {
            const interaction = instance.interaction as discord.ButtonInteraction;
            const requestId   = interaction.customId.split(":")[1];
            const request     = pendingRequests.get(requestId);

            if (!request) {
                await instance.defer("reply", true);
                await interaction.editReply({ content: "❌ This close request has already expired or been responded to." });
                return;
            }

            if (instance.user.id !== request.ticketOwnerId) {
                await instance.defer("reply", true);
                await interaction.editReply({ content: "❌ Only the ticket owner can respond to this close request." });
                return;
            }

            await instance.defer("update", false);
            pendingRequests.delete(requestId);

            const declinedEmbed = buildDeclinedEmbed(instance.user);
            await interaction.editReply({
                content:    "",
                embeds:     [declinedEmbed],
                components: [buildDisabledButtons()],
            });

            // Log the action
            if (interaction.guild) {
                const logEmbed = new discord.EmbedBuilder(declinedEmbed.data)
                    .setTitle("📝 Logs: Close Request Declined")
                    .addFields({ name: "Channel", value: `${interaction.channel}`, inline: true })
                    .setTimestamp();
                await logAction(interaction.guild, logEmbed);
            }

            await (instance.channel as discord.TextChannel).send({
                content: `🔔 <@${request.staffId}> The ticket owner has declined the close request and still needs help.`,
            }).catch(() => {});
        }),
    ]);

    opendiscord.log("✅ Ticket Close Request plugin loaded (slash + text + button responders).", "plugin");
});
