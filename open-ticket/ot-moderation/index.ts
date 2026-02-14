import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";

// Load plugin config
const pluginConfig = opendiscord.configs.get("ot-moderation");

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-moderation": api.ODPlugin;
    }
    export interface ODSlashCommandManagerIds_Default {
        "ot-moderation:ban": api.ODSlashCommand;
        "ot-moderation:unban": api.ODSlashCommand;
        "ot-moderation:kick": api.ODSlashCommand;
        "ot-moderation:warn": api.ODSlashCommand;
        "ot-moderation:timeout": api.ODSlashCommand;
        "ot-moderation:untimeout": api.ODSlashCommand;
        "ot-moderation:mute": api.ODSlashCommand;
        "ot-moderation:unmute": api.ODSlashCommand;
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-moderation:ban": api.ODTextCommand;
        "ot-moderation:unban": api.ODTextCommand;
        "ot-moderation:kick": api.ODTextCommand;
        "ot-moderation:warn": api.ODTextCommand;
        "ot-moderation:timeout": api.ODTextCommand;
        "ot-moderation:untimeout": api.ODTextCommand;
        "ot-moderation:mute": api.ODTextCommand;
        "ot-moderation:unmute": api.ODTextCommand;
    }
    export interface ODCommandResponderManagerIds_Default {
        "ot-moderation:ban": { source: "slash" | "text", params: {}, workers: "ot-moderation:ban" | "ot-moderation:logs" };
        "ot-moderation:unban": { source: "slash" | "text", params: {}, workers: "ot-moderation:unban" | "ot-moderation:logs" };
        "ot-moderation:kick": { source: "slash" | "text", params: {}, workers: "ot-moderation:kick" | "ot-moderation:logs" };
        "ot-moderation:warn": { source: "slash" | "text", params: {}, workers: "ot-moderation:warn" | "ot-moderation:logs" };
        "ot-moderation:timeout": { source: "slash" | "text", params: {}, workers: "ot-moderation:timeout" | "ot-moderation:logs" };
        "ot-moderation:untimeout": { source: "slash" | "text", params: {}, workers: "ot-moderation:untimeout" | "ot-moderation:logs" };
        "ot-moderation:mute": { source: "slash" | "text", params: {}, workers: "ot-moderation:mute" | "ot-moderation:logs" };
        "ot-moderation:unmute": { source: "slash" | "text", params: {}, workers: "ot-moderation:unmute" | "ot-moderation:logs" };
    }
    export interface ODMessageManagerIds_Default {
        "ot-moderation:ban-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:ban-message" };
        "ot-moderation:unban-message": { source: "slash" | "text" | "other", params: {author:discord.User,userId:string,reason:string|null}, workers: "ot-moderation:unban-message" };
        "ot-moderation:kick-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:kick-message" };
        "ot-moderation:warn-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:warn-message" };
        "ot-moderation:timeout-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,duration:string,reason:string|null}, workers: "ot-moderation:timeout-message" };
        "ot-moderation:untimeout-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:untimeout-message" };
        "ot-moderation:mute-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:mute-message" };
        "ot-moderation:unmute-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:unmute-message" };
    }
    export interface ODEmbedManagerIds_Default {
        "ot-moderation:ban-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:ban-embed" };
        "ot-moderation:unban-embed": { source: "slash" | "text" | "other", params: {author:discord.User,userId:string,reason:string|null}, workers: "ot-moderation:unban-embed" };
        "ot-moderation:kick-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:kick-embed" };
        "ot-moderation:warn-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:warn-embed" };
        "ot-moderation:timeout-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,duration:string,reason:string|null}, workers: "ot-moderation:timeout-embed" };
        "ot-moderation:untimeout-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:untimeout-embed" };
        "ot-moderation:mute-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:mute-embed" };
        "ot-moderation:unmute-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:unmute-embed" };
    }
}

