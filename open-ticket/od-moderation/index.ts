import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";

// DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "example-command": api.ODPlugin;
    }
    export interface ODSlashCommandManagerIds_Default {
        "example-command:ban": api.ODSlashCommand;
        "example-command:unban": api.ODSlashCommand;
        "example-command:kick": api.ODSlashCommand;
        "example-command:warn": api.ODSlashCommand;
    }
    export interface ODTextCommandManagerIds_Default {
        "example-command:ban": api.ODTextCommand;
        "example-command:unban": api.ODTextCommand;
        "example-command:kick": api.ODTextCommand;
        "example-command:warn": api.ODTextCommand;
    }
    export interface ODCommandResponderManagerIds_Default {
        "example-command:ban": { source: "slash" | "text", params: {}, workers: "example-command:ban" | "example-command:logs" };
        "example-command:unban": { source: "slash" | "text", params: {}, workers: "example-command:unban" | "example-command:logs" };
        "example-command:kick": { source: "slash" | "text", params: {}, workers: "example-command:kick" | "example-command:logs" };
        "example-command:warn": { source: "slash" | "text", params: {}, workers: "example-command:warn" | "example-command:logs" };
    }
    export interface ODMessageManagerIds_Default {
        "example-command:ban-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:ban-message" };
        "example-command:unban-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:unban-message" };
        "example-command:kick-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:kick-message" };
        "example-command:warn-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:warn-message" };
        "example-command:unknown-error-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:unknown-error-message" };
        "example-command:higher-role-error-message": { source: "slash" | "text" | "other", params: {}, workers: "example-command:higher-role-error-message" };
    }
    export interface ODEmbedManagerIds_Default {
        "example-command:ban-embed": { source: "slash" | "text" | "other", params: {}, workers: "example-command:ban-embed" };
        "example-command:unban-embed": { source: "slash" | "text" | "other", params: {}, workers: "example-command:unban-embed" };
        "example-command:kick-embed": { source: "slash" | "text" | "other", params: {}, workers: "example-command:kick-embed" };
        "example-command:warn-embed": { source: "slash" | "text" | "other", params: {}, workers: "example-command:warn-embed" };
    }
}

// REGISTER SLASH COMMANDS
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    // Ban Command
    slash.add(new api.ODSlashCommand("example-command:ban", {
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
    slash.add(new api.ODSlashCommand("example-command:unban", {
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
    slash.add(new api.ODSlashCommand("example-command:kick", {
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
    slash.add(new api.ODSlashCommand("example-command:warn", {
        name: "warn",
        description: "Warn a user in the guild.",
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
    text.add(new api.ODTextCommand("example-command:ban", {
        name: "ban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Unban Command
    text.add(new api.ODTextCommand("example-command:unban", {
        name: "unban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Kick Command
    text.add(new api.ODTextCommand("example-command:kick", {
        name: "kick",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));

    // Warn Command
    text.add(new api.ODTextCommand("example-command:warn", {
        name: "warn",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
    }));
});

// REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    // Ban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("example-command:ban", 0, {
        slashName: "ban",
        textName: "ban",
        slashDescription: "Ban a user from the guild.",
        textDescription: "Ban a user from the guild.",
    }));

    // Unban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("example-command:unban", 0, {
        slashName: "unban",
        textName: "unban",
        slashDescription: "Unban a user from the guild.",
        textDescription: "Unban a user from the guild.",
    }));

    // Kick Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("example-command:kick", 0, {
        slashName: "kick",
        textName: "kick",
        slashDescription: "Kick a user from the guild.",
        textDescription: "Kick a user from the guild.",
    }));

    // Warn Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("example-command:warn", 0, {
        slashName: "warn",
        textName: "warn",
        slashDescription: "Warn a user in the guild.",
        textDescription: "Warn a user in the guild.",
    }));
});

// REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    // Ban Embed
    embeds.add(new api.ODEmbed("example-command:ban-embed"));
    embeds.get("example-command:ban-embed").workers.add(
        new api.ODWorker("example-command:ban-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("🚫 user banned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been banned from the guild.");
        })
    );

    // Unban Embed
    embeds.add(new api.ODEmbed("example-command:unban-embed"));
    embeds.get("example-command:unban-embed").workers.add(
        new api.ODWorker("example-command:unban-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Unbanned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been unbanned from the guild.");
        })
    );

    // Kick Embed
    embeds.add(new api.ODEmbed("example-command:kick-embed"));
    embeds.get("example-command:kick-embed").workers.add(
        new api.ODWorker("example-command:kick-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Kicked");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been kicked from the guild.");
        })
    );

    // Warn Embed
    embeds.add(new api.ODEmbed("example-command:warn-embed"));
    embeds.get("example-command:warn-embed").workers.add(
        new api.ODWorker("example-command:warn-embed", 0, (instance, params, source, cancel) => {
            const generalConfig = opendiscord.configs.get("opendiscord:general");
            instance.setTitle("User Warned");
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription("A user has been warned in the guild.");
        })
    );
});

// REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    // Ban Message Builder
    const banMessage = new api.ODMessage("example-command:ban-message");
    messages.add(banMessage);
    banMessage.workers.add(
        new api.ODWorker("example-command:ban-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("example-command:ban-embed").build(embedSource, {}));    
        })
    );

    // Unban Message Builder
    const unbanMessage = new api.ODMessage("example-command:unban-message");
    messages.add(unbanMessage);
    unbanMessage.workers.add(
        new api.ODWorker("example-command:unban-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("example-command:unban-embed").build(embedSource, {}));
        })
    );

    // Kick Message Builder
    const kickMessage = new api.ODMessage("example-command:kick-message");
    messages.add(kickMessage);
    kickMessage.workers.add(
        new api.ODWorker("example-command:kick-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("example-command:kick-embed").build(embedSource, {}));
        })
    );

    // Warn Message Builder
    const warnMessage = new api.ODMessage("example-command:warn-message");
    messages.add(warnMessage);
    warnMessage.workers.add(
        new api.ODWorker("example-command:warn-message", 0, async (instance, params, source, cancel) => {
            const embedSource = source === "text" || source === "slash" ? source : "other";
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("example-command:warn-embed").build(embedSource, {}));
        })
    );


    // Unknown Error Message Builder
    const unknownErrorMessage = new api.ODMessage("example-command:unknown-error-message");
    messages.add(unknownErrorMessage);
    unknownErrorMessage.workers.add(
        new api.ODWorker("example-command:unknown-error-message", 0, async (instance, params, source, cancel) => {
            instance.setContent("An unknown error occurred. Please try again later.");
        })
    );

    // Higher Role Error Message Builder
    const higherRoleErrorMessage = new api.ODMessage("example-command:higher-role-error-message");
    messages.add(higherRoleErrorMessage);
    higherRoleErrorMessage.workers.add(
        new api.ODWorker("example-command:higher-role-error-message", 0, async (instance, params, source, cancel) => {
            instance.setContent("The bot cannot ban a user with a higher or equal role.");
        })
    );
});

// REGISTER COMMAND RESPONDERS
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    // Ban Command Responder
    commands.add(new api.ODCommandResponder("example-command:ban", generalConfig.data.prefix, "ban"));
    commands.get("example-command:ban").workers.add([
        new api.ODWorker("example-command:ban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to ban members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Get the user to ban and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:higher-role-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher role than the bot
            const botMember = guild.members.me;
            if (targetMember && botMember && targetMember.roles.highest.position >= botMember.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:higher-role-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Send a DM to the user before banning
                try {
                    await targetUser.send(`You have been banned from **${guild.name}** for the following reason: ${reason}`);
                } catch (dmError) {
                    console.error("Failed to send DM to the user:", dmError);
                    // Notify the moderator that the DM failed
                    
                }
                
                // Ban the user
                await guild.members.ban(targetUser, { reason });
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:ban-message").build(source, {}));
            } catch (error) {
                console.error("Failed to ban user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("example-command:logs", -1, (instance, params, source, cancel) => {
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
    commands.add(new api.ODCommandResponder("example-command:unban", generalConfig.data.prefix, "unban"));
    commands.get("example-command:unban").workers.add([
        new api.ODWorker("example-command:unban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!guild.members.cache.get(user.id)?.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Get the user ID to unban and the reason
            const userId = instance.options?.getString("userid", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!userId) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Unban the user
                await guild.members.unban(userId, reason);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unban-message").build(source, {}));
            } catch (error) {
                console.error("Failed to unban user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("example-command:logs", -1, (instance, params, source, cancel) => {
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
    commands.add(new api.ODCommandResponder("example-command:kick", generalConfig.data.prefix, "kick"));
    commands.get("example-command:kick").workers.add([
        new api.ODWorker("example-command:kick", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the bot has permission to kick members
            if (!guild.members.me?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to kick members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Get the user to kick and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:higher-role-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher role than the bot
            const botMember = guild.members.me;
            if (targetMember && botMember && targetMember.roles.highest.position >= botMember.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:higher-role-error-message").build(source, {}));
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
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:kick-message").build(source, {}));
            } catch (error) {
                console.error("Failed to kick user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("example-command:logs", -1, (instance, params, source, cancel) => {
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
    commands.add(new api.ODCommandResponder("example-command:warn", generalConfig.data.prefix, "warn"));
    commands.get("example-command:warn").workers.add([
        new api.ODWorker("example-command:warn", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user } = instance;

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the user has permission to warn members
            const member = guild.members.cache.get(user.id);
            if (!member?.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Get the user to warn and the reason
            const targetUser = instance.options?.getUser("user", true);
            const reason = instance.options?.getString("reason", false) || "No reason provided.";

            if (!targetUser) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            const targetMember = guild.members.cache.get(targetUser.id);
            if (targetMember && member && targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:higher-role-error-message").build(source, {}));
                return cancel();
            }

            try {
                // Send a warning message to the user
                await targetUser.send(`You have been warned in **${guild.name}** for: ${reason}`);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:warn-message").build(source, {}));
            } catch (error) {
                console.error("Failed to warn user:", error);
                instance.reply(await opendiscord.builders.messages.getSafe("example-command:unknown-error-message").build(source, {}));
            }
        }),
        new api.ODWorker("example-command:logs", -1, (instance, params, source, cancel) => {
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
