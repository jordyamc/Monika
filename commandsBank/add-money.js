const Discord = require('discord.js')  
const db = require('megadb') 
let bank = new db.crearDB('bank') 

const { logs } = require("../logs.js");

module.exports = {
    name: 'add-money',
    alias: ['givebank', 'addmoney'],
    description: 'Dona dinero del banco a un usuario {Reguiere Administrador}',

    run: async (message, args, rolIT, client) => {
        if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.has("557401158042255390") && !message.member.roles.has('641716726236577792')) {
            
                return message.channel.send("Me estás intentando atracar? A ver si te tendré que warnear!")
            
        }  

        let dineroBanco = await bank.obtener(`${message.guild.id}.bank.money`)
        let ser = message.mentions.users.first()
        let dineroGive = args[1]
        if (dineroGive <= 0){
          return message.channel.send("Solo cantidades positivas! " + message.author)
        }
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        if (dineroBanco - dineroGive < 0) {
            return message.channel.send("No tengo tanto dinero, mal rollo " + message.author)
        } 

        bank.restar(`${message.guild.id}.bank.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => " + error))
        bank.sumar(`${message.guild.id}.${user.id}.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))

        var conv = (dineroGive) => String(dineroGive).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Premio!")
            .setColor('#1fff31')
            .setDescription(`${message.author} ha entregado un premio a ${user} de ${conv(dineroGive)} ${moneda}`)
        logs(client, message, dineroGive, "give")
        return message.channel.send(giveEmbed)

    }
}
