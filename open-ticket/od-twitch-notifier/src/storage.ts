///////////////////////////////////////
//TWITCH NOTIFIER - STORAGE
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";

/**## TwitchSubscription `interface`
 * Represents a Twitch channel subscription for notifications.
 *
 * Contains all data needed to track a streamer's live status and send notifications.
 */
export interface TwitchSubscription {
  /**The Discord guild ID where notifications are sent. */
  guildId: string;
  /**The Discord channel ID where notifications are sent. */
  discordChannelId: string;
  /**The Twitch user ID (immutable identifier). */
  twitchUserId: string;
  /**The current Twitch login/username. */
  twitchLogin: string;
  /**The last known login for rename detection. */
  lastKnownLogin: string;
  /**Optional custom message for notifications. */
  customMessage: string | null;
  /**Mention configuration for notifications. */
  mention: { type: "everyone" | "role"; roleId?: string } | null;
  /**Whether the streamer is currently live. */
  isLive: boolean;
  /**The message ID of the last live notification. */
  lastLiveMessageId?: string;
  /**The last stream title. */
  lastTitle?: string;
  /**The last game being played. */
  lastGame?: string;
  /**The stream thumbnail URL. */
  thumbnailUrl?: string;
  /**Timestamp of last update. */
  updatedAt: number;
  /**Timestamp of creation. */
  createdAt: number;
}

/**## TwitchRegistersConfig `interface`
 * Configuration for the logs/registers channel in a guild.
 */
export interface TwitchRegistersConfig {
  /**The Discord guild ID. */
  guildId: string;
  /**The channel ID where logs are sent. */
  logsChannelId: string;
}

/**## TwitchStorage `class`
 * Manages persistent storage for Twitch subscriptions and configurations.
 *
 * Provides methods to list, add, update and remove subscriptions,
 * as well as manage guild-specific register configurations.
 */
export class TwitchStorage {
  /**The database ID for this storage. */
  dbId = new api.ODId("od-twitch-notifier:db");

  constructor(private database: api.ODFormattedJsonDatabase) {}

  /**Create a unique key for a subscription. */
  private makeSubKey(guildId: string, discordChannelId: string, twitchUserId: string) {
    return `${guildId}:${discordChannelId}:${twitchUserId}`;
  }

  /**Get all subscriptions from the database. */
  listSubscriptions(): TwitchSubscription[] {
    const cat = this.database.getCategory("subscriptions") as any[] | undefined;
    if (!cat) return [];
    return cat.map((v) => v.value as TwitchSubscription);
  }

  /**Find a subscription by Twitch login name. */
  getSubscriptionByLogin(guildId: string, discordChannelId: string, login: string) {
    return this.listSubscriptions().find(
      (s) =>
        s.guildId === guildId &&
        s.discordChannelId === discordChannelId &&
        s.twitchLogin.toLowerCase() === login.toLowerCase(),
    );
  }

  /**Find a subscription by Twitch user ID (immutable). */
  getSubscriptionByUserId(guildId: string, discordChannelId: string, twitchUserId: string) {
    return this.listSubscriptions().find(
      (s) => s.guildId === guildId && s.discordChannelId === discordChannelId && s.twitchUserId === twitchUserId,
    );
  }

  /**Insert or update a subscription. */
  upsertSubscription(sub: TwitchSubscription) {
    if (!sub.twitchUserId) {
      throw new Error("Cannot upsert subscription without twitchUserId");
    }
    this.database.set("subscriptions", this.makeSubKey(sub.guildId, sub.discordChannelId, sub.twitchUserId), sub);
  }

  /**Delete a specific subscription. */
  deleteSubscription(sub: TwitchSubscription) {
    this.database.delete("subscriptions", this.makeSubKey(sub.guildId, sub.discordChannelId, sub.twitchUserId));
  }

  /**Remove subscriptions matching a predicate. */
  removeSubscription(
    guildId: string,
    discordChannelId: string | undefined,
    predicate: (s: TwitchSubscription) => boolean,
  ) {
    const all = this.listSubscriptions().filter(predicate);
    for (const s of all) {
      if (discordChannelId && s.discordChannelId !== discordChannelId) continue;
      this.database.delete("subscriptions", this.makeSubKey(s.guildId, s.discordChannelId, s.twitchUserId));
    }
  }

  /**Update the live state of a subscription. */
  setLiveState(sub: TwitchSubscription, live: boolean, patch: Partial<TwitchSubscription> = {}) {
    const updated: TwitchSubscription = { ...sub, ...patch, isLive: live, updatedAt: Date.now() };
    this.upsertSubscription(updated);
    return updated;
  }

  /**Set the registers/logs channel configuration for a guild. */
  setRegistersConfig(cfg: TwitchRegistersConfig) {
    this.database.set("registers", cfg.guildId, cfg);
  }

  /**Get the registers configuration for a guild. */
  getRegistersConfig(guildId: string): TwitchRegistersConfig | null {
    const raw = this.database.get("registers", guildId) as TwitchRegistersConfig | undefined;
    return raw ?? null;
  }

  /**Delete the registers configuration for a guild. */
  deleteRegistersConfig(guildId: string) {
    this.database.delete("registers", guildId);
  }
}

opendiscord.events.get("onDatabaseLoad").listen((databases) => {
  const fjs: any = require("formatted-json-stringify");
  const formatter = new fjs.ArrayFormatter(
    null,
    true,
    new fjs.ObjectFormatter(null, true, [
      new fjs.PropertyFormatter("category"),
      new fjs.PropertyFormatter("key"),
      new fjs.DefaultFormatter("value", false),
    ]),
  );
  databases.add(
    new api.ODFormattedJsonDatabase(
      "od-twitch-notifier:db",
      "twitch-notifier.json",
      formatter,
      "./plugins/od-twitch-notifier/database/",
    ),
  );
});

/**Singleton storage instance. */
let _storageInstance: TwitchStorage | null = null;

/**## getTwitchStorage `function`
 * Get the singleton TwitchStorage instance.
 *
 * Returns null if the database is not yet loaded.
 */
export const getTwitchStorage = (): TwitchStorage | null => {
  if (_storageInstance) return _storageInstance;
  const db = opendiscord.databases.get("od-twitch-notifier:db") as api.ODFormattedJsonDatabase | null;
  if (!db) return null;
  _storageInstance = new TwitchStorage(db);
  return _storageInstance;
};
