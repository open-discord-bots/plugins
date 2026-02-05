# Templates System

Predefined template system for sending quick messages with custom embeds.

## Features

- ✅ `/templates` command with instant choices
- ✅ Configurable templates with custom embeds
- ✅ Support for text messages and embeds
- ✅ Mention support (@here, @everyone, roles)
- ✅ Sends in the channel where the command is executed
- ✅ Integrated permissions system
- ✅ Action logging

## Usage

1. Run the `/templates` command
2. Select the desired template from the options
3. The template will be sent in the current channel

## Configuration

Templates are configured in `plugins/templates-system/templates.json`:

```json
[
    {
        "id":"request-accepted",
        "name":"REQUEST ACCEPTED",
        "description":"Template for accepted request",
        
        "message":{
            "enabled":true,
            "text":"",
            "embed":{
                "enabled":true,
                "title":"Request Status",
                "description":"Your request has been accepted! It will be processed as soon as possible.",
                "customColor":"#00ff00",
                "image":"",
                "thumbnail":"",
                "fields":[],
                "timestamp":true
            },
            "ping":{
                "@here":false,
                "@everyone":false,
                "custom":[]
            }
        }
    }
]
```

### Template Properties

- **id**: Unique template identifier
- **name**: Name that appears in the selector
- **description**: Brief description of the template
- **message.enabled**: Whether the message is enabled
- **message.text**: Message text (optional)
- **message.embed**: Embed configuration
  - **enabled**: Whether the embed is enabled
  - **title**: Embed title
  - **description**: Embed description
  - **customColor**: Hex color (#00ff00)
  - **image**: Large image URL
  - **thumbnail**: Small image URL
  - **fields**: Array of custom fields
  - **timestamp**: Whether to show timestamp
- **message.ping**: Mentions to include
  - **@here**: Mention @here
  - **@everyone**: Mention @everyone
  - **custom**: Array of custom mentions (e.g., ["<@&1234567890>"])

## Usage Examples

### Request Accepted (Green)
```json
{
    "id":"request-accepted",
    "name":"REQUEST ACCEPTED",
    "description":"Template for accepted request",
    "message":{
        "enabled":true,
        "text":"",
        "embed":{
            "enabled":true,
            "title":"Request Status",
            "description":"Your request has been accepted! It will be processed as soon as possible.",
            "customColor":"#00ff00",
            "image":"",
            "thumbnail":"",
            "fields":[],
            "timestamp":true
        },
        "ping":{"@here":false,"@everyone":false,"custom":[]}
    }
}
```

### Request Denied (Red)
```json
{
    "id":"request-denied",
    "name":"REQUEST DENIED",
    "description":"Template for denied request",
    "message":{
        "enabled":true,
        "text":"",
        "embed":{
            "enabled":true,
            "title":"Request Status",
            "description":"Your request has been denied. Please review the reasons and consult with staff if you have any questions.",
            "customColor":"#ff0000",
            "image":"",
            "thumbnail":"",
            "fields":[],
            "timestamp":true
        },
        "ping":{"@here":false,"@everyone":false,"custom":[]}
    }
}
```

### With Mentions
```json
{
    "id":"important-announcement",
    "name":"IMPORTANT ANNOUNCEMENT",
    "description":"Important announcement with mentions",
    "message":{
        "enabled":true,
        "text":"Attention! New important announcement:",
        "embed":{
            "enabled":true,
            "title":"📢 Announcement",
            "description":"Announcement content here",
            "customColor":"#ffaa00",
            "image":"",
            "thumbnail":"",
            "fields":[],
            "timestamp":true
        },
        "ping":{
            "@here":true,
            "@everyone":false,
            "custom":["<@&1234567890>"]
        }
    }
}
```

## Permissions

Permissions are managed through the Open Ticket permissions system in `config/general.json`.

## Author

DanoGlez