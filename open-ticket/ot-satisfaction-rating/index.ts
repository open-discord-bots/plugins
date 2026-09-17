import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
import * as fjs from "formatted-json-stringify"

if (utilities.project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

const pluginConfigId = "satisfaction-rating-plugin:config"
const pluginDatabaseId = "satisfaction-rating-plugin:db"

opendiscord.events.get("onConfigLoad").listen((configManager) => {
    configManager.add(new api.ODJsonConfig(pluginConfigId,"config.json","./plugins/satisfaction-rating-plugin/"))
})

opendiscord.events.get("onDatabaseLoad").listen((databaseManager) => {
    const formatter = new fjs.ArrayFormatter(null,true,new fjs.ObjectFormatter(null,false,[
        new fjs.PropertyFormatter("category"),
        new fjs.PropertyFormatter("key"),
        new fjs.DefaultFormatter("value",false)
    ]))

    databaseManager.add(new api.ODFormattedJsonDatabase(
        pluginDatabaseId,
        "ratings.json",
        formatter,
        "./plugins/satisfaction-rating-plugin/"
    ))
})

function createRatingButtons(ticketId:string): discord.ActionRowBuilder<discord.ButtonBuilder> {
    const row = new discord.ActionRowBuilder<discord.ButtonBuilder>()
    for (let rating = 1; rating <= 5; rating++){
        row.addComponents(
            new discord.ButtonBuilder()
                .setCustomId(`sr:rate_${rating}_${ticketId}`)
                .setLabel(`${rating} Star${rating > 1 ? "s" : ""}`)
                .setStyle(discord.ButtonStyle.Secondary)
        )
    }
    return row
}

opendiscord.events.get("afterTicketClosed").listen(async (ticket,user,channel,reason) => {
    const pluginConfig = opendiscord.configs.get(pluginConfigId)
    if (!pluginConfig || !pluginConfig.data.enabled) return
    if (channel.isThread()) return

    try{
        await channel.send({
            content: pluginConfig.data.prompt,
            components:[createRatingButtons(ticket.id.value)]
        })
    }catch(err){
        process.emit("uncaughtException",err as Error)
    }
})

opendiscord.events.get("onButtonResponderLoad").listen((buttonResponders) => {
    buttonResponders.add(new api.ODButtonResponder("satisfaction-rating-plugin:rate",/^sr:rate_[1-5]_.+/))
    buttonResponders.get("satisfaction-rating-plugin:rate")?.workers.add([
        new api.ODWorker("satisfaction-rating-plugin:handle",0,async (instance,params,source,cancel) => {
            const pluginConfig = opendiscord.configs.get(pluginConfigId)
            const database = opendiscord.databases.get(pluginDatabaseId)
            if (!pluginConfig || !pluginConfig.data.enabled || !database){
                await instance.reply({
                    id:new api.ODId("satisfaction-rating-plugin:disabled"),
                    ephemeral:true,
                    message:{ content:"Rating collection is currently disabled." }
                })
                return cancel()
            }

            const parts = instance.interaction.customId.split("_")
            const rating = Number(parts[1])
            const ticketId = parts.slice(2).join("_")
            if (!Number.isInteger(rating) || rating < 1 || rating > 5 || ticketId.length < 1){
                await instance.reply({
                    id:new api.ODId("satisfaction-rating-plugin:invalid"),
                    ephemeral:true,
                    message:{ content:"Invalid rating payload." }
                })
                return cancel()
            }

            const alreadyRated = await database.exists("rating",ticketId)
            if (alreadyRated && !pluginConfig.data.allowUpdate){
                await instance.reply({
                    id:new api.ODId("satisfaction-rating-plugin:already-rated"),
                    ephemeral:true,
                    message:{ content:"A rating was already submitted for this ticket." }
                })
                return cancel()
            }

            await database.set("rating",ticketId,{
                ticketId,
                rating,
                ratedBy:instance.user.id,
                ratedAt:Date.now(),
                channelId:instance.channel.id
            })

            await instance.reply({
                id:new api.ODId("satisfaction-rating-plugin:thanks"),
                ephemeral:true,
                message:{ content:pluginConfig.data.thankYou }
            })
        })
    ])
})
