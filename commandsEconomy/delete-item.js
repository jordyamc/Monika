const Discord = require('discord.js')
const db = require('megadb')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'delete-item',
    alias: [],
    description: '',

    run: async (message, args, rolIT, client) => {
        
        // if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Quieto perro, esto no lo puedes hacer!")

        // if (await !tienda.tiene(`${message.guild.id}.item.${args}`)){
        //     return message.channel.send("El item no existe")
        // }

        // await tienda.eliminar(`${message.guild.id}.${args}`)
        // return message.channel.send("Item eliminado correctamente")
    }
}