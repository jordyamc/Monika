const Discord = require("discord.js");
const db = require("megadb");
let bank = new db.crearDB("bank");

const { logs } = require("../logs.js");

module.exports = {
  name: "flip",
  alias: ["coin-flip", "cf"],
  description: "50% de ganar",

  run: async (message, args, rolIT, client) => {
    if (
      message.channel.id != "560837387614158851" &&
      message.channel.id != "562854876061892627"
    )
      return message.channel.send(
        "Canal equivocado para hacer esto, ve a <#560837387614158851>"
      );

    // if ([".", ",", `'`, '-', '+'].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
    //     return message.channel.send("Tienes que mandar el dinero sin puntos ni comas ni mierdas extrañas")
    // }

    var bot = await bank
      .obtener(`${message.guild.id}.bank.money`)
      .catch(error =>
        message.channel.send(
          "Error al obtener banco ***coinflip*** => " + error
        )
      );
    var auth = await bank
      .obtener(`${message.guild.id}.${message.author.id}.money`)
      .catch(error =>
        message.channel.send(
          "Error al obtener usuario ***coinflip*** => " + error
        )
      );
    let moneda = await bank.obtener(`${message.guild.id}.moneda`);
    var dinero = Number.parseInt(args[0]);

    if (!Number.isInteger(dinero)) {
      return message.channel.send(
        "Tienes que mandar el dinero sin puntos ni comas ni mierdas extrañas"
      );
    }

    if (dinero < 1) return message.channel.send("Que demonios intentas?");

    let p = Math.floor(Math.random() * 100 + 1);

    function opera(val) {
      //console.log("Val + p: " + val, p);
      var conv = dinero =>
        String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      if (p < val) {
        bank
          .restar(`${message.guild.id}.bank.money`, dinero)
          .catch(error =>
            message.channel.send(
              "Error al hacer coinflip ***banco restar*** => " + error
            )
          );
        bank
          .sumar(`${message.guild.id}.${message.author.id}.money`, dinero)
          .catch(error =>
            message.channel.send(
              "Error al hacer coinflip ***usuario sumar*** => " + error
            )
          );
        let flipEmbedWin = new Discord.RichEmbed()
          .setTitle("Flip")
          .setColor("#08D114")
          .setDescription(
            `${message.author} ha ganado ${conv(dinero)} ${moneda}`
          );
        logs(client, message, dinero, "win", "Victoria **flip**")
        return message.channel.send(flipEmbedWin);
      } else {
        bank
          .sumar(`${message.guild.id}.bank.money`, dinero)
          .catch(error =>
            message.channel.send(
              "Error al hacer coinflip ***banco sumar*** => " + error
            )
          );
        bank
          .restar(`${message.guild.id}.${message.author.id}.money`, dinero)
          .catch(error =>
            message.channel.send(
              "Error al hacer coinflip ***usuario restar*** => " + error
            )
          );
        let flipEmbedLose = new Discord.RichEmbed()
          .setTitle("Flip")
          .setColor("#D10808")
          .setDescription(
            `${message.author} ha perdido ${conv(dinero)} ${moneda}`
          );
        logs(client, message, dinero, "lose", "Derrota **flip**")
        return message.channel.send(flipEmbedLose);
      }
    }

    if (dinero > 300000) {
      return message.channel.send("Donde vas intentando apostar tanto!!");
    }

    if (dinero > auth) {
      return message.channel.send("Que intentas apostar si no tienes tanto?");
    }

    //console.log(bot);
    if (dinero >= 100000 && bot > 340000000) {
      opera(30);
    } else if (bot < 220000000) {
      opera(35);
    } else if (dinero > 400000) {
      opera(35);
    } else if (auth > 4000000) {
      opera(35)
    } else if (auth > 1500000) {
      opera(40)
    } else if (dinero > 99999) {
      opera(40);
    } else if (bot < 340000000) {
      opera(40);
    } else if (dinero > 24999) {
      opera(45);
    } else if (bot < 500000000) {
      opera(50);
    } else if (dinero > 50000) {
      opera(55);
    } else if (bot <= 800000000) {
      opera(60);
    } else if (dinero > 10000) {
      opera(60);
    } else if (bot > 800000000) {
      opera(65);
    }
  }
};

/*
    Si el banco tiene menos de 7M de :monocoins, el porcentaje de ganar será del 35%
    Si el banco tiene entre 10M y 7M de :monocoins:, el porcentajede ganar será de un 40%
    Si el banco tiene entre 15M y 10M de :monocoins:, el porcentaje de ganar será de un 50%
    Si el banco tiene entre 20M y 15M de :monocoins:, el porcentaje de ganar será de un 60%
    Si el banco tiene más de 20M de :monocoins:, el porcentaje de ganar será de un 65%

    - Si el banco tiene entre 180M y 220M, dará entre 1.000 y 2.000
    - Si el banco tiene entre 220M y 240M, dará entre 2.000 y 4.000
    - Si el banco tiene entre 240M y 260M, dará entre 4.000 y 6.000
    - Si el banco tiene entre 260M y 300M, dará entre 6.000 y 8.000
    - Si el banco tiene más de 300M, dará entre 8.000 y 10.000
*/
