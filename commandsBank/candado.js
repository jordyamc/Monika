const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

module.exports = {
    name: 'mil',
    alias: ['can'],
    description: '',

    run: async (message, args, rolIT, client) => {
      
      //return
        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Que intentas hacer conmigo?")
        var candado = args[0];
        console.log('a')
        bank.push(`${message.guild.id}.${candado}.inventory`, "Candado").then(message.channel.send("Done")).catch(error => message.channel.send("Error al comprar ***adición*** => " + error))
        console.log('b')
    }
}