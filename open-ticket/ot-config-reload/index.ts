import { api, opendiscord, utilities, openticketUtils } from "#opendiscord"
import * as discord from "discord.js";

//DECLARATION
declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-config-reload":api.ODPlugin
    }
    export interface ODSlashCommandManagerIdMappings {
        "ot-config-reload:reload":api.ODSlashCommand
    }
    export interface ODCommandResponderManagerIdMappings {
        "ot-config-reload:reload":{origin:"slash"|"text",params:{},workers:"ot-config-reload:reload"}
    }
    export interface ODMessageManagerIdMappings {
        "ot-config-reload:reload-result":{origin:"slash"|"text"|"other",params:{user:discord.User,results:{config:api.ODConfig<any>,result:api.ODCheckerResult,checker:api.ODChecker|null}[],globalResult:api.ODCheckerResult},workers:"ot-config-reload:reload-result"}
    }
    export interface ODEmbedManagerIdMappings {
        "ot-config-reload:main-embed":{origin:"slash"|"text"|"other",params:{user:discord.User,results:{config:api.ODConfig<any>,result:api.ODCheckerResult,checker:api.ODChecker|null}[],globalResult:api.ODCheckerResult},workers:"ot-config-reload:main-embed"},
        "ot-config-reload:failure-embed":{origin:"slash"|"text"|"other",params:{user:discord.User,result:api.ODCheckerResult},workers:"ot-config-reload:failure-embed"},
    }
    export interface ODAutocompleteResponderManagerIdMappings {
        "ot-config-reload:complete-config":{origin:"autocomplete",params:{},workers:"ot-config-reload:complete-config"}
    }
}

//REGISTER COMMANDS
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    slash.add(new api.ODSlashCommand("ot-config-reload:reload", {
        name:"reload",
        description:"Reload Open Ticket config files without restarting the bot.",
        type:discord.ApplicationCommandType.ChatInput,
        contexts:[discord.InteractionContextType.Guild],
        integrationTypes:[discord.ApplicationIntegrationType.GuildInstall],
        options:[
            {
                name:"config",
                description:"Select the config to reload. If omitted, it reloads all config files.",
                type:discord.ApplicationCommandOptionType.String,
                required:false,
                autocomplete:true
            }
        ]
    }))
})

//REGISTER AUTOCOMPLETE
opendiscord.events.get("onAutocompleteResponderLoad").listen((autocomplete) => {
    autocomplete.add(new api.ODAutocompleteResponder("ot-config-reload:complete-config","reload","config"))
    autocomplete.get("ot-config-reload:complete-config").workers.add(
        new api.ODWorker("ot-config-reload:complete-config",0,async (instance,params,origin,cancel) => {
            const configs: {id:string,path:string,displayName:string|null,pluginName:string|null,}[] = opendiscord.configs.getAll().map((config) => {
                const builtin = config.id.getNamespace() === "opendiscord"
                const pluginName = opendiscord.plugins.get(config.id.getNamespace())?.name ?? null
                const checker = opendiscord.checkers.getAll().find((checker) => checker.config.id.value === config.id.value)
                const displayName = checker?.options.cliDisplayName ?? null
                
                return {
                    id:config.id.value,
                    path:config.path,
                    displayName,
                    pluginName:(builtin) ? null : pluginName
                }
            })
            
            await instance.filteredAutocomplete(configs.map((config) => ({
                name:`${config.displayName ?? config.pluginName ?? config.id} (${config.path})`,
                value:config.id
            })))
        })
    )
})

