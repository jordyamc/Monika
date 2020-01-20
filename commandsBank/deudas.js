const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
const { logs } = require("../logs.js");

module.exports = {
    name:'deuda',
    alias:['deudas'],
    description:'',
  
    run: async (message, args, rolIT, client) => {
      
    //   if (message.channel.id != "560960948014415873" && message.channel.id != "558481206274949130" && message.channel.id != "562854876061892627") {
    //         return message.channel.send("Debes hacer esta operación en <#560960948014415873>")
    //     }
      
        await bank.eliminar(`${message.guild.id}.impuestos`)

        let moneda = await bank.obtener(`${message.guild.id}.moneda`);
        let deudaEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");

        if (await bank.obtener(`${message.guild.id}.${message.author.id}.money`) >= 0) {
            deudaEmbed.setDescription('Estás libre de deudas');
            if (message.member.roles.has("650818172101853234")) {
                message.member.removeRole("650818172101853234").then(() => {
                    message.channel.send(deudaEmbed)
                    var logs = new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor('#d7d64e')
                        .setDescription("A pagado la deuda")
                    return client.guilds.get("545720855578279958").channels.get("560685364319092758").send(logs)
                });
            } else {
                return message.channel.send(deudaEmbed)
            }
        } else {
            deudaEmbed.setDescription('Aún no has pagado toda tu deuda, para pagarla solo quedate con valores positivos en banco')
            return message.channel.send(deudaEmbed)
        }
    }
}