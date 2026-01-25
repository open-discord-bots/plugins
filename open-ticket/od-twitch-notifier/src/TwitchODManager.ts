///////////////////////////////////////
//TWITCH NOTIFIER - MANAGER
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import { getTwitchStorage, TwitchSubscription } from "./storage";
import { TwitchApi, HelixStream, HelixUser, HelixGame } from "./twitch-api";
import { buildLiveEmbed, buildOfflineEdit, TWITCH_WATCH_BUTTON_ID, buildLogMessageEmbed } from "./embeds";
import { ActionRowBuilder, type MessageActionRowComponentBuilder, ButtonBuilder } from "discord.js";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**## TwitchODManager `class`
 * Open Ticket manager for Twitch stream notifications.
 *
 * Extends `ODManager` and handles polling for stream status changes,
 * sending live/offline notifications, and detecting channel renames.
 *
 * This class is the core orchestrator for the Twitch Notifier plugin.
 */
export class TwitchODManager extends api.ODManager<api.ODManagerData> {
  /**The manager ID. */
  id = new api.ODId("od-twitch-notifier:manager");
  /**The polling interval timer. */
  #interval: ReturnType<typeof setTimeout> | null = null;
  /**The Twitch API client. */
  #api: TwitchApi | null = null;
  /**Polling interval in milliseconds. */
  #pollIntervalMs = 60_000;
  /**Whether the poller is running. */
  #running = false;

  constructor(debug: api.ODDebugger) {
    super(debug, "twitch notifier");
  }

  /**Configure the manager with Twitch API credentials. */
  configure(opts: { clientId: string; clientSecret: string; pollIntervalMs: number }) {
    this.#api = new TwitchApi(opts.clientId, opts.clientSecret);
    this.#pollIntervalMs = opts.pollIntervalMs;
  }

