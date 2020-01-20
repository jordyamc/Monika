const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

const { logs } = require("../logs.js");

module.exports = {
    name: 'remove-money',
    alias: ['givebank', 'rmmoney'],
    description: 'Quitar dinero del banco de un usuario {Reguiere Administrador}',

    run: async (message, args, rolIT, client) => {
        if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.has("557401158042255390") && !message.member.roles.has(rolIT.id)) {
            if (message.author.id != '355104003572498435') {
                return message.channel.send("Me estás intentando atracar? A ver si te tendré que warnear!")
            }
        }  

        
        let user = message.mentions.users.first() || client.users.get(args[0])
        let dineroBanco = await bank.obtener(`${message.guild.id}.${user.id}.money`)
        let dineroGive = args[1]
        if (dineroGive <= 0){
          return message.channel.send("Solo cantidades positivas! " + message.author)
        }
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        if (dineroBanco - dineroGive < 0) {
            return message.channel.send("No tiene tanto dinero, mal rollo " + message.author)
        } 

        bank.sumar(`${message.guild.id}.bank.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => " + error))
        bank.restar(`${message.guild.id}.${user.id}.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))

        var conv = (dineroGive) => String(dineroGive).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Bad Luck!")
            .setColor('#1fff31')
            .setDescription(`${message.author} ha quitado a ${user} ${conv(dineroGive)} ${moneda}`)
        logs(client, message, dineroGive, "give")
        return message.channel.send(giveEmbed)

    }
}