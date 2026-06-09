import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"
import * as fjs from "formatted-json-stringify"
import fs from "fs"
import path from "path"
import { randomUUID } from "crypto"
import http from "http"
import { URL } from "url"

if ((utilities as any).project && (utilities as any).project != "openticket") throw new api.ODPluginError("This plugin only works in Open Ticket!")

const PLUGIN_ROOT = "./plugins/ot-sticky-messages/"
const STORAGE_ROOT = "./plugins/ot-sticky-messages/storage/"
const STICKY_DATABASE_CATEGORY = "ot-sticky-messages:sticky"

type OTStickyPermission = "admin" | "developer" | "owner"
type OTStickyType = "text" | "embed" | "attachment"
type OTStickyMode = "message" | "timed"
type OTStickyReactionAction = "repost" | "update"
type OTStickyScheduleType = "interval" | "daily" | "weekly" | "cron"

interface OTStickyConfigData {
    commandPermission: OTStickyPermission
    autoResendOnBoot: boolean
    deleteStickyMessageWhenDisabled: boolean
    dashboard?: {
        enabled?: boolean
        host?: string
        port?: number
        password?: string
    }
}

interface OTStickyEmbedData {
    title: string
    description: string
    color: string
    authorName?: string
    authorIconUrl?: string
    footer: string
    footerIconUrl?: string
    imageUrl: string
    thumbnailUrl: string
}

interface OTStickyAttachmentData {
    storedName: string
    originalName: string
    contentType: string | null
    spoiler: boolean
    fileUrl?: string
}

interface OTStickyExpirationData {
    expiresAt: string
    deleteMessage: boolean
}

interface OTStickyScheduleData {
    enabled: boolean
    type: OTStickyScheduleType
    expression: string
    timezone: string
    intervalMinutes: number | null
    minute: number | null
    hour: number | null
    dayOfWeek: number | null
    cron: {
        minutes: number[] | null
        hours: number[] | null
        daysOfWeek: number[] | null
    } | null
    catchUp: boolean
    nextRunAt: string | null
    lastRunAt: string | null
}

interface OTStickyReactionData {
    enabled: boolean
    emoji: string
    threshold: number
    action: OTStickyReactionAction
    processedMessageIds: string[]
}

interface OTStickyAnalyticsData {
    sentCount: number
    triggerCount: number
    lastSentAt: string | null
    lastTriggeredAt: string | null
}

interface OTStickyEntry {
    version: 1 | 2
    channelId: string
    enabled: boolean
    type: OTStickyType
    mode: OTStickyMode
    messageContent: string
    embedData: OTStickyEmbedData | null
    attachmentData: OTStickyAttachmentData | null
    lastStickyMessageId: string | null
    ignoredRoleIds: string[]
    cooldownMessages: number
    timedResendMinutes: number | null
    lastTimedResendAt?: string | null
    expiration?: OTStickyExpirationData | null
    schedule?: OTStickyScheduleData | null
    reaction?: OTStickyReactionData | null
    analytics?: OTStickyAnalyticsData
    createdAt: string
    updatedAt: string
}

interface OTStickyReplyData {
    title: string
    description: string
    color?: discord.ColorResolvable
    fields?: discord.EmbedField[]
}

class OTStickyConfig extends api.ODJsonConfig<OTStickyConfigData> {
    declare data: OTStickyConfigData
}

class OTStickyDatabase extends api.ODFormattedJsonDatabase {
    getEntry(channelId: string): OTStickyEntry | undefined {
        return super.get(STICKY_DATABASE_CATEGORY, channelId) as OTStickyEntry | undefined
    }

    setEntry(channelId: string, value: OTStickyEntry): boolean {
        return super.set(STICKY_DATABASE_CATEGORY, channelId, value) as boolean
    }

    deleteEntry(channelId: string): boolean {
        return super.delete(STICKY_DATABASE_CATEGORY, channelId) as boolean
    }

    getAllEntries(): OTStickyEntry[] {
        const entries = super.getCategory(STICKY_DATABASE_CATEGORY) as { key: string, value: OTStickyEntry }[] | undefined
        return (entries ?? []).map((entry) => entry.value as OTStickyEntry)
    }
}

const DASHBOARD_COOKIE = "ot_sticky_dashboard"
const MAX_PROCESSED_REACTIONS = 1000
const SCHEDULER_INTERVAL_MS = 60_000

const DEFAULT_DASHBOARD_CONFIG = {
    enabled: true,
    host: "127.0.0.1",
    port: 3087,
    password: "changeme"
}

const getConfigData = (config: OTStickyConfigData) => ({
    commandPermission: config.commandPermission ?? "admin",
    autoResendOnBoot: config.autoResendOnBoot ?? false,
    deleteStickyMessageWhenDisabled: config.deleteStickyMessageWhenDisabled ?? true,
    dashboard: {
        ...DEFAULT_DASHBOARD_CONFIG,
        ...(config.dashboard ?? {})
    }
})

const pad = (value: number) => value.toString().padStart(2, "0")
const isValidTimezone = (timezone: string) => {
    try {
        new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date())
        return true
    } catch {
        return false
    }
}

const getTimezoneParts = (date: Date, timezone: string) => {
    const safeTimezone = isValidTimezone(timezone) ? timezone : "UTC"
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: safeTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        weekday: "short"
    }).formatToParts(date)
    const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "0"
    const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    return {
        year: Number(get("year")),
        month: Number(get("month")),
        day: Number(get("day")),
        hour: Number(get("hour")),
        minute: Number(get("minute")),
        dayOfWeek: weekdayMap[get("weekday")] ?? 0,
        key: `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`
    }
}

const formatDate = (date: Date, timezone: string) => new Intl.DateTimeFormat("en-GB", {
    timeZone: isValidTimezone(timezone) ? timezone : "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric"
}).format(date)

const formatTime = (date: Date, timezone: string) => new Intl.DateTimeFormat("en-US", {
    timeZone: isValidTimezone(timezone) ? timezone : "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
}).format(date)

const parseDurationMs = (value: string): number | null => {
    const match = /^(\d+)\s*(m|min|minute|minutes|h|hour|hours|d|day|days)$/i.exec(value.trim())
    if (!match) return null
    const amount = Number(match[1])
    if (!Number.isFinite(amount) || amount < 1) return null
    const unit = match[2].toLowerCase()
    if (unit.startsWith("m")) return amount * 60_000
    if (unit.startsWith("h")) return amount * 60 * 60_000
    if (unit.startsWith("d")) return amount * 24 * 60 * 60_000
    return null
}

const parseClockTime = (value: string): { hour: number, minute: number } | null => {
    const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(value.trim())
    if (!match) return null
    let hour = Number(match[1])
    const minute = Number(match[2] ?? 0)
    const meridiem = match[3]?.toLowerCase()
    if (!Number.isFinite(hour) || !Number.isFinite(minute) || minute < 0 || minute > 59) return null
    if (meridiem === "pm" && hour < 12) hour += 12
    if (meridiem === "am" && hour === 12) hour = 0
    if (hour < 0 || hour > 23) return null
    return { hour, minute }
}

const parseNumberList = (value: string, min: number, max: number): number[] | null | false => {
    if (value === "*") return null
    const values = value.split(",").map((raw) => Number(raw.trim()))
    if (values.some((item) => !Number.isInteger(item) || item < min || item > max)) return false
    return [...new Set(values)].sort((a, b) => a - b)
}

const weekdayMap: Record<string, number> = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6
}

const scheduleMatchesDate = (schedule: OTStickyScheduleData, date: Date) => {
    const parts = getTimezoneParts(date, schedule.timezone)
    if (schedule.type === "interval") return false
    if (schedule.type === "daily") return parts.hour === schedule.hour && parts.minute === schedule.minute
    if (schedule.type === "weekly") return parts.dayOfWeek === schedule.dayOfWeek && parts.hour === schedule.hour && parts.minute === schedule.minute
    if (!schedule.cron) return false
    const minuteMatch = schedule.cron.minutes ? schedule.cron.minutes.includes(parts.minute) : true
    const hourMatch = schedule.cron.hours ? schedule.cron.hours.includes(parts.hour) : true
    const dayMatch = schedule.cron.daysOfWeek ? schedule.cron.daysOfWeek.includes(parts.dayOfWeek) : true
    return minuteMatch && hourMatch && dayMatch
}

const computeNextScheduleRun = (schedule: OTStickyScheduleData, fromMs = Date.now()): string | null => {
    if (schedule.type === "interval" && schedule.intervalMinutes) {
        return new Date(fromMs + schedule.intervalMinutes * 60_000).toISOString()
    }

    const start = Math.ceil((fromMs + 1) / 60_000) * 60_000
    const maxMinutes = 370 * 24 * 60
    for (let minuteOffset = 0; minuteOffset < maxMinutes; minuteOffset++) {
        const candidate = new Date(start + minuteOffset * 60_000)
        if (scheduleMatchesDate(schedule, candidate)) return candidate.toISOString()
    }
    return null
}

