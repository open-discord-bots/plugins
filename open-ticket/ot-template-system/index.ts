import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
import { templatesConfigStructure } from "./checkerStructures"
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//DECLARACIÓN DE TIPOS
interface Template {
    id: string;
    name: string;
    description: string;
    message: {
        enabled: boolean;
        text: string;
        embed: {
            enabled: boolean;
            title: string;
            description: string;
            customColor: string;
            image: string;
            thumbnail: string;
            fields: { name: string; value: string; inline: boolean }[];
            timestamp: boolean;
        };
        ping: {
            "@here": boolean;
            "@everyone": boolean;
            custom: string[];
        };
    };
}

class TemplatesConfig extends api.ODJsonConfig {
    declare data: Template[]
}

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "templates":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "templates:config":TemplatesConfig
    }
    export interface ODCheckerManagerIds_Default {
        "templates:config":api.ODChecker;
    }
    export interface ODSlashCommandManagerIds_Default {
        "templates:plantillas":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIds_Default {
        "templates:plantillas":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIds_Default {
        "templates:plantillas":{source:"slash"|"text",params:{},workers:"templates:plantillas"|"templates:logs"},
    }
    export interface ODMessageManagerIds_Default {
        "templates:template-message":{source:"slash"|"text"|"other",params:{template:Template,user:discord.User},workers:"templates:template-message"},
    }
    export interface ODEmbedManagerIds_Default {
        "templates:template-embed":{source:"slash"|"text"|"other",params:{template:Template},workers:"templates:template-embed"},
    }
}

//REGISTRAR CONFIGURACIÓN
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new TemplatesConfig("templates:config","templates.json","./plugins/templates-system/"));
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("templates:config")
    checkers.add(new api.ODChecker("templates:config",checkers.storage,0,config,templatesConfigStructure))
})

//REGISTER SLASH COMMAND
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    const templatesConfig = opendiscord.configs.get("templates:config");
    const templates = templatesConfig.data;

    // Create choices dynamically from templates
    const choices = templates.map(template => ({
        name: template.name,
        value: template.id
    }));

    slash.add(new api.ODSlashCommand("templates:plantillas",{
        name:"templates",
        description:"Send a predefined template",
        type:discord.ApplicationCommandType.ChatInput,
        contexts:[discord.InteractionContextType.Guild],
        integrationTypes:[discord.ApplicationIntegrationType.GuildInstall],
        options:[
            {
                name:"template",
                description:"Select the template to send",
                type:discord.ApplicationCommandOptionType.String,
                required:true,
                choices:choices
            }
        ]
    }))
})

//REGISTER TEXT COMMAND
opendiscord.events.get("onTextCommandLoad").listen((text) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    text.add(new api.ODTextCommand("templates:plantillas",{
        name:"templates",
        prefix:generalConfig.data.prefix,
        dmPermission:false,
        guildPermission:true
    }))
})

//REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra")?.add(new api.ODHelpMenuCommandComponent("templates:plantillas",0,{
        slashName:"templates",
        textName:"templates",
        slashDescription:"Send a predefined template",
        textDescription:"Send a predefined template"
    }))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    embeds.add(new api.ODEmbed("templates:template-embed"))
    embeds.get("templates:template-embed")?.workers.add(
        new api.ODWorker("templates:template-embed",0,(instance,params,source,cancel) => {
            const { template } = params;

            if(!template.message.embed.enabled) return cancel();

            const { title, description, customColor, image, thumbnail, fields, timestamp } = template.message.embed;

            if(title) instance.setTitle(title);
            if(description) instance.setDescription(description);
            
            instance.setColor((customColor ? customColor : generalConfig.data.mainColor) as discord.ColorResolvable);
            
            if(image) instance.setImage(image);
            if(thumbnail) instance.setThumbnail(thumbnail);
            if(fields && fields.length > 0) instance.setFields(fields);
            if(timestamp) instance.setTimestamp(new Date());
        })
    )
})

//REGISTER MESSAGE BUILDER
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("templates:template-message"))
    messages.get("templates:template-message")?.workers.add(
        new api.ODWorker("templates:template-message",0,async (instance,params,source,cancel) => {
            const { template, user } = params;

            if(!template.message.enabled) return cancel();

            // Construir el contenido del mensaje
            let content = "";
            
            // Agregar pings
            if(template.message.ping["@here"]) content += "@here ";
            if(template.message.ping["@everyone"]) content += "@everyone ";
            if(template.message.ping.custom && template.message.ping.custom.length > 0) {
                template.message.ping.custom.forEach(mention => {
                    content += `${mention} `;
                });
            }
            
            // Agregar texto personalizado
            if(template.message.text) content += template.message.text;

            if(content.trim()) instance.setContent(content.trim());

            // Agregar embed si está habilitado
            if(template.message.embed.enabled) {
                instance.addEmbed(await opendiscord.builders.embeds.getSafe("templates:template-embed").build(source,{template}));
            }
        })
    )
})

//REGISTER COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    commands.add(new api.ODCommandResponder("templates:plantillas",generalConfig.data.prefix,"templates"))
    commands.get("templates:plantillas")?.workers.add([
        new api.ODWorker("templates:plantillas",0,async (instance,params,source,cancel) => {
            const {guild,channel,user} = instance
            if (!guild){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}))
                return cancel()
            }

            const templatesConfig = opendiscord.configs.get("templates:config");
            const templates = templatesConfig.data;

            if(!templates || templates.length === 0) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,error:"No templates available",layout:"simple"}));
                return cancel();
            }

            // Get the selected template ID
            let templateId: string | null = null;

            if(source === "slash" && instance.interaction) {
                const interaction = instance.interaction as discord.ChatInputCommandInteraction;
                templateId = interaction.options.getString("template", true);
            } else {
                // For text commands, show error
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,error:"This command is only available as a slash command",layout:"simple"}));
                return cancel();
            }

            // Find the template
            const template = templates.find(t => t.id === templateId);

            if(!template) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,error:"Selected template not found",layout:"simple"}));
                return cancel();
            }

            // First respond ephemerally to avoid timeout
            if(source === "slash" && instance.interaction) {
                const interaction = instance.interaction as discord.ChatInputCommandInteraction;
                
                const confirmEmbed = new discord.EmbedBuilder()
                    .setTitle("✅ Template Sent")
                    .setDescription(`The template **${template.name}** has been sent successfully.`)
                    .setColor("#00ff00")
                    .setTimestamp();

                await interaction.reply({
                    embeds: [confirmEmbed],
                    ephemeral: true
                });
            }

            // Then build and send the template message to the channel
            const messageTemplate = await opendiscord.builders.messages.getSafe("templates:template-message").build(source,{template, user});
            
            if(channel && "send" in channel && typeof channel.send === "function") {
                await channel.send(messageTemplate.message);
            }

            // Specific log for the sent template
            opendiscord.log(user.displayName+` sent template '${template.name}'`,"plugin",[
                {key:"user",value:user.username},
                {key:"userid",value:user.id,hidden:true},
                {key:"channelid",value:channel.id,hidden:true},
                {key:"template",value:template.name}
            ]);
        }),
        new api.ODWorker("templates:logs",-1,(instance,params,source,cancel) => {
            opendiscord.log(instance.user.displayName+" used the 'templates' command!","plugin",[
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"channelid",value:instance.channel.id,hidden:true},
                {key:"method",value:source}
            ])
        })
    ])
})