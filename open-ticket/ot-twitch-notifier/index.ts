///////////////////////////////////////
//TWITCH NOTIFIER PLUGIN - MAIN
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";
import * as discord from "discord.js";
import { TwitchODManager } from "./src/TwitchODManager";
import { getTwitchStorage } from "./src/storage";
import {
  registerWatchButtonBuilder,
  registerListPaginationButtonBuilders,
  TWITCH_LIST_FIRST_ID,
  TWITCH_LIST_PREV_ID,
  TWITCH_LIST_PAGE_ID,
  TWITCH_LIST_NEXT_ID,
  TWITCH_LIST_LAST_ID,
  buildListEmbed,
  buildResponseMessage,
} from "./src/embeds";
import {
  handleAddChannel,
  handleRemoveChannel,
  handleListChannels,
  handleEnableRegisters,
  handleDisableRegisters,
} from "./src/commands";
import { registerConfigChecker } from "./src/checker";

// Compatible with OpenDiscord/OpenTicket

declare module "#opendiscord-types" {
  interface ODPluginClassManagerIds_Default {
    "ot-twitch-notifier:manager": TwitchODManager;
  }
  interface ODPluginManagerIds_Default {
    "ot-twitch-notifier": api.ODPlugin;
  }
  interface ODConfigManagerIds_Default {
    "ot-twitch-notifier:config": api.ODJsonConfig;
  }
  interface ODSlashCommandManagerIds_Default {
    "ot-twitch-notifier:twitch": api.ODSlashCommand;
  }
  interface ODCommandResponderManagerIds_Default {
    "ot-twitch-notifier:twitch": { source: "slash" | "text"; params: {}; workers: "ot-twitch-notifier:cmd" };
  }
}

//CONFIG LOADER
opendiscord.events.get("onConfigLoad").listen((configs) => {
  configs.add(new api.ODJsonConfig("ot-twitch-notifier:config", "config.json", "./plugins/ot-twitch-notifier/"));
});

//CONFIG CHECKER
opendiscord.events.get("onCheckerLoad").listen((checkers) => {
  registerConfigChecker(checkers);
});

//PLUGIN CLASS LOADER
opendiscord.events.get("onPluginClassLoad").listen((classes) => {
  if (!classes.get("ot-twitch-notifier:manager" as any)) {
    classes.add(new TwitchODManager(opendiscord.debug));
  }
});

//BUTTON BUILDERS
opendiscord.events.get("onButtonBuilderLoad").listen((buttons) => {
  registerWatchButtonBuilder(buttons);
  registerListPaginationButtonBuilders(buttons);
});

//SLASH COMMAND
const act = discord.ApplicationCommandType;
const acot = discord.ApplicationCommandOptionType;
opendiscord.events.get("onSlashCommandLoad").listen((slash) => {
  slash.add(
    new api.ODSlashCommand("ot-twitch-notifier:twitch", {
      name: "twitch",
      description: "Manage Twitch stream notifications",
      type: act.ChatInput,
      contexts: [discord.InteractionContextType.Guild],
      integrationTypes: [discord.ApplicationIntegrationType.GuildInstall],
      options: [
        {
          name: "add-channel",
          description: "Add a streamer to receive live notifications.",
          type: acot.Subcommand,
          options: [
            { name: "streamer", description: "Twitch username", type: acot.String, required: true },
            {
              name: "channel",
              description: "Channel to send notifications",
              type: acot.Channel,
              required: false,
              channelTypes: [discord.ChannelType.GuildText],
            },
            { name: "role", description: "Role to mention", type: acot.Role, required: false },
            { name: "message", description: "Custom message", type: acot.String, required: false, maxLength: 300 },
          ],
        },
        {
          type: acot.Subcommand,
          name: "remove-channel",
          description: "Remove a streamer. Notifications will no longer be sent.",
          options: [
            {
              name: "streamer",
              description: "Twitch username to remove",
              type: acot.String,
              required: true,
              autocomplete: true,
            },
            {
              name: "channel",
              description: "Discord channel to remove from (optional)",
              type: acot.Channel,
              required: false,
              channelTypes: [discord.ChannelType.GuildText],
            },
          ],
        },
        {
          type: acot.Subcommand,
          name: "list-channels",
          description: "List all configured streamers in this server",
        },
        {
          type: acot.Subcommand,
          name: "enable-logs",
          description: "Enable the logs channel",
          options: [
            {
              name: "channel",
              description: "Channel to send logs",
              type: acot.Channel,
              required: true,
              channelTypes: [discord.ChannelType.GuildText],
            },
          ],
        },
        {
          type: acot.Subcommand,
          name: "disable-logs",
          description: "Disable the logs channel",
        },
      ],
    }),
  );
});