//REGISTER EMBEDS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const tm = opendiscord.checkers.translation

    embeds.add(new api.ODEmbed("ot-config-reload:failure-embed"))
    embeds.get("ot-config-reload:failure-embed").workers.add(
        new api.ODWorker("ot-config-reload:failure-embed",0,(instance,params,origin,cancel) => {
            const {result,user} = params
            
            //convert checker messages to embed fields
            const filteredMsgs = result.messages.filter((msg) => msg.type !== "info")
            const fields: discord.EmbedField[] = []
            for (const msg of filteredMsgs.slice(0,25)){
                const rawTranslation = tm.get("message",msg.messageId.value)
                const translatedMessage = (rawTranslation) ? tm.insertTranslationParams(rawTranslation, msg.translationParams) : msg.message
                const pathMessage = `${msg.filepath + (msg.path ? ":" : "")} ${msg.path}`
                
                if (msg.type == "error") fields.push({
                    name:utilities.emojiTitle("❌","Error: "+translatedMessage),
                    value:"Location: `"+pathMessage+"`",
                    inline:false
                })
                else if (msg.type == "warning") fields.push({
                    name:utilities.emojiTitle("⚠️","Warning: "+translatedMessage),
                    value:"Location: `"+pathMessage+"`",
                    inline:false
                })
            }
            
            const includesErrors = result.messages.some((msg) => msg.type === "error")
            instance.setTitle(includesErrors ? utilities.emojiTitle("❌","Config Reload Failed") : utilities.emojiTitle("⚠️","Config Reload Warnings"))
            instance.setColor(includesErrors ? "Red" : "Green")
            instance.setDescription(includesErrors ? `Failed to reload the config.\nPlease correct the following errors and try again.` : "Successfully reloaded the config.\nIt is recommended to fix the following warnings.")
            instance.setAuthor(user.displayName,user.displayAvatarURL())
            instance.setFields(fields)
            if (filteredMsgs.length > 25) instance.setFooter("Only 25 of the "+filteredMsgs.length+" errors and warnings are shown. The rest will be shown when these errors are fixed.")
        })
    )

    embeds.add(new api.ODEmbed("ot-config-reload:main-embed"))
    embeds.get("ot-config-reload:main-embed").workers.add(
        new api.ODWorker("ot-config-reload:main-embed",0,(instance,params,origin,cancel) => {
            const {results,user} = params
            
            const checkerResults: string[] = []
            for (const {config,result,checker} of results){
                const pluginName = opendiscord.plugins.get(config.id.getNamespace())?.name ?? null
                const displayName = checker?.options.cliDisplayName ?? null
                const isValid = !checker || (result.messages.filter((msg) => msg.checkerId.value === checker.id.value && msg.type == "error").length == 0)
            
                checkerResults.push((isValid ? "- ✅ Valid: " : "- ❌ Invalid: ")+`${displayName ?? pluginName ?? config.id} (\`${config.path}\`)`)
            }

            instance.setTitle(utilities.emojiTitle("🔄","Configs Reloaded"))
            instance.setAuthor(user.displayName,user.displayAvatarURL())
            instance.setColor(generalConfig.data.mainColor as discord.ColorResolvable)
            instance.setDescription(`The configuration files have been reloaded.\nInvalid files will be shown below.`,)
            instance.addFields({
                name:utilities.emojiTitle("⚙️","Config Status"),
                value:checkerResults.join("\n"),
                inline:false
            })
        })
    )
})

//REGISTER MESSAGES
opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    messages.add(new api.ODMessage("ot-config-reload:reload-result"))
    messages.get("ot-config-reload:reload-result").workers.add(
        new api.ODWorker("ot-config-reload:reload-result",0,async (instance,params,origin,cancel) => {
            const {user,results,globalResult} = params
            
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-config-reload:main-embed").build(origin,{user,results,globalResult}))
            if (globalResult.messages.filter((msg) => msg.type !== "info").length > 0) instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-config-reload:failure-embed").build(origin,{user,result:globalResult}))
            instance.setEphemeral(true)
        })
    )
})

