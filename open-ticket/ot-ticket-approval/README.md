# OT Ticket Approval

Staff approval workflow for [Open Ticket](https://github.com/open-discord-bots/open-ticket) v4.2.x.

**Sponsor: [SpaceCore on Discord](https://discord.gg/y2YzBfayyV)** — support, plugin updates and new releases.

No ticket can be opened without a staff decision: when a member presses a ticket button, picks a panel
option or uses `/ticket`, the request is sent to a **separate staff approval channel** instead of creating
the channel. Staff can then **Approve** or **Reject** it.

## Features

- Every ticket creation method is intercepted (panel buttons, panel dropdowns, question modals, `/ticket`
  slash & text commands) by one worker on the `opendiscord:create-ticket` action.
- The approval message shows **who** submitted the request, the **selected ticket category**, the
  **Discord category** the ticket would use, the **reason/answers** of the member and how the request
  was submitted.
- **Approve** → the bot creates the ticket with the stored answers and gives the member access, exactly
  like Open Ticket normally would. The member gets a DM with a link to the new ticket.
- **Reject** → staff must fill in a reason in a modal, the ticket is never created and the member receives
  that reason in a DM.
- The approval message is edited after a decision and shows **who approved/rejected** the request, when,
  and the rejection reason. Buttons become disabled so a request can't be handled twice.
- Only members with the Open Ticket `support` permission level (or the extra roles from the config) can
  approve or reject.
- Duplicate requests from the same member for the same category are refused while one is still pending.
- Requests expire after `requestExpiryHours` (default 72h) so an old message can't be approved months later.
- Requests are stored in the Open Ticket message-state database, so they survive a bot restart.

## Installation

1. Copy the `ot-ticket-approval` folder into `./plugins/` of your Open Ticket installation.
2. Edit `plugins/ot-ticket-approval/config.jsonc`:

   | Setting | Default | Description |
   |---|---|---|
   | `enabled` | `true` | Turn the whole approval workflow on or off. |
   | `approvalChannelId` | `""` | Channel where requests must be approved. **Required.** |
   | `notifyRoleId` | `""` | Optional role that gets pinged on a new request. |
   | `extraApproverRoleIds` | `[]` | Additional roles allowed to approve/reject. |
   | `staffBypassApproval` | `true` | Staff (admin/support) can still open tickets directly. Set `false` to require approval for everyone. |
   | `allowTicketsWhenChannelInvalid` | `true` | Open tickets directly if the approval channel can't be found, instead of blocking the system. |
   | `requireReasonOnReject` | `true` | The rejection modal requires a reason. |
   | `dmRequesterOnApprove` | `true` | DM the member when the ticket is opened. |
   | `dmRequesterOnReject` | `true` | DM the member (with reason) when the request is rejected. |
   | `requestExpiryHours` | `72` | After this time a request can no longer be handled. `0` disables expiry. |
   | `maxAnswersShown` | `8` | How many answers are shown in the approval embed. |

3. Make sure the bot can **View Channels / Create Channels / Send Messages / Manage Channels** in the
   approval channel and in the ticket categories.
4. Start the bot (`npm start`). Open Ticket compiles the plugin TypeScript automatically.

> The bot must be able to DM members for the rejection notice. If a member has closed direct messages,
> the plugin reports that in the approval channel instead.

## How it works

- A worker with priority `100` is injected into the `opendiscord:create-ticket` action. It stores the
  full creation data (`guild`, `user`, `option`, `answers`) in a message state of the approval message and
  cancels the creation.
- On approval the same action runs again with the stored answers. A short-lived marker tells the worker
  that this creation was approved by staff, so it is not queued a second time.
- Members normally receive an internal Open Ticket error when the creation is cancelled. A worker on the
  `opendiscord:error` message builder replaces that reply with a friendly "your request was submitted"
  message, so the member never sees a technical error.

## Notes

- Built for Open Ticket **v4.2.2** (`OTv4.2.x`) and tested against the TypeScript compiler of that release.
- Language files are not used: the approval messages are in English and can be edited in `index.ts`.
- Compatible with panel verify-bars, questions (short/paragraph/dropdown/radio/checkbox/file upload) and
  ticket limits, because the request is queued *after* those checks and the real creation still runs all of
  the Open Ticket workers.
