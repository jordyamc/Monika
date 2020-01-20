const Discord = require('discord.js')

module.exports = {
  name:'kill',
  alias:[],
  description:'Monika asesina',
  
  run: (message) => {
    const killImg = ['https://media1.tenor.com/images/23bf7fe466e11c0dadc7df8350ab595e/tenor.gif?itemid=11199556', 'https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fkill.gif?v=1564681569609']
    
    if(message.mentions.users.first()){
      let killEmbed = new Discord.RichEmbed()
		    .setDescription(`**Are you ready to die ${message.mentions.users.first()}?**`)
        .setColor('#4d0702')
		    .setImage(killImg[Math.floor(Math.random() * killImg.length)])
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(killEmbed)
    } else {
      let killEmbed = new Discord.RichEmbed()
		    .setDescription(`Tienes que decirme a quien quieres matar ${message.author}`)
        .setColor('#4d0702')
		    .setImage(killImg[Math.floor(Math.random() * killImg.length)])
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(killEmbed)
    }
    
  }
}