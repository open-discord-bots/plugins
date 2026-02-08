///////////////////////////////////////
//TWITCH NOTIFIER - EMBED BUILDERS
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { TwitchSubscription } from "./storage";

/**Build the live notification embed with stream info */
export const buildLiveEmbed = (
  sub: TwitchSubscription,
  stream: {
    title: string;
    game?: string;
    viewers?: number;
    thumbnail?: string;
    started_at?: string;
    gameBoxArt?: string;
    avatarUrl?: string;
  },
) => {
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const ecfg = cfg.data.embeds?.live || {};
  const color = ecfg.color || "Purple";
  const titleTplEmbed = ecfg.title || "{stream-title}";
  const authorTpl = ecfg.author || "{streamer-name} is now live!";
  const descTpl = ecfg.description || "{custom-message}"; // description only custom message
  const footerTpl = ecfg.footer || "Twitch Notifier • Live";
  const rep = (tpl: string) =>
    tpl
      .replace(/\{streamer-name\}/g, sub.twitchLogin)
      .replace(/\{stream-title\}/g, stream.title || "No title")
      .replace(/\{custom-message\}/g, sub.customMessage ? sub.customMessage : "");
  const embed = new api.ODEmbed("od-twitch-notifier:live");
  embed.workers.add(
    new api.ODWorker("od-twitch-notifier:live:core", 0, async (instance) => {
      instance.setColor(color);
      const computedTitle =
        titleTplEmbed
          .replace(/\{streamer-name\}/g, sub.twitchLogin)
          .replace(/\{stream-title\}/g, stream.title || "No title")
          .replace(/\{streamTitle\}/g, stream.title || "No title")
          .replace(/\{custom-message\}/g, sub.customMessage ? sub.customMessage : "")
          .replace(/\{customMessage\}/g, sub.customMessage ? sub.customMessage : "") ||
        stream.title ||
        "No title";
      instance.setTitle(computedTitle);
      instance.setDescription(rep(descTpl).trim());
      const authorText = authorTpl
        .replace(/\{streamer-name\}/g, sub.twitchLogin)
        .replace(/\{stream-title\}/g, stream.title || "No title")
        .replace(/\{streamTitle\}/g, stream.title || "No title")
        .replace(/\{custom-message\}/g, sub.customMessage ? sub.customMessage : "")
        .replace(/\{customMessage\}/g, sub.customMessage ? sub.customMessage : "");
      try {
        const avatar =
          stream.avatarUrl ||
          `https://static-cdn.jtvnw.net/jtv_user_pictures/${sub.twitchLogin}-profile_image-70x70.png`;
        instance.setAuthor(authorText, avatar);
      } catch {}
      if (stream.thumbnail) {
        const img = stream.thumbnail.replace("{width}", "1280").replace("{height}", "720") + `?u=${Date.now()}`;
        instance.setImage(img);
      }
      if (stream.gameBoxArt) {
        const thumb = stream.gameBoxArt.replace("{width}", "188").replace("{height}", "250") + `?u=${Date.now()}`;
        instance.setThumbnail(thumb);
      }
      const showGame = ecfg.showGameField !== false;
      const showViewers = ecfg.showViewersField !== false;
      const showStart = ecfg.showStartField !== false;
      const gameFieldName = ecfg.gameFieldName || "Game";
      const viewersFieldName = ecfg.viewersFieldName || "Viewers";
      const startFieldName = ecfg.startFieldName || "Start";
      const fields: { name: string; value: string; inline?: boolean }[] = [];
      if (showGame && stream.game) fields.push({ name: gameFieldName, value: `${stream.game}`, inline: true });
      if (showViewers && stream.viewers != null)
        fields.push({ name: viewersFieldName, value: `${stream.viewers.toLocaleString()}`, inline: true });
      if (showStart && stream.started_at) {
        const started = new Date(stream.started_at);
        fields.push({ name: startFieldName, value: discord.time(started, "R"), inline: true });
      }
      if (fields.length) instance.addFields(...fields);
      instance.setFooter(rep(footerTpl));
      instance.setTimestamp(new Date());
    }),
  );
  return embed;
};