//COMMAND RESPONDERS
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")

    commands.add(new api.ODCommandResponder("ot-config-reload:reload",generalConfig.data.prefix,"reload"))
    commands.get("ot-config-reload:reload").workers.add([
        new api.ODWorker("ot-config-reload:reload",0,async (instance,params,origin,cancel) => {
            const {guild,channel,user} = instance

            //check if in guild
            const isInGuild = await openticketUtils.replyIsInGuild(instance,origin)
            if (!isInGuild || !guild || channel.isDMBased()) return cancel()
            
            //check permissions
            if (!opendiscord.permissions.hasPermissions("developer",await opendiscord.permissions.getPermissions(user,channel,guild))){
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(origin,{guild:instance.guild,channel:instance.channel,user:instance.user,permissions:["developer"]}))
                return cancel()
            }

            //fetch data
            await instance.defer(true)
            const rawConfigId = instance.options.getString("config",false)
            const configIds = (rawConfigId && opendiscord.configs.exists(rawConfigId)) ? [rawConfigId] : opendiscord.configs.getAll().map((c) => c.id.value)
            
            const configs: {config:api.ODConfig<any>,checker:api.ODChecker|null}[] = []
            for (const configId of configIds){
                const config = opendiscord.configs.get(configId)
                if (!config) continue
                const checker = opendiscord.checkers.getAll().find((checker) => checker.config.id.value === config.id.value) ?? null
                configs.push({config,checker})
            }
            configs.sort((a,b) => {
                return (b.checker?.priority ?? -9999) - (a.checker?.priority ?? -9999)
            })

            //INIT CONFIG: check if config is able to read/initialize
            const initiatedConfigs: {config:api.ODConfig<any>,checker:api.ODChecker|null,dataBackup:any}[] = []
            const finalReport: {config:api.ODConfig<any>,result:api.ODCheckerResult,checker:api.ODChecker|null}[] = []

            for (const {config,checker} of configs){
                const dataBackup = config.data
                try {
                    await config.init()
                    initiatedConfigs.push({config,checker,dataBackup})
                }catch{
                    //failed to initialize: revert changes
                    config.data = dataBackup
                    finalReport.push({config,result:{valid:false,messages:[]},checker})
                }
            }


            //RUN CONFIG CHECKER: start the config checker for ALL config files
            opendiscord.checkers.storage.reset()
            const globalResult = opendiscord.checkers.checkAll(true)
            for (const {config,checker} of initiatedConfigs){
                if (checker){
                    const filteredResult = globalResult.messages.filter((msg) => msg.type !== "info")
                    const valid = filteredResult.length == 0 || !filteredResult.some((msg) => msg.type === "error")
                    finalReport.push({config,result:{valid,messages:filteredResult},checker})
                }else{
                    finalReport.push({config,result:{valid:true,messages:[]},checker})
                }
            }

            //REVERT CHANGES IF INVALID
            if (!globalResult.valid){
                for (const {config,dataBackup} of initiatedConfigs){
                    config.data = dataBackup
                }
            }

            //RELOAD VALID CONFIGS: actually reload the config and trigger events throughout the bot
            for (const {config,result} of finalReport){
                if (!result.valid) continue
                try{
                    await config.reload()
                    opendiscord.log("Reloaded the "+config.id.value+" config!","system",[
                        {key:"user",value:instance.user.username},
                        {key:"userid",value:instance.user.id,hidden:true},
                        {key:"channelid",value:instance.channel.id,hidden:true},
                        {key:"method",value:origin}
                    ])
                }catch(err){
                    process.emit("uncaughtException",err)
                }
            }

            await instance.reply(await opendiscord.builders.messages.getSafe("ot-config-reload:reload-result").build(origin,{user,results:finalReport,globalResult}))
        }),
        new api.ODWorker("ot-config-reload:logs",-1,(instance,params,origin,cancel) => {
            opendiscord.log(instance.user.displayName+" used the 'reload' command!","plugin",[
                {key:"user",value:instance.user.username},
                {key:"userid",value:instance.user.id,hidden:true},
                {key:"channelid",value:instance.channel.id,hidden:true},
                {key:"method",value:origin}
            ])
        })
    ])
})

//AUTO UPDATE PANELS
opendiscord.events.get("afterConfigsInitiated").listen((configs) => {
    const panelConfig = configs.get("opendiscord:panels")
    panelConfig.onReload(() => {
        setTimeout(async () => {
            //timeout because ODPanelManager needs to reload first
            await opendiscord.tasks.get("opendiscord:panel-auto-update").func()
        },2000)
    })
})