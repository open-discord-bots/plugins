import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";

// DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "od-moderation": api.ODPlugin;
    }
    export interface ODSlashCommandManagerIds_Default {
        "od-moderation:ban": api.ODSlashCommand;
        "od-moderation:unban": api.ODSlashCommand;
        "od-moderation:kick": api.ODSlashCommand;
        "od-moderation:warn": api.ODSlashCommand;
    }
    export interface ODTextCommandManagerIds_Default {
        "od-moderation:ban": api.ODTextCommand;
        "od-moderation:unban": api.ODTextCommand;
        "od-moderation:kick": api.ODTextCommand;
        "od-moderation:warn": api.ODTextCommand;
    }
    export interface ODCommandResponderManagerIds_Default {
        "od-moderation:ban": { source: "slash" | "text", params: {}, workers: "od-moderation:ban" | "od-moderation:logs" };
        "od-moderation:unban": { source: "slash" | "text", params: {}, workers: "od-moderation:unban" | "od-moderation:logs" };
        "od-moderation:kick": { source: "slash" | "text", params: {}, workers: "od-moderation:kick" | "od-moderation:logs" };
        "od-moderation:warn": { source: "slash" | "text", params: {}, workers: "od-moderation:warn" | "od-moderation:logs" };
    }
    export interface ODMessageManagerIds_Default {
        "od-moderation:ban-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:ban-message" };
        "od-moderation:unban-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:unban-message" };
        "od-moderation:kick-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:kick-message" };
        "od-moderation:warn-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:warn-message" };
        "od-moderation:unknown-error-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:unknown-error-message" };
        "od-moderation:higher-role-error-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:higher-role-error-message" };
        "od-moderation:no-perms-message": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:no-perms-message" };
 }
    export interface ODEmbedManagerIds_Default {
        "od-moderation:ban-embed": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:ban-embed" };
        "od-moderation:unban-embed": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:unban-embed" };
        "od-moderation:kick-embed": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:kick-embed" };
        "od-moderation:warn-embed": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:warn-embed" };
        "od-moderation:no-perms-embed": { source: "slash" | "text" | "other", params: {}, workers: "od-moderation:no-perms-embed" };
 }
}

// REGISTER SLASH COMMANDS
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    // Ban Command
    slash.add(new api.ODSlashCommand("od-moderation:ban", {
        name: "ban",
        description: "🚫 Ban a user from the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to ban.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the ban.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Unban Command
    slash.add(new api.ODSlashCommand("od-moderation:unban", {
        name: "unban",
        description: "Unban a user from the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "userid",
                description: "The ID of the user to unban.",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the unban.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Kick Command
    slash.add(new api.ODSlashCommand("od-moderation:kick", {
        name: "kick",
        description: "Kick a user from the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to kick.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the kick.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Warn Command
    slash.add(new api.ODSlashCommand("od-moderation:warn", {
        name: "warn",
        description: "Warn a user in the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to warn.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the warning.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));
});

// REGISTER TEXT COMMANDS
opendiscord.events.get("onTextCommandLoad").listen((text) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    // Ban Command
    text.add(new api.ODTextCommand("od-moderation:ban", {
        name: "ban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Unban Command
    text.add(new api.ODTextCommand("od-moderation:unban", {
        name: "unban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Kick Command
    text.add(new api.ODTextCommand("od-moderation:kick", {
        name: "kick",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Warn Command
    text.add(new api.ODTextCommand("od-moderation:warn", {
        name: "warn",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));
});

// REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    // Ban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("od-moderation:ban", 0, {
        slashName: "ban",
        textName: "ban",
        slashDescription: "Ban a user from the server.",
        textDescription: "Ban a user from the server.",
    }));

    // Unban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("od-moderation:unban", 0, {
        slashName: "unban",
        textName: "unban",
        slashDescription: "Unban a user from the server.",
        textDescription: "Unban a user from the server.",
    }));

    // Kick Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("od-moderation:kick", 0, {
        slashName: "kick",
        textName: "kick",
        slashDescription: "Kick a user from the server.",
        textDescription: "Kick a user from the server.",
    }));

    // Warn Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("od-moderation:warn", 0, {
        slashName: "warn",
        textName: "warn",
        slashDescription: "Warn a user in the server.",
        textDescription: "Warn a user in the server.",
    }));
});

// REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    // Ban Embed
    embeds.add(new api.ODEmbed("od-moderation:ban-embed"));
    embeds.get("od-moderation:ban-embed").workers.add(
        new api.ODWorker("od-moderation:ban-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("🚫 user banned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been banned from the server.");
        })
    );

    // Unban Embed
    embeds.add(new api.ODEmbed("od-moderation:unban-embed"));
    embeds.get("od-moderation:unban-embed").workers.add(
        new api.ODWorker("od-moderation:unban-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Unbanned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been unbanned from the server.");
        })
    );

    // Kick Embed
    embeds.add(new api.ODEmbed("od-moderation:kick-embed"));
    embeds.get("od-moderation:kick-embed").workers.add(
        new api.ODWorker("od-moderation:kick-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Kicked");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been kicked from the server.");
        })
    );

    // Warn Embed
    embeds.add(new api.ODEmbed("od-moderation:warn-embed"));
    embeds.get("od-moderation:warn-embed").workers.add(
        new api.ODWorker("od-moderation:warn-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Warned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been warned in the server.");
            })
    );

    // no perms Embed
    embeds.add(new api.ODEmbed("od-moderation:no-perms-embed"));
    embeds.get("od-moderation:no-perms-embed").workers.add(
        new api.ODWorker("od-moderation:no-perms-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("Error");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("you don't have permission.");
        })
    );
});

// REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    // Ban Message Builder
    const banMessage = new api.ODMessage("od-moderation:ban-message");
    messages.add(banMessage);
    banMessage.workers.add(
        new api.ODWorker("od-moderation:ban-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-moderation:ban-embed").build(embedSource, {}));    
        })
    );

    // Unban Message Builder
    const unbanMessage = new api.ODMessage("od-moderation:unban-message");
    messages.add(unbanMessage);
    unbanMessage.workers.add(
        new api.ODWorker("od-moderation:unban-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-moderation:unban-embed").build(embedSource, {}));
        })
    );

    // Kick Message Builder
    const kickMessage = new api.ODMessage("od-moderation:kick-message");
    messages.add(kickMessage);
    kickMessage.workers.add(
        new api.ODWorker("od-moderation:kick-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-moderation:kick-embed").build(embedSource, {}));
        })
    );

    // Warn Message Builder
    const warnMessage = new api.ODMessage("od-moderation:warn-message");
    messages.add(warnMessage);
    warnMessage.workers.add(
        new api.ODWorker("od-moderation:warn-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-moderation:warn-embed").build(embedSource, {}));
        })
    );


    // Unknown Error Message Builder
    const unknownErrorMessage = new api.ODMessage("od-moderation:unknown-error-message");
    messages.add(unknownErrorMessage);
    unknownErrorMessage.workers.add(
        new api.ODWorker("od-moderation:unknown-error-message", 0, async (instance, params, source, cancel) => {
            instance.setContent("⚠️ An unknown error occurred. Please try again later.")
            instance.setEphemeral(true)
        })
    );

    // Higher Role Error Message Builder
    const higherRoleErrorMessage = new api.ODMessage("od-moderation:higher-role-error-message");
    messages.add(higherRoleErrorMessage);
    higherRoleErrorMessage.workers.add(
        new api.ODWorker("od-moderation:higher-role-error-message", 0, async (instance, params, source, cancel) => {
            instance.setContent("The bot cannot ban a user with a higher or equal role.");
            })
    );

    // no perms Message Builder
    const nopermsMessage = new api.ODMessage("od-moderation:no-perms-message");
    messages.add(nopermsMessage);
    warnMessage.workers.add(
        new api.ODWorker("od-moderation:no-perms-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("od-moderation:no-perms-embed").build(embedSource, {}));
        })
    );
});

