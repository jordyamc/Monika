const Discord = require("discord.js");

module.exports = {
  name: "moneda",
  alias: [],
  description: "",

  run: async (message, args, rolIT, client) => {
    var moneda = [
      {
        name: "Cara",
        url:
          "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fcara.png"
      },
      {
        name: "Cruz",
        url:
          "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fcruz.png"
      }
    ];

    if (Math.floor(Math.random() * 100) == 50) {
      var monedaEmbed = new Discord.RichEmbed()
      .setDescription("|")
      return message.channel.send(monedaEmbed);
    } else {
      var caracruz = moneda[Math.floor(Math.random() * moneda.length)];
      var monedaEmbed = new Discord.RichEmbed()
        .setTitle(caracruz.name)
        .setImage(caracruz.url)
        .setFooter(
          "IT Crowd",
          "https://cdn.discordapp.com/emojis/562075100116156418.png"
        );

      return message.channel.send(monedaEmbed);
    }
  }
};
