///////////////////////////////////////
//TWITCH NOTIFIER - REMOVE CHANNEL COMMAND
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { getTwitchStorage } from "../storage";
import { buildResponseMessage } from "../embeds";

export async function handleRemoveChannel(instance: any, storage: ReturnType<typeof getTwitchStorage>): Promise<void> {
  if (!storage || !instance.guild) return;

  const streamer = instance.options.getString("streamer", true)!;
  const channelOpt = (instance.interaction as discord.ChatInputCommandInteraction).options.getChannel("channel", false);
  const channelId = channelOpt && channelOpt.type === discord.ChannelType.GuildText ? channelOpt.id : undefined;

  storage.removeSubscription(
    instance.guild.id,
    channelId,
    (s) => s.twitchLogin.toLowerCase() === streamer.toLowerCase(),
  );

  if (channelId) {
    await instance.reply({
      id: new api.ODId("twitch-removed"),
      ephemeral: true,
      message: await buildResponseMessage("removedOne", {
        "streamer-name": streamer,
        "discord-channel": `<#${channelId}>`,
      }),
    });
  } else {
    await instance.reply({
      id: new api.ODId("twitch-removed"),
      ephemeral: true,
      message: await buildResponseMessage("removedAll", { "streamer-name": streamer }),
    });
  }
}