const parseScheduleExpression = (expression: string, timezone: string, catchUp: boolean): OTStickyScheduleData | null => {
    const trimmed = expression.trim()
    const normalized = trimmed.toLowerCase().replace(/\s+/g, " ")
    const safeTimezone = isValidTimezone(timezone) ? timezone : "UTC"

    const intervalMinutes = /^every (\d+) minutes?$/.exec(normalized)
    if (intervalMinutes) {
        const minutes = Number(intervalMinutes[1])
        if (!Number.isInteger(minutes) || minutes < 1 || minutes > 525600) return null
        const schedule: OTStickyScheduleData = {
            enabled: true,
            type: "interval",
            expression: trimmed,
            timezone: safeTimezone,
            intervalMinutes: minutes,
            minute: null,
            hour: null,
            dayOfWeek: null,
            cron: null,
            catchUp,
            nextRunAt: null,
            lastRunAt: null
        }
        schedule.nextRunAt = computeNextScheduleRun(schedule)
        return schedule
    }

    const intervalHours = /^every (\d+) hours?$/.exec(normalized)
    if (intervalHours) {
        const hours = Number(intervalHours[1])
        if (!Number.isInteger(hours) || hours < 1 || hours > 8760) return null
        const schedule: OTStickyScheduleData = {
            enabled: true,
            type: "interval",
            expression: trimmed,
            timezone: safeTimezone,
            intervalMinutes: hours * 60,
            minute: null,
            hour: null,
            dayOfWeek: null,
            cron: null,
            catchUp,
            nextRunAt: null,
            lastRunAt: null
        }
        schedule.nextRunAt = computeNextScheduleRun(schedule)
        return schedule
    }

    const daily = /^every day(?: at (.+))?$/.exec(normalized)
    if (daily) {
        const time = parseClockTime(daily[1] ?? "9 AM")
        if (!time) return null
        const schedule: OTStickyScheduleData = {
            enabled: true,
            type: "daily",
            expression: trimmed,
            timezone: safeTimezone,
            intervalMinutes: null,
            minute: time.minute,
            hour: time.hour,
            dayOfWeek: null,
            cron: null,
            catchUp,
            nextRunAt: null,
            lastRunAt: null
        }
        schedule.nextRunAt = computeNextScheduleRun(schedule)
        return schedule
    }

    const weekly = /^every ([a-z]+)(?: at (.+))?$/.exec(normalized)
    if (weekly && weekdayMap[weekly[1]] !== undefined) {
        const time = parseClockTime(weekly[2] ?? "9 AM")
        if (!time) return null
        const schedule: OTStickyScheduleData = {
            enabled: true,
            type: "weekly",
            expression: trimmed,
            timezone: safeTimezone,
            intervalMinutes: null,
            minute: time.minute,
            hour: time.hour,
            dayOfWeek: weekdayMap[weekly[1]],
            cron: null,
            catchUp,
            nextRunAt: null,
            lastRunAt: null
        }
        schedule.nextRunAt = computeNextScheduleRun(schedule)
        return schedule
    }

    const cronParts = trimmed.split(/\s+/)
    if (cronParts.length === 5) {
        const minutes = parseNumberList(cronParts[0], 0, 59)
        const hours = parseNumberList(cronParts[1], 0, 23)
        const rawDaysOfWeek = parseNumberList(cronParts[4], 0, 7)
        const daysOfWeek = rawDaysOfWeek === false ? false : rawDaysOfWeek?.map((day) => day === 7 ? 0 : day) ?? null
        if (minutes !== false && hours !== false && daysOfWeek !== false && (cronParts[2] === "*" && cronParts[3] === "*")) {
            const schedule: OTStickyScheduleData = {
                enabled: true,
                type: "cron",
                expression: trimmed,
                timezone: safeTimezone,
                intervalMinutes: null,
                minute: null,
                hour: null,
                dayOfWeek: null,
                cron: { minutes, hours, daysOfWeek },
                catchUp,
                nextRunAt: null,
                lastRunAt: null
            }
            schedule.nextRunAt = computeNextScheduleRun(schedule)
            return schedule
        }
    }

    return null
}

const normalizeEmoji = (emoji: string) => {
    const custom = /^<a?:[^:]+:(\d+)>$/.exec(emoji.trim())
    return custom ? custom[1] : emoji.trim()
}

const reactionKey = (reaction: discord.MessageReaction) => reaction.emoji.id ?? reaction.emoji.name ?? ""

class OTStickyVariableParser {
    renderText(value: string, guild: discord.Guild | null, channel: discord.GuildTextBasedChannel | null) {
        const now = new Date()
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
        const replacements: Record<string, string> = {
            server_name: guild?.name ?? "Unknown Server",
            member_count: guild?.memberCount ? guild.memberCount.toLocaleString("en-US") : "0",
            user_count: guild?.memberCount ? guild.memberCount.toLocaleString("en-US") : "0",
            date: formatDate(now, timezone),
            time: formatTime(now, timezone),
            guild_id: guild?.id ?? "Unknown Guild",
            channel_id: channel?.id ?? "Unknown Channel"
        }
        return value.replace(/\{([a-z_]+)\}/gi, (match, name: string) => replacements[name.toLowerCase()] ?? match)
    }

    renderEmbed(embed: OTStickyEmbedData, guild: discord.Guild | null, channel: discord.GuildTextBasedChannel | null): OTStickyEmbedData {
        return {
            title: this.renderText(embed.title, guild, channel),
            description: this.renderText(embed.description, guild, channel),
            color: embed.color,
            authorName: embed.authorName ? this.renderText(embed.authorName, guild, channel) : undefined,
            authorIconUrl: embed.authorIconUrl,
            footer: this.renderText(embed.footer, guild, channel),
            footerIconUrl: embed.footerIconUrl,
            imageUrl: embed.imageUrl,
            thumbnailUrl: embed.thumbnailUrl
        }
    }
}

class OTStickyManager extends api.ODManagerData {
    schedulerTimer: NodeJS.Timeout | null = null
    runtimeListenersStarted = false
    dashboardServer: http.Server | null = null
    resendLocks: Set<string> = new Set()
    messageCounters: Map<string, number> = new Map()
    variableParser = new OTStickyVariableParser()

    constructor(id: api.ODValidId) {
        super(id)
        this.ensureStorageRoot()
    }

    get config(): OTStickyConfig {
        return opendiscord.configs.get("ot-sticky-messages:config") as OTStickyConfig
    }

    get database(): OTStickyDatabase {
        return opendiscord.databases.get("ot-sticky-messages:database") as OTStickyDatabase
    }

    ensureStorageRoot() {
        if (!fs.existsSync(STORAGE_ROOT)) fs.mkdirSync(STORAGE_ROOT, { recursive: true })
    }

    normalizeEntry(entry: OTStickyEntry): OTStickyEntry {
        const now = new Date().toISOString()
        return {
            version: 2,
            channelId: entry.channelId,
            enabled: entry.enabled ?? true,
            type: entry.type,
            mode: entry.mode ?? "message",
            messageContent: entry.messageContent ?? "",
            embedData: entry.embedData ?? null,
            attachmentData: entry.attachmentData ?? null,
            lastStickyMessageId: entry.lastStickyMessageId ?? null,
            ignoredRoleIds: Array.isArray(entry.ignoredRoleIds) ? entry.ignoredRoleIds : [],
            cooldownMessages: Math.max(1, entry.cooldownMessages ?? 1),
            timedResendMinutes: entry.timedResendMinutes ? Math.max(1, entry.timedResendMinutes) : null,
            lastTimedResendAt: entry.lastTimedResendAt ?? null,
            expiration: entry.expiration ?? null,
            schedule: entry.schedule ? {
                ...entry.schedule,
                timezone: isValidTimezone(entry.schedule.timezone) ? entry.schedule.timezone : "UTC",
                nextRunAt: entry.schedule.nextRunAt ?? computeNextScheduleRun(entry.schedule),
                lastRunAt: entry.schedule.lastRunAt ?? null
            } : null,
            reaction: entry.reaction ? {
                enabled: entry.reaction.enabled ?? true,
                emoji: normalizeEmoji(entry.reaction.emoji),
                threshold: Math.max(1, Math.floor(entry.reaction.threshold ?? 1)),
                action: entry.reaction.action === "update" ? "update" : "repost",
                processedMessageIds: Array.isArray(entry.reaction.processedMessageIds) ? entry.reaction.processedMessageIds.slice(-MAX_PROCESSED_REACTIONS) : []
            } : null,
            analytics: {
                sentCount: Math.max(0, entry.analytics?.sentCount ?? 0),
                triggerCount: Math.max(0, entry.analytics?.triggerCount ?? 0),
                lastSentAt: entry.analytics?.lastSentAt ?? null,
                lastTriggeredAt: entry.analytics?.lastTriggeredAt ?? null
            },
            createdAt: entry.createdAt ?? now,
            updatedAt: entry.updatedAt ?? now
        }
    }

    getEntry(channelId: string): OTStickyEntry | null {
        const entry = this.database.getEntry(channelId)
        return entry ? this.normalizeEntry(entry) : null
    }

    getAllEntries(): OTStickyEntry[] {
        return this.database.getAllEntries().map((entry) => this.normalizeEntry(entry))
    }

    saveEntry(entry: OTStickyEntry) {
        const normalized = this.normalizeEntry({
            ...entry,
            updatedAt: new Date().toISOString()
        })
        this.database.setEntry(normalized.channelId, normalized)
    }

    async removeEntry(channelId: string, deleteStickyMessage: boolean) {
        const entry = this.getEntry(channelId)
        if (!entry) return false

        this.messageCounters.delete(channelId)

        if (deleteStickyMessage) await this.deleteStickyMessage(entry, false)
        this.deleteAttachmentFile(entry.attachmentData)
        this.database.deleteEntry(channelId)
        return true
    }

    async storeAttachment(attachment: discord.Attachment): Promise<OTStickyAttachmentData> {
        this.ensureStorageRoot()

        const response = await fetch(attachment.url)
        if (!response.ok) throw new api.ODPluginError(`Failed to download sticky attachment: ${response.status}`)

        const buffer = Buffer.from(await response.arrayBuffer())
        const originalName = attachment.name ?? "sticky-attachment"
        const safeOriginalName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_")
        const storedName = `${Date.now()}-${randomUUID()}-${safeOriginalName}`
        fs.writeFileSync(path.join(STORAGE_ROOT, storedName), buffer)

        return {
            storedName,
            originalName,
            contentType: attachment.contentType ?? null,
            spoiler: attachment.spoiler ?? false
        }
    }

    deleteAttachmentFile(attachmentData: OTStickyAttachmentData | null) {
        if (!attachmentData) return
        const fullPath = path.resolve(STORAGE_ROOT, attachmentData.storedName)
        if (!fullPath.startsWith(path.resolve(STORAGE_ROOT))) return
        if (fs.existsSync(fullPath)) fs.rmSync(fullPath, { force: true })
    }

    async fetchStickyChannel(channelId: string): Promise<discord.GuildTextBasedChannel | null> {
        const channel = await opendiscord.client.fetchChannel(channelId)
        if (!channel) return null
        if (channel.type !== discord.ChannelType.GuildText && channel.type !== discord.ChannelType.GuildAnnouncement) return null
        return channel
    }

    shouldIgnoreMessage(message: discord.Message, entry: OTStickyEntry): boolean {
        if (message.author.bot) return true
        if (message.webhookId) return true
        if (!message.inGuild()) return true
        if (!message.member) return false

        return entry.ignoredRoleIds.some((roleId) => message.member?.roles.cache.has(roleId))
    }