  /**Fetch Twitch users by their login names. */
  async getUsersByLogin(logins: string[]): Promise<HelixUser[]> {
    if (!this.#api) return [];
    return this.#api.getUsersByLogin(logins);
  }

  /**Check if the API is configured. */
  isConfigured(): boolean {
    return this.#api !== null;
  }

  /**Start the polling loop. */
  start() {
    if (this.#running || !this.#api) return;
    this.#running = true;
    this.tick()
      .catch((err: any) =>
        opendiscord.log("Twitch poll error (first tick)", "plugin", [{ key: "e", value: String(err?.message ?? err) }]),
      )
      .finally(() => this.schedule());
    opendiscord.log("Twitch Notifier poller started", "plugin");
  }

  /**Stop the polling loop. */
  stop() {
    this.#running = false;
    if (this.#interval) clearTimeout(this.#interval);
    this.#interval = null;
  }

  /**Schedule the next polling tick. */
  private schedule() {
    if (!this.#running) return;
    this.#interval = setTimeout(() => {
      this.tick()
        .catch((err: any) =>
          opendiscord.log("Twitch poll error", "plugin", [{ key: "e", value: String(err?.message ?? err) }]),
        )
        .finally(() => this.schedule());
    }, this.#pollIntervalMs);
  }

  /**Execute one polling tick to check stream statuses. */
  private async tick() {
    const storage = getTwitchStorage();
    if (!storage || !this.#api) return;

    const subs = storage.listSubscriptions();
    if (subs.length === 0) return;

    //group by userId (immutable) to detect renames and deletions
    const userIds = Array.from(new Set(subs.map((s) => s.twitchUserId).filter(Boolean)));

    //resolve users by ID (detect renames/deletions)
    const userChunks: string[][] = [];
    for (let i = 0; i < userIds.length; i += 90) userChunks.push(userIds.slice(i, i + 90));

    const foundUsers: HelixUser[] = [];
    const failedUserIds = new Set<string>();

    for (const c of userChunks) {
      try {
        const resp = await this.#api.getUsersByIds(c);
        foundUsers.push(...resp);
      } catch (e: any) {
        opendiscord.log("Twitch users fetch failed", "plugin", [
          { key: "chunk", value: c.join(",") },
          { key: "e", value: String(e?.message ?? e) },
        ]);
        for (const id of c) failedUserIds.add(id);
      }
      await sleep(120 + Math.floor(Math.random() * 100));
    }

    //map userId -> user
    const userIdToUser: Record<string, HelixUser> = {};
    for (const u of foundUsers) {
      userIdToUser[u.id] = u;
    }

    //update subs with rename detection and handle deleted channels
    for (const s of subs) {
      const u = userIdToUser[s.twitchUserId];

      //skip if chunk failed
      if (failedUserIds.has(s.twitchUserId)) continue;

      //user no longer exists -> remove subscription
      if (!u) {
        const reg = storage.getRegistersConfig(s.guildId);
        if (reg) {
          try {
            const channel = await opendiscord.client.fetchGuildTextChannel(s.guildId, reg.logsChannelId);
            if (channel) {
              const logMsg = await buildLogMessageEmbed("channelDeleted", { "streamer-name": s.twitchLogin });
              await channel.send(logMsg);
            }
          } catch (e: any) {
            opendiscord.log("Failed to notify channel deletion", "plugin", [
              { key: "guildId", value: s.guildId },
              { key: "channelId", value: reg.logsChannelId },
              { key: "e", value: String(e?.message ?? e) },
            ]);
          }
        }
        storage.removeSubscription(s.guildId, s.discordChannelId, (x) => x === s);
        continue;
      }

      //detect login change (rename)
      if (s.twitchLogin.toLowerCase() !== u.login.toLowerCase()) {
        const reg = storage.getRegistersConfig(s.guildId);
        if (reg) {
          try {
            const channel = await opendiscord.client.fetchGuildTextChannel(s.guildId, reg.logsChannelId);
            if (channel) {
              const logMsg = await buildLogMessageEmbed("streamerRenamed", {
                "old-name": s.twitchLogin,
                "new-name": u.login,
              });
              await channel.send(logMsg);
            }
          } catch {}
        }
        const oldLogin = s.twitchLogin;
        (s as any).lastKnownLogin = oldLogin;
        (s as any).twitchLogin = u.login;
        storage.upsertSubscription(s);
      }
    }

    //fetch live streams by user id
    const liveUserIds = Array.from(new Set(subs.map((s) => s.twitchUserId).filter(Boolean))) as string[];
    const liveChunks: string[][] = [];
    for (let i = 0; i < liveUserIds.length; i += 90) liveChunks.push(liveUserIds.slice(i, i + 90));

    const liveStreams: HelixStream[] = [];
    for (const c of liveChunks) {
      try {
        const resp = await this.#api.getStreamsByUserIds(c);
        liveStreams.push(...resp);
      } catch (e: any) {
        opendiscord.log("Twitch streams fetch failed", "plugin", [
          { key: "userIds", value: c.join(",") },
          { key: "e", value: String(e?.message ?? e) },
        ]);
      }
      await sleep(120 + Math.floor(Math.random() * 100));
    }

    const liveUserIdsSet = new Set(liveStreams.map((s) => s.user_id));

    //collect game names for box art
    const gameNames = Array.from(new Set(liveStreams.map((s) => s.game_name).filter((g): g is string => !!g)));
    const gameMap: Record<string, string> = {};
    if (gameNames.length) {
      try {
        const games: HelixGame[] = await this.#api.getGamesByNames(gameNames);
        for (const g of games) if (g.name && g.box_art_url) gameMap[g.name] = g.box_art_url;
      } catch (e: any) {
        opendiscord.log("Twitch games fetch failed", "plugin", [{ key: "e", value: String(e?.message ?? e) }]);
      }
    }

    for (const s of subs) {
      const liveData = liveStreams.find((st) => st.user_id === s.twitchUserId);
      if (liveData && !s.isLive) {
        //streamer went live
        try {
          const channel = await opendiscord.client.fetchGuildTextChannel(s.guildId, s.discordChannelId);
          if (channel) {
            const contentParts: string[] = [];
            if (s.mention) {
              if (s.mention.type === "everyone") contentParts.push("@everyone");
              else if (s.mention.type === "role" && s.mention.roleId) contentParts.push(`<@&${s.mention.roleId}>`);
            }
            const content = contentParts.join(" ");

            const userInfo = userIdToUser[s.twitchUserId];
            const avatarUrl = userInfo?.profile_image_url;

            const embedBuilt = await buildLiveEmbed(s, {
              title: liveData.title,
              game: liveData.game_name,
              viewers: liveData.viewer_count,
              thumbnail: liveData.thumbnail_url,
              started_at: liveData.started_at,
              gameBoxArt: gameMap[liveData.game_name],
              avatarUrl,
            }).build("other", {});

            const components: ButtonBuilder[] = [];
            try {
              if (opendiscord.builders.buttons.exists(TWITCH_WATCH_BUTTON_ID as any)) {
                const btn = await opendiscord.builders.buttons
                  .get(TWITCH_WATCH_BUTTON_ID as any)!
                  .build("other", { login: s.twitchLogin });
                if (btn.component) components.push(btn.component as ButtonBuilder);
              }
            } catch {}

            const rows = components.length
              ? [new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(...components)]
              : undefined;

            const msg = await channel.send({
              content,
              embeds: embedBuilt.embed ? [embedBuilt.embed] : [],
              components: rows,
            });

            storage.upsertSubscription({
              ...s,
              isLive: true,
              lastLiveMessageId: msg.id,
              lastTitle: liveData.title,
              lastGame: liveData.game_name || s.lastGame,
              thumbnailUrl: liveData.thumbnail_url,
            });
          }
        } catch (e: any) {
          opendiscord.log("Error sending live message", "plugin", [
            { key: "guildId", value: s.guildId },
            { key: "channelId", value: s.discordChannelId },
            { key: "login", value: s.twitchLogin },
            { key: "e", value: String(e?.message ?? e) },
          ]);
        }
      } else if (!liveData && s.isLive && s.lastLiveMessageId) {
        //streamer went offline
        try {
          const channel = await opendiscord.client.fetchGuildTextChannel(s.guildId, s.discordChannelId);
          if (channel) {
            const msg = await opendiscord.client.fetchGuildChannelMessage(channel, s.lastLiveMessageId);
            if (msg && msg.embeds[0]) {
              const original = msg.embeds[0].toJSON();
              const edited = buildOfflineEdit(original as any, new Date(), s);
              await msg.edit({ content: "", embeds: [edited], components: [] });
            } else if (msg) {
              await msg.edit({
                content: "",
                embeds: [
                  {
                    author: { name: `${s.twitchLogin} ha terminado su directo en Twitch` },
                    footer: { text: `Offline.` },
                    color: 0x555555,
                  },
                ],
                components: [],
              });
            }
            storage.upsertSubscription({ ...s, isLive: false, lastLiveMessageId: undefined });
          }
        } catch (e: any) {
          opendiscord.log("Error editing message to offline", "plugin", [
            { key: "guildId", value: s.guildId },
            { key: "channelId", value: s.discordChannelId },
            { key: "login", value: s.twitchLogin },
            { key: "e", value: String(e?.message ?? e) },
          ]);
        }
      }
    }
  }
}