// REGISTER COMMAND RESPONDERS
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    // Ban Command Responder
    commands.add(new api.ODCommandResponder("od-moderation:ban", generalConfig.data.prefix, "ban"));
    commands.get("od-moderation:ban").workers.add([
        new api.ODWorker("od-moderation:ban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to ban members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Get the user to ban and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher role than the bot
            const botMember = guild.members.me;
            if (targetMember && botMember && targetMember.roles.highest.position >= botMember.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:higher-role-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Send a DM to the user before banning
                try {
                    await targetUser.send(`You have been banned from **${guild.name}** for the following reason: ${reason}`);
                } catch (dmError) {
                    console.error("Failed to send DM to the user:", dmError);
                    
                }
                
                // Ban the user
                await guild.members.ban(targetUser, { reason });
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:ban-message").build(source, {}));
            } catch (error) {
                console.error("Failed to ban user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("od-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";
            opendiscord.log(`${instance.user.displayName} banned ${targetUser?.username || "unknown user"}!`, "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "target", value: targetUser?.username || "unknown user" },
                { key: "targetid", value: targetUser?.id || "unknown", hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source },
                { key: "reason", value: reason },
            ]);
        })
    ]);

 // Unban Command Responder
    commands.add(new api.ODCommandResponder("od-moderation:unban", generalConfig.data.prefix, "unban"));
    commands.get("od-moderation:unban").workers.add([
        new api.ODWorker("od-moderation:unban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!guild.members.cache.get(user.id)?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Get the user ID to unban and the reason
            const userId = instance.options?.getString("userid", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!userId) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Unban the user
                await guild.members.unban(userId, reason);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unban-message").build(source, {}));
            } catch (error) {
                console.error("Failed to unban user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("od-moderation:logs", -1, (instance, params, source, cancel) => {
            const userId = instance.options?.getString("userid", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";
            opendiscord.log(`${instance.user.displayName} unbanned user with ID ${userId || "unknown"}!`, "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "targetid", value: userId || "unknown", hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source },
                { key: "reason", value: reason },
            ]);
        })
    ]);
    
    // Kick Command Responder
    commands.add(new api.ODCommandResponder("od-moderation:kick", generalConfig.data.prefix, "kick"));
    commands.get("od-moderation:kick").workers.add([
        new api.ODWorker("od-moderation:kick", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the bot has permission to kick members
            if (!guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to kick members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Get the user to kick and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher role than the bot
            const botMember = guild.members.me;
            if (targetMember && botMember && targetMember.roles.highest.position >= botMember.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:higher-role-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Send a DM to the user before kicking
                try {
                    await targetUser.send(`You have been kicked from **${guild.name}** for the following reason: ${reason}`);
                } catch (dmError) {
                    console.error("Failed to send DM to the user:", dmError);
                
                }

                // Kick the user
                await guild.members.kick(targetUser, reason);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:kick-message").build(source, {}));
            } catch (error) {
                console.error("Failed to kick user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("od-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";
            opendiscord.log(`${instance.user.displayName} kicked ${targetUser?.username || "unknown user"}!`, "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "target", value: targetUser?.username || "unknown user" },
                { key: "targetid", value: targetUser?.id || "unknown", hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source },
                { key: "reason", value: reason },
            ]);
        })
    ]);

    // Warn Command Responder
    commands.add(new api.ODCommandResponder("od-moderation:warn", generalConfig.data.prefix, "warn"));
    commands.get("od-moderation:warn").workers.add([
        new api.ODWorker("od-moderation:warn", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to warn members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            // Get the user to warn and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:no-perms-message").build(source, {}));
                return cancel();
            }

            try {
                // Send a warning message to the user
                await targetUser.send(`You have been warned in **${guild.name}** for: ${reason}`);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:warn-message").build(source, {}));
            } catch (error) {
                console.error("Failed to warn user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("od-moderation:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("od-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";
            opendiscord.log(`${instance.user.displayName} warned ${targetUser?.username || "unknown user"}!`, "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "target", value: targetUser?.username || "unknown user" },
                { key: "targetid", value: targetUser?.id || "unknown", hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source },
                { key: "reason", value: reason },
            ]);
        })
    ]);
});