    buildStickyMessage(entry: OTStickyEntry, channel: discord.GuildTextBasedChannel): discord.MessageCreateOptions {
        const message: discord.MessageCreateOptions = {
            allowedMentions: { parse: [] }
        }
        const guild = "guild" in channel ? channel.guild : null

        if (entry.messageContent.length > 0) message.content = this.variableParser.renderText(entry.messageContent, guild, channel)

        if (entry.embedData) {
            const renderedEmbed = this.variableParser.renderEmbed(entry.embedData, guild, channel)
            const embed = new discord.EmbedBuilder()
            if (renderedEmbed.title) embed.setTitle(renderedEmbed.title)
            if (renderedEmbed.description) embed.setDescription(renderedEmbed.description)
            if (renderedEmbed.color) embed.setColor(renderedEmbed.color as discord.ColorResolvable)
            if (renderedEmbed.authorName) embed.setAuthor({ name: renderedEmbed.authorName, iconURL: renderedEmbed.authorIconUrl || undefined })
            if (renderedEmbed.footer) embed.setFooter({ text: renderedEmbed.footer, iconURL: renderedEmbed.footerIconUrl || undefined })
            if (renderedEmbed.imageUrl) embed.setImage(renderedEmbed.imageUrl)
            if (renderedEmbed.thumbnailUrl) embed.setThumbnail(renderedEmbed.thumbnailUrl)
            message.embeds = [embed]
        }

        if (entry.attachmentData) {
            if (entry.attachmentData.fileUrl) {
                message.content = message.content ? `${message.content}\n${entry.attachmentData.fileUrl}` : entry.attachmentData.fileUrl
            } else {
                const attachmentPath = path.join(STORAGE_ROOT, entry.attachmentData.storedName)
                if (!fs.existsSync(attachmentPath)) throw new api.ODPluginError(`Missing stored sticky attachment: ${entry.attachmentData.storedName}`)

                const file = new discord.AttachmentBuilder(attachmentPath)
                    .setName(entry.attachmentData.originalName)
                    .setSpoiler(entry.attachmentData.spoiler)

                if (entry.attachmentData.contentType) file.setDescription(entry.attachmentData.contentType)
                message.files = [file]
            }
        }

        return message
    }

    async deleteStickyMessage(entry: OTStickyEntry, persist: boolean) {
        if (!entry.lastStickyMessageId) return

        const channel = await this.fetchStickyChannel(entry.channelId)
        if (!channel) {
            entry.lastStickyMessageId = null
            if (persist) this.saveEntry(entry)
            return
        }

        try {
            const previousMessage = await channel.messages.fetch(entry.lastStickyMessageId)
            await previousMessage.delete()
        } catch { }

        entry.lastStickyMessageId = null
        if (persist) this.saveEntry(entry)
    }

    isExpired(entry: OTStickyEntry) {
        return entry.expiration?.expiresAt ? Date.now() >= new Date(entry.expiration.expiresAt).getTime() : false
    }

    async expireEntry(entry: OTStickyEntry) {
        entry.enabled = false
        const deleteMessage = entry.expiration?.deleteMessage ?? false
        entry.expiration = null
        this.saveEntry(entry)
        if (deleteMessage) await this.deleteStickyMessage(entry, true)
    }

    async resendSticky(channelId: string, reason = "manual"): Promise<{ success: boolean, reason?: string, entry?: OTStickyEntry }> {
        if (this.resendLocks.has(channelId)) return { success: false, reason: "A sticky resend is already running for this channel." }
        const entry = this.getEntry(channelId)
        if (!entry) return { success: false, reason: "No sticky configured for this channel." }
        if (!entry.enabled) return { success: false, reason: "Sticky is currently disabled for this channel." }
        if (this.isExpired(entry)) {
            await this.expireEntry(entry)
            return { success: false, reason: "Sticky has expired and was disabled." }
        }

        this.resendLocks.add(channelId)
        try {
            const channel = await this.fetchStickyChannel(channelId)
            if (!channel) return { success: false, reason: "The configured sticky channel no longer exists or is unsupported." }

            await this.deleteStickyMessage(entry, false)
            this.messageCounters.set(channelId, 0)

            const sentMessage = await channel.send(this.buildStickyMessage(entry, channel))
            entry.lastStickyMessageId = sentMessage.id
            entry.analytics = {
                sentCount: (entry.analytics?.sentCount ?? 0) + 1,
                triggerCount: reason === "message" || reason === "timed" || reason === "schedule" || reason === "reaction" ? (entry.analytics?.triggerCount ?? 0) + 1 : (entry.analytics?.triggerCount ?? 0),
                lastSentAt: new Date().toISOString(),
                lastTriggeredAt: reason === "message" || reason === "timed" || reason === "schedule" || reason === "reaction" ? new Date().toISOString() : (entry.analytics?.lastTriggeredAt ?? null)
            }
            this.saveEntry(entry)
            return { success: true, entry }
        } catch (error) {
            opendiscord.log(`Failed to resend sticky message in channel ${channelId}: ${error}`, "plugin")
            this.saveEntry(entry)
            return { success: false, reason: "The sticky was saved, but the bot could not send the message in that channel." }
        } finally {
            this.resendLocks.delete(channelId)
        }
    }

    async updateSticky(channelId: string): Promise<{ success: boolean, reason?: string, entry?: OTStickyEntry }> {
        const entry = this.getEntry(channelId)
        if (!entry) return { success: false, reason: "No sticky configured for this channel." }
        if (!entry.enabled) return { success: false, reason: "Sticky is currently disabled for this channel." }
        if (!entry.lastStickyMessageId) return this.resendSticky(channelId, "reaction")
        const channel = await this.fetchStickyChannel(channelId)
        if (!channel) return { success: false, reason: "The configured sticky channel no longer exists or is unsupported." }

        try {
            const message = await channel.messages.fetch(entry.lastStickyMessageId)
            await message.edit(this.buildStickyMessage(entry, channel) as any)
            entry.analytics = {
                sentCount: entry.analytics?.sentCount ?? 0,
                triggerCount: (entry.analytics?.triggerCount ?? 0) + 1,
                lastSentAt: entry.analytics?.lastSentAt ?? null,
                lastTriggeredAt: new Date().toISOString()
            }
            this.saveEntry(entry)
            return { success: true, entry }
        } catch {
            return this.resendSticky(channelId, "reaction")
        }
    }

    async handleMessage(message: discord.Message) {
        const entry = this.getEntry(message.channel.id)
        if (!entry || !entry.enabled) return
        if (entry.mode !== "message") return
        if (this.shouldIgnoreMessage(message, entry)) return

        const newCount = (this.messageCounters.get(entry.channelId) ?? 0) + 1
        this.messageCounters.set(entry.channelId, newCount)

        if (newCount < Math.max(1, entry.cooldownMessages)) return
        await this.resendSticky(entry.channelId, "message")
    }

    clearChannelTimer(channelId: string) {
        this.messageCounters.delete(channelId)
    }

    resetChannelTimer(channelId: string) {
        this.messageCounters.set(channelId, this.messageCounters.get(channelId) ?? 0)
    }

    async handleReaction(reaction: discord.MessageReaction | discord.PartialMessageReaction, user: discord.User | discord.PartialUser) {
        if (user.bot) return
        if (reaction.partial) {
            try {
                reaction = await reaction.fetch()
            } catch {
                return
            }
        }
        const message = reaction.message
        const channelId = message.channel.id
        const entry = this.getEntry(channelId)
        if (!entry || !entry.enabled || !entry.reaction?.enabled) return
        if (normalizeEmoji(reactionKey(reaction)) !== normalizeEmoji(entry.reaction.emoji)) return
        if ((reaction.count ?? 0) < entry.reaction.threshold) return
        if (!message.id || entry.reaction.processedMessageIds.includes(message.id)) return

        entry.reaction.processedMessageIds.push(message.id)
        entry.reaction.processedMessageIds = entry.reaction.processedMessageIds.slice(-MAX_PROCESSED_REACTIONS)
        this.saveEntry(entry)

        if (entry.reaction.action === "update") await this.updateSticky(channelId)
        else await this.resendSticky(channelId, "reaction")
    }

    isMaintenanceRunning = false
    async runMaintenance() {
        if (this.isMaintenanceRunning) return
        this.isMaintenanceRunning = true
        try {
            const now = Date.now()
            for (const entry of this.getAllEntries()) {
                if (!entry.enabled) continue
                if (this.isExpired(entry)) {
                    await this.expireEntry(entry)
                    continue
                }

                if (entry.mode === "timed" && entry.timedResendMinutes) {
                    const lastRun = entry.lastTimedResendAt ? new Date(entry.lastTimedResendAt).getTime() : new Date(entry.updatedAt).getTime()
                    if (now - lastRun >= entry.timedResendMinutes * 60_000) {
                        const result = await this.resendSticky(entry.channelId, "timed")
                        const updated = result.entry ?? this.getEntry(entry.channelId)
                        if (updated) {
                            updated.lastTimedResendAt = new Date().toISOString()
                            this.saveEntry(updated)
                        }
                    }
                }

                if (entry.schedule?.enabled && entry.schedule.nextRunAt) {
                    const nextRun = new Date(entry.schedule.nextRunAt).getTime()
                    if (now >= nextRun) {
                        const missedBy = now - nextRun
                        if (entry.schedule.catchUp || missedBy <= SCHEDULER_INTERVAL_MS * 2) {
                            await this.resendSticky(entry.channelId, "schedule")
                        }
                        const updated = this.getEntry(entry.channelId)
                        if (updated?.schedule) {
                            updated.schedule.lastRunAt = new Date().toISOString()
                            updated.schedule.nextRunAt = computeNextScheduleRun(updated.schedule, now)
                            this.saveEntry(updated)
                        }
                    }
                }
            }
        } finally {
            this.isMaintenanceRunning = false
        }
    }

    startScheduler() {
        if (this.schedulerTimer) return
        this.schedulerTimer = setInterval(() => {
            utilities.runAsync(async () => {
                await this.runMaintenance()
            })
        }, SCHEDULER_INTERVAL_MS)
        utilities.runAsync(async () => {
            await this.runMaintenance()
        })
    }

    registerRuntimeListeners() {
        if (this.runtimeListenersStarted) return
        this.runtimeListenersStarted = true
        const client = opendiscord.client.client

        client.on("messageCreate", async (message) => {
            try {
                await this.handleMessage(message)
            } catch (error) {
                opendiscord.log(`Sticky message listener failed: ${error}`, "plugin")
            }
        })

        client.on("messageReactionAdd", async (reaction, user) => {
            try {
                await this.handleReaction(reaction, user)
            } catch (error) {
                opendiscord.log(`Sticky reaction listener failed: ${error}`, "plugin")
            }
        })

        client.on("channelDelete", async (channel) => {
            try {
                if (!channel.isTextBased()) return
                if (!this.getEntry(channel.id)) return
                await this.removeEntry(channel.id, false)
            } catch (error) {
                opendiscord.log(`Sticky channel cleanup failed: ${error}`, "plugin")
            }
        })
    }

    isDashboardAuthed(req: http.IncomingMessage, password: string) {
        if (!password) return true
        const cookie = req.headers.cookie ?? ""
        return cookie.split(";").map((item) => item.trim()).includes(`${DASHBOARD_COOKIE}=${encodeURIComponent(password)}`)
    }

    async readJsonBody(req: http.IncomingMessage): Promise<any> {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        const raw = Buffer.concat(chunks).toString("utf8")
        if (!raw) return {}
        return JSON.parse(raw)
    }

    sendJson(res: http.ServerResponse, status: number, data: any) {
        res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" })
        res.end(JSON.stringify(data))
    }

    sendHtml(res: http.ServerResponse, status: number, html: string) {
        res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" })
        res.end(html)
    }

