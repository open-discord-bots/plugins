import { opendiscord, api, utilities } from "#opendiscord"

// REGISTER MESSAGE BUILDERS
opendiscord.events.get("onMessageBuilderLoad").listen((messages,builders,actions) => {
    messages.add(new api.ODMessage("ot-reminders:reminder-message"))
    messages.get("ot-reminders:reminder-message").workers.add(
        new api.ODWorker("ot-reminders:reminder-message",0,async (instance,params,source,cancel) => {
            const {reminder} = params
            const ping = reminder.get("ot-reminders:ping").value
            const text = reminder.get("ot-reminders:text").value

            instance.setContent(`${ping ? `${ping}\n` : ""}${text ? text : ""}`)
            if(reminder.get("ot-reminders:embed-title").value || reminder.get("ot-reminders:embed-description").value){
                instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-reminders:reminder-embed").build(source,{reminder}))
            }
        })
    )

    messages.add(new api.ODMessage("ot-reminders:list-message"))
    messages.get("ot-reminders:list-message").workers.add(
        new api.ODWorker("ot-reminders:list-message",0,async (instance,params,source,cancel) => {
            const {reminders} = params
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-reminders:list-embed").build(source,{reminders}))
            instance.setEphemeral(true)
        })
    )

    messages.add(new api.ODMessage("ot-reminders:success-message"))
    messages.get("ot-reminders:success-message").workers.add(
        new api.ODWorker("ot-reminders:success-message",0,async (instance,params,source,cancel) => {
            const { scope } = params
            instance.setContent(`✅ The reminder has been ${scope} successfully!`)
            instance.setEphemeral(true)
        })
    )
})