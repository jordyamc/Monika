const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

const { logs } = require("../logs.js");

module.exports = {
    name: 'club-give',
    alias: ['cc-give'],
    description: 'Donar dinero al club',

    run: async (message, args, rolIT, client) => {

        // if (message.channel.id != "560960948014415873") {
        //     return message.channel.send("Debes hacer esta operación en <#560960948014415873>")
        // }

        if (!args[0]) return message.channel.send("Especifica el nombre del club en minusculas!")

        // if ([".", ",", `'`, '-', '+', '^', '*', '/', '\\', '%', '$', ].some(m => args.join(" ").toLowerCase().includes(m.toLowerCase()))) {
        //     return message.channel.send("Tienes que mandar el dinero sin puntos ni comas ni mierdas extrañas")
        // }

        var bal = args[0];
        var dinero = parseInt(bal)
        var club = args.slice(1).join(" ");

        var balance = await bank.obtener(`${message.guild.id}.${message.author.id}.money`)

        if (!Number.isInteger(dinero)) {
            return message.channel.send("Debes poner el dinero en números seguidos ``/club-give <dinero> <club>``")
        }

        if (dinero < 1) return message.channel.send('Que demonios intentas?')

        var futurBal = balance - dinero
        if (futurBal < 0) {
            return message.channel.send("No puedes enviar dinero que no tienes")
        }

        var clubes = await bank.keys(`${message.guild.id}.role`);
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        for (let i = 0; i < clubes.length; i++) {

            var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`).catch(error => message.channel.send("**Error give banco clubs **" + error));

            if (String(data.name.toLowerCase()) == club.toLowerCase()) {

                await bank.sumar(`${message.guild.id}.role.${clubes[i]}.money`, dinero).catch(error => message.channel.send("Error give banco clubs **sumar** =>" + error));
                await bank.restar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("**Error give banco clubs **restar** =>" + error));

                var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');


                var embedBal = new Discord.RichEmbed()
                    .setColor('#009966')
                    .setDescription(`${message.author} ha donado ${conv(dinero)} ${moneda} a **${club}**`)
                logs(client, message, dinero, "give", club)
                return message.channel.send(embedBal)
            }
        }
        return message.channel.send("Algo has hecho mal porque no funciona ``/club-give <dinero> <club>``")
    }
}