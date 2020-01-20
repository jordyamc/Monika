const Discord = require("discord.js")

module.exports = {
  name: 'ping',
  alias: [],
  description: 'Analiza la laténcia con el servidor',

  run: (message) => {

    let ping = Math.floor(message.client.ping);

    if (ping > 300) {
      var embed = new Discord.RichEmbed().setDescription(":satellite: Pong! **" + ping + "ms.**")
        .setColor(0xff0000)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.channel.sendEmbed(embed);


    } else if (ping > 150) {
      var embed = new Discord.RichEmbed().setDescription(":satellite: Pong! **" + ping + "ms.**")
        .setColor(0xffcc00)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.channel.sendEmbed(embed);


    } else {
      var embed = new Discord.RichEmbed().setDescription(":satellite: Pong! **" + ping + "ms.**")
        .setColor(0x66ff66)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.channel.sendEmbed(embed);
    }

  }
}