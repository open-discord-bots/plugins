///////////////////////////////////////
//TWITCH NOTIFIER - ADD CHANNEL COMMAND
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { TwitchODManager } from "../TwitchODManager";
import { getTwitchStorage, TwitchSubscription } from "../storage";
import { buildResponseMessage } from "../embeds";

export async function handleAddChannel(
  instance: any,
  manager: TwitchODManager,
  storage: ReturnType<typeof getTwitchStorage>,
): Promise<void> {
  if (!storage || !instance.guild) return;

  const streamer = instance.options.getString("streamer", true)!;
  const channelOpt = (instance.interaction as discord.ChatInputCommandInteraction).options.getChannel("channel", false);
  const channel = channelOpt && channelOpt.type === discord.ChannelType.GuildText ? channelOpt : instance.channel;
  const roleOpt = (instance.interaction as discord.ChatInputCommandInteraction).options.getRole("role", false);
  const msgOpt = instance.options.getString("message", false);

  // Validate streamer exists on Twitch and get their userId
  if (!manager || !manager.isConfigured()) {
    await instance.reply({
      id: new api.ODId("twitch-not-configured"),
      ephemeral: true,
      message: await buildResponseMessage("configMissing"),
    });
    return;
  }

  let twitchUser: { id: string; login: string; display_name: string } | null = null;
  try {
    const users = await manager.getUsersByLogin([streamer]);
    twitchUser = users[0] || null;
  } catch (e) {
    await instance.reply({
      id: new api.ODId("twitch-api-error"),
      ephemeral: true,
      message: await buildResponseMessage("apiError"),
    });
    return;
  }

  if (!twitchUser) {
    await instance.reply({
      id: new api.ODId("twitch-not-found"),
      ephemeral: true,
      message: await buildResponseMessage("streamerNotFound", { "streamer-name": streamer }),
    });
    return;
  }

  // Check subscription limit per guild
  const cfg = opendiscord.configs.get("od-twitch-notifier:config");
  const maxSubs = cfg.data.maxTwitchChannels || 50;
  const currentCount = storage.listSubscriptions().filter((s) => s.guildId === instance.guild.id).length;
  if (currentCount >= maxSubs) {
    await instance.reply({
      id: new api.ODId("twitch-limit-reached"),
      ephemeral: true,
      message: await buildResponseMessage("limitReached", { "max-subscriptions": String(maxSubs) }),
    });
    return;
  }

  const existing = storage.getSubscriptionByUserId(instance.guild.id, channel.id, twitchUser.id);
  const now = Date.now();

  if (existing) {
    await instance.reply({
      id: new api.ODId("twitch-already"),
      ephemeral: true,
      message: await buildResponseMessage("alreadyExists", {
        "streamer-name": twitchUser.login,
        "discord-channel": `<#${channel.id}>`,
      }),
    });
    return;
  }

  const roleType = roleOpt?.name === "@everyone" ? "everyone" : "role";
  const subData: TwitchSubscription = {
    guildId: instance.guild.id,
    discordChannelId: channel.id,
    twitchUserId: twitchUser.id,
    twitchLogin: twitchUser.login,
    lastKnownLogin: twitchUser.login,
    customMessage: msgOpt || null,
    mention: roleOpt ? { type: roleType, roleId: roleOpt.id } : null,
    isLive: false,
    updatedAt: now,
    createdAt: now,
  };

  storage.upsertSubscription(subData);
  await instance.reply({
    id: new api.ODId("twitch-added"),
    ephemeral: true,
    message: await buildResponseMessage("added", {
      "streamer-name": twitchUser.login,
      "discord-channel": `<#${channel.id}>`,
    }),
  });
}