    dashboardHtml() {
        return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sticky Messages</title>
<style>
:root{color-scheme:dark light;--bg:#101418;--panel:rgba(255,255,255,.08);--panel-2:rgba(255,255,255,.12);--text:#f7fafc;--muted:#a7b0ba;--line:rgba(255,255,255,.16);--accent:#33d6a6;--accent-2:#7aa8ff;--danger:#ff6b6b;--shadow:0 20px 60px rgba(0,0,0,.35)}
[data-theme="light"]{--bg:#edf2f7;--panel:rgba(255,255,255,.72);--panel-2:rgba(255,255,255,.9);--text:#17202a;--muted:#5d6875;--line:rgba(20,32,42,.14);--shadow:0 18px 50px rgba(40,55,70,.16)}
*{box-sizing:border-box}body{margin:0;background:linear-gradient(135deg,#101418,#18222a 48%,#10251f);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}[data-theme="light"] body{background:linear-gradient(135deg,#edf2f7,#dfe8f3 50%,#e6f4ef)}
button,input,select,textarea{font:inherit}button{border:0;border-radius:8px;padding:10px 14px;background:var(--panel-2);color:var(--text);cursor:pointer;border:1px solid var(--line)}button.primary{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#07100d;font-weight:700}button.danger{color:#fff;background:var(--danger)}input,select,textarea{width:100%;border:1px solid var(--line);border-radius:8px;background:rgba(0,0,0,.18);color:var(--text);padding:10px 12px}textarea{min-height:90px;resize:vertical}.shell{display:grid;grid-template-columns:300px 1fr;min-height:100vh}.side{padding:24px;border-right:1px solid var(--line);backdrop-filter:blur(22px);background:rgba(255,255,255,.05)}.brand{font-size:22px;font-weight:800;margin-bottom:6px}.muted{color:var(--muted)}.stats{display:grid;gap:10px;margin:22px 0}.stat{padding:14px;border:1px solid var(--line);border-radius:8px;background:var(--panel)}.main{padding:24px;display:grid;gap:18px}.top{display:flex;align-items:center;justify-content:space-between;gap:12px}.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}.card{border:1px solid var(--line);border-radius:8px;background:var(--panel);backdrop-filter:blur(24px);box-shadow:var(--shadow)}.list{grid-column:span 5;overflow:hidden}.editor{grid-column:span 7;padding:18px}.row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:14px 16px;border-bottom:1px solid var(--line);cursor:pointer}.row:hover,.row.active{background:var(--panel-2)}.form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.full{grid-column:1/-1}.actions{display:flex;gap:10px;flex-wrap:wrap}.pill{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:4px 9px;font-size:12px;color:var(--muted)}@media(max-width:900px){.shell{grid-template-columns:1fr}.side{border-right:0;border-bottom:1px solid var(--line)}.list,.editor{grid-column:1/-1}.form{grid-template-columns:1fr}.top{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
<div class="shell">
<aside class="side">
<div class="brand">Sticky Messages</div>
<div class="muted">Live management dashboard</div>
<div class="stats">
<div class="stat"><b id="stat-total">0</b><div class="muted">Configured stickies</div></div>
<div class="stat"><b id="stat-enabled">0</b><div class="muted">Enabled</div></div>
<div class="stat"><b id="stat-sent">0</b><div class="muted">Total sends</div></div>
</div>
<button id="theme">Theme</button>
</aside>
<main class="main">
<div class="top"><div><h1>Control Center</h1><div class="muted">Edit settings, schedules, reactions, variables, and analytics without restarting.</div></div><button class="primary" id="new">New Sticky</button></div>
<section class="grid">
<div class="card list"><div id="list"></div></div>
<div class="card editor">
<form id="form" class="form">
<label>Channel ID<input name="channelId" required></label>
<label>Type<select name="type" onchange="toggleFields()"><option value="text">Text</option><option value="embed">Embed</option><option value="attachment">Attachment</option></select></label>
<label class="full">Content (Optional Text)<textarea name="messageContent" placeholder="Welcome to {server_name}"></textarea></label>
<div id="group-attachment" class="full form" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--line);">
    <label class="full">Attachment Link (Image/Video)<input name="attachmentUrl" placeholder="https://example.com/image.png"></label>
</div>
<div id="group-embed" class="full form" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--line);">
    <label>Embed Title<input name="embedTitle"></label>
    <label>Embed Color<input name="embedColor" placeholder="#33d6a6"></label>
    <label>Embed Author Name<input name="embedAuthorName" placeholder="Author Name"></label>
    <label>Embed Author Icon URL<input name="embedAuthorIcon" placeholder="https://..."></label>
    <label class="full">Embed Description<textarea name="embedDescription"></textarea></label>
    <label>Embed Image URL<input name="embedImage" placeholder="https://..."></label>
    <label>Embed Thumbnail URL<input name="embedThumbnail" placeholder="https://..."></label>
    <label>Embed Footer Text<input name="embedFooter"></label>
    <label>Embed Footer Icon URL<input name="embedFooterIcon" placeholder="https://..."></label>
</div>
<div class="full" style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line);"></div>
<label>Enabled<select name="enabled"><option value="true">Enabled</option><option value="false">Disabled</option></select></label>
<label>Mode<select name="mode"><option value="message">Message cooldown</option><option value="timed">Timed resend</option></select></label>
<label>Cooldown Messages<input name="cooldownMessages" type="number" min="1" value="1"></label>
<label>Timed Minutes<input name="timedResendMinutes" type="number" min="1" placeholder="30"></label>
<label>Expires At<input name="expiresAt" type="datetime-local"></label>
<label>Delete On Expire<select name="deleteOnExpire"><option value="false">Disable only</option><option value="true">Disable and delete</option></select></label>
<label>Schedule Expression<input name="scheduleExpression" placeholder="Every Day at 9 AM"></label>
<label>Timezone<input name="scheduleTimezone" placeholder="UTC"></label>
<label>Reaction Emoji<input name="reactionEmoji" placeholder="⭐"></label>
<label>Reaction Threshold<input name="reactionThreshold" type="number" min="1" placeholder="10"></label>
<label>Reaction Action<select name="reactionAction"><option value="repost">Repost</option><option value="update">Update</option></select></label>
<div class="full actions"><button class="primary" type="submit">Save</button><button type="button" id="resend">Resend</button><button type="button" class="danger" id="delete">Delete</button><span id="toast" style="color:var(--accent);display:none;align-items:center;margin-left:auto;">Saved successfully!</span></div>
</form>
</div>
</section>
</main>
</div>
<script>
const state={items:[],selected:null};const $=(s)=>document.querySelector(s);const api=(url,opts={})=>fetch(url,{headers:{'Content-Type':'application/json'},...opts}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error||'Request failed');return d});
function toggleFields() {
    const type = document.querySelector('select[name="type"]').value;
    document.getElementById('group-embed').style.display = type === 'embed' ? 'grid' : 'none';
    document.getElementById('group-attachment').style.display = type === 'attachment' ? 'grid' : 'none';
}
function fill(entry){const f=$('#form');f.channelId.value=entry?.channelId||'';f.type.value=entry?.type||'text';f.messageContent.value=entry?.messageContent||'';f.enabled.value=String(entry?.enabled??true);f.mode.value=entry?.mode||'message';f.cooldownMessages.value=entry?.cooldownMessages||1;f.timedResendMinutes.value=entry?.timedResendMinutes||'';f.embedTitle.value=entry?.embedData?.title||'';f.embedColor.value=entry?.embedData?.color||'';f.embedAuthorName.value=entry?.embedData?.authorName||'';f.embedAuthorIcon.value=entry?.embedData?.authorIconUrl||'';f.embedDescription.value=entry?.embedData?.description||'';f.embedImage.value=entry?.embedData?.imageUrl||'';f.embedThumbnail.value=entry?.embedData?.thumbnailUrl||'';f.embedFooter.value=entry?.embedData?.footer||'';f.embedFooterIcon.value=entry?.embedData?.footerIconUrl||'';f.attachmentUrl.value=entry?.attachmentData?.fileUrl||'';f.expiresAt.value=entry?.expiration?.expiresAt?entry.expiration.expiresAt.slice(0,16):'';f.deleteOnExpire.value=String(entry?.expiration?.deleteMessage??false);f.scheduleExpression.value=entry?.schedule?.expression||'';f.scheduleTimezone.value=entry?.schedule?.timezone||Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';f.reactionEmoji.value=entry?.reaction?.emoji||'';f.reactionThreshold.value=entry?.reaction?.threshold||'';f.reactionAction.value=entry?.reaction?.action||'repost';toggleFields();}
function render(){const list=$('#list');list.innerHTML=state.items.map(e=>'<div class="row '+(state.selected===e.channelId?'active':'')+'" data-id="'+e.channelId+'"><div><b>#'+e.channelId+'</b><div class="muted">'+e.type+' · '+e.mode+'</div></div><span class="pill">'+(e.enabled?'Enabled':'Disabled')+'</span></div>').join('')||'<div class="row"><span class="muted">No stickies yet</span></div>';list.querySelectorAll('[data-id]').forEach(el=>el.onclick=()=>{state.selected=el.dataset.id;fill(state.items.find(i=>i.channelId===state.selected));render()});$('#stat-total').textContent=state.items.length;$('#stat-enabled').textContent=state.items.filter(i=>i.enabled).length;$('#stat-sent').textContent=state.items.reduce((a,i)=>a+(i.analytics?.sentCount||0),0)}
async function load(){const d=await api('/api/stickies');state.items=d.items;if(!state.selected&&state.items[0])state.selected=state.items[0].channelId;fill(state.items.find(i=>i.channelId===state.selected));render()}
$('#form').onsubmit=async(e)=>{e.preventDefault();const f=e.target;const body={channelId:f.channelId.value,type:f.type.value,messageContent:f.messageContent.value,enabled:f.enabled.value==='true',mode:f.mode.value,cooldownMessages:Number(f.cooldownMessages.value||1),timedResendMinutes:f.timedResendMinutes.value?Number(f.timedResendMinutes.value):null,embedData:f.type.value==='embed'?{title:f.embedTitle.value,description:f.embedDescription.value,color:f.embedColor.value||'#33d6a6',authorName:f.embedAuthorName.value,authorIconUrl:f.embedAuthorIcon.value,footer:f.embedFooter.value,footerIconUrl:f.embedFooterIcon.value,imageUrl:f.embedImage.value,thumbnailUrl:f.embedThumbnail.value}:null,attachmentUrl:f.type.value==='attachment'?f.attachmentUrl.value:null,expiration:f.expiresAt.value?{expiresAt:new Date(f.expiresAt.value).toISOString(),deleteMessage:f.deleteOnExpire.value==='true'}:null,scheduleExpression:f.scheduleExpression.value,timezone:f.scheduleTimezone.value,reactionEmoji:f.reactionEmoji.value,reactionThreshold:f.reactionThreshold.value?Number(f.reactionThreshold.value):null,reactionAction:f.reactionAction.value};await api('/api/stickies/'+encodeURIComponent(body.channelId),{method:'PUT',body:JSON.stringify(body)});state.selected=body.channelId;await load();const toast=$('#toast');toast.style.display='inline-flex';setTimeout(()=>toast.style.display='none',3000);};
$('#new').onclick=()=>{state.selected=null;fill(null);render()};$('#resend').onclick=async()=>{if(state.selected){await api('/api/stickies/'+encodeURIComponent(state.selected)+'/resend',{method:'POST'});await load()}};$('#delete').onclick=async()=>{if(state.selected&&confirm('Delete this sticky?')){await api('/api/stickies/'+encodeURIComponent(state.selected),{method:'DELETE'});state.selected=null;await load()}};$('#theme').onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light'};load().catch(e=>alert(e.message));
</script>
</body>
</html>`
    }

    async handleDashboardRequest(req: http.IncomingMessage, res: http.ServerResponse, password: string) {
        const requestUrl = new URL(req.url ?? "/", "http://localhost")

        if (requestUrl.pathname === "/login" && req.method === "GET") {
            this.sendHtml(res, 200, `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sticky Login</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#101418;color:#f7fafc;font-family:system-ui}form{width:min(360px,90vw);display:grid;gap:12px;padding:24px;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:rgba(255,255,255,.08);backdrop-filter:blur(20px)}input,button{padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,.18)}button{background:#33d6a6;font-weight:700}</style></head><body><form method="post"><h1>Sticky Dashboard</h1><input name="password" type="password" placeholder="Password" autofocus><button>Sign in</button></form></body></html>`)
            return
        }

        if (requestUrl.pathname === "/login" && req.method === "POST") {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
            const body = new URLSearchParams(Buffer.concat(chunks).toString("utf8"))
            if ((body.get("password") ?? "") === password) {
                res.writeHead(302, { "Set-Cookie": `${DASHBOARD_COOKIE}=${encodeURIComponent(password)}; HttpOnly; SameSite=Lax; Path=/`, "Location": "/" })
                res.end()
                return
            }
            res.writeHead(302, { "Location": "/login" })
            res.end()
            return
        }

        if (!this.isDashboardAuthed(req, password)) {
            res.writeHead(302, { "Location": "/login" })
            res.end()
            return
        }

        if (requestUrl.pathname === "/" && req.method === "GET") {
            this.sendHtml(res, 200, this.dashboardHtml())
            return
        }

        if (requestUrl.pathname === "/api/stickies" && req.method === "GET") {
            this.sendJson(res, 200, { items: this.getAllEntries() })
            return
        }

        const stickyMatch = /^\/api\/stickies\/([^/]+)(?:\/(resend))?$/.exec(requestUrl.pathname)
        if (stickyMatch) {
            const channelId = decodeURIComponent(stickyMatch[1])
            if (!/^\d{17,20}$/.test(channelId)) {
                this.sendJson(res, 400, { error: "Invalid channel ID format." })
                return
            }
            if (req.method === "POST" && stickyMatch[2] === "resend") {
                const result = await this.resendSticky(channelId, "dashboard")
                this.sendJson(res, result.success ? 200 : 400, result.success ? { ok: true, entry: result.entry } : { error: result.reason })
                return
            }
            if (req.method === "DELETE") {
                const removed = await this.removeEntry(channelId, true)
                this.sendJson(res, removed ? 200 : 404, removed ? { ok: true } : { error: "Sticky not found." })
                return
            }
            if (req.method === "PUT") {
                const body = await this.readJsonBody(req)
                const existing = this.getEntry(channelId)
                const schedule = body.scheduleExpression ? parseScheduleExpression(String(body.scheduleExpression), String(body.timezone || "UTC"), true) : null
                if (body.scheduleExpression && !schedule) {
                    this.sendJson(res, 400, { error: "Invalid schedule expression." })
                    return
                }
                const entry = this.normalizeEntry({
                    version: 2,
                    channelId,
                    enabled: Boolean(body.enabled),
                    type: (["text", "embed", "attachment"].includes(body.type) ? body.type : "text") as OTStickyType,
                    mode: body.mode === "timed" ? "timed" : "message",
                    messageContent: String(body.messageContent ?? ""),
                    embedData: body.embedData ?? null,
                    attachmentData: body.type === "attachment" && body.attachmentUrl ? { storedName: "", originalName: "attachment", contentType: null, spoiler: false, fileUrl: body.attachmentUrl } : (existing?.attachmentData ?? null),
                    lastStickyMessageId: existing?.lastStickyMessageId ?? null,
                    ignoredRoleIds: existing?.ignoredRoleIds ?? [],
                    cooldownMessages: Math.max(1, Math.floor(Number(body.cooldownMessages ?? 1))),
                    timedResendMinutes: body.timedResendMinutes ? Math.max(1, Math.floor(Number(body.timedResendMinutes))) : null,
                    lastTimedResendAt: existing?.lastTimedResendAt ?? null,
                    expiration: body.expiration ?? null,
                    schedule,
                    reaction: body.reactionEmoji && body.reactionThreshold ? {
                        enabled: true,
                        emoji: normalizeEmoji(String(body.reactionEmoji)),
                        threshold: Math.max(1, Math.floor(Number(body.reactionThreshold))),
                        action: body.reactionAction === "update" ? "update" : "repost",
                        processedMessageIds: existing?.reaction?.processedMessageIds ?? []
                    } : null,
                    analytics: existing?.analytics,
                    createdAt: existing?.createdAt ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
                this.saveEntry(entry)
                this.sendJson(res, 200, { ok: true, entry })
                return
            }
        }

        this.sendJson(res, 404, { error: "Not found." })
    }

    startDashboard() {
        const dashboardConfig = getConfigData(this.config.data).dashboard
        if (!dashboardConfig.enabled || this.dashboardServer) return

        this.dashboardServer = http.createServer((req, res) => {
            utilities.runAsync(async () => {
                try {
                    await this.handleDashboardRequest(req, res, dashboardConfig.password)
                } catch (error) {
                    this.sendJson(res, 500, { error: String(error) })
                }
            })
        })

        this.dashboardServer.listen(dashboardConfig.port, dashboardConfig.host, () => {
            opendiscord.log(`Sticky dashboard running at http://${dashboardConfig.host}:${dashboardConfig.port}`, "plugin")
        })
        this.dashboardServer.on("error", (error) => {
            opendiscord.log(`Sticky dashboard failed to start: ${error}`, "plugin")
        })
    }

    boot() {
        for (const entry of this.getAllEntries()) {
            this.messageCounters.set(entry.channelId, 0)

            if (entry.enabled && getConfigData(this.config.data).autoResendOnBoot) {
                utilities.runAsync(async () => {
                    await this.resendSticky(entry.channelId, "boot")
                })
            }
        }
        this.registerRuntimeListeners()
        this.startScheduler()
        this.startDashboard()
    }
}

declare module "#opendiscord-types" {
    export interface ODPluginManagerIds_Default {
        "ot-sticky-messages": api.ODPlugin
    }

    export interface ODConfigManagerIds_Default {
        "ot-sticky-messages:config": OTStickyConfig
    }

    export interface ODDatabaseManagerIds_Default {
        "ot-sticky-messages:database": OTStickyDatabase
    }

    export interface ODCheckerManagerIds_Default {
        "ot-sticky-messages:config": api.ODChecker
    }

    export interface ODPluginClassManagerIds_Default {
        "ot-sticky-messages:manager": OTStickyManager
    }

    export interface ODSlashCommandManagerIds_Default {
        "ot-sticky-messages:sticky": api.ODSlashCommand
    }

    export interface ODCommandResponderManagerIds_Default {
        "ot-sticky-messages:sticky": { source: "slash" | "text", params: {}, workers: "ot-sticky-messages:sticky" | "ot-sticky-messages:logs" }
    }

    export interface ODEmbedManagerIds_Default {
        "ot-sticky-messages:reply-embed": { source: "slash" | "text" | "other", params: { data: OTStickyReplyData }, workers: "ot-sticky-messages:reply-embed" }
    }

    export interface ODMessageManagerIds_Default {
        "ot-sticky-messages:reply-message": { source: "slash" | "text" | "other", params: { data: OTStickyReplyData }, workers: "ot-sticky-messages:reply-message" }
    }
}

const stickyDatabaseFormatter = new fjs.ArrayFormatter(null, true, new fjs.ObjectFormatter(null, false, [
    new fjs.PropertyFormatter("category"),
    new fjs.PropertyFormatter("key"),
    new fjs.DefaultFormatter("value", false)
]))

const getStickyManager = () => opendiscord.plugins.classes.get("ot-sticky-messages:manager") as OTStickyManager

const getReplyColor = (color?: discord.ColorResolvable): discord.ColorResolvable => {
    return color ?? (opendiscord.configs.get("opendiscord:general").data.mainColor as discord.ColorResolvable)
}

const buildReply = (title: string, description: string, fields?: discord.EmbedField[], color?: discord.ColorResolvable): OTStickyReplyData => ({
    title,
    description,
    fields,
    color: getReplyColor(color)
})

const formatStickyType = (type: OTStickyType) => type.charAt(0).toUpperCase() + type.slice(1)

const formatStickyMode = (entry: OTStickyEntry) => {
    if (entry.mode === "timed" && entry.timedResendMinutes) return `Timed (${entry.timedResendMinutes}m)`
    return `Message (${entry.cooldownMessages} msg)`
}

const formatStickyChannel = async (channelId: string) => {
    const channel = await getStickyManager().fetchStickyChannel(channelId)
    return channel ? channel.toString() : `\`${channelId}\``
}

const sanitizeOptionalUrl = (value: string | null) => value ? value.trim() : ""
const truncateText = (value: string, maxLength: number) => value.length > maxLength ? value.slice(0, Math.max(0, maxLength - 3)) + "..." : value
const getSubcommandGroup = (instance: any): string | null => {
    try {
        if (instance.options.getSubCommandGroup) return instance.options.getSubCommandGroup(false)
    } catch { }
    try {
        if (instance.options.getSubcommandGroup) return instance.options.getSubcommandGroup(false)
    } catch { }
    try {
        if (instance.interaction instanceof discord.ChatInputCommandInteraction) return instance.interaction.options.getSubcommandGroup(false)
    } catch { }
    return null
}

// REGISTER PLUGIN CLASS
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
    classes.add(new OTStickyManager("ot-sticky-messages:manager"))
})

