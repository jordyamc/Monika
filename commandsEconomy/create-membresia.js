const Discord = require('discord.js')
const db = require('megadb')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'create-membresia',
    alias: ['crear-membresia'],
    description: '',

    run: async (message, args, rolIT, client) => {

        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Que intentas hacer conmigo?")

        if (!args[0]) {
            return message.channel.send("Tienes que especificarme algo!\n``<nombre>$ <emoji> $<idrole>$[descripción]``")
        }

        let text = args.join(" ").split("$")

        let name = text[0].trim();
        let icon = text[1].trim();
        let role = text[2].trim();
        let desc = "_ _";

        if (text[3]) desc = text[3];

        await tienda.establecer(`${message.guild.id}.membresia.ID${message.createdAt.getTime()}`, { name: name, price: 75000, icon: icon, role: role, desc: desc, users: ["0"] }).catch(err => message.channel.send("Error al crear tienda => " + err))

        return message.channel.send("All right!")
    }
}