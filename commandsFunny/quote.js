const Discord = require('discord.js');

module.exports = {
  name:'quote',
  alias:['responder', 'res'],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    console.log(args)
    
    
    if(!args[1] && !message.mentions.channels.first()){
      console.log(`https://discordapp.com/channels/${message.channel.id}/${args[0]})`)
      message.channel.fetchMessage(args[0]).then(m => {
        let quoteEmbed = new Discord.RichEmbed()
          .setColor('#ff9626')
          .setDescription(m.author)
          .addField(m.content, `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
          .setTimestamp()
	        .setFooter("IT Crowd | #"+m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png")
        message.delete()
        return message.channel.send(quoteEmbed)
      })
      
    } else if(args[2] && message.mentions.channels.first()){
      message.mentions.channels.first().fetchMessage(args[0]).then(m => {
        let quoteEmbed = new Discord.RichEmbed()
          .setColor('#ff9626')
          .setDescription(m.author)
          .addField(m.content, message.author)
          .addField(args.slice(2).join(" "), `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
          .setTimestamp()
	        .setFooter("IT Crowd | #"+m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png")
        message.delete()
        return message.channel.send(quoteEmbed)
      })
      
      
    } else if(args[1] && !message.mentions.channels.first()){
      message.channel.fetchMessage(args[0]).then(m => {
        let quoteEmbed = new Discord.RichEmbed()
          .setColor('#ff9626')
          .setDescription(m.author)
          .addField(m.content, message.author)
          .addField(args.slice(1).join(" "), `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
          .setTimestamp()
	        .setFooter("IT Crowd | #"+m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png")
        message.delete()
        return message.channel.send(quoteEmbed)
      })
      
    } else if(!args[2] && message.mentions.channels.first()){
      message.mentions.channels.first().fetchMessage(args[0]).then(m => {
        let quoteEmbed = new Discord.RichEmbed()
          .setColor('#ff9626')
          .setDescription(m.author)
          .addField(m.content, `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
          .setTimestamp()
	        .setFooter("IT Crowd | #"+m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png")
        message.delete()
        return message.channel.send(quoteEmbed)
      })
    } else {
      return message.channel.send("Error")
    }
  }
}