// REGISTER CONFIG
opendiscord.events.get("onConfigLoad").listen((configs) => {
    configs.add(new OTStickyConfig("ot-sticky-messages:config", "config.json", PLUGIN_ROOT))
})

// REGISTER DATABASE
opendiscord.events.get("onDatabaseLoad").listen((databases) => {
    databases.add(new OTStickyDatabase("ot-sticky-messages:database", "database.json", stickyDatabaseFormatter, PLUGIN_ROOT))
})

// REGISTER CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
    const config = opendiscord.configs.get("ot-sticky-messages:config")
    const structure = new api.ODCheckerObjectStructure("ot-sticky-messages:config", {
        children: [
            { key: "commandPermission", optional: false, priority: 0, checker: new api.ODCheckerStringStructure("ot-sticky-messages:command-permission", { choices: ["admin", "developer", "owner"] }) },
            { key: "autoResendOnBoot", optional: false, priority: 0, checker: new api.ODCheckerBooleanStructure("ot-sticky-messages:auto-resend", {}) },
            { key: "deleteStickyMessageWhenDisabled", optional: false, priority: 0, checker: new api.ODCheckerBooleanStructure("ot-sticky-messages:delete-disabled", {}) },
            {
                key: "dashboard", optional: true, priority: 0, checker: new api.ODCheckerObjectStructure("ot-sticky-messages:dashboard", {
                    children: [
                        { key: "enabled", optional: true, priority: 0, checker: new api.ODCheckerBooleanStructure("ot-sticky-messages:dashboard-enabled", {}) },
                        { key: "host", optional: true, priority: 0, checker: new api.ODCheckerStringStructure("ot-sticky-messages:dashboard-host", { minLength: 1, maxLength: 128 }) },
                        { key: "port", optional: true, priority: 0, checker: new api.ODCheckerNumberStructure("ot-sticky-messages:dashboard-port", { min: 1, max: 65535, floatAllowed: false }) },
                        { key: "password", optional: true, priority: 0, checker: new api.ODCheckerStringStructure("ot-sticky-messages:dashboard-password", { minLength: 0, maxLength: 256 }) }
                    ]
                })
            }
        ]
    })
    checkers.add(new api.ODChecker("ot-sticky-messages:config", checkers.storage, 0, config!, structure))
})

