const Discord = require('discord.js')
const db = require('megadb')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'create-item',
    alias: ['crear-item'],
    description: '',

    run: async (message, args, rolIT, client) => {

        if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Que intentas hacer conmigo?")

        if (!args[0]) {
            return message.channel.send("Tienes que especificarme algo!\n``<nombre>$<precio>$ <emoji> $<descripción>$<texto al usar>$[idrole]``")
        }

        let text = args.join(" ").split("$")

        let name = text[0].trim();
        let price = text[1].trim();
        let icon = text[2].trim() || " ";
        let desc = text[3];
        let usage = text[4];
        let role = "false";
        if (text[5]) {
            role = text[5].trim();
        }

        if (isNaN(price)) {
            return message.channel.send("Precio incorrecto!")
        }

        if (!usage) {
            return message.channel.send("Faltan parámetros para el nuevo item");
        }

        let itemEmbed = new Discord.RichEmbed()
            .setTitle("Item Suggest")
            .setColor('#7fa8ef')
            .setDescription(`Sugerido por ${message.author}`)
            .addField(`Nombre`, `${ name }`, true)
            //.addField(`Icono`, `${ icon }`, true)
            .addField(`Precio`, `${ price }`, true)
            .addField(`Descripción`, `${ desc }`)
            .addField(`Texto al usar`, `${ usage }`)
            .addField(`Rol ID`, role)
            .addField(`Código`, args.join(" "))

        await tienda.establecer(`${message.guild.id}.item.ID${message.createdAt.getTime()}`, { name: name, price: price, icon: icon, desc: desc, usage: usage, role: role }).catch(err => message.channel.send("Error al crear tienda => " + err))

        return message.channel.send(itemEmbed).then(m => {
            m.react(client.emojis.get("621493290226941952"))
            m.react(client.emojis.get("621493343972491283"))
            m.react(client.emojis.get("621493322451517450"))
        })
    }
}