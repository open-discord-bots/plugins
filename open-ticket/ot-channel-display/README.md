# OT Channel Display
A plugin to show different variables in a voice channel in your server.

> You can find available config variables in the `VARIABLES.txt` file!

### Example Config
```json
{
    "_INFO":"The channel names will update once every 15 minutes because of discord ratelimits. Don't worry if it's not accurate!",
    "channels":[
        {
            "id":"12345678910",
            "name":"Server Size: {user-count}"
        },
        {
            "id":"12345678910",
            "name":"Ticket Count: {tickets-created-count}"
        }
    ],
    "_VAR_INFO":"Check all available variables in the 'VARIABLES.txt' file!",
    "variables":[
        {
            "name":"{user-count}",
            "variable":"guild.members.all"
        },
        {
            "name":"{tickets-created-count}",
            "variable":"stats.tickets.created"
        }
    ]
}
```