// REGISTER CLIENT REQUIREMENTS
opendiscord.events.get("onClientLoad").listen((client) => {
    if (!client.intents.includes("GuildMessageReactions")) client.intents.push("GuildMessageReactions")
    if (!client.partials.includes("Reaction")) client.partials.push("Reaction")
})

// REGISTER SLASH COMMAND
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
    const acot = discord.ApplicationCommandOptionType

    slash.add(new api.ODSlashCommand("ot-sticky-messages:sticky", {
        name: "sticky",
        description: "Create and manage sticky messages in channels.",
        type: discord.ApplicationCommandType.ChatInput,
        contexts: [discord.InteractionContextType.Guild],
        integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
        options: [
            {
                type: acot.Subcommand,
                name: "set-text",
                description: "Create or replace a text sticky in a channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.String, name: "content", description: "The sticky message content.", required: true, maxLength: 2000 }
                ]
            },
            {
                type: acot.Subcommand,
                name: "set-embed",
                description: "Create or replace an embed sticky in a channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.String, name: "description", description: "The embed description.", required: true, maxLength: 4096 },
                    { type: acot.String, name: "title", description: "The embed title.", required: false, maxLength: 256 },
                    { type: acot.String, name: "content", description: "Optional normal text above the embed.", required: false, maxLength: 2000 },
                    { type: acot.String, name: "color", description: "Hex color like #ffaa00.", required: false, maxLength: 7 },
                    { type: acot.String, name: "footer", description: "Embed footer text.", required: false, maxLength: 2048 },
                    { type: acot.String, name: "image_url", description: "Optional embed image URL.", required: false },
                    { type: acot.String, name: "thumbnail_url", description: "Optional embed thumbnail URL.", required: false }
                ]
            },
            {
                type: acot.Subcommand,
                name: "set-attachment",
                description: "Create or replace an attachment sticky in a channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.Attachment, name: "attachment", description: "The file or image to resend.", required: true },
                    { type: acot.String, name: "content", description: "Optional normal text above the attachment.", required: false, maxLength: 2000 },
                    { type: acot.Boolean, name: "spoiler", description: "Send the attachment as a spoiler.", required: false }
                ]
            },
            {
                type: acot.Subcommand,
                name: "mode",
                description: "Switch between message-triggered and timed sticky mode.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.String, name: "mode", description: "How the sticky should resend.", required: true, choices: [{ name: "Message", value: "message" }, { name: "Timed", value: "timed" }] },
                    { type: acot.Integer, name: "minutes", description: "Required for timed mode.", required: false, minValue: 1, maxValue: 1440 }
                ]
            },
            {
                type: acot.Subcommand,
                name: "cooldown",
                description: "Only resend a message-mode sticky every X user messages.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.Integer, name: "messages", description: "How many user messages before resending.", required: true, minValue: 1, maxValue: 250 }
                ]
            },
            {
                type: acot.Subcommand,
                name: "expire",
                description: "Set a sticky expiration like 30m, 24h, or 7d.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.String, name: "duration", description: "Expiration duration, for example 30m, 24h, or 7d.", required: true, maxLength: 16 },
                    { type: acot.Boolean, name: "delete_message", description: "Delete the active sticky message when it expires.", required: false }
                ]
            },
            {
                type: acot.SubcommandGroup,
                name: "expiration",
                description: "View or remove sticky expiration settings.",
                options: [
                    {
                        type: acot.Subcommand,
                        name: "view",
                        description: "View sticky expiration settings.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "remove",
                        description: "Remove sticky expiration settings.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                        ]
                    }
                ]
            },
            {
                type: acot.SubcommandGroup,
                name: "schedule",
                description: "Create, edit, remove, or list scheduled sticky sends.",
                options: [
                    {
                        type: acot.Subcommand,
                        name: "create",
                        description: "Create a schedule for a sticky.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                            { type: acot.String, name: "expression", description: "Every Monday, Every Day at 9 AM, Every 3 Hours, or cron.", required: true, maxLength: 128 },
                            { type: acot.String, name: "timezone", description: "IANA timezone like UTC or Asia/Kolkata.", required: false, maxLength: 64 },
                            { type: acot.Boolean, name: "catch_up", description: "Send once after downtime when a run was missed.", required: false }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "edit",
                        description: "Edit a sticky schedule.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                            { type: acot.String, name: "expression", description: "Every Monday, Every Day at 9 AM, Every 3 Hours, or cron.", required: true, maxLength: 128 },
                            { type: acot.String, name: "timezone", description: "IANA timezone like UTC or Asia/Kolkata.", required: false, maxLength: 64 },
                            { type: acot.Boolean, name: "catch_up", description: "Send once after downtime when a run was missed.", required: false }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "remove",
                        description: "Remove a sticky schedule.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "list",
                        description: "List scheduled stickies."
                    }
                ]
            },
            {
                type: acot.SubcommandGroup,
                name: "reaction",
                description: "Configure reaction-triggered stickies.",
                options: [
                    {
                        type: acot.Subcommand,
                        name: "create",
                        description: "Create or replace a reaction trigger.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                            { type: acot.String, name: "emoji", description: "Emoji to watch.", required: true, maxLength: 64 },
                            { type: acot.Integer, name: "threshold", description: "Reaction count required.", required: true, minValue: 1, maxValue: 1000 },
                            { type: acot.String, name: "action", description: "What to do when the threshold is reached.", required: true, choices: [{ name: "Repost", value: "repost" }, { name: "Update", value: "update" }] }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "remove",
                        description: "Remove a reaction trigger.",
                        options: [
                            { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                        ]
                    },
                    {
                        type: acot.Subcommand,
                        name: "list",
                        description: "List reaction-triggered stickies."
                    }
                ]
            },
            {
                type: acot.Subcommand,
                name: "ignore-role",
                description: "Add or remove a role that should not trigger the sticky resend.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] },
                    { type: acot.String, name: "action", description: "Add or remove a role.", required: true, choices: [{ name: "Add", value: "add" }, { name: "Remove", value: "remove" }] },
                    { type: acot.Role, name: "role", description: "The role to update.", required: true }
                ]
            },
            {
                type: acot.Subcommand,
                name: "enable",
                description: "Enable the sticky for a channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                ]
            },
            {
                type: acot.Subcommand,
                name: "disable",
                description: "Disable the sticky for a channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                ]
            },
            {
                type: acot.Subcommand,
                name: "resend",
                description: "Delete the current sticky and send a fresh one now.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                ]
            },
            {
                type: acot.Subcommand,
                name: "show",
                description: "Show the saved sticky settings for one channel.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                ]
            },
            {
                type: acot.Subcommand,
                name: "remove",
                description: "Remove a sticky configuration completely.",
                options: [
                    { type: acot.Channel, name: "channel", description: "The target channel.", required: true, channelTypes: [discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement] }
                ]
            },
            {
                type: acot.Subcommand,
                name: "list",
                description: "List all configured sticky channels."
            }
        ]
    }))
})

// REGISTER HELP MENU
opendiscord.events.get("onHelpMenuComponentLoad").listen((menu) => {
    menu.get("opendiscord:extra").add(new api.ODHelpMenuCommandComponent("ot-sticky-messages:sticky", 0, {
        slashName: "sticky",
        slashDescription: "Create and manage sticky messages in channels."
    }))
})

// REGISTER BUILDERS
opendiscord.events.get("onEmbedBuilderLoad").listen((embeds) => {
    embeds.add(new api.ODEmbed("ot-sticky-messages:reply-embed"))
    embeds.getSafe("ot-sticky-messages:reply-embed").workers.add(
        new api.ODWorker("ot-sticky-messages:reply-embed", 0, (instance: any, params: any) => {
            const { data } = params as { data: OTStickyReplyData }
            instance.setTitle(data.title)
            instance.setDescription(data.description)
            instance.setColor(getReplyColor(data.color))
            if (data.fields && data.fields.length > 0) instance.setFields(data.fields)
        })
    )
})

opendiscord.events.get("onMessageBuilderLoad").listen((messages) => {
    messages.add(new api.ODMessage("ot-sticky-messages:reply-message"))
    messages.getSafe("ot-sticky-messages:reply-message").workers.add(
        new api.ODWorker("ot-sticky-messages:reply-message", 0, async (instance: any, params: any, source: any) => {
            instance.addEmbed(await opendiscord.builders.embeds.getSafe("ot-sticky-messages:reply-embed").build(source, params))
            instance.setEphemeral(true)
        })
    )
})

