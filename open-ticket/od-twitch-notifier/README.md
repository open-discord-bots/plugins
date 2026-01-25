# 📺 OD Twitch Notifier

An OpenDiscord plugin that sends Discord notifications when Twitch streamers go live or offline. Fully customizable embeds, multi-channel support, and automatic detection of channel renames and deletions.

## ✨ Features

- **Live Notifications** - Rich embeds with stream title, game, viewers, thumbnail, and watch button
- **Offline Updates** - Edits the original message when a stream ends (no spam)
- **Multi-Channel Support** - Add the same streamer to different Discord channels
- **Custom Messages** - Per-streamer custom messages and role mentions
- **Paginated List** - View all monitored streamers with navigation buttons
- **Logs Channel** - Optional logging for channel deletions and name changes
- **Fully Customizable** - All embeds, colors, and responses are configurable

---

## 🚀 Installation

1. Copy the `od-twitch-notifier` folder into your OpenDiscord `plugins/` directory
2. Configure your Twitch credentials in `config.json` (see below)
3. Restart the bot

---

## 🔐 Getting Twitch Credentials

To use this plugin, you need to create a Twitch application and get your Client ID and Client Secret.

### Step 1: Go to Twitch Developer Console

1. Visit [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps)
2. Log in with your Twitch account

### Step 2: Create a New Application

1. Click **"Register Your Application"**
2. Fill in the form:
   - **Name**: Any name (e.g., "My Discord Bot")
   - **OAuth Redirect URLs**: `http://localhost` (required but not used)
   - **Category**: Select "Application Integration"
3. Click **"Create"**

### Step 3: Get Your Credentials

1. Find your new application in the list and click **"Manage"**
2. Copy the **Client ID** (shown on the page)
3. Click **"New Secret"** to generate a Client Secret
4. Copy the **Client Secret** (only shown once!)

### Step 4: Configure the Plugin

Open `plugins/od-twitch-notifier/config.json` and add your credentials:

```json
{
  "credentials": {
    "useEnv": false,
    "twitchClientId": "your-client-id-here",
    "twitchClientSecret": "your-client-secret-here"
  }
}
```

> **💡 Tip:** You can also use environment variables by setting `useEnv: true` and defining `twitchClientId` and `twitchClientSecret` in your `.env` file.

---

## ⚙️ Configuration

### Core Settings

| Option                     | Description                                           | Default            |
| -------------------------- | ----------------------------------------------------- | ------------------ |
| `pollIntervalMs`           | How often to check for live streams (in milliseconds) | `60000` (1 minute) |
| `maxSubscriptionsPerGuild` | Maximum streamers per server                          | `50`               |
| `commandPermission`        | Who can use the commands (see below)                  | `"admin"`          |

### Command Permission Options

| Value        | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `"admin"`    | Only users with OpenDiscord admin/support permissions           |
| `"everyone"` | Anyone can use the commands                                     |
| `"none"`     | Commands are disabled                                           |
| `"<roleId>"` | Only users with a specific role (e.g., `"1234567890123456789"`) |

---

## 🎮 Commands

All commands are under `/twitch`:

| Command                  | Description                  |
| ------------------------ | ---------------------------- |
| `/twitch add-channel`    | Add a streamer to monitor    |
| `/twitch remove-channel` | Remove a streamer            |
| `/twitch list-channels`  | List all monitored streamers |
| `/twitch enable-logs`    | Enable the logs channel      |
| `/twitch disable-logs`   | Disable the logs channel     |

### Adding a Streamer

```
/twitch add-channel streamer:ninja channel:#streams role:@StreamAlerts message:Check out this stream!
```

- **streamer** (required): Twitch username
- **channel**: Discord channel for notifications (defaults to current channel)
- **role**: Role to mention when going live
- **message**: Custom message shown in the embed

---

## 🎨 Customizing Embeds

All embeds are fully customizable in `config.json`. Available placeholders:

### Live & Offline Embeds

| Placeholder        | Description             |
| ------------------ | ----------------------- |
| `{streamer-name}`  | Twitch username         |
| `{stream-title}`   | Current stream title    |
| `{custom-message}` | Custom message (if set) |

### List Embed

| Placeholder         | Description               |
| ------------------- | ------------------------- |
| `{streamers-count}` | Total number of streamers |
| `{discord-channel}` | Discord channel name      |
| `{streamer-url}`    | Link to Twitch channel    |
| `{current-page}`    | Current page number       |
| `{total-pages}`     | Total pages               |

### Fallback Syntax

Use `{placeholder|fallback}` to show a default value when empty:

```json
"entry": "{custom-message|No custom message set}"
```

---

## 📋 Log Messages

When logs are enabled (`/twitch enable-logs`), the bot will notify about:

- **Channel Deleted** - When a Twitch channel no longer exists
- **Name Changed** - When a streamer changes their username

---

## ⚠️ Rate Limits

- Twitch API has rate limits. Don't set `pollIntervalMs` below `30000` (30 seconds)
- Recommended: `60000` (1 minute) or higher for stability

---

## 🔧 Troubleshooting

### "Twitch credentials are missing"

- Make sure you've added your Client ID and Secret to `config.json`
- If using environment variables, ensure `useEnv` is `true`

### Notifications not working

- Check that the bot has permission to send messages in the target channel
- Verify the streamer username is correct (case-insensitive)
- Check the bot console for any API errors

### "You don't have permission"

- Check the `commandPermission` setting in `config.json`
- Make sure you have the required role or permissions

---

## 📁 File Structure

```
plugins/od-twitch-notifier/
├── config.json              # Plugin configuration
├── plugin.json              # Plugin metadata
├── README.md                # Documentation
├── index.ts                 # Main plugin entry
├── database/
│   └── twitch-notifier.json # Persistent storage (auto-generated)
└── src/
    ├── checker.ts           # Config validation
    ├── embeds.ts            # Embed builders
    ├── storage.ts           # Database operations
    ├── twitch-api.ts        # Twitch API wrapper
    ├── TwitchODManager.ts   # Polling manager
    └── commands/            # Command handlers
        ├── index.ts
        ├── addChannel.ts
        ├── removeChannel.ts
        ├── listChannels.ts
        ├── enableRegisters.ts
        └── disableRegisters.ts
```

---

## ❓ Support

Need help? Open a post on **#od-support** in the [DJdj Development Discord Server](https://discord.gg/openticket).

---

## 📜 License

This plugin is part of the OpenDiscord ecosystem.
