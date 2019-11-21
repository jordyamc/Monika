const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    logs: async (message) => {

        console.log("User ID: " + message.author.id);
    }
}