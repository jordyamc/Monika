const Discord = require('discord.js')

module.exports = {
  name:'embedimg',
  alias:[],
  description:'Coloca la imagen del link ingresado en un embed y elimina el mensaje del usuario',
  
  run: (message, args, rolIT) => {
        
    if (message.mentions.channels.first() && message.member.roles.has(rolIT.id)){
      let img = args[1]
      var embed = new Discord.RichEmbed()
        .setColor('#000000')
        .setImage(img)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.delete(0)
      return message.mentions.channels.first().send(embed)
    } else {
      let img = args[0]
      var embed = new Discord.RichEmbed()
        .setColor('#000000')
        .setImage(img)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.delete(0)
      return message.channel.send(embed)
    }
  }
}