// REGISTER SLASH COMMANDS
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    // Ban Command
    slash.add(new api.ODSlashCommand("ot-moderation:ban", {
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
    slash.add(new api.ODSlashCommand("ot-moderation:unban", {
        name: "unban",
        description: "✅ Unban a user from the server.",
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
    slash.add(new api.ODSlashCommand("ot-moderation:kick", {
        name: "kick",
        description: "👋 Kick a user from the server.",
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
    slash.add(new api.ODSlashCommand("ot-moderation:warn", {
        name: "warn",
        description: "⚠️ Warn a user in the server.",
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

    // Timeout Command
    slash.add(new api.ODSlashCommand("ot-moderation:timeout", {
        name: "timeout",
        description: "⏱️ Timeout a user in the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to timeout.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "duration",
                description: "Duration (e.g., 10m, 1h, 1d, 1w).",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the timeout.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Untimeout Command
    slash.add(new api.ODSlashCommand("ot-moderation:untimeout", {
        name: "untimeout",
        description: "⏰ Remove timeout from a user.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to remove timeout from.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for removing timeout.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Mute Command
    slash.add(new api.ODSlashCommand("ot-moderation:mute", {
        name: "mute",
        description: "🔇 Mute a user in the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to mute.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the mute.",
                type: discord.ApplicationCommandOptionType.String,
                required: false,
            }
        ]
    }));

    // Unmute Command
    slash.add(new api.ODSlashCommand("ot-moderation:unmute", {
        name: "unmute",
        description: "🔊 Unmute a user in the server.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                name: "user",
                description: "The user to unmute.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reason",
                description: "The reason for the unmute.",
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
    text.add(new api.ODTextCommand("ot-moderation:ban", {
        name: "ban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Unban Command
    text.add(new api.ODTextCommand("ot-moderation:unban", {
        name: "unban",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"string",
                name:"userid",
                required:true,
                regex:/^\d+$/
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Kick Command
    text.add(new api.ODTextCommand("ot-moderation:kick", {
        name: "kick",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Warn Command
    text.add(new api.ODTextCommand("ot-moderation:warn", {
        name: "warn",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Timeout Command
    text.add(new api.ODTextCommand("ot-moderation:timeout", {
        name: "timeout",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"duration",
                required:true,
                regex:/^\d+[smhdw]$/
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Untimeout Command
    text.add(new api.ODTextCommand("ot-moderation:untimeout", {
        name: "untimeout",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Mute Command
    text.add(new api.ODTextCommand("ot-moderation:mute", {
        name: "mute",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));

    // Unmute Command
    text.add(new api.ODTextCommand("ot-moderation:unmute", {
        name: "unmute",
        prefix: generalConfig.data.prefix,
        dmPermission: false,
        guildPermission: true,
        options:[
            {
                type:"user",
                name:"user",
                required:true
            },
            {
                type:"string",
                name:"reason",
                required:false,
                allowSpaces:true
            }
        ]
    }));
});

// REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    // Ban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:ban", 0, {
        slashName: "ban",
        textName: "ban",
        slashDescription: "Ban a user from the server.",
        textDescription: "Ban a user from the server.",
    }));

    // Unban Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:unban", 0, {
        slashName: "unban",
        textName: "unban",
        slashDescription: "Unban a user from the server.",
        textDescription: "Unban a user from the server.",
    }));

    // Kick Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:kick", 0, {
        slashName: "kick",
        textName: "kick",
        slashDescription: "Kick a user from the server.",
        textDescription: "Kick a user from the server.",
    }));

    // Warn Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:warn", 0, {
        slashName: "warn",
        textName: "warn",
        slashDescription: "Warn a user in the server.",
        textDescription: "Warn a user in the server.",
    }));

    // Timeout Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:timeout", 0, {
        slashName: "timeout",
        textName: "timeout",
        slashDescription: "Timeout a user in the server.",
        textDescription: "Timeout a user in the server.",
    }));

    // Untimeout Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:untimeout", 0, {
        slashName: "untimeout",
        textName: "untimeout",
        slashDescription: "Remove timeout from a user.",
        textDescription: "Remove timeout from a user.",
    }));

    // Mute Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:mute", 0, {
        slashName: "mute",
        textName: "mute",
        slashDescription: "Mute a user in the server.",
        textDescription: "Mute a user in the server.",
    }));

    // Unmute Command
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-moderation:unmute", 0, {
        slashName: "unmute",
        textName: "unmute",
        slashDescription: "Unmute a user in the server.",
        textDescription: "Unmute a user in the server.",
    }));
});

// HELPER FUNCTION: Check if user has admin/moderator roles
function hasRequiredRole(member: discord.GuildMember, action: 'admin' | 'moderator'): boolean {
    const config = opendiscord.configs.get("ot-moderation");
    
    // If no roles configured, return true (fall back to Discord permissions)
    if (action === 'admin') {
        const adminRoles: string[] = config?.data?.adminRoles || [];
        if (adminRoles.length === 0) return true;
        return adminRoles.some(roleId => member.roles.cache.has(roleId));
    } else {
        const moderatorRoles: string[] = config?.data?.moderatorRoles || [];
        const adminRoles: string[] = config?.data?.adminRoles || [];

        
        // If no roles configured, return true (fall back to Discord permissions)
        if (moderatorRoles.length === 0 && adminRoles.length === 0) return true;
        
        // Check if user has moderator or admin role
        return moderatorRoles.some(roleId => member.roles.cache.has(roleId)) || 
               adminRoles.some(roleId => member.roles.cache.has(roleId));
    }
}

// HELPER FUNCTION: Parse Duration
function parseDuration(duration: string): number | null {
    const match = duration.match(/^(\d+)([smhdw])$/);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    const multipliers: { [key: string]: number } = {
        's': 1000,
        'm': 60 * 1000,
        'h': 60 * 60 * 1000,
        'd': 24 * 60 * 60 * 1000,
        'w': 7 * 24 * 60 * 60 * 1000
    };

    return value * multipliers[unit];
}

// HELPER FUNCTION: Format Duration
function formatDuration(duration: string): string {
    const match = duration.match(/^(\d+)([smhdw])$/);
    if (!match) return duration;

    const value = match[1];
    const unit = match[2];

    const units: { [key: string]: string } = {
        's': 'second(s)',
        'm': 'minute(s)',
        'h': 'hour(s)',
        'd': 'day(s)',
        'w': 'week(s)'
    };

    return `${value} ${units[unit]}`;
}

// REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");
    
    // Ban Embed
    embeds.add(new api.ODEmbed("ot-moderation:ban-embed"));
    embeds.get("ot-moderation:ban-embed").workers.add(
        new api.ODWorker("ot-moderation:ban-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("🚫","User Banned"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been banned from the server.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Unban Embed
    embeds.add(new api.ODEmbed("ot-moderation:unban-embed"));
    embeds.get("ot-moderation:unban-embed").workers.add(
        new api.ODWorker("ot-moderation:unban-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("✅","User Unbanned"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.userId)+" has been unbanned from the server.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.author.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Kick Embed
    embeds.add(new api.ODEmbed("ot-moderation:kick-embed"));
    embeds.get("ot-moderation:kick-embed").workers.add(
        new api.ODWorker("ot-moderation:kick-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("👋","User Kicked"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been kicked from the server.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Warn Embed
    embeds.add(new api.ODEmbed("ot-moderation:warn-embed"));
    embeds.get("ot-moderation:warn-embed").workers.add(
        new api.ODWorker("ot-moderation:warn-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("⚠️","User Warned"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been warned.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Timeout Embed
    embeds.add(new api.ODEmbed("ot-moderation:timeout-embed"));
    embeds.get("ot-moderation:timeout-embed").workers.add(
        new api.ODWorker("ot-moderation:timeout-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("⏱️","User Timed Out"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been timed out for **"+formatDuration(params.duration)+"**.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Untimeout Embed
    embeds.add(new api.ODEmbed("ot-moderation:untimeout-embed"));
    embeds.get("ot-moderation:untimeout-embed").workers.add(
        new api.ODWorker("ot-moderation:untimeout-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("⏰","Timeout Removed"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+"'s timeout has been removed.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Mute Embed
    embeds.add(new api.ODEmbed("ot-moderation:mute-embed"));
    embeds.get("ot-moderation:mute-embed").workers.add(
        new api.ODWorker("ot-moderation:mute-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("🔇","User Muted"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been muted.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );

    // Unmute Embed
    embeds.add(new api.ODEmbed("ot-moderation:unmute-embed"));
    embeds.get("ot-moderation:unmute-embed").workers.add(
        new api.ODWorker("ot-moderation:unmute-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("🔊","User Unmuted"));
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been unmuted.");
            instance.addFields({name:"Reason:",value:"```"+(params.reason || "No reason provided")+"```"});
            instance.setThumbnail(params.user.displayAvatarURL());
            instance.setAuthor(params.author.displayName, params.author.displayAvatarURL());
        })
    );
});

// REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    // Ban Message Builder
    messages.add(new api.ODMessage("ot-moderation:ban-message"));
    messages.get("ot-moderation:ban-message").workers.add(
        new api.ODWorker("ot-moderation:ban-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:ban-embed").build(source, {user, reason, author}));    
        })
    );

    // Unban Message Builder
    messages.add(new api.ODMessage("ot-moderation:unban-message"));
    messages.get("ot-moderation:unban-message").workers.add(
        new api.ODWorker("ot-moderation:unban-message", 0, async (instance, params, source, cancel) => {
            const {userId, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:unban-embed").build(source, {userId, reason, author}));
        })
    );

    // Kick Message Builder
    messages.add(new api.ODMessage("ot-moderation:kick-message"));
    messages.get("ot-moderation:kick-message").workers.add(
        new api.ODWorker("ot-moderation:kick-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:kick-embed").build(source, {user, reason, author}));
        })
    );

    // Warn Message Builder
    messages.add(new api.ODMessage("ot-moderation:warn-message"));
    messages.get("ot-moderation:warn-message").workers.add(
        new api.ODWorker("ot-moderation:warn-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:warn-embed").build(source, {user, reason, author}));
        })
    );

    // Timeout Message Builder
    messages.add(new api.ODMessage("ot-moderation:timeout-message"));
    messages.get("ot-moderation:timeout-message").workers.add(
        new api.ODWorker("ot-moderation:timeout-message", 0, async (instance, params, source, cancel) => {
            const {user, duration, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:timeout-embed").build(source, {user, duration, reason, author}));
        })
    );

    // Untimeout Message Builder
    messages.add(new api.ODMessage("ot-moderation:untimeout-message"));
    messages.get("ot-moderation:untimeout-message").workers.add(
        new api.ODWorker("ot-moderation:untimeout-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:untimeout-embed").build(source, {user, reason, author}));
        })
    );

    // Mute Message Builder
    messages.add(new api.ODMessage("ot-moderation:mute-message"));
    messages.get("ot-moderation:mute-message").workers.add(
        new api.ODWorker("ot-moderation:mute-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:mute-embed").build(source, {user, reason, author}));
        })
    );

    // Unmute Message Builder
    messages.add(new api.ODMessage("ot-moderation:unmute-message"));
    messages.get("ot-moderation:unmute-message").workers.add(
        new api.ODWorker("ot-moderation:unmute-message", 0, async (instance, params, source, cancel) => {
            const {user, reason, author} = params;
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:unmute-embed").build(source, {user, reason, author}));
        })
    );
});

// REGISTER COMMAND RESPONDERS
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    // Ban Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:ban", generalConfig.data.prefix, "ban"));
    commands.get("ot-moderation:ban").workers.add([
        new api.ODWorker("ot-moderation:ban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to ban people in this server."}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.BanMembers) && !hasRequiredRole(member, 'admin')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to ban and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"You do not have permissions to ban a user with a higher or equal role."}));
                return cancel();
            }

            // Check if the bot can ban this user
            if (guild.members.me && targetMember.roles.highest.position >= guild.members.me.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"I cannot ban a user with a higher or equal role than me."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:banned-dm"),
                message: {
                    content: "You have been banned from **"+guild.name+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Ban the user
            try {
                await guild.members.ban(targetUser, {reason: (reason || "No reason provided")});
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:ban-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has banned ${targetUser.displayName} from the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Unban Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:unban", generalConfig.data.prefix, "unban"));
    commands.get("ot-moderation:unban").workers.add([
        new api.ODWorker("ot-moderation:unban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to unban people in this server."}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.BanMembers) && !hasRequiredRole(member, 'admin')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user ID to unban and the reason
            const userId = instance.options.getString("userid", true);
            const reason = instance.options.getString("reason", false);
            
            // Unban the user
            try {
                await guild.members.unban(userId, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:unban-message").build(source, {author: user, userId, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUserId = instance.options.getString("userid", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has unbanned ${targetUserId} in the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "targetid", value: targetUserId},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);
    
    // Kick Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:kick", generalConfig.data.prefix, "kick"));
    commands.get("ot-moderation:kick").workers.add([
        new api.ODWorker("ot-moderation:kick", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to kick members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to kick people in this server."}));
                return cancel();
            }

            // Check if the user has permission to kick members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.KickMembers) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to kick and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"You do not have permissions to kick a user with a higher or equal role."}));
                return cancel();
            }

            // Check if the bot can kick this user
            if (guild.members.me && targetMember.roles.highest.position >= guild.members.me.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"I cannot kick a user with a higher or equal role than me."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:kicked-dm"),
                message: {
                    content: "You have been kicked from **"+guild.name+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Kick the user
            try {
                await guild.members.kick(targetUser, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:kick-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has kicked ${targetUser.displayName} from the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Warn Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:warn", generalConfig.data.prefix, "warn"));
    commands.get("ot-moderation:warn").workers.add([
        new api.ODWorker("ot-moderation:warn", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the user has permission to warn members
            if (!opendiscord.permissions.hasPermissions("support", await opendiscord.permissions.getPermissions(user, channel, guild, {allowChannelRoleScope: false, allowChannelUserScope: false, allowGlobalRoleScope: true, allowGlobalUserScope: true})) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to warn and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:warned-dm"),
                message: {
                    content: "You have been warned in **"+guild.name+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Warn the user
            try {
                //TODO: PRESERVE WARNINGS :)
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:warn-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has warned ${targetUser.displayName} in the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Timeout Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:timeout", generalConfig.data.prefix, "timeout"));
    commands.get("ot-moderation:timeout").workers.add([
        new api.ODWorker("ot-moderation:timeout", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to timeout members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to timeout members in this server."}));
                return cancel();
            }

            // Check if the user has permission to timeout members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to timeout, duration, and the reason
            const targetUser = instance.options.getUser("user", true);
            const durationStr = instance.options.getString("duration", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Parse duration
            const duration = parseDuration(durationStr);
            if (!duration) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Invalid duration format. Use format like: 10m, 1h, 1d, 1w"}));
                return cancel();
            }

            // Discord timeout limit is 28 days
            const maxTimeout = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            if (duration > maxTimeout) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Timeout duration cannot exceed 28 days."}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"You do not have permissions to timeout a user with a higher or equal role."}));
                return cancel();
            }

            // Check if the bot can timeout this user
            if (guild.members.me && targetMember.roles.highest.position >= guild.members.me.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"I cannot timeout a user with a higher or equal role than me."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:timeout-dm"),
                message: {
                    content: "You have been timed out in **"+guild.name+"** for **"+formatDuration(durationStr)+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Timeout the user
            try {
                await targetMember.timeout(duration, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:timeout-message").build(source, {author: user, user: targetUser, duration: durationStr, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const durationStr = instance.options.getString("duration", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has timed out ${targetUser.displayName} for ${formatDuration(durationStr)}!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "duration", value: formatDuration(durationStr)},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Untimeout Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:untimeout", generalConfig.data.prefix, "untimeout"));
    commands.get("ot-moderation:untimeout").workers.add([
        new api.ODWorker("ot-moderation:untimeout", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to timeout members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to remove timeouts in this server."}));
                return cancel();
            }

            // Check if the user has permission to timeout members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.ModerateMembers) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to remove timeout from and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Check if user is actually timed out
            if (!targetMember.isCommunicationDisabled()) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"This user is not currently timed out."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:untimeout-dm"),
                message: {
                    content: "Your timeout in **"+guild.name+"** has been removed for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Remove timeout
            try {
                await targetMember.timeout(null, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:untimeout-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has removed timeout from ${targetUser.displayName}!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Mute Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:mute", generalConfig.data.prefix, "mute"));
    commands.get("ot-moderation:mute").workers.add([
        new api.ODWorker("ot-moderation:mute", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to manage roles
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.ManageRoles)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to manage roles in this server."}));
                return cancel();
            }

            // Check if the user has permission to mute members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.ManageRoles) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to mute and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Find or create mute role
            const muteRoleName = pluginConfig?.data?.muteRoleName || "Muted";
            let muteRole = guild.roles.cache.find(role => role.name === muteRoleName);
            
            if (!muteRole) {
                try {
                    muteRole = await guild.roles.create({
                        name: muteRoleName,
                        color: discord.Colors.DarkGrey,
                        permissions: [],
                        reason: "Auto-created mute role"
                    });

                    // Configure permissions for all channels (excluding threads)
                    for (const [, channel] of guild.channels.cache) {
                        if ((channel.isTextBased() || channel.isVoiceBased()) && !channel.isThread()) {
                            await channel.permissionOverwrites.create(muteRole, {
                                SendMessages: false,
                                Speak: false,
                                AddReactions: false
                            });
                        }
                    }
                } catch(err) {
                    instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Failed to create Muted role. Please create it manually."}));
                    return cancel();
                }
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"You do not have permissions to mute a user with a higher or equal role."}));
                return cancel();
            }

            // Check if the bot can mute this user
            if (guild.members.me && targetMember.roles.highest.position >= guild.members.me.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"I cannot mute a user with a higher or equal role than me."}));
                return cancel();
            }

            // Check if user already has mute role
            if (targetMember.roles.cache.has(muteRole.id)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"This user is already muted."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:muted-dm"),
                message: {
                    content: "You have been muted in **"+guild.name+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Mute the user
            try {
                await targetMember.roles.add(muteRole, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:mute-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has muted ${targetUser.displayName} in the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);

    // Unmute Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:unmute", generalConfig.data.prefix, "unmute"));
    commands.get("ot-moderation:unmute").workers.add([
        new api.ODWorker("ot-moderation:unmute", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, {channel, user}));
                return cancel();
            }

            // Check if the bot has permission to manage roles
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.ManageRoles)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"The bot doesn't have permissions to manage roles in this server."}));
                return cancel();
            }

            // Check if the user has permission to unmute members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.ManageRoles) && !hasRequiredRole(member, 'moderator')) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {guild, channel, user, permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to unmute and the reason
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false);
            const targetMember = await opendiscord.client.fetchGuildMember(guild, targetUser.id);

            if (!targetMember) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"Unable to find target member in server."}));
                return cancel();
            }

            // Find mute role
            const muteRoleName = pluginConfig?.data?.muteRoleName || "Muted";

            const muteRole = guild.roles.cache.find(role => role.name === muteRoleName);
            
            if (!muteRole) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:`${muteRoleName} role not found. Please create it manually.`}));
                return cancel();
            }

            // Check if user has mute role
            if (!targetMember.roles.cache.has(muteRole.id)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source, {guild, channel, user, layout:"simple", error:"This user is not currently muted."}));
                return cancel();
            }

            // Send DM to user
            await opendiscord.client.sendUserDm(targetUser, {
                ephemeral: false,
                id: new api.ODId("ot-moderation:unmuted-dm"),
                message: {
                    content: "You have been unmuted in **"+guild.name+"** for the following reason:\n```"+(reason || "No reason provided")+"```"
                }
            });
            
            // Unmute the user
            try {
                await targetMember.roles.remove(muteRole, reason || "No reason provided");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:unmute-message").build(source, {author: user, user: targetUser, reason}));
            } catch(err) {
                process.emit("uncaughtException", err as Error);
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user", true);
            const reason = instance.options.getString("reason", false) || "No reason provided";
            opendiscord.log(`${instance.user.displayName} has unmuted ${targetUser.displayName} in the server!`, "plugin", [
                {key: "user", value: instance.user.username},
                {key: "userid", value: instance.user.id, hidden: true},
                {key: "target", value: targetUser.username},
                {key: "targetid", value: targetUser.id, hidden: true},
                {key: "method", value: source},
                {key: "reason", value: reason},
            ]);
        })
    ]);
});
