import { opendiscord, api, utilities } from "#opendiscord"
import { ODReminderManager, ODReminder } from "./reminder"

import "./builders/messages";
import "./builders/embeds";
import "./builders/commands";

//REGISTER PLUGIN CLASSES
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
    classes.add(new ODReminderManager(opendiscord.debug))
})

//Load database savers
opendiscord.events.get("onCodeLoad").listen(async (code) => {
    const reminderManager = opendiscord.plugins.classes.get("ot-reminders:manager")
    const mainVersion = opendiscord.versions.get("opendiscord:version")
    const globalDatabase = opendiscord.databases.get("opendiscord:global")
    
    opendiscord.code.add(new api.ODCode("ot-reminders",6,() => {
        reminderManager.onAdd(async (reminder) => {
            await globalDatabase.set("ot-reminders:reminder",reminder.id.value,reminder.toJson(mainVersion))
        })
        reminderManager.onChange(async (reminder) => {
            await globalDatabase.set("ot-reminders:reminder",reminder.id.value,reminder.toJson(mainVersion))
        })
        reminderManager.onRemove(async (reminder) => {
            await globalDatabase.delete("ot-reminders:reminder",reminder.id.value)
        })
    }))
})

//REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-reminders:reminder-create",0,{
        slashName:"reminder create",
        slashDescription:"Create a custom reminder in the server.",
    }))
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-reminders:reminder-delete",0,{
        slashName:"reminder delete",
        slashDescription:"Delete a reminder in the server.",
    }))
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-reminders:reminder-list",0,{
        slashName:"reminder list",
        slashDescription:"List all reminders in the server.",
    }))
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-reminders:reminder-pause",0,{
        slashName:"reminder pause",
        slashDescription:"Pause a reminder in the server.",
    }))
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-reminders:reminder-resume",0,{
        slashName:"reminder resume",
        slashDescription:"Resume a reminder in the server.",
    }))
})

//Load all reminders from the database
const loadAllReminders = async () => {
    const globalDatabase = opendiscord.databases.get("opendiscord:global")
    if (!globalDatabase) return

    const reminders = await globalDatabase.getCategory("ot-reminders:reminder")
    if (!reminders) return
    for (const reminder of reminders){
        try {
            opendiscord.plugins.classes.get("ot-reminders:manager").add(ODReminder.fromJson(reminder.value))
        } catch (err){
            process.emit("uncaughtException",err)
            process.emit("uncaughtException",new api.ODPluginError("Failed to load reminder from database! (see error above) => id: "+reminder.key))
        }
    }
}

opendiscord.events.get("onPluginBeforeBuilderLoad").listen(async () => {
    opendiscord.log("Loading reminders...","plugin")
    await loadAllReminders()

    //schedule reminders on reminderManager
    const reminderManager = opendiscord.plugins.classes.get("ot-reminders:manager")
    reminderManager.getAll().forEach((reminder) => {
        reminder.schedule();
    })
})