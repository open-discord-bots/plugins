import { api, opendiscord, utilities } from "#opendiscord";
import * as discord from "discord.js";

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
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-moderation:ban": api.ODTextCommand;
        "ot-moderation:unban": api.ODTextCommand;
        "ot-moderation:kick": api.ODTextCommand;
        "ot-moderation:warn": api.ODTextCommand;
    }
    export interface ODCommandResponderManagerIds_Default {
        "ot-moderation:ban": { source: "slash" | "text", params: {}, workers: "ot-moderation:ban" | "ot-moderation:logs" };
        "ot-moderation:unban": { source: "slash" | "text", params: {}, workers: "ot-moderation:unban" | "ot-moderation:logs" };
        "ot-moderation:kick": { source: "slash" | "text", params: {}, workers: "ot-moderation:kick" | "ot-moderation:logs" };
        "ot-moderation:warn": { source: "slash" | "text", params: {}, workers: "ot-moderation:warn" | "ot-moderation:logs" };
    }
    export interface ODMessageManagerIds_Default {
        "ot-moderation:ban-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:ban-message" };
        "ot-moderation:unban-message": { source: "slash" | "text" | "other", params: {author:discord.User,userId:string,reason:string|null}, workers: "ot-moderation:unban-message" };
        "ot-moderation:kick-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:kick-message" };
        "ot-moderation:warn-message": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:warn-message" };
 }
    export interface ODEmbedManagerIds_Default {
        "ot-moderation:ban-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:ban-embed" };
        "ot-moderation:unban-embed": { source: "slash" | "text" | "other", params: {author:discord.User,userId:string,reason:string|null}, workers: "ot-moderation:unban-embed" };
        "ot-moderation:kick-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:kick-embed" };
        "ot-moderation:warn-embed": { source: "slash" | "text" | "other", params: {author:discord.User,user:discord.User,reason:string|null}, workers: "ot-moderation:warn-embed" };
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
    slash.add(new api.ODSlashCommand("ot-moderation:kick", {
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
    slash.add(new api.ODSlashCommand("ot-moderation:warn", {
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
});

// REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");
    // Ban Embed
    embeds.add(new api.ODEmbed("ot-moderation:ban-embed"));
    embeds.get("ot-moderation:ban-embed").workers.add(
        new api.ODWorker("ot-moderation:ban-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("🚫","User Banned"))
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been banned from the server.");
            instance.addFields({name:"Reason:",value:"```"+params.reason+"```"})
            instance.setThumbnail(params.user.displayAvatarURL())
            instance.setAuthor(params.author.displayName,params.author.displayAvatarURL())
        })
    );

    // Unban Embed
    embeds.add(new api.ODEmbed("ot-moderation:unban-embed"));
    embeds.get("ot-moderation:unban-embed").workers.add(
        new api.ODWorker("ot-moderation:unban-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("🚫","User Unbanned"))
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.userId)+" has been unbanned from the server.");
            instance.addFields({name:"Reason:",value:"```"+params.reason+"```"})
            instance.setThumbnail(params.author.displayAvatarURL())
            instance.setAuthor(params.author.displayName,params.author.displayAvatarURL())
        })
    );

    // Kick Embed
    embeds.add(new api.ODEmbed("ot-moderation:kick-embed"));
    embeds.get("ot-moderation:kick-embed").workers.add(
        new api.ODWorker("ot-moderation:kick-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("👋","User Kicked"))
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been kicked from the server.");
            instance.addFields({name:"Reason:",value:"```"+params.reason+"```"})
            instance.setThumbnail(params.user.displayAvatarURL())
            instance.setAuthor(params.author.displayName,params.author.displayAvatarURL())
        })
    );

    // Warn Embed
    embeds.add(new api.ODEmbed("ot-moderation:warn-embed"));
    embeds.get("ot-moderation:warn-embed").workers.add(
        new api.ODWorker("ot-moderation:warn-embed", 0, (instance, params, source, cancel) => {
            instance.setTitle(utilities.emojiTitle("⚠️","User Warned"))
            instance.setColor(generalConfig.data.mainColor);
            instance.setDescription(discord.userMention(params.user.id)+" has been warned.");
            instance.addFields({name:"Reason:",value:"```"+params.reason+"```"})
            instance.setThumbnail(params.user.displayAvatarURL())
            instance.setAuthor(params.author.displayName,params.author.displayAvatarURL())
        })
    );
});

// REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    // Ban Message Builder
    messages.add(new api.ODMessage("ot-moderation:ban-message"))
    messages.get("ot-moderation:ban-message").workers.add(
        new api.ODWorker("ot-moderation:ban-message", 0, async (instance, params, source, cancel) => {
            const {user,reason,author} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:ban-embed").build(source,{user,reason,author}));    
        })
    );

    // Unban Message Builder
    messages.add(new api.ODMessage("ot-moderation:unban-message"))
    messages.get("ot-moderation:unban-message").workers.add(
        new api.ODWorker("ot-moderation:unban-message", 0, async (instance, params, source, cancel) => {
            const {userId,reason,author} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:unban-embed").build(source,{userId,reason,author}));
        })
    );

    // Kick Message Builder
    messages.add(new api.ODMessage("ot-moderation:kick-message"))
    messages.get("ot-moderation:kick-message").workers.add(
        new api.ODWorker("ot-moderation:kick-message", 0, async (instance, params, source, cancel) => {
            const {user,reason,author} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:kick-embed").build(source,{user,reason,author}));
        })
    );

    // Warn Message Builder
    messages.add(new api.ODMessage("ot-moderation:warn-message"))
    messages.get("ot-moderation:warn-message").workers.add(
        new api.ODWorker("ot-moderation:warn-message", 0, async (instance, params, source, cancel) => {
            const {user,reason,author} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-moderation:warn-embed").build(source,{user,reason,author}));
        })
    );
});