/**Build an offline version of the original live embed */
export const buildOfflineEdit = (original: discord.Embed, endedAt: Date, sub: TwitchSubscription) => {
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const offlineCfg = cfg.data.embeds?.offline || {};
  const liveCfg = cfg.data.embeds?.live || {};
  const authorTpl = offlineCfg.author || "{streamer-name} has ended their stream";
  const titleTpl = offlineCfg.title || "{stream-title}";
  const footerTpl = offlineCfg.footer || "Offline";
  const color = offlineCfg.color || "Red";
  const rep = (tpl: string) =>
    tpl.replace(/\{streamer-name\}/g, sub.twitchLogin).replace(/\{endedAtLocale\}/g, endedAt.toLocaleString());
  const clone = discord.EmbedBuilder.from(original);
  try {
    clone.setColor(color as any);
  } catch {}
  try {
    const originalTitle: string | undefined = (original as any)?.data?.title || (original as any)?.title;
    const computedTitle = titleTpl
      .replace(/\{streamer-name\}/g, sub.twitchLogin)
      .replace(/\{stream-title\}/g, originalTitle || "No title")
      .replace(/\{endedAtLocale\}/g, endedAt.toLocaleString());
    if (computedTitle) clone.setTitle(computedTitle);
  } catch {}
  const origAuthorIcon = clone.data.author?.icon_url;
  try {
    clone.setAuthor({ name: rep(authorTpl), iconURL: origAuthorIcon });
  } catch {}
  const keepGame = liveCfg.showGameField !== false;
  if (keepGame) {
    const fields: any[] = (clone as any)?.data?.fields || [];
    const gameFieldName = liveCfg.gameFieldName || "Game";
    const gameField = fields.find((f) => f.name === gameFieldName || /game/i.test(f.name));
    clone.setFields(gameField ? [gameField] : []);
  } else {
    clone.setFields([]);
  }
  try {
    clone.setImage(null as any);
  } catch {}
  try {
    clone.setThumbnail(null as any);
  } catch {}
  try {
    clone.setDescription(null as any);
  } catch {}
  try {
    clone.setFooter({ text: rep(footerTpl) });
  } catch {}
  try {
    clone.setTimestamp(endedAt);
  } catch {}
  return clone;
};

export const TWITCH_WATCH_BUTTON_ID = "od-twitch-notifier:watch";
export const TWITCH_LIST_FIRST_ID = "od-twitch-notifier:list-first";
export const TWITCH_LIST_PREV_ID = "od-twitch-notifier:list-prev";
export const TWITCH_LIST_PAGE_ID = "od-twitch-notifier:list-page";
export const TWITCH_LIST_NEXT_ID = "od-twitch-notifier:list-next";
export const TWITCH_LIST_LAST_ID = "od-twitch-notifier:list-last";

export const registerWatchButtonBuilder = (buttons: api.ODButtonManager_Default) => {
  if (buttons.exists(TWITCH_WATCH_BUTTON_ID as any)) return;
  buttons.add(new api.ODButton(TWITCH_WATCH_BUTTON_ID as any));
  buttons.get(TWITCH_WATCH_BUTTON_ID as any)!.workers.add(
    new api.ODWorker("od-twitch-notifier:watch:core", 0, async (instance, params: { login: string }) => {
      instance.setMode("url");
      instance.setUrl(`https://twitch.tv/${params.login}`);
      instance.setEmoji("▶️");
      try {
        const cfg = opendiscord.configs.get("od-twitch-notifier:config");
        const labelTpl = cfg.data.embeds?.live?.watchButtonLabel || "Watch stream!";
        const label = labelTpl.replace(/\{login\}/g, params.login);
        instance.setLabel(label);
      } catch {
        instance.setLabel("Watch stream!");
      }
    }),
  );
};

