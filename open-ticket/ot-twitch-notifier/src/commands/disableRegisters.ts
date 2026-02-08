///////////////////////////////////////
//TWITCH NOTIFIER - DISABLE REGISTERS COMMAND
///////////////////////////////////////
import { api } from "#opendiscord";
import { TwitchStorage } from "../storage";
import { buildResponseMessage } from "../embeds";

export async function handleDisableRegisters(
  instance: api.ODCommandResponderInstance,
  storage: TwitchStorage,
): Promise<void> {
  const guildId = instance.interaction.guild?.id;
  if (!guildId) {
    await instance.reply({
      id: new api.ODId("twitch-no-guild"),
      ephemeral: true,
      message: await buildResponseMessage("notInGuild"),
    });
    return;
  }

  const existing = storage.getRegistersConfig(guildId);
  if (!existing) {
    await instance.reply({
      id: new api.ODId("twitch-registers-not-enabled"),
      ephemeral: true,
      message: await buildResponseMessage("registersNotEnabled"),
    });
    return;
  }

  storage.deleteRegistersConfig(guildId);

  await instance.reply({
    id: new api.ODId("twitch-registers-disabled"),
    ephemeral: true,
    message: await buildResponseMessage("registersDisabled"),
  });
}
