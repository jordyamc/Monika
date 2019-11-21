const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
var bank = new db.crearDB('bank')


module.exports = {
    logs: async (client, message, bal, title, desc, args) => {

        var moneda = await bank.obtener(`${message.guild.id}.moneda`)

        var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        var logs = new Discord.richEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField("**User**", message.author)
            .setTimestamp()
            .setFooter("IT Crowd | #" + message.channel.name)
        
        
        if(title.includes("lose")) {
            logs.setColor('#ef333f')
            logs.addField(desc, `-${conv(bal)} ${moneda}`)
        } else if (title.includes("win")) {
            logs.setColor('#3fef33')
            logs.addField(desc, `+${conv(bal)} ${moneda}`)
        } else if (title.includes("buy")) {
            logs.setColor('#b33fef')
            logs.addField(`Compra ${desc}`, `-${conv(bal)} ${moneda}`)
        } else if (title.includes("give")) {
            logs.setColor('#d7d64e')
            let user = message.mentions.users.first() || desc
            
            logs.setDescription("A donado a " + user)
            
            logs.addField("_ _", `+${conv(bal)} ${moneda}`)
        }

        client.guilds.get("545720855578279958").channels.get("560685364319092758").send(logs)
        
    }
}

const { logs } = require("../logs.js");


logs(client, message, dinero, "win", "Work")