export const registerListPaginationButtonBuilders = (buttons: api.ODButtonManager_Default) => {
  const ensure = (id: string) => {
    if (!buttons.exists(id as any)) buttons.add(new api.ODButton(id as any));
  };
  ensure(TWITCH_LIST_FIRST_ID);
  ensure(TWITCH_LIST_PREV_ID);
  ensure(TWITCH_LIST_PAGE_ID);
  ensure(TWITCH_LIST_NEXT_ID);
  ensure(TWITCH_LIST_LAST_ID);

  const gray = (inst: any) => {
    inst.setMode("button");
    inst.setColor("gray");
  };

  buttons.get(TWITCH_LIST_FIRST_ID as any)!.workers.add(
    new api.ODWorker(
      "od-twitch-notifier:list:first",
      0,
      async (instance, params: { page: number; totalPages: number; guildId: string; userId: string }) => {
        gray(instance);
        instance.setCustomId(`ot:tlist:first:${params.guildId}:${params.userId}:${params.page}`);
        instance.setEmoji("⏮️");
        if (params.page <= 0) instance.setDisabled(true);
      },
    ),
  );
  buttons.get(TWITCH_LIST_PREV_ID as any)!.workers.add(
    new api.ODWorker(
      "od-twitch-notifier:list:prev",
      0,
      async (instance, params: { page: number; totalPages: number; guildId: string; userId: string }) => {
        gray(instance);
        instance.setCustomId(`ot:tlist:prev:${params.guildId}:${params.userId}:${params.page}`);
        instance.setEmoji("◀️");
        if (params.page <= 0) instance.setDisabled(true);
      },
    ),
  );
  buttons.get(TWITCH_LIST_PAGE_ID as any)!.workers.add(
    new api.ODWorker(
      "od-twitch-notifier:list:page",
      0,
      async (instance, params: { page: number; totalPages: number; guildId: string; userId: string }) => {
        gray(instance);
        instance.setCustomId(`ot:tlist:page:${params.guildId}:${params.userId}:${params.page}`);
        const cfg = opendiscord.configs.get("od-twitch-notifier:config");
        const labelTpl = cfg.data.embeds?.list?.pageButtonLabel || "Page {current-page} of {total-pages}";
        const label = labelTpl
          .replace(/\{current-page\}/g, String(params.page + 1))
          .replace(/\{total-pages\}/g, String(params.totalPages));
        instance.setLabel(label);
        instance.setDisabled(true);
      },
    ),
  );
  buttons.get(TWITCH_LIST_NEXT_ID as any)!.workers.add(
    new api.ODWorker(
      "od-twitch-notifier:list:next",
      0,
      async (instance, params: { page: number; totalPages: number; guildId: string; userId: string }) => {
        gray(instance);
        instance.setCustomId(`ot:tlist:next:${params.guildId}:${params.userId}:${params.page}`);
        instance.setEmoji("▶️");
        if (params.page >= params.totalPages - 1) instance.setDisabled(true);
      },
    ),
  );
  buttons.get(TWITCH_LIST_LAST_ID as any)!.workers.add(
    new api.ODWorker(
      "od-twitch-notifier:list:last",
      0,
      async (instance, params: { page: number; totalPages: number; guildId: string; userId: string }) => {
        gray(instance);
        instance.setCustomId(`ot:tlist:last:${params.guildId}:${params.userId}:${params.page}`);
        instance.setEmoji("⏭️");
        if (params.page >= params.totalPages - 1) instance.setDisabled(true);
      },
    ),
  );
};

export interface ListPageResult {
  embed: api.ODEmbed<any, any>;
  components: { buttons: api.ODButton<any, any>[] };
}

export const buildListPage = (
  subs: TwitchSubscription[],
  page: number,
  perPage = 5,
): { pageSubs: TwitchSubscription[]; totalPages: number } => {
  const totalPages = Math.max(1, Math.ceil(subs.length / perPage));
  const clampedPage = Math.min(totalPages - 1, Math.max(0, page));
  const slice = subs.slice(clampedPage * perPage, clampedPage * perPage + perPage);
  return { pageSubs: slice, totalPages };
};

