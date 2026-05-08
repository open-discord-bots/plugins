# OT Close Request

**OT Close Request** is a plugin for [Open Ticket](https://github.com/open-discord-bots/open-ticket) that allows staff to request confirmation from a ticket owner before closing their ticket.

## ✨ Features

- **Double Confirmation:** Prevents accidental or unwanted closures by asking the ticket owner first.
- **Slash & Text Commands:** Use `/close-request` or your bot's prefix command (e.g., `!close-request`).
- **Owner Verification:** Only the person who opened the ticket can respond to the confirmation prompt.
- **Role Permissions:** Limit command usage to specific staff roles.
- **Configurable Embeds:** Fully customize the titles, descriptions, colors, and thumbnails for the request, agreed, and declined messages.
- **Audit Logging:** Automatically logs when a request is accepted or declined to your specified log channel.
- **Automatic Integration:** Once confirmed, it uses Open Ticket's internal closing system to ensure all standard procedures (transcripts, etc.) are followed.

## 🚀 How It Works

1. Staff member runs `/close-request` in a ticket channel.
2. The bot pings the ticket owner with an embed containing **Agree** and **Disagree** buttons.
3. If the owner clicks **Agree**: The ticket is automatically closed.
4. If the owner clicks **Disagree**: The staff member is notified, and the ticket remains open.

## ⚙️ Configuration

You can find the configuration in `config.json` within the plugin folder:

- `admin_roles`: List of role IDs allowed to use the command.
- `ticket_options`: List of Open Ticket option IDs where this plugin should be active.
- `log_channel_id`: Where to send logs if Open Ticket's default logging is unavailable.
- `embeds`: Customize the visual style of the interaction.

## 🛠️ Requirements

- **Open Ticket**

  
## Made By: **aboreda12**, Discord: **yow.sef**



