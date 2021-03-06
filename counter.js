const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const botConfig = require('./config.json');
let dbPrefix = new db.crearDB('prefix');

module.exports = {
    counter: async (message) => {
        async function getPrefix() {
            if (dbPrefix.has(`${message.guild.id}`)) {
                return await dbPrefix.get(`${message.guild.id}`)
            } else {
                return botConfig.prefix
            }
        }

        if (message.content.startsWith(`${await getPrefix()}userStats`)){
            let waitingMessage = await message.channel.send("Fetching info...");
            message.guild.fetchMembers().then(async guild => {
                let total = guild.members.filter(member => !member.user.bot).size;
                await waitingMessage.edit("Fetching prunes...");
                let inactive;
                try {
                    inactive = await guild.pruneMembers(30,true);
                }catch (e) {
                    inactive = "NaN"
                }
                await waitingMessage.delete();
                const stateEmbed = new Discord.RichEmbed()
                    .setColor('#5eff91')
                    .setTitle('Guild members status')
                    .addField('Inactive:', `${inactive} members`, true)
                    .addField('Total:', `${total} members`, true);
                message.channel.send(stateEmbed);
            })
        }
    }
};