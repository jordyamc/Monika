const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

module.exports = {
    name: 'club-edit',
    alias: ['cc-edit', 'ccedit'],
    description: 'Editar los parámetros del club',

    run: async (message, args, rolIT, client) => {

        var clubes = await bank.keys(`${message.guild.id}.role`);

        for (let i = 0; i < clubes.length; i++) {

            var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`)
            var admin = data.admin || 0;

            //console.log("admin icon => " + club + " => " + data.name)
            //console.log("nombre => " + clubName + " => " + data.name)

            var club = args.slice(2).join(" ").toLowerCase()
            var clubName = args.slice(1).join(" ").split("$")
            var oldName = clubName[0] ? clubName[0].trim() : 0;
            var newName = clubName[1] ? clubName[1].trim() : 0;
            //console.log("Name club => "+oldName, newName)

            if (String(data.name.toLowerCase()) == club) {

                if(!message.member.hasPermission('ADMINISTRATOR') && message.author.id != admin) {
                    return message.channel.send("No tienes permiso para editar esta información")
                }

                if (args[0] == "admin") {
                    await bank.establecer(`${message.guild.id}.role.${clubes[i]}.admin`, message.mentions.users.first().id)
                    return message.channel.send("Ahora " + message.mentions.users.first() + " podrá administrar el banco de **" + args.slice(2).join(" ") + "**")
                }

                else if (args[0] == "icono") {
                    await bank.establecer(`${message.guild.id}.role.${clubes[i]}.icon`, args[1])
                    return message.channel.send("Icono del banco " + args.slice(2).join(" ") + " cambiado")
                }
            } 

            if (String(data.name.toLowerCase()) == oldName.toLowerCase()) {
                if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != admin) {
                    return message.channel.send("No tienes permiso para editar esta información")
                }

                if (args[0] == "nombre") {
                    await bank.establecer(`${message.guild.id}.role.${clubes[i]}.name`, newName)
                    return message.channel.send("Nombre del banco **" + oldName + "** cambiado a **" + newName + "**")

                } else {
                    return message.channel.send("Opción no válida de nombre")
                }
            }
        }
        return message.channel.send("Creo que algo está mal")
    }
}