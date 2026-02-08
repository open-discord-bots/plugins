import { opendiscord, api, utilities } from "#opendiscord"
import { ODReminder, ODReminderManager, ODReminderData, ODReminderJson } from "./reminder"

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-reminders":api.ODPlugin
    }
    export interface ODMessageManagerIds_Default {
        "ot-reminders:reminder-message":{source:"other",params:{reminder:ODReminder},workers:"ot-reminders:reminder-message"},
        "ot-reminders:list-message":{source:"slash"|"other",params:{reminders:ODReminder[]},workers:"ot-reminders:list-message"},
        "ot-reminders:success-message":{source:"slash"|"other",params:{ scope: "created"|"paused"|"resumed"|"deleted"|"listed" },workers:"ot-reminders:success-message"},
    }
    export interface ODEmbedManagerIds_Default {
        "ot-reminders:reminder-embed":{source:"other",params:{reminder:ODReminder},workers:"ot-reminders:reminder-embed"},
        "ot-reminders:list-embed":{source:"slash"|"other",params:{reminders:ODReminder[]},workers:"ot-reminders:list-embed"},
    }
    export interface ODSlashCommandManagerIds_Default {
        "ot-reminders:create":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIds_Default {
        "ot-reminders:create":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIds_Default {
        "ot-reminders:create":{source:"slash"|"text",params:{},workers:"ot-reminders:create"|"ot-reminders:logs"},
    }
    export interface ODPluginClassManagerIds_Default {
        "ot-reminders:manager":ODReminderManager
        "ot-reminders:reminder":ODReminder
        "ot-reminders:reminder-data":ODReminderData<ODReminderJson>
    }
    export interface ODFormattedJsonDatabaseIds_DefaultGlobal {
        "ot-reminders:reminder":ODReminderJson
    }
}