///////////////////////////////////////
//TWITCH NOTIFIER - CONFIG CHECKER
///////////////////////////////////////
import { api, opendiscord } from "#opendiscord";

/**## registerConfigChecker `function`
 * Registers the configuration checker for the Twitch Notifier plugin.
 *
 * Validates all config.json properties including credentials, embeds, responses, and log messages.
 */
export const registerConfigChecker = (checkers: api.ODCheckerManager_Default) => {
  const responseEmbedStructure = new api.ODCheckerObjectStructure("od-twitch-notifier:response-embed", {
    children: [
      {
        key: "color",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:response-color", {}),
      },
      {
        key: "title",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:response-title", { maxLength: 256 }),
      },
      {
        key: "description",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:response-description", { maxLength: 4096 }),
      },
    ],
  });

  const logMessageStructure = new api.ODCheckerObjectStructure("od-twitch-notifier:log-message", {
    children: [
      {
        key: "color",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:log-color", {}),
      },
      {
        key: "title",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:log-title", { maxLength: 256 }),
      },
      {
        key: "description",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:log-description", { maxLength: 4096 }),
      },
    ],
  });

  const configStructure = new api.ODCheckerObjectStructure("od-twitch-notifier:config", {
    children: [
      //CREDENTIALS
      {
        key: "credentials",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerObjectStructure("od-twitch-notifier:credentials", {
          children: [
            {
              key: "useEnv",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerBooleanStructure("od-twitch-notifier:use-env", {}),
            },
            {
              key: "twitchClientId",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerStringStructure("od-twitch-notifier:client-id", {}),
            },
            {
              key: "twitchClientSecret",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerStringStructure("od-twitch-notifier:client-secret", {}),
            },
          ],
        }),
      },

      //SETTINGS
      {
        key: "pollIntervalMs",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerNumberStructure("od-twitch-notifier:poll-interval", {
          min: 1000,
          negativeAllowed: false,
          floatAllowed: false,
        }),
      },
      {
        key: "maxTwitchChannels",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerNumberStructure("od-twitch-notifier:max-subs", {
          min: 1,
          max: 500,
          negativeAllowed: false,
          floatAllowed: false,
        }),
      },
      {
        key: "commandPermission",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerStringStructure("od-twitch-notifier:command-permission", {
          regex: /^(admin|everyone|none|\d{15,50})$/,
        }),
      },

      //EMBEDS
      {
        key: "embeds",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerObjectStructure("od-twitch-notifier:embeds", {
          children: [
            //LIVE EMBED
            {
              key: "live",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerObjectStructure("od-twitch-notifier:live-embed", {
                children: [
                  {
                    key: "color",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-color", {}),
                  },
                  {
                    key: "title",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-title", { maxLength: 256 }),
                  },
                  {
                    key: "author",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-author", { maxLength: 256 }),
                  },
                  {
                    key: "description",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-description", {
                      maxLength: 4096,
                    }),
                  },
                  {
                    key: "showGameField",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerBooleanStructure("od-twitch-notifier:live-show-game", {}),
                  },
                  {
                    key: "showViewersField",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerBooleanStructure("od-twitch-notifier:live-show-viewers", {}),
                  },
                  {
                    key: "showStartField",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerBooleanStructure("od-twitch-notifier:live-show-start", {}),
                  },
                  {
                    key: "gameFieldName",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-game-name", { maxLength: 256 }),
                  },
                  {
                    key: "viewersFieldName",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-viewers-name", {
                      maxLength: 256,
                    }),
                  },
                  {
                    key: "startFieldName",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-start-name", { maxLength: 256 }),
                  },
                  {
                    key: "watchButtonLabel",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-button-label", {
                      maxLength: 80,
                    }),
                  },
                  {
                    key: "footer",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:live-footer", { maxLength: 2048 }),
                  },
                ],
              }),
            },
            //OFFLINE EMBED
            {
              key: "offline",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerObjectStructure("od-twitch-notifier:offline-embed", {
                children: [
                  {
                    key: "color",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:offline-color", {}),
                  },
                  {
                    key: "title",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:offline-title", { maxLength: 256 }),
                  },
                  {
                    key: "author",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:offline-author", { maxLength: 256 }),
                  },
                  {
                    key: "footer",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:offline-footer", { maxLength: 2048 }),
                  },
                ],
              }),
            },
            //LIST EMBED
            {
              key: "list",
              optional: false,
              priority: 0,
              checker: new api.ODCheckerObjectStructure("od-twitch-notifier:list-embed", {
                children: [
                  {
                    key: "color",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-color", {}),
                  },
                  {
                    key: "title",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-title", { maxLength: 256 }),
                  },
                  {
                    key: "entry",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-entry", { maxLength: 1024 }),
                  },
                  {
                    key: "empty",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-empty", { maxLength: 256 }),
                  },
                  {
                    key: "footer",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-footer", { maxLength: 2048 }),
                  },
                  {
                    key: "pageButtonLabel",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerStringStructure("od-twitch-notifier:list-page-label", { maxLength: 80 }),
                  },
                  {
                    key: "perPage",
                    optional: false,
                    priority: 0,
                    checker: new api.ODCheckerNumberStructure("od-twitch-notifier:list-per-page", {
                      min: 1,
                      max: 25,
                      negativeAllowed: false,
                      floatAllowed: false,
                    }),
                  },
                ],
              }),
            },
          ],
        }),
      },

      //RESPONSES
      {
        key: "responses",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerObjectStructure("od-twitch-notifier:responses", {
          children: [
            { key: "noPermission", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "notInGuild", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "configMissing", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "storageMissing", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "alreadyExists", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "added", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "removedOne", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "removedAll", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "listEmpty", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "streamerNotFound", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "apiError", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "limitReached", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "invalidChannel", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "registersEnabled", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "registersDisabled", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "registersNotEnabled", optional: false, priority: 0, checker: responseEmbedStructure },
            { key: "unknownSub", optional: false, priority: 0, checker: responseEmbedStructure },
          ],
        }),
      },

      //LOG MESSAGES
      {
        key: "logMessages",
        optional: false,
        priority: 0,
        checker: new api.ODCheckerObjectStructure("od-twitch-notifier:log-messages", {
          children: [
            { key: "channelDeleted", optional: false, priority: 0, checker: logMessageStructure },
            { key: "streamerRenamed", optional: false, priority: 0, checker: logMessageStructure },
          ],
        }),
      },
    ],
  });

  checkers.add(
    new api.ODChecker(
      "od-twitch-notifier:config",
      checkers.storage,
      0,
      opendiscord.configs.get("od-twitch-notifier:config"),
      configStructure,
    ),
  );
};
