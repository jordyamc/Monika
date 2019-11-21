const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'club-bal',
    alias: [`banco-club`, `cc`, 'cc-bal'],
    description: 'Banco del club',

    run: async (message, args, rolIT, client) => {
        
        if (!args[0]) return message.channel.send("Especifica el nombre del club!")

        var clubes = await bank.keys(`${message.guild.id}.role`);
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        for (let i = 0; i < clubes.length; i++) {

            var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`)
            
            if (String(data.name) == args.join(" ").toLowerCase()) {
                var bal = data.money
                var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

                var embedBal = new Discord.RichEmbed()
                    .setAuthor(data.name, data.icon)
                    .setColor('#33D4FF')
                    .addField(`Dinero`, `${conv(bal)} ${moneda}`)

                return message.channel.send(embedBal)
            } else { console.log(data.name) }
            //console.log(data)   
        } return message.channel.send("Club no encontrado")
    }
}