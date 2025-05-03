# OT Vanity
A plugin to detect the vanity status of members in the server and give them exclusive privilleges.

> Make sure the bot has the `Presence` privilleged gateway intent enabled in the developer portal!

### Example Configuration
```json
{
    "vanityText":"discord.dj-dj.be",
    "caseSensitive":true,
    "matchWholeText":false,
    
    "_INFO":"These are the roles which will be rewarded immediately or after a certain amount of time. All roles will be removed when the vanity is removed.",
    "rewardRoles":["123456789101112"],
    "timedRewardRoles":[
        {
            "id":"rank-1",
            "name":"Rank 1",
            "delayValue":1,
            "delayUnit":"minutes",
            "roles":["123456789101112"]
        },
        {
            "id":"rank-2",
            "name":"Rank 2",
            "delayValue":2,
            "delayUnit":"minutes",
            "roles":["123456789101112"]
        }
    ],

    "logs":{
        "enabled":true,
        "channel":"123456789101112"
    }
}
```