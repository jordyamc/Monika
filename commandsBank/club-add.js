const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')

module.exports = {
  name:'club-add',
  alias:['cc-add'],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    
    var clubes = await bank.keys(`${message.guild.id}.role`);
    let moneda = await bank.obtener(`${message.guild.id}.moneda`)
    
    if (message.member.hasPermission('ADMINISTRATOR')){ // || message.author.id == "355104003572498435") {
      var dinero = args[1]
        
        if (dinero < 0) {
	        return message.channel.send("Dinero en positivo porfavor")
        }

        var user = message.mentions.users.first().id || message.author.id
        
        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      
      //console.log(args.slice(2).join(" ").toLowerCase())

        await bank.restar(`${message.guild.id}.role.${args.slice(2).join(" ").toLowerCase()}.money`, dinero).catch(err => message.channel.send("Error restar club" + err))
        await bank.sumar(`${message.guild.id}.${user}.money`, dinero).catch(err => message.channel.send("Error sumar club" + err))
        let giveEmbed = new Discord.RichEmbed()
          .setTitle("Premio!")
          .setColor('#1fff31')
          .setDescription(`${message.author} ha entregado un premio a ${message.mentions.users.first()} de ${conv(dinero)} ${moneda} del banco **${args.slice(2).join(" ")}**`)
    client.guilds.get("545720855578279958").channels.get("560685364319092758").send(giveEmbed)
        return message.channel.send(giveEmbed)
    }

    for (let i = 0; i < clubes.length; i++) {

      var data = await bank.obtener(`${message.guild.id}.role.${clubes[i]}`)
      var admin = data.admin || 0;

      if (admin == message.author.id) {
        var dinero = args[1]
        
        if (dinero < 0) {
	        return message.channel.send("Dinero en positivo porfavor")
        }

        var user = message.mentions.users.first().id || message.author.id
        
        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        await bank.restar(`${message.guild.id}.role.${clubes[i]}.money`, dinero).catch(err => message.channel.send("Error restar club" + err))
        await bank.sumar(`${message.guild.id}.${user}.money`, dinero).catch(err => message.channel.send("Error sumar club" + err))
        let giveEmbed = new Discord.RichEmbed()
          .setTitle("Premio!")
          .setColor('#1fff31')
          .setDescription(`${message.author} ha entregado un premio a ${message.mentions.users.first()} de ${conv(dinero)} ${moneda} del banco **${data.name}**`)
    client.guilds.get("545720855578279958").channels.get("560685364319092758").send(giveEmbed)
        return message.channel.send(giveEmbed)
      }
    }
    return message.channel.send("No tienes permisos puto")
  }
}