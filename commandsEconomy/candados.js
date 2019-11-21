const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'can',
    alias: [],
    description: '',

    run: async (message, args, rolIT, client) => {
        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Que intentas hacer conmigo?")
        var candado = args[0];
        bank.push(`${message.guild.id}.${candado}.inventory`, "Candado").catch(error => message.channel.send("Error al comprar ***adición*** => " + error))
    }
}