export const buildListEmbed = (
  subs: TwitchSubscription[],
  page: number,
  perPage: number,
  channelName: (id: string) => string,
) => {
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const lcfg = cfg.data.embeds?.list || {};
  const per = perPage || lcfg.perPage || 5;
  const { pageSubs, totalPages } = buildListPage(subs, page, per);
  const embed = new api.ODEmbed("od-twitch-notifier:list");
  const titleTpl = lcfg.title || "📺 Added Streamers ({streamers-count})";
  const entryTpl =
    lcfg.entry ||
    "🔹 **User: {streamer-name}**\n📍 **Channel:** {discord-channel}\n💬 **Message:** {customMessage|Without custom message}\n📎 **[Visit Channel!]({streamer-url})**";
  const emptyTpl = lcfg.empty || "(empty page)";
  const footerTpl = lcfg.footer || "Page {current-page}/{total-pages} • Twitch Notifier";
  const color = lcfg.color || "Blurple";
  const rep = (tpl: string, extra: Record<string, string>) =>
    tpl.replace(/\{([A-Za-z0-9_-]+?)(\|[^}]+)?\}/g, (m, key, def) => {
      if (extra[key] != null && extra[key] !== "") return extra[key];
      if (def && def.startsWith("|")) return def.slice(1);
      return "";
    });
  embed.workers.add(
    new api.ODWorker("od-twitch-notifier:list:core", 0, async (instance) => {
      instance.setColor(color);
      instance.setTitle(
        rep(titleTpl, {
          "streamers-count": String(subs.length),
        }),
      );
      const blocks: string[] = [];
      for (const s of pageSubs) {
        const ch = channelName(s.discordChannelId);
        const url = `https://twitch.tv/${s.twitchLogin}`;
        const cm = s.customMessage || "";
        const block = rep(entryTpl, {
          "streamer-name": s.twitchLogin,
          "discord-channel": ch,
          "streamer-url": url,
          customMessage: cm,
        });
        blocks.push(block);
      }
      if (blocks.length === 0) blocks.push(rep(emptyTpl, {}));
      instance.setDescription(blocks.join("\n\n"));
      instance.setFooter(
        rep(footerTpl, {
          "current-page": String(page + 1),
          "total-pages": String(totalPages),
        }),
      );
      instance.setTimestamp(new Date());
    }),
  );
  return { embed, totalPages };
};

export const buildResponseEmbed = async (
  key: string,
  vars: Record<string, string | number> = {},
): Promise<{ embed?: any; missing?: boolean }> => {
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const rcfg = cfg.data.responses || {};
  const tpl = rcfg[key];
  if (!tpl) return { missing: true };
  const expanded: Record<string, string | number> = { ...vars };
  if (vars.streamer && !vars["streamer-name"]) expanded["streamer-name"] = vars.streamer;
  if (vars.channel && !vars["discord-channel"]) expanded["discord-channel"] = vars.channel;
  const rep = (tplStr: string) =>
    tplStr.replace(/\{([A-Za-z0-9_-]+)\}/g, (m, k) => (expanded[k] != null ? String(expanded[k]) : ""));
  const embed = new api.ODEmbed(`od-twitch-notifier:resp:${key}`);
  embed.workers.add(
    new api.ODWorker(`od-twitch-notifier:resp:${key}:core`, 0, async (instance) => {
      if (tpl.color)
        try {
          instance.setColor(tpl.color);
        } catch {}
      if (tpl.title) instance.setTitle(rep(tpl.title));
      if (tpl.description) instance.setDescription(rep(tpl.description));
      instance.setTimestamp(new Date());
    }),
  );
  const built = await embed.build("other", {});
  return { embed: built.embed };
};

export const buildResponseMessage = async (key: string, vars: Record<string, string | number> = {}) => {
  const { embed, missing } = await buildResponseEmbed(key, vars);
  if (missing) return { content: `Missing response template: ${key}` };
  return { embeds: embed ? [embed] : [] };
};

export const buildLogMessageEmbed = async (
  key: string,
  vars: Record<string, string> = {},
): Promise<{ embeds: any[] }> => {
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const logMessages = cfg.data.logMessages || {};
  const tpl = logMessages[key];
  if (!tpl) return { embeds: [{ title: "Error", description: `[Missing log message: ${key}]`, color: 0xff0000 }] };

  const rep = (str: string) => str.replace(/\{([A-Za-z0-9_-]+)\}/g, (_, k) => vars[k] ?? "");

  const embed = new api.ODEmbed(`od-twitch-notifier:log:${key}`);
  embed.workers.add(
    new api.ODWorker(`od-twitch-notifier:log:${key}:core`, 0, async (instance) => {
      if (tpl.color)
        try {
          instance.setColor(tpl.color);
        } catch {}
      if (tpl.title) instance.setTitle(rep(tpl.title));
      if (tpl.description) instance.setDescription(rep(tpl.description));
      instance.setTimestamp(new Date());
    }),
  );
  const built = await embed.build("other", {});
  return { embeds: built.embed ? [built.embed] : [] };
};