// REGISTER COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
    const generalConfig = opendiscord.configs.get("opendiscord:general")
    const manager = getStickyManager()

    commands.add(new api.ODCommandResponder("ot-sticky-messages:sticky", generalConfig.data.prefix, "sticky"))
    commands.get("ot-sticky-messages:sticky")!.workers.add([
        new api.ODWorker("ot-sticky-messages:sticky", 0, async (instance: any, params: any, source: any, cancel: any) => {
            const { guild, channel, user } = instance

            if (!guild) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-not-in-guild").build(source, { channel, user }))
                return cancel()
            }

            const requiredPermission = manager.config.data.commandPermission
            const userPermissions = await opendiscord.permissions.getPermissions(user, channel, guild, {
                allowChannelRoleScope: false,
                allowChannelUserScope: false,
                allowGlobalRoleScope: true,
                allowGlobalUserScope: true
            })

            if (!opendiscord.permissions.hasPermissions(requiredPermission, userPermissions)) {
                instance.reply(await opendiscord.builders.messages.getSafe("opendiscord:error-no-permissions").build(source, {
                    guild,
                    channel,
                    user,
                    permissions: [requiredPermission]
                }))
                return cancel()
            }

            const subcommand = instance.options.getSubCommand()
            const subcommandGroup = getSubcommandGroup(instance)
            if (!subcommand) {
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Sticky Messages", "No sticky subcommand was provided.", [], "Red")
                }))
                return cancel()
            }

            await instance.defer(true)

            const channelOptional = subcommand === "list"
            const targetChannel = channelOptional ? null : instance.options.getChannel("channel", true)
            const targetChannelId = targetChannel?.id ?? null

            if (targetChannel && targetChannel.type !== discord.ChannelType.GuildText && targetChannel.type !== discord.ChannelType.GuildAnnouncement) {
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Unsupported Channel", "Sticky messages only support normal text and announcement channels.", [], "Red")
                }))
                return cancel()
            }

            if (subcommand === "set-text" && targetChannelId) {
                const content = instance.options.getString("content", true)
                const existing = manager.getEntry(targetChannelId)

                if (existing?.attachmentData) manager.deleteAttachmentFile(existing.attachmentData)

                const entry: OTStickyEntry = {
                    version: 2,
                    channelId: targetChannelId,
                    enabled: true,
                    type: "text",
                    mode: existing?.mode ?? "message",
                    messageContent: content,
                    embedData: null,
                    attachmentData: null,
                    lastStickyMessageId: existing?.lastStickyMessageId ?? null,
                    ignoredRoleIds: existing?.ignoredRoleIds ?? [],
                    cooldownMessages: existing?.cooldownMessages ?? 1,
                    timedResendMinutes: existing?.timedResendMinutes ?? null,
                    lastTimedResendAt: existing?.lastTimedResendAt ?? null,
                    expiration: existing?.expiration ?? null,
                    schedule: existing?.schedule ?? null,
                    reaction: existing?.reaction ?? null,
                    analytics: existing?.analytics,
                    createdAt: existing?.createdAt ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                manager.saveEntry(entry)
                const resendResult = await manager.resendSticky(targetChannelId)
                const channelLabel = await formatStickyChannel(targetChannelId)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: resendResult.success
                        ? buildReply("Sticky Saved", `A text sticky is now active in ${channelLabel}.`)
                        : buildReply("Sticky Saved With Warning", `The sticky was saved for ${channelLabel}, but it could not be resent immediately.\n\n${resendResult.reason ?? "Unknown error."}`, [], "Yellow")
                }))
                return cancel()
            }

            if (subcommand === "set-embed" && targetChannelId) {
                const existing = manager.getEntry(targetChannelId)
                if (existing?.attachmentData) manager.deleteAttachmentFile(existing.attachmentData)

                const entry: OTStickyEntry = {
                    version: 2,
                    channelId: targetChannelId,
                    enabled: true,
                    type: "embed",
                    mode: existing?.mode ?? "message",
                    messageContent: instance.options.getString("content", false) ?? "",
                    embedData: {
                        title: instance.options.getString("title", false) ?? "",
                        description: instance.options.getString("description", true),
                        color: instance.options.getString("color", false) ?? String(opendiscord.configs.get("opendiscord:general").data.mainColor),
                        footer: instance.options.getString("footer", false) ?? "",
                        imageUrl: sanitizeOptionalUrl(instance.options.getString("image_url", false)),
                        thumbnailUrl: sanitizeOptionalUrl(instance.options.getString("thumbnail_url", false))
                    },
                    attachmentData: null,
                    lastStickyMessageId: existing?.lastStickyMessageId ?? null,
                    ignoredRoleIds: existing?.ignoredRoleIds ?? [],
                    cooldownMessages: existing?.cooldownMessages ?? 1,
                    timedResendMinutes: existing?.timedResendMinutes ?? null,
                    lastTimedResendAt: existing?.lastTimedResendAt ?? null,
                    expiration: existing?.expiration ?? null,
                    schedule: existing?.schedule ?? null,
                    reaction: existing?.reaction ?? null,
                    analytics: existing?.analytics,
                    createdAt: existing?.createdAt ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                manager.saveEntry(entry)
                const resendResult = await manager.resendSticky(targetChannelId)
                const channelLabel = await formatStickyChannel(targetChannelId)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: resendResult.success
                        ? buildReply("Embed Sticky Saved", `An embed sticky is now active in ${channelLabel}.`)
                        : buildReply("Sticky Saved With Warning", `The embed sticky was saved for ${channelLabel}, but it could not be resent immediately.\n\n${resendResult.reason ?? "Unknown error."}`, [], "Yellow")
                }))
                return cancel()
            }

            if (subcommand === "set-attachment" && targetChannelId) {
                const existing = manager.getEntry(targetChannelId)
                const interaction = instance.interaction

                if (!(interaction instanceof discord.ChatInputCommandInteraction)) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Attachment Sticky", "Attachment stickies can only be configured from slash commands.", [], "Red")
                    }))
                    return cancel()
                }

                const attachment = interaction.options.getAttachment("attachment", true)
                const attachmentData = await manager.storeAttachment(attachment)

                if (existing?.attachmentData) manager.deleteAttachmentFile(existing.attachmentData)

                const entry: OTStickyEntry = {
                    version: 2,
                    channelId: targetChannelId,
                    enabled: true,
                    type: "attachment",
                    mode: existing?.mode ?? "message",
                    messageContent: instance.options.getString("content", false) ?? "",
                    embedData: null,
                    attachmentData: {
                        ...attachmentData,
                        spoiler: instance.options.getBoolean("spoiler", false) ?? attachmentData.spoiler
                    },
                    lastStickyMessageId: existing?.lastStickyMessageId ?? null,
                    ignoredRoleIds: existing?.ignoredRoleIds ?? [],
                    cooldownMessages: existing?.cooldownMessages ?? 1,
                    timedResendMinutes: existing?.timedResendMinutes ?? null,
                    lastTimedResendAt: existing?.lastTimedResendAt ?? null,
                    expiration: existing?.expiration ?? null,
                    schedule: existing?.schedule ?? null,
                    reaction: existing?.reaction ?? null,
                    analytics: existing?.analytics,
                    createdAt: existing?.createdAt ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                manager.saveEntry(entry)
                const resendResult = await manager.resendSticky(targetChannelId)
                const channelLabel = await formatStickyChannel(targetChannelId)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: resendResult.success
                        ? buildReply("Attachment Sticky Saved", `An attachment sticky is now active in ${channelLabel}.`)
                        : buildReply("Sticky Saved With Warning", `The attachment sticky was saved for ${channelLabel}, but it could not be resent immediately.\n\n${resendResult.reason ?? "Unknown error."}`, [], "Yellow")
                }))
                return cancel()
            }

            if (subcommand === "mode" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "Create a sticky first before changing its mode.", [], "Red")
                    }))
                    return cancel()
                }

                const mode = instance.options.getString("mode", true) as OTStickyMode
                const minutes = instance.options.getNumber("minutes", false)

                if (mode === "timed" && (!minutes || minutes < 1)) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Missing Minutes", "Timed mode requires a valid `minutes` value of at least 1.", [], "Red")
                    }))
                    return cancel()
                }

                entry.mode = mode
                entry.timedResendMinutes = mode === "timed" ? Math.floor(minutes ?? 1) : null
                manager.saveEntry(entry)

                if (entry.enabled) await manager.resendSticky(entry.channelId)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Sticky Mode Updated", `The sticky mode is now **${formatStickyMode(entry)}**.`)
                }))
                return cancel()
            }

            if (subcommand === "cooldown" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "Create a sticky first before changing its cooldown.", [], "Red")
                    }))
                    return cancel()
                }

                entry.cooldownMessages = Math.max(1, Math.floor(instance.options.getNumber("messages", true)))
                manager.saveEntry(entry)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Cooldown Updated", `The sticky will now resend every **${entry.cooldownMessages}** user message(s) while in message mode.`)
                }))
                return cancel()
            }

            if (subcommand === "expire" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "Create a sticky first before setting expiration.", [], "Red")
                    }))
                    return cancel()
                }
                const duration = parseDurationMs(instance.options.getString("duration", true))
                if (!duration) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Invalid Duration", "Use a duration like `30m`, `24h`, or `7d`.", [], "Red")
                    }))
                    return cancel()
                }
                entry.expiration = {
                    expiresAt: new Date(Date.now() + duration).toISOString(),
                    deleteMessage: instance.options.getBoolean("delete_message", false) ?? false
                }
                manager.saveEntry(entry)
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Expiration Set", `This sticky expires at **${entry.expiration.expiresAt}** and will ${entry.expiration.deleteMessage ? "delete its active message" : "disable only"}.`)
                }))
                return cancel()
            }

            if (subcommandGroup === "expiration" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                    }))
                    return cancel()
                }
                if (subcommand === "view") {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: entry.expiration
                            ? buildReply("Expiration", `Expires at **${entry.expiration.expiresAt}**.\nAction: **${entry.expiration.deleteMessage ? "Disable and delete message" : "Disable only"}**.`)
                            : buildReply("Expiration", "No expiration is configured for this sticky.")
                    }))
                    return cancel()
                }
                if (subcommand === "remove") {
                    entry.expiration = null
                    manager.saveEntry(entry)
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Expiration Removed", "This sticky no longer has an expiration.")
                    }))
                    return cancel()
                }
            }

            if (subcommandGroup === "schedule") {
                if (subcommand === "list") {
                    const scheduledEntries = manager.getAllEntries().filter((entry) => entry.schedule?.enabled)
                    const fields: discord.EmbedField[] = []
                    for (const entry of scheduledEntries.slice(0, 25)) {
                        fields.push({
                            name: await formatStickyChannel(entry.channelId),
                            value: `Expression: **${entry.schedule?.expression ?? "/"}**\nTimezone: **${entry.schedule?.timezone ?? "UTC"}**\nNext: **${entry.schedule?.nextRunAt ?? "Unknown"}**`,
                            inline: false
                        })
                    }
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Scheduled Stickies", scheduledEntries.length ? `Scheduled stickies: **${scheduledEntries.length}**.` : "No scheduled stickies are configured.", fields)
                    }))
                    return cancel()
                }

                if (targetChannelId && (subcommand === "create" || subcommand === "edit")) {
                    const entry = manager.getEntry(targetChannelId)
                    if (!entry) {
                        instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                            data: buildReply("Sticky Not Found", "Create a sticky first before scheduling it.", [], "Red")
                        }))
                        return cancel()
                    }
                    const expression = instance.options.getString("expression", true)
                    const timezone = instance.options.getString("timezone", false) ?? "UTC"
                    const catchUp = instance.options.getBoolean("catch_up", false) ?? true
                    const schedule = parseScheduleExpression(expression, timezone, catchUp)
                    if (!schedule) {
                        instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                            data: buildReply("Invalid Schedule", "Use examples like `Every Monday`, `Every Day at 9 AM`, `Every 3 Hours`, `Every 30 Minutes`, or a simple 5-field cron with `* * * * *`.", [], "Red")
                        }))
                        return cancel()
                    }
                    entry.schedule = schedule
                    manager.saveEntry(entry)
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Schedule Saved", `Expression: **${schedule.expression}**\nTimezone: **${schedule.timezone}**\nNext run: **${schedule.nextRunAt ?? "Unknown"}**.`)
                    }))
                    return cancel()
                }

                if (targetChannelId && subcommand === "remove") {
                    const entry = manager.getEntry(targetChannelId)
                    if (!entry) {
                        instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                            data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                        }))
                        return cancel()
                    }
                    entry.schedule = null
                    manager.saveEntry(entry)
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Schedule Removed", "This sticky no longer has a schedule.")
                    }))
                    return cancel()
                }
            }

            if (subcommandGroup === "reaction") {
                if (subcommand === "list") {
                    const reactionEntries = manager.getAllEntries().filter((entry) => entry.reaction?.enabled)
                    const fields: discord.EmbedField[] = []
                    for (const entry of reactionEntries.slice(0, 25)) {
                        fields.push({
                            name: await formatStickyChannel(entry.channelId),
                            value: `Emoji: **${entry.reaction?.emoji ?? "/"}**\nThreshold: **${entry.reaction?.threshold ?? 0}**\nAction: **${entry.reaction?.action ?? "repost"}**`,
                            inline: false
                        })
                    }
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Reaction Stickies", reactionEntries.length ? `Reaction stickies: **${reactionEntries.length}**.` : "No reaction triggers are configured.", fields)
                    }))
                    return cancel()
                }

                if (targetChannelId && subcommand === "create") {
                    const entry = manager.getEntry(targetChannelId)
                    if (!entry) {
                        instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                            data: buildReply("Sticky Not Found", "Create a sticky first before adding a reaction trigger.", [], "Red")
                        }))
                        return cancel()
                    }
                    entry.reaction = {
                        enabled: true,
                        emoji: normalizeEmoji(instance.options.getString("emoji", true)),
                        threshold: Math.max(1, Math.floor(instance.options.getNumber("threshold", true))),
                        action: (instance.options.getString("action", true) as OTStickyReactionAction) === "update" ? "update" : "repost",
                        processedMessageIds: []
                    }
                    manager.saveEntry(entry)
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Reaction Trigger Saved", `When **${entry.reaction.emoji}** reaches **${entry.reaction.threshold}** reactions, the sticky will **${entry.reaction.action}**.`)
                    }))
                    return cancel()
                }

                if (targetChannelId && subcommand === "remove") {
                    const entry = manager.getEntry(targetChannelId)
                    if (!entry) {
                        instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                            data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                        }))
                        return cancel()
                    }
                    entry.reaction = null
                    manager.saveEntry(entry)
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Reaction Trigger Removed", "This sticky no longer has a reaction trigger.")
                    }))
                    return cancel()
                }
            }

            if (subcommand === "ignore-role" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "Create a sticky first before editing ignored roles.", [], "Red")
                    }))
                    return cancel()
                }

                const action = instance.options.getString("action", true)
                const role = instance.options.getRole("role", true)

                if (action === "add" && !entry.ignoredRoleIds.includes(role.id)) entry.ignoredRoleIds.push(role.id)
                if (action === "remove") entry.ignoredRoleIds = entry.ignoredRoleIds.filter((roleId) => roleId !== role.id)
                manager.saveEntry(entry)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Ignored Roles Updated", `${role.toString()} has been ${action === "add" ? "added to" : "removed from"} the ignored role list.`)
                }))
                return cancel()
            }

            if (subcommand === "enable" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                    }))
                    return cancel()
                }

                entry.enabled = true
                manager.saveEntry(entry)
                const resendResult = await manager.resendSticky(targetChannelId)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: resendResult.success
                        ? buildReply("Sticky Enabled", "The sticky is enabled again and has been resent.")
                        : buildReply("Sticky Enabled With Warning", `The sticky was enabled, but it could not be resent immediately.\n\n${resendResult.reason ?? "Unknown error."}`, [], "Yellow")
                }))
                return cancel()
            }

            if (subcommand === "disable" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                    }))
                    return cancel()
                }

                entry.enabled = false
                manager.saveEntry(entry)
                manager.clearChannelTimer(targetChannelId)
                if (getConfigData(manager.config.data).deleteStickyMessageWhenDisabled) await manager.deleteStickyMessage(entry, true)

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Sticky Disabled", getConfigData(manager.config.data).deleteStickyMessageWhenDisabled
                        ? "The sticky is disabled and the current sticky message has been removed."
                        : "The sticky is disabled. The current sticky message was left in place.")
                }))
                return cancel()
            }

            if (subcommand === "resend" && targetChannelId) {
                const resendResult = await manager.resendSticky(targetChannelId)
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: resendResult.success
                        ? buildReply("Sticky Resent", "The sticky message was deleted and sent again successfully.")
                        : buildReply("Resend Failed", resendResult.reason ?? "The sticky could not be resent.", [], "Red")
                }))
                return cancel()
            }

            if (subcommand === "show" && targetChannelId) {
                const entry = manager.getEntry(targetChannelId)
                if (!entry) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                    }))
                    return cancel()
                }

                const channelLabel = await formatStickyChannel(targetChannelId)
                const ignoredRoles = entry.ignoredRoleIds.length > 0 ? truncateText(entry.ignoredRoleIds.map((roleId) => `<@&${roleId}>`).join(", "), 1024) : "None"
                const fields: discord.EmbedField[] = [
                    { name: "Channel", value: channelLabel, inline: false },
                    { name: "Enabled", value: entry.enabled ? "Yes" : "No", inline: true },
                    { name: "Type", value: formatStickyType(entry.type), inline: true },
                    { name: "Mode", value: formatStickyMode(entry), inline: true },
                    { name: "Ignored Roles", value: ignoredRoles, inline: false },
                    { name: "Current Sticky Message", value: entry.lastStickyMessageId ? `\`${entry.lastStickyMessageId}\`` : "None", inline: false }
                ]

                if (entry.messageContent.length > 0) fields.push({ name: "Message Content", value: truncateText(entry.messageContent, 1024), inline: false })
                if (entry.embedData) fields.push({ name: "Embed Preview", value: truncateText(`Title: ${entry.embedData.title || "/"}\nDescription: ${entry.embedData.description || "/"}`, 1024), inline: false })
                if (entry.attachmentData) fields.push({ name: "Attachment", value: `\`${entry.attachmentData.originalName}\``, inline: false })
                if (entry.expiration) fields.push({ name: "Expiration", value: `Expires: **${entry.expiration.expiresAt}**\nDelete message: **${entry.expiration.deleteMessage ? "Yes" : "No"}**`, inline: false })
                if (entry.schedule) fields.push({ name: "Schedule", value: `Expression: **${entry.schedule.expression}**\nTimezone: **${entry.schedule.timezone}**\nNext: **${entry.schedule.nextRunAt ?? "Unknown"}**`, inline: false })
                if (entry.reaction) fields.push({ name: "Reaction Trigger", value: `Emoji: **${entry.reaction.emoji}**\nThreshold: **${entry.reaction.threshold}**\nAction: **${entry.reaction.action}**`, inline: false })
                if (entry.analytics) fields.push({ name: "Analytics", value: `Sent: **${entry.analytics.sentCount}**\nTriggers: **${entry.analytics.triggerCount}**\nLast sent: **${entry.analytics.lastSentAt ?? "Never"}**`, inline: false })

                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Sticky Details", `Saved sticky settings for ${channelLabel}.`, fields)
                }))
                return cancel()
            }

            if (subcommand === "remove" && targetChannelId) {
                const removed = await manager.removeEntry(targetChannelId, true)
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: removed
                        ? buildReply("Sticky Removed", "The sticky configuration and the current sticky message were removed.")
                        : buildReply("Sticky Not Found", "There is no sticky configured for that channel.", [], "Red")
                }))
                return cancel()
            }

            if (subcommand === "list") {
                const entries = manager.getAllEntries()
                if (entries.length === 0) {
                    instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                        data: buildReply("Sticky List", "No sticky messages are configured yet.")
                    }))
                    return cancel()
                }

                const fields: discord.EmbedField[] = []
                for (const entry of entries.slice(0, 25)) {
                    fields.push({
                        name: `${entry.enabled ? "Enabled" : "Disabled"} • ${formatStickyType(entry.type)}`,
                        value: `${await formatStickyChannel(entry.channelId)}\nMode: ${formatStickyMode(entry)}`,
                        inline: false
                    })
                }

                const extraText = entries.length > 25 ? `\n\nShowing the first 25 of ${entries.length} sticky channels.` : ""
                instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                    data: buildReply("Sticky List", `Configured sticky channels: **${entries.length}**.${extraText}`, fields)
                }))
                return cancel()
            }

            instance.reply(await opendiscord.builders.messages.getSafe("ot-sticky-messages:reply-message").build(source, {
                data: buildReply("Unknown Subcommand", `The sticky subcommand \`${subcommand}\` is not supported by this plugin.`, [], "Red")
            }))
            return cancel()
        }),
        new api.ODWorker("ot-sticky-messages:logs", -1, (instance: any, params: any, source: any) => {
            const subcommand = instance.options.getSubCommand() ?? "unknown"
            opendiscord.log(instance.user.displayName + " used the 'sticky " + subcommand + "' command!", "plugin", [
                { key: "user", value: instance.user.username },
                { key: "userid", value: instance.user.id, hidden: true },
                { key: "channelid", value: instance.channel.id, hidden: true },
                { key: "method", value: source }
            ])
        })
    ])
})

opendiscord.events.get("onReadyForUsage").listen(() => {
    getStickyManager().boot()
})
