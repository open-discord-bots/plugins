/*eslint-disable @typescript-eslint/no-require-imports */
const cp = require("child_process")
const path = require("path")

////////////////////////////////////////////
////////////////// CONFIG //////////////////
////////////////////////////////////////////

//This script should be placed inside your existing discord.js bot.
//Together with the OT Sub Process plugin, you can implement Open Ticket as part of another bot.
//You still need to configure Open Ticket as usual.

const TOKEN = "<INSERT_BOT_TOKEN>" //this can be fetched from the config of your bot and is automatically added to Open Ticket
const DIRECTORY_NAME = "./open-ticket/" //the name of the Open Ticket folder relative to the main bot

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

try {
    console.log("Installing Open Ticket dependencies...")
    cp.execSync("npm install", {
        cwd:path.join(process.cwd(), DIRECTORY_NAME)
    })
    console.log("Succesfully installed Open Ticket dependencies!")
}catch(err){
    throw new Error("Unable to install Open Ticket npm dependencies!", {cause:err})
}

const openTicketProcess = cp.fork("./index.js", {
    cwd:path.join(process.cwd(), DIRECTORY_NAME),
    env:{
        "TOKEN":TOKEN
    }
})