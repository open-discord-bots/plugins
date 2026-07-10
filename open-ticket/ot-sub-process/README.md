# OT Sub Process
Modify Open Ticket to work inside an external discord.js bot as a sub-process or dependency.

> ### Warning!
> Usage of this plugin may result in unexpected behaviour of Open Ticket.  
> Make sure the main bot doesn't conflict with Open Ticket buttons, commands, dropdowns, etc.

### Installation
1. Download Open Ticket from the repository and install it in a directory called `./open-ticket/` in your main bot.
2. Configure Open Ticket like normal but leave the token field empty.
3. Install the `ot-sub-process` plugin in the `./open-ticket/plugins/` folder.
4. Extract the `EXAMPLE_USAGE_SCRIPT.js` from the plugin and place the code in your main bot (somewhere at startup)
5. Make sure this code snippet has access to your real bot token (instructions inside script)

If you're experiencing any issues, let us know in our [Discord server](https://discord.dj-dj.be) or contact DJj123dj!