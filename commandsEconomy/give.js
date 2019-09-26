const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'give',
    alias: ['donar', 'let'],
    description: 'Donar dinero a un usuario',

    run: async (message, args, rolIT, client) => {
        
        var author = message.author
        var user = message.mentions.users.first()
        var dinero = args[1]

        var balance = await bank.obtener(`${message.guild.id}.${author.id}.money`)

        console.log(dinero)

        if (!user){
            return message.channel.send("Debes decirme a quien le quieres dar tu dinero ``/give <usuario> <dinero>``")
        }

        if (!args[1]){
            return message.channel.send("Debes decirme la cantidad de dinero que quieres donar ``/give <usuario> <dinero>``")
        }

        if (dinero == NaN){
            return message.channel.send("Debes poner el dinero en números seguidos ``/give <usuario> <dinero>``")
        }
        
        var futurBal = balance - dinero
        console.log(futurBal)
        if (futurBal < 0) {
            return message.channel.send("No puedes enviar dinero que no tienes")
        }

        bank.restar(`${message.guild.id}.${author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => "+error))
        bank.sumar(`${message.guild.id}.${user.id}.money`, dinero).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))

        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Donación")
            .setColor('#66bb6a')
            .setDescription(`${author} a donado ${conv(dinero)} <:monocoin:623298856309751808> a ${user}`)

        return message.channel.send(giveEmbed)

    }
}