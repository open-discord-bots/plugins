import { opendiscord, api, utilities } from "#opendiscord"
import * as discord from "discord.js"
import { safeTimeout, parseDate, convertTime } from "./utils/time"

/**## ODReminderManager `class`
 * This is an OT Reminders manager.
 * 
 * This class manages all registered reminders in the bot. Only reminders which are available in this manager can be auto-updated.
 * 
 * All reminders which are added, removed or modified in this manager will be updated automatically in the database.
 */
export class ODReminderManager extends api.ODManager<ODReminder> {
    id: api.ODId = new api.ODId("ot-reminders:manager")
    // Track scheduled reminders timeouts/intervals
    static scheduledReminders = new Map<api.ODValidId,{timeout: NodeJS.Timeout|null}>()

    constructor(debug: api.ODDebugger) {
        super(debug, "reminder")
    }
}

/**## ODReminderDataJson `interface`
 * The JSON representatation from a single reminder property.
 */
export interface ODReminderDataJson {
    /**The id of this property. */
    id:string,
    /**The value of this property. */
    value:api.ODValidJsonType
}

/**## ODReminderDataJson `interface`
 * The JSON representatation from a single reminder.
 */
export interface ODReminderJson {
    /**The id of this reminder. */
    id:string,
    /**The version of Open Ticket used to create this reminder & store it in the database. */
    version:string,
    /**The full list of properties/variables related to this reminder. */
    data:ODReminderDataJson[]
}

/**## ODReminderIds `type`
 * This interface is a list of ids available in the `ODReminder` class.
 * It's used to generate typescript declarations for this class.
 */
export interface ODReminderIds {
    "ot-reminders:name":ODReminderData<string>,
    "ot-reminders:channel":ODReminderData<string>,
    "ot-reminders:text":ODReminderData<string>,
    "ot-reminders:embed-color":ODReminderData<discord.ColorResolvable>,
    "ot-reminders:embed-title":ODReminderData<string|null>,
    "ot-reminders:embed-description":ODReminderData<string|null>,
    "ot-reminders:embed-footer":ODReminderData<string|null>,
    "ot-reminders:embed-author":ODReminderData<string|null>,
    "ot-reminders:embed-timestamp":ODReminderData<boolean|null>,
    "ot-reminders:embed-image":ODReminderData<string|null>,
    "ot-reminders:embed-thumbnail":ODReminderData<string|null>,
    "ot-reminders:author-image":ODReminderData<string|null>,
    "ot-reminders:footer-image":ODReminderData<string|null>,
    "ot-reminders:ping":ODReminderData<string|null>,
    "ot-reminders:start-time":ODReminderData<string>,
    "ot-reminders:interval":ODReminderData<{value:number,unit:"seconds"|"minutes"|"hours"|"days"|"months"|"years"}>,
    "ot-reminders:paused":ODReminderData<boolean>
}

/**## ODReminder `class`
 * This is an OT Reminders plugin reminder.
 * 
 * This class contains all data related to this reminder (parsed from the database).
 */
export class ODReminder extends api.ODManager<ODReminderData<api.ODValidJsonType>> {
    /**The id of this reminder */
    id:api.ODId

    constructor(id:api.ODValidId, data:ODReminderData<api.ODValidJsonType>[]){
        super()
        this.id = new api.ODId(id)
        data.forEach((data) => {
            this.add(data)
        })
    }

    /**Convert this reminder to a JSON object for storing this reminder in the database. */
    toJson(version:api.ODVersion): ODReminderJson {
        const data = this.getAll().map((data) => {
            return {
                id:data.id.toString(),
                value:data.value
            }
        })
        
        return {
            id:this.id.toString(),
            version:version.toString(),
            data
        }
    }

    /**Create a reminder from a JSON object in the database. */
    static fromJson(json:ODReminderJson): ODReminder {
        return new ODReminder(json.id,json.data.map((data) => new ODReminderData(data.id,data.value)))
    }

    get<ReminderId extends keyof ODReminderIds>(id:ReminderId): ODReminderIds[ReminderId]
    get(id:api.ODValidId): ODReminderData<api.ODValidJsonType>|null
    
    get(id:api.ODValidId): ODReminderData<api.ODValidJsonType>|null {
        return super.get(id)
    }

    remove<ReminderId extends keyof ODReminderIds>(id:ReminderId): ODReminderIds[ReminderId]
    remove(id:api.ODValidId): ODReminderData<api.ODValidJsonType>|null
    
    remove(id:api.ODValidId): ODReminderData<api.ODValidJsonType>|null {
        return super.remove(id)
    }

    exists(id:keyof ODReminderIds): boolean
    exists(id:api.ODValidId): boolean
    
    exists(id:api.ODValidId): boolean {
        return super.exists(id)
    }

    schedule() {
        const paused = this.get("ot-reminders:paused").value;
        if (paused) return; //don't continue if paused
    
        const now = new Date();
        const rawInterval = this.get("ot-reminders:interval").value;
        const interval = convertTime(rawInterval.value, rawInterval.unit);
        let startOffset = 0;
    
        const rawStartTime = this.get("ot-reminders:start-time").value;
    
        if (rawStartTime !== "now") {
            const startTime = parseDate(rawStartTime);
            if (startTime) {
                const diff = startTime.getTime() - now.getTime();
                startOffset = diff > 0 ? diff : Math.max(0, interval + diff);
            }
        }

        let timeout: {timeout: NodeJS.Timeout|null} = {timeout:null};
        ODReminderManager.scheduledReminders.set(this.id,timeout);

        const callback = () => {
            if (this.get("ot-reminders:paused").value) return; //don't continue if paused
            this.send();
            safeTimeout(callback, interval, timeout);
        };
        safeTimeout(callback, startOffset, timeout);
    }

    // Send the reminder to the channel
    async send() {
        try {
            const guild = opendiscord.client.mainServer
            if (!guild) return
            const channel = await opendiscord.client.fetchGuildTextChannel(guild, this.get("ot-reminders:channel").value)
            if (!channel) return
            await channel.send((await opendiscord.builders.messages.get("ot-reminders:reminder-message").build("other",{reminder:this})).message)
            this.get("ot-reminders:start-time").value = utilities.dateString(new Date())
        } catch (err) {
            process.emit("uncaughtException",err)
            opendiscord.log("Error sending reminder! (See error above)","error")
        }
    }
}

/**## ODReminderData `class`
 * This is OT Reminders plugin Reminder data.
 * 
 * This class contains a single property for a Reminder. (string, number, boolean, object, array, null)
 * 
 * When this property is edited, the database will be updated automatically.
 */
export class ODReminderData<DataType extends api.ODValidJsonType> extends api.ODManagerData {
    /**The value of this property. */
    #value: DataType

    constructor(id:api.ODValidId, value:DataType){
        super(id)
        this.#value = value
    }

    /**The value of this property. */
    set value(value:DataType){
        this.#value = value
        this._change()
    }
    get value(): DataType {
        return this.#value
    }
    /**Refresh the database. Is only required to be used when updating `ODReminderData` with an object/array as value. */
    refreshDatabase(){
        this._change()
    }
}