//COMMAND RESPONDER
opendiscord.events.get("onCommandResponderLoad").listen((commands) => {
  const general = opendiscord.configs.get("opendiscord:general");
  commands.add(new api.ODCommandResponder("ot-twitch-notifier:twitch", general.data.prefix, "twitch"));
  const workers: api.ODWorker<any, any, any>[] = [];

  //PERMISSION WORKER
  workers.push(
    new api.ODWorker("ot-twitch-notifier:perm", 1, async (instance, params, source, cancel) => {
      const config = opendiscord.configs.get("ot-twitch-notifier:config");
      const permissionMode = config.data.commandPermission;
      if (permissionMode == "none") return;
      else if (permissionMode == "everyone") return;
      else if (permissionMode == "admin") {
        if (
          !opendiscord.permissions.hasPermissions(
            "support",
            await opendiscord.permissions.getPermissions(instance.user, instance.channel, instance.guild),
          )
        ) {
          await instance.reply({
            id: new api.ODId("twitch-no-perm"),
            ephemeral: true,
            message: await buildResponseMessage("noPermission"),
          });
          return cancel();
        }
      } else {
        if (!instance.guild || !instance.member) {
          await instance.reply({
            id: new api.ODId("twitch-no-perm2"),
            ephemeral: true,
            message: await buildResponseMessage("noPermission"),
          });
          return cancel();
        }
        const role = await opendiscord.client.fetchGuildRole(instance.guild, permissionMode);
        if (!role || !role.members.has(instance.member.id)) {
          await instance.reply({
            id: new api.ODId("twitch-no-perm3"),
            ephemeral: true,
            message: await buildResponseMessage("noPermission"),
          });
          return cancel();
        }
      }
    }),
  );

  //MAIN COMMAND WORKER
  workers.push(
    new api.ODWorker("ot-twitch-notifier:cmd", 0, async (instance, params, source, cancel) => {
      const cfg = opendiscord.configs.get("ot-twitch-notifier:config");
      if (!instance.guild) {
        await instance.reply({
          id: new api.ODId("twitch-not-in-guild"),
          ephemeral: true,
          message: await buildResponseMessage("notInGuild"),
        });
        return;
      }

      const sub =
        instance.interaction instanceof discord.ChatInputCommandInteraction
          ? instance.interaction.options.getSubcommand()
          : null;
      const creds = cfg.data.credentials || {};
      const useEnv = creds.useEnv;
      const clientId = useEnv ? process.env.twitchClientId : creds.twitchClientId;

      const manager = opendiscord.plugins.classes.get("ot-twitch-notifier:manager") as TwitchODManager;
      if (manager && !clientId) {
        return instance.reply({
          id: new api.ODId("twitch-config-missing"),
          ephemeral: true,
          message: await buildResponseMessage("configMissing"),
        });
      }

      const storage = getTwitchStorage();
      if (!storage) {
        await instance.reply({
          id: new api.ODId("twitch-storage-missing"),
          ephemeral: true,
          message: await buildResponseMessage("storageMissing"),
        });
        return;
      }

      if (sub === "add-channel") await handleAddChannel(instance, manager, storage);
      else if (sub === "remove-channel") await handleRemoveChannel(instance, storage);
      else if (sub === "list-channels") await handleListChannels(instance, storage);
      else if (sub === "enable-logs") await handleEnableRegisters(instance, storage);
      else if (sub === "disable-logs") await handleDisableRegisters(instance, storage);
      else
        await instance.reply({
          id: new api.ODId("twitch-unknown"),
          ephemeral: true,
          message: await buildResponseMessage("unknownSub"),
        });
    }),
  );

  commands.get("ot-twitch-notifier:twitch").workers.add(workers);
});

//POLLER START
let pollerStarted = false;
opendiscord.events.get("afterClientReady").listen(() => {
  if (pollerStarted) return;
  const cfg = opendiscord.configs.get("ot-twitch-notifier:config");
  const creds = cfg.data.credentials || {};
  const useEnv = creds.useEnv;
  const clientId = useEnv ? process.env.twitchClientId : creds.twitchClientId;
  const clientSecret = useEnv ? process.env.twitchClientSecret : creds.twitchClientSecret;
  const poll = cfg.data.pollIntervalMs;
  const manager = opendiscord.plugins.classes.get("ot-twitch-notifier:manager") as TwitchODManager;
  if (manager && clientId && clientSecret) {
    manager.configure({ clientId, clientSecret, pollIntervalMs: poll });
    manager.start();
    pollerStarted = true;
  }
});

