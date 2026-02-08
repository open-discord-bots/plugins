///////////////////////////////////////
//TWITCH NOTIFIER - LIST CHANNELS COMMAND
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { getTwitchStorage } from "../storage";
import {
  buildResponseMessage,
  buildListEmbed,
  TWITCH_LIST_FIRST_ID,
  TWITCH_LIST_PREV_ID,
  TWITCH_LIST_PAGE_ID,
  TWITCH_LIST_NEXT_ID,
  TWITCH_LIST_LAST_ID,
} from "../embeds";

export async function handleListChannels(instance: any, storage: ReturnType<typeof getTwitchStorage>): Promise<void> {
  if (!storage || !instance.guild) return;

  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const all = storage
    .listSubscriptions()
    .filter((s) => s.guildId === instance.guild!.id)
    .sort((a, b) => a.twitchLogin.localeCompare(b.twitchLogin));

  if (all.length === 0) {
    await instance.reply({
      id: new api.ODId("twitch-empty"),
      ephemeral: true,
      message: await buildResponseMessage("listEmpty"),
    });
    return;
  }

  const getChannelMention = (id: string) => `<#${id}>`;
  const page = 0;
  const perPageCfg =
    cfg.data.embeds && cfg.data.embeds.list && cfg.data.embeds.list.perPage ? Number(cfg.data.embeds.list.perPage) : 5;
  const perPage = perPageCfg > 0 && perPageCfg < 50 ? perPageCfg : 5;

  const { embed, totalPages } = buildListEmbed(all, page, perPage, getChannelMention);
  const built = await embed.build("other", {});

  let actionRows: any[] = [];
  if (opendiscord.builders.buttons.exists(TWITCH_LIST_FIRST_ID as any)) {
    try {
      const first = await opendiscord.builders.buttons
        .get(TWITCH_LIST_FIRST_ID as any)!
        .build("other", { page, totalPages, guildId: instance.guild!.id, userId: instance.user.id });
      const prev = await opendiscord.builders.buttons
        .get(TWITCH_LIST_PREV_ID as any)!
        .build("other", { page, totalPages, guildId: instance.guild!.id, userId: instance.user.id });
      const pageB = await opendiscord.builders.buttons
        .get(TWITCH_LIST_PAGE_ID as any)!
        .build("other", { page, totalPages, guildId: instance.guild!.id, userId: instance.user.id });
      const next = await opendiscord.builders.buttons
        .get(TWITCH_LIST_NEXT_ID as any)!
        .build("other", { page, totalPages, guildId: instance.guild!.id, userId: instance.user.id });
      const last = await opendiscord.builders.buttons
        .get(TWITCH_LIST_LAST_ID as any)!
        .build("other", { page, totalPages, guildId: instance.guild!.id, userId: instance.user.id });
      const comps = [first, prev, pageB, next, last]
        .map((b) => b.component)
        .filter((c): c is discord.ButtonBuilder => c != null);
      if (comps.length) {
        const row = new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(...comps);
        actionRows.push(row.toJSON());
      }
    } catch (e) {
      opendiscord.log("Pagination buttons build error", "plugin", []);
    }
  }

  const embedsArr = built.embed ? [built.embed] : [];
  await instance.reply({
    id: new api.ODId("twitch-list"),
    ephemeral: true,
    message: { embeds: embedsArr, components: actionRows },
  });
}
