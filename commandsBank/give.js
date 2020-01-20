const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

const { logs } = require("../logs.js");

module.exports = {
    name: 'give',
    alias: ['donar', 'let'],
    description: 'Donar dinero a un usuario',

    run: async (message, args, rolIT, client) => {

        if (message.channel.id != "560960948014415873" && message.channel.id != "558481206274949130" && message.channel.id != "562854876061892627" && message.author.id !== "355104003572498435") {
            return message.channel.send("Debes hacer esta operación en <#560960948014415873>")
        }

        // if ([".", ",", `'`, '-', '+'].some(m => args[1].includes(m))) {
        //     return message.channel.send("Tienes que mandar el dinero sin puntos ni comas ni mierdas extrañas")
        // }

        var author = message.author
        var user = message.mentions.users.first()
        var dinero = Number.parseInt(args[1])

        if (!Number.isInteger(dinero)) {
            return message.channel.send('Tienes que mandar el dinero sin puntos ni comas ni mierdas extrañas');
        }

        var balance = await bank.obtener(`${message.guild.id}.${author.id}.money`)

        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        //console.log(dinero)

        if (message.author.id == message.mentions.users.first().id){
            return message.channel.send("Tamos tontos?")
        }

        if (!user) {
            return message.channel.send("Debes decirme a quien le quieres dar tu dinero ``/give <usuario> <dinero>``")
        }

        if (!args[1]) {
            return message.channel.send("Debes decirme la cantidad de dinero que quieres donar ``/give <usuario> <dinero>``")
        }

        if (dinero == NaN) {
            return message.channel.send("Debes poner el dinero en números seguidos ``/give <usuario> <dinero>``")
        }

        if (dinero < 1) return message.channel.send('Que demonios intentas?')

        var futurBal = balance - dinero
        if (futurBal < 0) {
            return message.channel.send("No puedes enviar dinero que no tienes")
        }

         //if ((args[1] > 300000 && message.channel.id != "558481206274949130") || (args[1] > 300000 && message.channel.id != "562854876061892627")) {
             //return message.channel.send("No me dejan traficar con tanto, sumimasen")
         //}

        if (user == client.user) {
            bank.sumar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))
        } else {
            bank.sumar(`${message.guild.id}.${user.id}.money`, dinero).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error))
        }

        bank.restar(`${message.guild.id}.${author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => " + error))

        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Donación")
            .setColor('#29e645')
            .setDescription(`${author} ha donado ${conv(dinero)} ${moneda} a ${user}`)
        logs(client, message, dinero, "give")
        return message.channel.send(giveEmbed)

    }
}