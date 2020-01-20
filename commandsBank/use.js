const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'use',
    alias: ['use-item'],
    description: 'Usar el item comprado',

    run: async (message, args, rolIT, client) => {
        return
        var item = await tienda.obtener(`${message.guild.id}.${args}`);
        var itemRole = item.role

        var inv = await bank.obtener(`${message.guild.id}.${message.author.id}.inventory`)

        function roleadd(itemRole) {
            message.member.addRole(itemRole).catch(error => message.channel.send("Error al usar ***agregar rol*** => " + error));
        }

        if (!inv.includes(item.name)) {
            return message.channel.send("No tienes el item!")
        }

        if (itemRole != "false") {
            roleadd(itemRole)
        }

        bank.extract(`${message.guild.id}.${message.author.id}.inventory`, item.name).catch(error => message.channel.send("Error al usar ***extraer*** => " + error))

        let useEmbed = new Discord.RichEmbed()
            .setTitle("Uso de item")
            .setColor('#e629ca')
            .setDescription(`${message.author} usó el item ${item.name}`)
        client.guilds.get("545720855578279958").channels.get("560685364319092758").send(useEmbed)
        return message.channel.send(item.usage)

    }
}