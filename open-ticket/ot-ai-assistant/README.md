# OT AI Assistant

OT AI Assistant adds an AI chatbot channel, automatic ticket summaries, and two-stage AI moderation to [Open Ticket](https://github.com/open-discord-bots/open-ticket) using OpenRouter or any OpenAI-compatible API.

**Compatible with:** OTv4.0.x, OTv4.1.x, OTv4.2.x

---

## Features

| Feature | Description |
|---|---|
| **AI Chatbot** | Replies to member questions in a configured channel using your server knowledge files |
| **Ticket Summaries** | Reads ticket form answers when a ticket opens and posts a summary embed in the ticket channel |
| **AI Automod** | Filters slurs and harassment in two stages: a fast local pre-filter followed by AI confirmation |
| **GIF Replies** | Optional Giphy integration that attaches matching GIFs to casual chatbot replies |
| **Model Fallback** | Retries with configured fallback models if the primary model fails or hits a rate limit |

---

## Requirements

- [Open Ticket](https://github.com/open-discord-bots/open-ticket) v4.0.x – v4.2.x
- Node.js 18+
- An [OpenRouter](https://openrouter.ai) API key (free models work) or any OpenAI-compatible API key
- *(Optional)* A [Giphy](https://developers.giphy.com) API key for GIF replies

---

## Installation

1. Copy the `ot-ai-assistant` folder into your Open Ticket `plugins/` directory:

```text
plugins/
└── ot-ai-assistant/
    ├── index.ts
    ├── plugin.json
    ├── config.json
    └── knowledge/
        ├── server-info.md
        └── faqs.md
```

2. Open `config.json` and set:
   - `openrouter.apiKey` and `openrouter.model`
   - `chatbot.channelId`
   - `automod.logChannelId` (if using automod)
   - `ticketAI.options` IDs matching the option IDs in your Open Ticket `config/options.json`

3. Edit `knowledge/server-info.md` and `knowledge/faqs.md` with your server details.

4. Start Open Ticket.

---

## Configuration (`config.json`)

### `openrouter`

```json
"openrouter": {
    "apiKey": "sk-or-v1-...",
    "model": "meta-llama/llama-3.3-70b-instruct:free",
    "fallbackModels": [],
    "baseUrl": "https://openrouter.ai/api/v1"
}
```

To use another OpenAI-compatible provider, change `baseUrl`, `apiKey`, and `model`:
- **OpenAI:** `https://api.openai.com/v1`
- **Groq:** `https://api.groq.com/openai/v1`
- **Together AI:** `https://api.together.xyz/v1`
- **Ollama (local):** `http://localhost:11434/v1`

---

### `chatbot`

| Field | Description |
|---|---|
| `channelId` | Discord channel ID where the bot listens and replies |
| `systemPrompt` | Instructions defining the bot's role and tone |
| `maxContextMessages` | Number of previous messages per user to keep in context |
| `typingIndicator` | Show typing indicator while generating a response |
| `respondToMentionsOnly` | If `true`, only reply when @mentioned inside the chatbot channel |
| `vipUserIds` | User IDs allowed to @mention the bot in any channel |

---

### `giphy` *(optional)*

| Field | Description |
|---|---|
| `enabled` | Set to `true` to enable GIF replies |
| `apiKey` | Giphy API key from [developers.giphy.com](https://developers.giphy.com) |
| `gifChance` | Probability (`0.0`–`1.0`) that a suggested GIF is sent |

---

### `knowledge`

```json
"knowledge": {
    "serverInfoPath": "./plugins/ot-ai-assistant/knowledge/server-info.md",
    "faqPath": "./plugins/ot-ai-assistant/knowledge/faqs.md"
}
```

---

### `ticketAI`

| Field | Description |
|---|---|
| `enabled` | Enable or disable ticket summaries |
| `summaryDelayMs` | Milliseconds to wait after ticket creation before reading messages |
| `options` | List of ticket option configurations |

Each entry in `options`:

| Field | Description |
|---|---|
| `id` | Option ID from your Open Ticket `config/options.json` |
| `systemPrompt` | Instructions for summarizing or replying to this ticket type |
| `embedTitle` | Title of the summary embed |
| `embedColor` | Hex color of the summary embed (for example `"#e74c3c"`) |
| `questionIndexes` | `"all"` or an array of 0-based question indexes such as `[0, 1]` |
| `readBotEmbeds` | Read embeds posted by other bots in the ticket channel |
| `maxTokens` | Maximum tokens for the summary response |

---

### `automod`

1. **Pre-filter:** Checks messages locally against built-in slur patterns and your `blocklist` after normalizing leet-speak, Franco-Arabic, and separators.
2. **AI confirmation:** Calls the configured model (`YES`/`NO`) only when the pre-filter matches.

| Field | Description |
|---|---|
| `enabled` | Enable or disable automod |
| `monitoredChannels` | Channel IDs to monitor (`[]` monitors all channels) |
| `exemptRoles` | Role IDs exempt from moderation |
| `exemptUsers` | User IDs exempt from moderation |
| `logChannelId` | Channel ID for staff logs |
| `publicEmbedChannelId` | Channel ID for public moderation notices |
| `deleteMessage` | Delete flagged messages |
| `timeoutDurationSec` | Base timeout duration in seconds (scales 1x, 2x, 4x on repeat offenses) |
| `offenseResetSec` | Seconds without offenses before a user's counter resets |
| `blocklist` | Additional words or phrases to flag |

The bot requires the `Moderate Members` permission to time out users.

---

### `conversation`

| Field | Description |
|---|---|
| `maxTokens` | Maximum tokens for chatbot replies |
| `temperature` | Sampling temperature (`0.0`–`1.0`) |

---

## License

MIT
