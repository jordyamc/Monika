const Discord = require('discord.js')
const db = require('megadb')
var bank = new db.crearDB('bank')

module.exports = {
    logs: async (client, message, bal, title, desc, args) => {
      var moneda = await bank.obtener(`${message.guild.id}.moneda`)

        var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        var logs = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField("**User**", message.author)
            .setTimestamp()
            .setFooter("IT Crowd | #" + message.channel.name)
        
        var balance = await bank.obtener(`${message.guild.id}.${message.author.id}.money`)
        var conv = (balance) => String(balance).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if(title.includes("lose")) {
            logs.setColor('#ef333f')
            logs.addField(desc, `-${conv(bal)} ${moneda}`)
          logs.addField("Balance", `${conv(balance)} ${moneda}`)
        } else if (title.includes("win")) {
            logs.setColor('#3fef33')
            logs.addField(desc, `+${conv(bal)} ${moneda}`)
          logs.addField("Balance", `${conv(balance)} ${moneda}`)
        } else if (title.includes("buy")) {
            logs.setColor('#b33fef')
            logs.addField(`Compra ${desc}`, `-${conv(bal)} ${moneda}`)
          logs.addField("Balance", `${conv(balance)} ${moneda}`)
        } else if (title.includes("give")) {
            logs.setColor('#d7d64e')
            let user = message.mentions.users.first() || message.author
            var balance2 = await bank.obtener(`${message.guild.id}.${user.id}.money`)
            var conv = (balance2) => String(balance2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            
            logs.setDescription("A donado a " + user)
            logs.addField("_ _", `+${conv(bal)} ${moneda}`)
          logs.addField("Balance"+ message.author.tag, `${conv(balance)} ${moneda}`)
          logs.addField("Balance"+ message.mentions.users.first().tag || "0", `${conv(balance2)} ${moneda}`)
        }

        client.guilds.get("545720855578279958").channels.get("560685364319092758").send(logs)
        
    }
}