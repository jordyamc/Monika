const Discord = require('discord.js')

module.exports = {
  name:'warn',
  alias:[],
  description:'Mods repartiendo warns',
  
  run: (message) => {
    
    var warns = ['https://cdn.discordapp.com/attachments/589066102315941908/589233570934030357/warn3.gif']
    
    if(message.mentions.users.first()){
      let warnEmbed = new Discord.RichEmbed()
        .setColor("ff001a")
		    .setDescription(`La ira de los mods te caerá encima ${message.mentions.users.first()}`)
		    .setImage(warns[Math.floor(Math.random() * warns.length)])
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(warnEmbed)
    } else {
      let warnEmbed = new Discord.RichEmbed()
        .setColor("ff001a")
		    .setTitle(`Acaso tienen que llover warns aquí?`)
		    .setImage(warns[Math.floor(Math.random() * warns.length)])
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(warnEmbed)
    }
  }
}