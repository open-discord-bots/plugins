import { opendiscord, api, utilities } from "#opendiscord"
import { ODReminder, ODReminderManager, ODReminderData, ODReminderJson } from "./reminder.js"

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-reminders":api.ODPlugin
    }
    export interface ODMessageManagerIdMappings {
        "ot-reminders:reminder-message":{origin:"other",params:{reminder:ODReminder},workers:"ot-reminders:reminder-message"},
        "ot-reminders:list-message":{origin:"slash"|"other",params:{reminders:ODReminder[]},workers:"ot-reminders:list-message"},
        "ot-reminders:success-message":{origin:"slash"|"other",params:{ scope: "created"|"paused"|"resumed"|"deleted"|"listed" },workers:"ot-reminders:success-message"},
    }
    export interface ODEmbedManagerIdMappings {
        "ot-reminders:reminder-embed":{origin:"other",params:{reminder:ODReminder},workers:"ot-reminders:reminder-embed"},
        "ot-reminders:list-embed":{origin:"slash"|"other",params:{reminders:ODReminder[]},workers:"ot-reminders:list-embed"},
    }
    export interface ODSlashCommandManagerIdMappings {
        "ot-reminders:create":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIdMappings {
        "ot-reminders:create":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIdMappings {
        "ot-reminders:create":{origin:"slash"|"text",params:{},workers:"ot-reminders:create"|"ot-reminders:logs"},
    }
    export interface ODPluginClassManagerIdMappings {
        "ot-reminders:manager":ODReminderManager
        "ot-reminders:reminder":ODReminder
        "ot-reminders:reminder-data":ODReminderData<ODReminderJson>
    }
    export interface ODFormattedJsonDatabaseIdMappingsGlobal {
        "ot-reminders:reminder":ODReminderJson
    }
}