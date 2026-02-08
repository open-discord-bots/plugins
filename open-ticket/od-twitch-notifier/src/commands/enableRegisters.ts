///////////////////////////////////////
//TWITCH NOTIFIER - ENABLE REGISTERS COMMAND
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { getTwitchStorage } from "../storage";
import { buildResponseMessage } from "../embeds";

export async function handleEnableRegisters(
  instance: any,
  storage: ReturnType<typeof getTwitchStorage>,
): Promise<void> {
  if (!storage || !instance.guild) return;

  const channel = (instance.interaction as discord.ChatInputCommandInteraction).options.getChannel("channel", true);

  if (!channel || channel.type !== discord.ChannelType.GuildText) {
    await instance.reply({
      id: new api.ODId("twitch-invalid-channel"),
      ephemeral: true,
      message: await buildResponseMessage("invalidChannel"),
    });
    return;
  }

  storage.setRegistersConfig({ guildId: instance.guild.id, logsChannelId: channel.id });
  await instance.reply({
    id: new api.ODId("twitch-registers"),
    ephemeral: true,
    message: await buildResponseMessage("registersEnabled", { "discord-channel": `<#${channel.id}>` }),
  });
}
