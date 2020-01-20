const Discord = require('discord.js')
const db = require('megadb')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'create-peluca',
    alias: ['crear-peluca'],
    description: '',

    run: async (message, args, rolIT, client) => {

        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR') && message.author.id !== "355104003572498435") return message.channel.send("Que intentas hacer conmigo?")

        if (!args[0]) {
            return message.channel.send("Tienes que especificarme algo!\n``<nombre>$<precio>$ <emoji> $<idrole>$<tiempo>$[descripción]``")
        }

        let text = args.join(" ").split("$")

        let name = text[0].trim();
        let price = text[1].trim();
        let icon = text[2].trim();
        let role = text[3].trim();
        let time = text[4].trim();
        let desc = "_ _";

        if (text[5]) desc = text[5];

        await tienda.establecer(`${message.guild.id}.peluca.ID${message.createdAt.getTime()}`, { name: name, price: price, icon: icon, role: role, time: time, desc: desc }).catch(err => message.channel.send("Error al crear tienda => " + err))
        message.delete()
        return message.channel.send("All right!")
    }
}