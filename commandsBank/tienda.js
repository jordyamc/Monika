const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
let tienda = new db.crearDB('tienda')

module.exports = {
    name: 'tienda',
    alias: ['shop', 'store'],
    description: 'Una tienda :/',

    run: async (message, args, rolIT, client) => {

        if (message.channel.id != "560845194640228352" && message.channel.id != "562854876061892627" && message.channel.id != "550416761972064267"  && message.author.id !== "355104003572498435") return message.channel.send("Canal equivocado para hacer esto, ve a <#560845194640228352>")

        var tiendaItem;
        var key;
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        let tiendaEmbed = new Discord.RichEmbed()
            .setTitle("Tienda")

        if (args[0] == "membresia" || args[0] == "membresía") {
            tiendaItem = await tienda.keys(`${message.guild.id}.membresia`)
            tiendaEmbed.setDescription('``/buy membresia [nombre del club]``')
            key = "membresia"
            //console.log(tiendaItem);
        }
        else if (args[0] == "peluca") {
            tiendaItem = await tienda.keys(`${message.guild.id}.peluca`)
            tiendaEmbed.setDescription('``/buy peluca [nombre de la peluca]``')
            key = "peluca"
            //console.log(tiendaItem);
        }
        else {
            var tiendaItem = await tienda.keys(`${message.guild.id}.item`)
            tiendaEmbed.setDescription('``/buy [nombre del item]``')
            key = "item"
            //console.log(tiendaItem)
        }


        for (let i = 0; i < tiendaItem.length; i++) {
            var item = await tienda.obtener(`${message.guild.id}.${key}.${tiendaItem[i]}`).catch(err => message.channel.send("Error al obtener item data => " + err))
            var bal = item.price
            
            if (key == "membresia") {
                var userMem = await tienda.obtener(`${message.guild.id}.membresia.${tiendaItem[i]}.users`).catch(err => message.channel.send("Error al obtener user data => " + err))
                if (!userMem.includes(message.author.id)) {
                    bal = 25000
                }
            }
            
            var descript = item.desc

            if (key == "peluca") {
                
                var hours = Math.floor(item.time / 3600000);
                var minutes = Math.floor((item.time % 3600000) / 60000);
                var seconds = item.time % 60000;

                //Anteponiendo un 0 a los minutos si son menos de 10
                minutes = minutes < 10 ? "0" + minutes : minutes;

                //Anteponiendo un 0 a los segundos si son menos de 10
                seconds = seconds < 10 ? "0" + seconds : seconds;

                var time = hours + " horas, " + minutes + " minutos, " + seconds + "segundos";

                if (hours == 0 && seconds == 0) {
                    var time = minutes + " minutos";
                } else if (minutes == 0 && seconds == 0){
                    var time = hours + " horas"
                } else if (hours == 0) {
                    var time = minutes + " minutos y " + seconds + " segundos";
                } else {
                    var time = hours + " horas y " + minutes + " minutos";
                }
                var descript = `***${time}*** - ${item.desc}\n`
            }
          
            if (item.desc == undefined) descript = "_ _"
            if (item.name.toLowerCase() == "candado") {
                bal = item.price
                var users1 = await tienda.obtener(`${message.guild.id}.item.candado.users1`)
                var users2 = await tienda.obtener(`${message.guild.id}.item.candado.users2`)
                var users3 = await tienda.obtener(`${message.guild.id}.item.candado.users3`)
                if (users1.includes(message.author.id)) bal += 1000000
                if (users2.includes(message.author.id)) bal += 1000000
                if (users3.includes(message.author.id)) bal = "Máximo alcanzado"
            }

            if (item.name.toLowerCase() == "million dollar beibi") {
                bal = item.price
                var users1 = await tienda.obtener(`${message.guild.id}.item.millionDolar.users1`)
                if (users1.includes(message.author.id)) bal = "Máximo alcanzado"
            }

            var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            await tiendaEmbed.addField(`${moneda} ${conv(bal)} - ${item.icon} ${item.name}`, `_ _ ${descript}\n_ _`)
        }

        return message.channel.send(tiendaEmbed)

    }
}