//INTERACTION HANDLERS
opendiscord.events.get("afterClientReady").listen(() => {
  const client: any = (opendiscord as any).client?.client;
  if (!client) return;
  client.on("interactionCreate", async (interaction: any) => {
    try {
      //AUTOCOMPLETE HANDLER
      if (interaction.isAutocomplete()) {
        if (interaction.commandName !== "twitch") return;
        let sub = interaction.options.getSubcommand(false);
        if (sub !== "remove-channel") return;
        const focused = interaction.options.getFocused(true);
        const storage = getTwitchStorage();
        if (!storage) return interaction.respond([]).catch(() => {});
        const guildId = interaction.guild?.id;
        if (!guildId) return interaction.respond([]).catch(() => {});
        const subsAll = storage
          .listSubscriptions()
          .filter((s) => s.guildId === guildId)
          .sort((a, b) => a.twitchLogin.localeCompare(b.twitchLogin));
        if (focused.name !== "streamer") return interaction.respond([]).catch(() => {});
        const query = (focused.value || "").toLowerCase();

        // Build options with channel context
        const options: { name: string; value: string }[] = [];
        const channelCache: Record<string, string> = {};

        // Pre-fetch channel names for better display
        const uniqueChannelIds = [...new Set(subsAll.map((s) => s.discordChannelId))];
        await Promise.all(
          uniqueChannelIds.slice(0, 10).map(async (chId) => {
            try {
              const ch = await opendiscord.client.fetchGuildTextChannel(guildId, chId);
              channelCache[chId] = ch?.name || "unknown";
            } catch {
              channelCache[chId] = "unknown";
            }
          }),
        );

        // Group subscriptions by streamer
        const streamerMap = new Map<string, typeof subsAll>();
        for (const s of subsAll) {
          const key = s.twitchLogin.toLowerCase();
          if (query && !key.includes(query)) continue;
          if (!streamerMap.has(key)) streamerMap.set(key, []);
          streamerMap.get(key)!.push(s);
        }

        // Build autocomplete options
        for (const [, subs] of streamerMap) {
          if (options.length >= 25) break;
          const first = subs[0];
          const liveEmoji = subs.some((s) => s.isLive) ? "🟢 " : "";

          // Get all channel names for this streamer
          const channelNames = subs
            .map((s) => channelCache[s.discordChannelId] || "?")
            .filter((name, idx, arr) => arr.indexOf(name) === idx); // unique

          // Build display string with all channels
          const channelsDisplay = channelNames.map((n) => `#${n}`).join(", ");

          // Truncate if too long (Discord limit is 100 chars for name)
          let displayName = `${liveEmoji}${first.twitchLogin} (${channelsDisplay})`;
          if (displayName.length > 100) {
            displayName = `${liveEmoji}${first.twitchLogin} (${subs.length} channels)`;
          }

          options.push({
            name: displayName,
            value: first.twitchLogin,
          });
        }

        return interaction.respond(options).catch(() => {});
      }

      //PAGINATION BUTTON HANDLER
      else if (interaction.isButton()) {
        const id: string = interaction.customId;
        if (!id.startsWith("ot:tlist:")) return;
        const parts = id.split(":");
        if (parts.length < 6) return;
        const action = parts[2];
        const guildId = parts[3];
        const userId = parts[4];
        const page = Number(parts[5]) || 0;
        if (interaction.user.id !== userId) {
          return interaction
            .reply({ content: "You can't interact with this pagination.", ephemeral: true })
            .catch(() => {});
        }
        const storage = getTwitchStorage();
        if (!storage) return;
        const subs = storage
          .listSubscriptions()
          .filter((s) => s.guildId === guildId)
          .sort((a, b) => a.twitchLogin.localeCompare(b.twitchLogin));
        const perPageCfg = opendiscord.configs.get("ot-twitch-notifier:config").data.embeds?.list?.perPage;
        const perPage = perPageCfg && perPageCfg > 0 && perPageCfg < 50 ? Number(perPageCfg) : 5;
        const totalPages = Math.max(1, Math.ceil(subs.length / perPage));
        let newPage = page;
        if (action === "first") newPage = 0;
        else if (action === "prev") newPage = Math.max(0, page - 1);
        else if (action === "next") newPage = Math.min(totalPages - 1, page + 1);
        else if (action === "last") newPage = totalPages - 1;
        else if (action === "page") newPage = page;
        const getChannelMention = (chId: string) => `<#${chId}>`;
        const { embed } = buildListEmbed(subs, newPage, perPage, getChannelMention);
        const built = await embed.build("other", {});
        const first = await opendiscord.builders.buttons
          .get(TWITCH_LIST_FIRST_ID as any)!
          .build("other", { page: newPage, totalPages, guildId, userId });
        const prev = await opendiscord.builders.buttons
          .get(TWITCH_LIST_PREV_ID as any)!
          .build("other", { page: newPage, totalPages, guildId, userId });
        const pageB = await opendiscord.builders.buttons
          .get(TWITCH_LIST_PAGE_ID as any)!
          .build("other", { page: newPage, totalPages, guildId, userId });
        const next = await opendiscord.builders.buttons
          .get(TWITCH_LIST_NEXT_ID as any)!
          .build("other", { page: newPage, totalPages, guildId, userId });
        const last = await opendiscord.builders.buttons
          .get(TWITCH_LIST_LAST_ID as any)!
          .build("other", { page: newPage, totalPages, guildId, userId });
        const comps = [first, prev, pageB, next, last]
          .map((b) => b.component)
          .filter((c): c is discord.ButtonBuilder => c != null);
        const row = new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(...comps);
        const embedsArr = built.embed ? [built.embed] : [];
        await interaction.update({ embeds: embedsArr, components: [row.toJSON()] as any }).catch(() => {});
      }
    } catch (err) {
      opendiscord.debug.debug("Twitch interaction handler error");
    }
  });
});
