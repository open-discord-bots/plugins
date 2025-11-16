# OT Follow-Ups

## Purpose
Automatically sends extra follow-up messages right after a ticket's main message. Ideal for rules, next steps, billing info, terms of service, staff utilities, etc.

## How it works
1. User opens a ticket.
2. The main ticket message is sent (with the buttons).
3. This plugin checks `config.json` for a matching `option` entry.
4. For every message id listed there (max 5) it loads the embed data from `messages.json` and sends them in order.

## Config files
- `config.json` Links a ticket option id to up to 5 follow-up message ids.
- `messages.json` Defines each follow-up (plain text + pings + optional embed).

## Configuration steps
1. In `config.json` replace the example `option` values (e.g. `example-option-id-1`, `example-option-id-2`) with your real ticket option ids you want to have follow-ups (they must already exist in your Open Ticket setup).
2. In `messages.json` duplicate an object to add a new follow-up; give it a unique `id` (3–40 chars, alphanumeric without spaces) and customize fields.
3. In `config.json` add the new id inside the `messages` array of the option where you want this message to be sent (max 5 per option).
4. Restart the bot.