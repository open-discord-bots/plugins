# OT Sticky Messages Plugin

A powerful, robust, and highly configurable sticky message plugin built specifically for Open Ticket v4.2.1. It allows you to create dynamic, persistent messages in any channel with a full suite of features including schedules, expirations, reaction tracking, and an interactive local web dashboard.

## 🌟 Key Features

* **Three Content Types:** Send stickies as simple text, rich embeds, or attachments (via URL or uploaded file).
* **Live Web Dashboard:** Manage all of your stickies from an interactive, real-time web UI without ever needing to restart the bot.
* **Smart Resend Modes:**
  * **Message Cooldown:** Resend the sticky after a specific number of user messages.
  * **Timed Resend:** Resend the sticky every `X` minutes automatically.
* **Schedules & Cron:** Set sticky messages to send at specific times (e.g., "Every Day at 9 AM", "Every Monday", or full cron expressions like `0 9 * * *`).
* **Expirations:** Automatically disable or completely delete a sticky message after a specific duration (e.g., `30m`, `24h`, `7d`).
* **Reaction Triggers:** Add a reaction to your sticky. When a set threshold of users click it, the sticky can either automatically `repost` itself or `update`.
* **Ignored Roles:** Stop specific roles (like bots or staff) from triggering the message cooldown resends.
* **Full Embed Customization:** Configure embed titles, descriptions, colors, authors, footers, thumbnails, and main images.
* **Open Ticket Variables:** Fully supports Open Ticket variable parsing. Available variables:
  * `{server_name}`: The name of the server.
  * `{member_count}` or `{user_count}`: The number of members in the server.
  * `{date}`: The current date.
  * `{time}`: The current time.
  * `{guild_id}`: The server's ID.
  * `{channel_id}`: The current channel's ID.

---

## 💻 Web Dashboard

The plugin includes a live web dashboard that allows you to manage stickies visually.

1. **Access the Dashboard:** By default, the dashboard runs locally.
2. **Login:** Use the password configured in `plugins/ot-sticky-messages/config.json`.
3. **Features:** From the dashboard, you can create new stickies, change types dynamically (fields toggle automatically based on Text/Embed/Attachment), force a resend, disable stickies temporarily, and track analytics (like total sends).

---

## 🛠️ Slash Commands

You can also manage stickies directly through Discord using the powerful `/sticky` command. 
*(Note: Requires the `globalAdmin` permission configured in Open Ticket).*

### Creating & Editing Stickies
* `/sticky set-text [channel] [content]` - Create or replace a sticky with normal text.
* `/sticky set-embed [channel] [description] (optional: title, content, color, footer, image_url, thumbnail_url)` - Create an embed sticky.
* `/sticky set-attachment [channel] [attachment] (optional: content, spoiler)` - Create an attachment sticky.

### Behavior Modes
* `/sticky mode [channel] [mode: message/timed] (optional: minutes)` - Switch the sticky between triggering on user messages vs time intervals.
* `/sticky cooldown [channel] [messages]` - Change how many user messages must be sent before the sticky drops to the bottom.

### Scheduling & Expiration
* `/sticky schedule create [channel] [expression] (optional: timezone, catch_up)` - Schedule the sticky (e.g., "Every 3 Hours").
* `/sticky schedule edit/remove/view` - Manage the schedule.
* `/sticky expire [channel] [duration] (optional: delete_message)` - Set the sticky to expire in `30m`, `24h`, etc.
* `/sticky expiration view/remove` - Manage the expiration.

### Interaction & Reactions
* `/sticky reaction set [channel] [emoji] [threshold] [action: repost/update]` - Trigger actions when enough users react to the sticky.
* `/sticky reaction remove [channel]` - Remove the reaction trigger.

### Management & Overrides
* `/sticky ignore-role [channel] [action: add/remove] [role]` - Prevent a role from triggering message cooldowns.
* `/sticky enable [channel]` - Resume an inactive sticky.
* `/sticky disable [channel]` - Temporarily pause a sticky.
* `/sticky resend [channel]` - Force delete the current sticky and instantly drop a new one.
* `/sticky show [channel]` - View the raw configuration for a sticky in a specific channel.
* `/sticky remove [channel]` - Permanently delete a sticky configuration.
* `/sticky list` - Show all active and disabled stickies across the server.

---

## ⚙️ Configuration

The base configuration is located at `plugins/ot-sticky-messages/config.json`. 

```json
{
    "dashboard": {
        "enabled": true,
        "port": 3087,
        "password": "changeme"
    }
}
```
* **enabled:** Set to `false` to disable the web dashboard.
* **port:** The local port the dashboard web server listens on.
* **password:** The password required to log into the web UI.

---

## 📝 Notes
* **File Attachments:** If you upload a file directly through the Discord slash command (`/sticky set-attachment`), the plugin downloads and stores it locally so it won't break if the original Discord link expires. If you set an attachment link via the Dashboard, it uses the direct URL.
* **Plugin State:** All sticky states, variables, and schedules are saved persistently in `database/sticky_messages.json`. You do not need to worry about losing sticky data during bot restarts.
