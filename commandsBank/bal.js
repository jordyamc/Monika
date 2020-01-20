const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = {
    name: 'bal',
    alias: ['balance', 'bank', 'money', 'inv', 'dinero', 'inventario'],
    description: 'Dinero del banco',

    run: async (message, args, rolIT, client) => {
      
        function format(bal){
          return bal.toLocaleString();
        }

        let User = message.mentions.users.first() || client.users.get(args[0]) || message.author

        let dineroBanco = await bank.obtener(`${message.guild.id}.bank.money`).catch(error => message.channel.send("**Error dinero banco monika " + error));
        let moneda = await bank.obtener(`${message.guild.id}.moneda`).catch(error => message.channel.send("**Error dinero banco monika " + error));


        if (User == client.user) {
            if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send("Nop! Así no podéis romper el sistema pto")
            } else {
                var embedBanc = new Discord.RichEmbed()
                    .setTitle(User.tag + ' 💰')
                    .setColor('#00e1ff')
                    .addField("Monocoins en el banco:", `${format(dineroBanco)} ${moneda}`, true)

                return message.channel.send(embedBanc)
            }
        }

        let bal = await bank.obtener(`${message.guild.id}.${User.id}.money`).catch(error => message.channel.send("**Error dinero banco " + error));
        let inv = await bank.obtener(`${message.guild.id}.${User.id}.inventory`).catch(error => message.channel.send("**Error inventario banco " + error));
		let balKey = `${message.guild.id}.${User.id}.bal`;
		let lastBal = bank.tiene(balKey) ? await bank.obtener(balKey) : { money: bal, time: message.createdAt.getTime() };

        if (inv == "") {
            inv = "Inventario vacío"
        }

        //console.log('inv: ' + inv)

        var embedBal = new Discord.RichEmbed()
            .setTitle(User.tag + ' 💰')
            .setColor('#33D4FF')
            .addField("Monocoins:", `${format(bal)} ${moneda}`, true)
            .addField(`Último balance (${formatDate(new Date(lastBal.time))}):`, `${format(lastBal.money)} ${moneda}`, true)
            .addField("Inventario:", inv, true)

        message.channel.send(embedBal)

        await bank.establecer(balKey, {
          money: bal,
          time: message.createdAt.getTime()
        });
    }
}
