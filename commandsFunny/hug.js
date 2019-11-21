const Discord = require('discord.js')

module.exports = {
  name: 'hug',
  alias: [],
  description: 'Monika reparte abrazos virtuales',

  run: (message) => {

    if (message.mentions.users.first()) {
      let hugEmbed = new Discord.RichEmbed()
        .setDescription(`Un abrazo virtual para ${message.mentions.users.first()}!`)
        .setColor("#feb1fe")
        .setImage('https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FMonikaVirtualHug.gif?v=1561082757261')
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

      return message.channel.send(hugEmbed)
    } else {
      let hugEmbed = new Discord.RichEmbed()
        .setDescription(`Un abrazo virtual para ${message.author}!`)
        .setColor("#feb1fe")
        .setImage('https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FMonikaVirtualHug.gif?v=1561082757261')
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

      return message.channel.send(hugEmbed)
    }

  }
}