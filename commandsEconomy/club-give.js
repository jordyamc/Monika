const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'club-give',
    alias: ['cc-give'],
    description: 'Donar dinero al club',

    run: async (message, args, rolIT, client) => {

        if (!args[0]) return message.channel.send("Especifica el nombre del club en minusculas!")

        var dinero = args[0];
        var club = args.slice(1).join(" ");

        if (dinero == NaN) {
            return message.channel.send("Debes poner el dinero en números seguidos ``/give <dinero> <club>``")
        }

        var clubes = await bank.keys(`${message.guild.id}.role`);
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        for (let i = 0; i < clubes.length; i++) {
            
            var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`).catch(error => message.channel.send("**Error give banco clubs **" + error));
            
            if (String(data.name) == club) {

                await bank.sumar(`${message.guild.id}.role.${club}.money`, dinero).catch(error => message.channel.send("Error give banco clubs **sumar** =>" + error));
                await bank.restar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("**Error give banco clubs **restar** =>" + error));

                var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');


                var embedBal = new Discord.RichEmbed()
                    .setColor('#33D4FF')
                    .setDescription(`${message.author} a donado ${conv(bal)} ${moneda} a ${club}`)

                return message.channel.send(embedBal)
            }
        }
        return message.channel.send("Algo has hecho mal porque no funciona")
    }
}