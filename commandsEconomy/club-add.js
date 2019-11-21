const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
  name:'club-add',
  alias:['cc-add'],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    
    var clubes = await bank.keys(`${message.guild.id}.role`);

    for (let i = 0; i < clubes.length; i++) {

      var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`)
      var admin = data.admin || 0;

      // if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != admin) {
      //   return message.channel.send("No tienes permiso para donar el dinero")
      // }

      if (admin == message.author.id || message.member.hasPermission('ADMINISTRATOR')) {
        var dinero = args[1]

if (dinero < 0) {
	return message.channel.send("Dinero en positivo porfavor")
}

        var user = message.mentions.users.first().id || message.author.id

        await bank.restar(`${message.guild.id}.role.${clubes[i]}.money`, dinero).catch(err => message.channel.send("Error restar club" + err))
        await bank.sumar(`${message.guild.id}.${user}.money`, dinero).catch(err => message.channel.send("Error sumar club" + err))
        return message.channel.send("Transferencia exitosa")
      }
    }

    let giveEmbed = new Discord.RichEmbed()
      .setTitle("Premio!")
      .setColor('#1fff31')
      .setDescription(`${message.author} ha entregado un premio a ${user} de ${conv(dineroGive)} ${dinero} del banco ${data.name}`)
    client.guilds.get("545720855578279958").channels.get("560685364319092758").send(giveEmbed)
    return message.channel.send("``/cc-add <usuario> dinero``\nRecuerda que debes de ser la empanada del club")
  }
}