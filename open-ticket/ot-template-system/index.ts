import {api, opendiscord, utilities} from "#opendiscord"
import * as discord from "discord.js"
if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

//TEMPLATE DECLARATION
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
        "ot-template-system":api.ODPlugin
    }
    export interface ODConfigManagerIds_Default {
        "ot-template-system:config":TemplatesConfig
    }
    export interface ODCheckerManagerIds_Default {
        "ot-template-system:config":api.ODChecker;
    }
    export interface ODSlashCommandManagerIds_Default {
        "ot-template-system:plantillas":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-template-system:plantillas":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIds_Default {
        "ot-template-system:plantillas":{source:"slash"|"text",params:{},workers:"ot-template-system:plantillas"|"ot-template-system:logs"},
    }
    export interface ODMessageManagerIds_Default {
        "ot-template-system:template-message":{source:"slash"|"text"|"other",params:{template:Template,user:discord.User},workers:"ot-template-system:template-message"},
    }
    export interface ODEmbedManagerIds_Default {
        "ot-template-system:template-embed":{source:"slash"|"text"|"other",params:{template:Template},workers:"ot-template-system:template-embed"},
    }
}


// Checker structure for template configuration
const templatesConfigStructure = new api.ODCheckerArrayStructure("ot-template-system:config",{allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-template-system:template",{children:[
    //template configuration
    {key:"id",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UniqueId("ot-template-system:template-id","templates","template-ids",{minLength:1,maxLength:64})},
    {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:template-name",{minLength:1,maxLength:100})},
    {key:"description",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:template-description",{minLength:1,maxLength:100})},
    
    //message configuration
    {key:"message",optional:false,priority:0,checker:new api.ODCheckerEnabledObjectStructure("ot-template-system:message",{property:"enabled",enabledValue:true,checker:new api.ODCheckerObjectStructure("ot-template-system:message-content",{children:[
        {key:"text",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:message-text",{maxLength:2000})},
        
        //embed configuration
        {key:"embed",optional:false,priority:0,checker:new api.ODCheckerEnabledObjectStructure("ot-template-system:embed",{property:"enabled",enabledValue:true,checker:new api.ODCheckerObjectStructure("ot-template-system:embed-content", {children:[
            {key:"title",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:embed-title", {maxLength:256})},
            {key:"description",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:embed-description", {maxLength:4096})},
            {key:"customColor",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_HexColor("ot-template-system:embed-color",true,true)},
            
            {key:"image",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-template-system:embed-image",true,{allowHttp:false,allowedExtensions:[".png", ".jpg", ".jpeg", ".webp", ".gif"]})},
            {key:"thumbnail",optional:false,priority:0,checker:new api.ODCheckerCustomStructure_UrlString("ot-template-system:embed-thumbnail",true,{allowHttp:false,allowedExtensions:[".png", ".jpg", ".jpeg", ".webp", ".gif"]})},
            
            {key:"fields",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-template-system:embed-fields", {allowedTypes:["object"],propertyChecker:new api.ODCheckerObjectStructure("ot-template-system:embed-field", {children:[
                {key:"name",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:embed-field-name", {minLength:1,maxLength:256})},
                {key:"value",optional:false,priority:0,checker:new api.ODCheckerStringStructure("ot-template-system:embed-field-value", {minLength:1,maxLength:1024})},
                {key:"inline",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-template-system:embed-field-inline", {})}
            ]})})},
            {key:"timestamp",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-template-system:embed-timestamp", {})}
        ]})})},

        //ping configuration
        {key:"ping",optional:false,priority:0,checker:new api.ODCheckerObjectStructure("ot-template-system:ping", {children:[
            {key:"@here",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-template-system:ping-here", {})},
            {key:"@everyone",optional:false,priority:0,checker:new api.ODCheckerBooleanStructure("ot-template-system:ping-everyone", {})},
            {key:"custom",optional:false,priority:0,checker:new api.ODCheckerArrayStructure("ot-template-system:ping-custom", {allowedTypes:["string"]})}
        ]})}
    ]})})}
]})})

//REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new TemplatesConfig("ot-template-system:config","templates.json","./plugins/ot-template-system/"));
})

//REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-template-system:config")
    checkers.add(new api.ODChecker("ot-template-system:config",checkers.storage,0,config,templatesConfigStructure))
})

//REGISTER SLASH COMMAND
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    const templates = opendiscord.configs.get("ot-template-system:config");

    // Create choices dynamically from templates
    const choices = templates.data.map(template => ({
        name: template.name,
        value: template.id
    }));

    slash.add(new api.ODSlashCommand("ot-template-system:templates",{
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
    const templates = opendiscord.configs.get("ot-template-system:config");

    text.add(new api.ODTextCommand("ot-template-system:templates",{
        name:"templates",
        prefix:generalConfig.data.prefix,
        dmPermission:false,
        guildPermission:true,
        options:[
            {
                name:"template",
                type:"string",
                choices:templates.data.map((t) => t.id),
                required:true
            }
        ]
    }))
})

//REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-template-system:templates",0,{
        slashName:"templates",
        textName:"templates",
        slashDescription:"Send a predefined template",
        textDescription:"Send a predefined template"
    }))
})

//REGISTER EMBED BUILDER
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    embeds.add(new api.ODEmbed("ot-template-system:template-embed"))
    embeds.get("ot-template-system:template-embed")?.workers.add(
        new api.ODWorker("ot-template-system:template-embed",0,(instance,params,source,cancel) => {
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
    messages.add(new api.ODMessage("ot-template-system:template-message"))
    messages.get("ot-template-system:template-message")?.workers.add(
        new api.ODWorker("ot-template-system:template-message",0,async (instance,params,source,cancel) => {
            const { template, user } = params;

            if(!template.message.enabled) return cancel();

            //construct content
            let content = "";
            
            //add pings
            if(template.message.ping["@here"]) content += "@here ";
            if(template.message.ping["@everyone"]) content += "@everyone ";
            if(template.message.ping.custom && template.message.ping.custom.length > 0) {
                template.message.ping.custom.forEach(mention => {
                    content += `${mention} `;
                });
            }
            
            //add custom text
            if(template.message.text) content += template.message.text;
            if(content.trim()) instance.setContent(content.trim());

            //add custom embed
            if(template.message.embed.enabled) {
                instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-template-system:template-embed").build(source,{template}));
            }
        })
    )
})

//REGISTER COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const templates = opendiscord.configs.get("ot-template-system:config");

    commands.add(new api.ODCommandResponder("ot-template-system:templates",generalConfig.data.prefix,"templates"))
    commands.get("ot-template-system:templates")?.workers.add([
        new api.ODWorker("ot-template-system:templates",0,async (instance,params,source,cancel) => {
            const {guild,channel,user} = instance
            if (!guild){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source,{channel,user}))
                return cancel()
            }

            if(!templates.data || templates.data.length === 0) {
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,error:"No templates available",layout:"simple"}));
                return cancel();
            }

            //get the selected template ID
            let templateId = instance.options.getString("template",true)
            const template = templates.data.find(t => t.id === templateId);

            if(!template){
                await instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error").build(source,{guild,channel,user,error:"Selected template not found",layout:"simple"}));
                return cancel();
            }

            // First respond ephemerally to avoid timeout
            await instance.reply(await new api.ODQuickMessage("ot-template-system:reply",{
                ephemeral:true,
                embeds:[
                    await new api.ODQuickEmbed("ot-template-system:reply",{
                        title:utilities.emojiTitle("✅","Template Sent"),
                        description:`The template **${template.name}** has been sent successfully.`,
                        color:generalConfig.data.mainColor
                    }).build()
                ]
            }).build())

            // Then build and send the template message to the channel
            const messageTemplate = await opendiscord.builders.messages.getSafe("ot-template-system:template-message").build(source,{template, user});
            
            if (channel.isTextBased() && channel.isSendable()){
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
        new api.ODWorker("ot-template-system:logs",-1,(instance,params,source,cancel) => {
            opendiscord.log(instance.user.displayName+" used the 'templates' command!","plugin",[
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"channelid",value:instance.channel.id,hidden:true},
                {key:"method",value:source}
            ])
        })
    ])
})