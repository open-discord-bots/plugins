# 🤖 Server AI Chatbot — Open Ticket Plugin

An AI-powered plugin for [Open Ticket](https://github.com/open-discord-bots/open-ticket) that adds a smart chatbot channel, automatic ticket summaries, and AI-assisted automod to your Discord server — all running on **free** models via OpenRouter.

**Author:** [yow.sef]-discord [aboreda12]-github
**Compatible with:** OTv4.0.x · OTv4.1.x · OTv4.2.x
**Dependency:** npm install axios
---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **AI Chatbot** | A dedicated Discord channel where members can ask questions and get AI-powered answers, informed by your custom knowledge files |
| 🎫 **Ticket Summaries** | When a ticket is opened, the AI instantly reads the answers and posts a friendly summary embed directly in the ticket channel |
| 🛡️ **AI Automod** | Detects slurs and harassment in any language — no word list required. A blocklist acts as a fast first pass, and the AI confirms before any action is taken |
| 🎞️ **GIF Reactions** | Optional Giphy integration — the AI can attach a relevant GIF to casual chatbot replies for a more lively feel |
| 🔁 **Model Fallback** | If the primary model fails or is rate-limited, the plugin automatically retries with your configured fallback models |

---

## 📋 Requirements

- [Open Ticket](https://github.com/open-discord-bots/open-ticket) v4.0.x – v4.2.x
- Node.js 18+
- An [OpenRouter](https://openrouter.ai) API key (free tier works) ##Any provider is supported
- *(Optional)* A [Giphy](https://developers.giphy.com) API key for GIF reactions

---

## 🚀 Installation

1. Download the plugin and place the `server-ai-chatbot` folder inside your Open Ticket `plugins/` directory. The structure should look like this:

```
plugins/
└── server-ai-chatbot/
    ├── index.ts
    ├── plugin.json
    ├── config.json
    └── knowledge/
        ├── server-info.md
        └── faqs.md
```

2. Open `config.json` and fill in at minimum:
   - Your OpenRouter API key
   - Your chatbot channel ID
   - Your log channel ID(s) for automod

3. Edit both files in the `knowledge/` folder with your server's real information.

4. Start Open Ticket as normal. The plugin loads automatically.

---

## ⚙️ Configuration Reference (`config.json`)

### `openrouter`

Controls the AI model used for all features.

```jsonc
"openrouter": {
    "apiKey":         "sk-or-v1-...",   // Your OpenRouter API key
    "model":          "meta-llama/llama-3.3-70b-instruct:free",  // Primary model
    "fallbackModels": [ "..." ],         // Tried in order if the primary fails
    "baseUrl":        "https://openrouter.ai/api/v1"
}
```

> **🔄 Using a different AI provider?**
> You can point the plugin at any OpenAI-compatible API by changing `baseUrl`.
> For example:
> - **OpenAI directly:** `https://api.openai.com/v1`
> - **Groq:** `https://api.groq.com/openai/v1`
> - **Together AI:** `https://api.together.xyz/v1`
> - **Ollama (local):** `http://localhost:11434/v1`
>
> Just change `baseUrl` to your provider's endpoint and update `apiKey` and `model` accordingly. No code changes needed.

---

### `chatbot`

Controls the AI chatbot channel.

| Field | Description |
|---|---|
| `channelId` | The Discord channel ID where the bot listens and replies |
| `systemPrompt` | The AI's personality and instructions — tell it who it is and how to behave |
| `maxContextMessages` | How many previous messages per user to remember for follow-up questions (1–10) |
| `typingIndicator` | Show the typing animation while the AI is generating a reply |
| `respondToMentionsOnly` | If `true`, only reply when the bot is @mentioned inside the chatbot channel |
| `vipUserIds` | Discord user IDs that can @mention the bot in **any** channel, not just the chatbot channel |

---

### `giphy` *(optional)*

Adds GIF reactions to casual chatbot replies. The AI decides when a GIF fits the conversation and appends a `[GIF:search term]` tag — the plugin fetches a random matching GIF from Giphy and sends it.

| Field | Description |
|---|---|
| `enabled` | Set to `true` to enable |
| `apiKey` | Your Giphy API key (free at [developers.giphy.com](https://developers.giphy.com)) |
| `gifChance` | Probability (0.0–1.0) that a GIF is actually sent when the AI suggests one (e.g. `0.85` = 85%) |

> GIF tags are **never** included in ticket summary embeds, only in chatbot replies.

---

### `knowledge`

Paths to your two knowledge files. The AI reads both files as background context for every chatbot conversation and ticket summary.

```jsonc
"knowledge": {
    "serverInfoPath": "./plugins/server-ai-chatbot/knowledge/server-info.md",
    "faqPath":        "./plugins/server-ai-chatbot/knowledge/faqs.md"
}
```

See the [Knowledge Files](#-knowledge-files) section below for guidance on editing them.

---

### `ticketAI`

Controls automatic ticket summaries.

| Field | Description |
|---|---|
| `enabled` | Master switch for ticket summaries |
| `summaryDelayMs` | Milliseconds to wait after ticket creation before the AI reads it (300–500ms lets other bots post their embeds first) |
| `options` | Array of ticket type configurations — one per Open Ticket option |

Each entry in `options`:

| Field | Description |
|---|---|
| `id` | Must **exactly** match the option ID in your Open Ticket `config.yml` |
| `systemPrompt` | Instructions for how the AI should respond to this ticket type |
| `embedTitle` | Title shown on the AI summary embed |
| `embedColor` | Hex color of the summary embed (e.g. `"#e74c3c"`) |
| `questionIndexes` | Which ticket answers to read: `"all"` or an array of indexes like `[0, 1, 2]` |
| `readBotEmbeds` | If `true`, the AI also reads embeds posted by other bots in the ticket (e.g. LiteBans punishment history) |
| `maxTokens` | Maximum length of the summary response |

> **How to find your option IDs:**
> Open your Open Ticket `config.yml` and look for the `options:` section. Each option has an `id:` field — copy it exactly into the `id` field here.

---

### `automod`

AI-powered moderation that runs on every message.

**How it works (two-stage pipeline):**
1. **Pre-filter** — A fast local check using a built-in English slur regex + your custom `blocklist`. Near-zero latency, no API call.
2. **AI confirmation** — Only fires when the pre-filter matches. The AI makes the final call (`YES`/`NO`) before any action is taken. This prevents false positives.

| Field | Description |
|---|---|
| `enabled` | Master switch |
| `monitoredChannels` | Channel IDs to monitor. Empty array `[]` = monitor all channels |
| `exemptRoles` | Role IDs that are never moderated (e.g. staff, admins) |
| `exemptUsers` | User IDs that are never moderated |
| `logChannelId` | Channel for private staff logs (includes the full flagged message) |
| `publicEmbedChannelId` | Channel for the public moderation action announcement. Can be the same as `logChannelId` |
| `deleteMessage` | Whether to delete the flagged message |
| `timeoutDurationSec` | Base timeout in seconds (scales up with repeat offenses: 1× → 2× → 4×) |
| `offenseResetSec` | Seconds of silence before a user's offense count resets |
| `blocklist` | Custom words/phrases to flag. Supports any language including Unicode. Normalized before matching so leet-speak and spaced variants are caught |

> **Required permission:** The bot needs the `Moderate Members` permission to issue timeouts. Without it, the message is still deleted but no timeout is applied.

---

### `conversation`

Global AI generation settings.

| Field | Description |
|---|---|
| `maxTokens` | Maximum response length for chatbot replies (100–1000) |
| `temperature` | Creativity/randomness (0.0–1.0). `0.65` is a balanced default |

---

## 📚 Knowledge Files

The `knowledge/` folder contains two Markdown files that act as the AI's memory about your server. Keep them accurate and up-to-date — the AI relies entirely on these files to answer member questions.

### `server-info.md`
General server information: what your server is, how to join, your links, rules, and any punishment guidelines.

### `faqs.md`
Common questions and their answers. The more detailed and accurate this file is, the better the AI will handle member questions without needing staff intervention.

> **Tips:**
> - Write clearly and concisely — the AI reads these files verbatim.
> - Update the files whenever your server's rules, IPs, or links change.
> - If the AI is giving wrong answers, the first place to check is these files.

---

## 🧩 How It All Connects

```
Member sends message
        │
        ├─► [Automod] Pre-filter → AI confirm → timeout/delete
        │
        └─► [Chatbot] Reads knowledge files → AI reply (+ optional GIF)

Member opens ticket
        │
        └─► [Ticket AI] Reads answers + bot embeds → summary embed in ticket
```

---

## 🔑 Getting an OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai) and sign up
2. Navigate to **Keys** → **Create Key**
3. Copy the key into `config.json` under `openrouter.apiKey`

Free-tier models are available without adding credits. Browse them at [openrouter.ai/models?q=:free](https://openrouter.ai/models?q=:free).

---

## 📝 License

This plugin is provided as-is for personal and community use. You are free to modify it for your own server.Contribution is welcomed !
