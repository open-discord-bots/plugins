# OT Close Request

OT Close Request adds a `/close-request` command for staff to ask a ticket creator before closing their ticket.

## Features

- **Staff command**: Run `/close-request` or use your text prefix (such as `!close-request`).
- **Creator confirmation**: The bot asks the user who opened the ticket to agree or disagree.
- **Role checks**: Works with Open Ticket support permissions, server administrators, and custom roles.
- **Option filters**: Enable the command for all tickets or limit it to chosen ticket options.
- **Custom embeds**: Edit embed titles, text, colors, footers, and images in `config.json`.
- **Logs**: Posts actions to the Open Ticket log channel or a custom channel you pick.
- **Core actions**: Triggers the built-in Open Ticket close action when accepted, keeping category moves, transcripts, and permissions intact.

## How it works

1. A staff member runs `/close-request` in a ticket channel.
2. The bot pings the ticket creator with **I Agree** and **I Disagree** buttons.
3. If the creator clicks **I Agree**, Open Ticket closes the ticket.
4. If the creator clicks **I Disagree**, the bot notifies the staff member and leaves the ticket open.

## Configuration

Edit `config.json` in the plugin folder:

```json
{
    "admin_roles": [],
    "ticket_options": [],
    "log_channel_id": "",
    "embeds": {
        "request": {
            "title": "Ticket Close Request",
            "description": "Staff requested to close this ticket.\n\n**Do you want to close this ticket?**",
            "footer": "Only the ticket creator can respond",
            "image": "",
            "thumbnail": "",
            "color": "#5865F2"
        },
        "agreed": {
            "title": "Close Request Accepted",
            "description": "The ticket creator agreed to close this ticket.",
            "footer": "Closing ticket",
            "image": "",
            "thumbnail": "",
            "color": "#57F287"
        },
        "declined": {
            "title": "Close Request Declined",
            "description": "The ticket creator declined the request.",
            "footer": "Ticket remains open",
            "image": "",
            "thumbnail": "",
            "color": "#ED4245"
        }
    }
}
```

- `admin_roles`: Role IDs that can run the command. Leave empty to allow default Open Ticket support staff and administrators.
- `ticket_options`: Option IDs where the command works (for example `["general"]`). Leave empty to allow all tickets.
- `log_channel_id`: Channel ID for logs. Leave empty to use the default Open Ticket log channel.
- `embeds`: Colors, titles, text, and images for each prompt state.

## Requirements

Open Ticket v4.0.0 or higher (v4.0.x, v4.1.x, v4.2.x).