// REGISTER COMMAND RESPONDERS
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general");

    // Ban Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:ban",generalConfig.data.prefix,"ban"));
    commands.get("ot-moderation:ban").workers.add([
        new api.ODWorker("ot-moderation:ban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"The bot doesn't have permissions to ban people in this server."}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source,{guild,channel,user,permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to ban and the reason
            const targetUser = instance.options.getUser("user",true);
            const reason = instance.options.getString("reason",false)
            const targetMember = await opendiscord.client.fetchGuildMember(guild,targetUser.id)

            if (!targetMember){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"Unable to find target member in server."}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"You do not have permissions to ban a user with a higher role."}));
                return cancel();
            }

            await opendiscord.client.sendUserDm(targetUser,{ephemeral:false,id:new api.ODId("ot-moderation:banned-dm"),message:{
                content:"You have been banned from **"+guild.name+"** for the following reason:\n```"+(reason ?? "/")+"```"
            }})
            
            // Ban the user
            try{
                await guild.members.ban(targetUser,{reason:(reason ?? "/")})
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:ban-message").build(source,{author:user,user:targetUser,reason}));
            }catch(err){
                process.emit("uncaughtException",err)
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user",true);
            const reason = instance.options.getString("reason",false) ?? "/"
            opendiscord.log(`${instance.user.displayName} has banned ${targetUser.displayName} from the server!`, "plugin", [
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"target",value:targetUser.username},
                {key:"targetid",value:targetUser.id,hidden:true},
                {key:"method",value:source},
                {key:"reason",value:reason},
            ])
        })
    ]);

 // Unban Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:unban", generalConfig.data.prefix, "unban"));
    commands.get("ot-moderation:unban").workers.add([
        new api.ODWorker("ot-moderation:unban", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}));
                return cancel();
            }

            // Check if the bot has permission to ban members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"The bot doesn't have permissions to unban people in this server."}));
                return cancel();
            }

            // Check if the user has permission to ban members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.BanMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source,{guild,channel,user,permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user ID to unban and the reason
            const userId = instance.options.getString("userid", true)
            const reason = instance.options.getString("reason", false)
            
            // Unban the user
            try {
                await guild.members.unban(userId, reason ?? "/");
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:unban-message").build(source,{author:user,userId,reason}));
            }catch(err){
                process.emit("uncaughtException",err)
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUserId = instance.options.getString("userid", true)
            const reason = instance.options.getString("reason",false) ?? "/"
            opendiscord.log(`${instance.user.displayName} has unbanned ${targetUserId} in the server!`, "plugin", [
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"targetid",value:targetUserId},
                {key:"method",value:source},
                {key:"reason",value:reason},
            ])
        })
    ]);
    
    // Kick Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:kick", generalConfig.data.prefix, "kick"));
    commands.get("ot-moderation:kick").workers.add([
        new api.ODWorker("ot-moderation:kick", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}));
                return cancel();
            }

            // Check if the bot has permission to kick members
            if (!guild.members.me || !guild.members.me.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"The bot doesn't have permissions to kick people in this server."}));
                return cancel();
            }

            // Check if the user has permission to kick members
            if (!member.permissions.has(discord.PermissionsBitField.Flags.KickMembers)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source,{guild,channel,user,permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to kick and the reason
            const targetUser = instance.options.getUser("user", true)
            const reason = instance.options.getString("reason", false)
            const targetMember = await opendiscord.client.fetchGuildMember(guild,targetUser.id)

            if (!targetMember){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"Unable to find target member in server."}));
                return cancel();
            }

            // Check if the target user has a higher or equal role than the user executing the command
            if (targetMember.roles.highest.position >= member.roles.highest.position) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,layout:"simple",error:"You do not have permissions to ban a user with a higher role."}));
                return cancel();
            }

            await opendiscord.client.sendUserDm(targetUser,{ephemeral:false,id:new api.ODId("ot-moderation:kicked-dm"),message:{
                content:"You have been kicked from **"+guild.name+"** for the following reason:\n```"+(reason ?? "/")+"```"
            }})
            
            // Kick the user
            try{
                await guild.members.kick(targetUser,reason ?? "/")
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:kick-message").build(source,{author:user,user:targetUser,reason}));
            }catch(err){
                process.emit("uncaughtException",err)
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user",true);
            const reason = instance.options.getString("reason",false) ?? "/"
            opendiscord.log(`${instance.user.displayName} has kicked ${targetUser.displayName} from the server!`, "plugin", [
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"target",value:targetUser.username},
                {key:"targetid",value:targetUser.id,hidden:true},
                {key:"method",value:source},
                {key:"reason",value:reason},
            ])
        })
    ]);

    // Warn Command Responder
    commands.add(new api.ODCommandResponder("ot-moderation:warn", generalConfig.data.prefix, "warn"));
    commands.get("ot-moderation:warn").workers.add([
        new api.ODWorker("ot-moderation:warn", 0, async (instance, params, source, cancel) => {
            const { guild, channel, user, member } = instance;

            if (!guild || !member){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}));
                return cancel();
            }

            // Check if the user has permission to warn members
            if (!opendiscord.permissions.hasPermissions("support",await opendiscord.permissions.getPermissions(user,channel,guild,{allowChannelRoleScope:false,allowChannelUserScope:false,allowGlobalRoleScope:true,allowGlobalUserScope:true}))){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source,{guild,channel,user,permissions:["admin","discord-administrator"]}));
                return cancel();
            }

            // Get the user to warn and the reason
            const targetUser = instance.options?.getUser("user", true)
            const reason = instance.options?.getString("reason", false)

            await opendiscord.client.sendUserDm(targetUser,{ephemeral:false,id:new api.ODId("ot-moderation:warned-dm"),message:{
                content:"You have been warned in **"+guild.name+"** for the following reason:\n```"+(reason ?? "/")+"```"
            }})
            
            // Warn the user
            try{
                //TODO: PRESERVE WARNINGS :)
                await instance.reply(await opendiscord.builders.messages.getSafe("ot-moderation:warn-message").build(source,{author:user,user:targetUser,reason}));
            }catch(err){
                process.emit("uncaughtException",err)
            }
        }),
        new api.ODWorker("ot-moderation:logs", -1, (instance, params, source, cancel) => {
            const targetUser = instance.options.getUser("user",true);
            const reason = instance.options.getString("reason",false) ?? "/"
            opendiscord.log(`${instance.user.displayName} has warned ${targetUser.displayName} in the server!`, "plugin", [
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"target",value:targetUser.username},
                {key:"targetid",value:targetUser.id,hidden:true},
                {key:"method",value:source},
                {key:"reason",value:reason},
            ])
        })
    ]);
});
