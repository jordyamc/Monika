const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'add-money',
    alias: ['givebank', 'addmoney'],
    description: 'Dona dinero del banco a un usuario {Reguiere Administrador}',

    run: async (message, args, rolIT, client) => {
        
        if (!message.member.hasPermission('ADMINISTRATOR')) return ("Me estás intentando atracar? A ver si te tendré de warnear!")

        let dineroBanco = await bank.obtener(`${message.guild.id}.bank.money`)
        let user = message.mentions.users.first()
        let dineroGive = args[1]

        if (dineroBanco - dineroGive < 0){
            return message.channel.send("No tengo tanto dinero, mal rollo " + message.author)
        }

        bank.restar(`${message.guild.id}.bank.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => " + error))
        bank.sumar(`${message.guild.id}.${user.id}.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))

        var conv = (dineroGive) => String(dineroGive).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Donación")
            .setColor('#42f452')
            .setDescription(`${user} a ganado ${conv(dineroGive)} <:monocoin:623298856309751808>`)

        return message.channel.send(giveEmbed)

    }
}