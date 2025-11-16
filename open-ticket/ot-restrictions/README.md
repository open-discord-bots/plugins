# OT Restrictions
This plugin allows you to create a white- & blacklist for each ticket option to restrict ticket creation to certain roles.

### Whitelist
When the whitelist is activated with `"enableWhitelist"`, only users with a role from the `"whitelistedRoles"` are **able** to create this ticket option.

### Blacklist
When the blacklist is activated with `"enableBlacklist"`, all users with a role from the `"blacklistedRoles"` are **not allowed** to create this ticket option.

### Priority (In case of conflict)
- By setting `"priority"` to `whitelist`, the bot will follow the whitelist eventough the user might have a blacklisted role.
- By setting `"priority"` to `blacklist`, the bot will follow the blacklist eventough the user might have a whitelisted role.