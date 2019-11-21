const Discord = require('discord.js')
const db = require('megadb')
let usersLeave = new db.crearDB("usersLeave");

module.exports = {
    name: 'afks',
    alias: [],
    description: '',

    run: async (message, args, rolIT, client) => {
        
        const afks = await usersLeave.obtener(`${message.guild.id}.${member.user.id}`, {time: time})
    }
}