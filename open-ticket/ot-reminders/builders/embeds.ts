import { opendiscord, api, utilities } from "#opendiscord"
import * as discord from "discord.js"

// REGISTER EMBED BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds,builders,actions) => {
    embeds.add(new api.ODEmbed("ot-reminders:reminder-embed"))
    embeds.get("ot-reminders:reminder-embed").workers.add(
        new api.ODWorker("ot-reminders:reminder-embed",0,async (instance,params,source,cancel) => {
            const {reminder} = params
            instance.setTitle(reminder.get("ot-reminders:embed-title").value)
            instance.setDescription(reminder.get("ot-reminders:embed-description").value)
            instance.setColor(reminder.get("ot-reminders:embed-color").value)
            instance.setFooter(reminder.get("ot-reminders:embed-footer").value, reminder.get("ot-reminders:footer-image").value)
            instance.setAuthor(reminder.get("ot-reminders:embed-author").value, reminder.get("ot-reminders:author-image").value)
            if (reminder.get("ot-reminders:embed-timestamp").value) instance.setTimestamp(Date.now())
            instance.setImage(reminder.get("ot-reminders:embed-image").value)
            instance.setThumbnail(reminder.get("ot-reminders:embed-thumbnail").value)

        })
    )

    embeds.add(new api.ODEmbed("ot-reminders:list-embed"))
    embeds.get("ot-reminders:list-embed").workers.add(
        new api.ODWorker("ot-reminders:list-embed",0,async (instance,params,source,cancel) => {
            const {reminders} = params
            const fields = reminders.map((reminder) => {
                const content = `> Channel: ${discord.channelMention(reminder.get("ot-reminders:channel").value)}\n> Last Reminder: \`${reminder.get("ot-reminders:start-time").value}\`\n> Interval: \`${reminder.get("ot-reminders:interval").value.value} ${reminder.get("ot-reminders:interval").value.unit}\``
                return {name: `${reminder.id.value.split(":")[1]}${reminder.get("ot-reminders:paused").value ? " - ⏸️" : ""}`, value: content}
            })
            instance.setTitle("Reminders")
            instance.setColor(opendiscord.configs.get("opendiscord:general").data.mainColor)
            instance.setFields(fields)
        })
    )
})