const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

module.exports = {
    name: 'create-cc',
    alias: ['crear-cc'],
    description: '',

    run: async (message, args, rolIT, client) => {

        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Que intentas hacer conmigo?")

        if (!args[0]) {
            return message.channel.send("Tienes que especificarme algo!\n``<nombre del banco>$<url del icono>$ [id de la empanada]``")
        }

        let text = args.join(" ").split("$")

        let name = text[0].trim();
        let icon = text[1].trim();
        let admin = text[2].trim() || " ";

        await bank.establecer(`${message.guild.id}.role.${name}`, { money: 0, admin: admin, icon: icon, name: name })
          .then(message.channel.send("Creado correctamente"))
          .catch(err => message.channel.send("Error al crear tienda => " + err))
    }
}