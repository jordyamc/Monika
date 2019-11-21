const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1');
let tienda = new db.crearDB('tienda')

module.exports = {
  name: 'buy',
  alias: ['buy-item'],
  description: 'Comprar un item de la tienda',

  init: async clientTest => {
    clientTest.on("ready", async () => {
      setInterval(async () => {
        console.log("goes");
        for (const idGuild of await bank.keys()) {
          if (!bank.tiene(`${idGuild}.timePeluca`)) continue;
          console.log("idGuild => " + idGuild);
          for (const idUser of await bank.keys(`${idGuild}.timePeluca`)) {
            if (!bank.tiene(`${idGuild}.timePeluca.${idUser}`)) {
              console.log("Not User!")
            }
            console.log("idUser => " + idUser);
            for await (const pel of await bank.keys(`${idGuild}.timePeluca.${idUser}`)) {
              if (!bank.tiene(`${idGuild}.timePeluca.${idUser}.${pel}`)) {
                console.log("Not Peluca")
              }
              clientTest.guilds
                .get(`${idGuild}`)
                .fetchMember(`${idUser}`)
                .then(async () => {
                  var timefull = await bank.obtener(`${idGuild}.timePeluca.${idUser}.${pel}.min2`).catch(err => console.log("TimeFull error => ".err));
                  var last2min = await bank.obtener(`${idGuild}.timePeluca.${idUser}.${pel}.last2`).catch(err => console.log("LastTime error => ".err));
                  var rolePel = await bank.obtener(`${idGuild}.timePeluca.${idUser}.${pel}.role`).catch(err => console.log("Role error => ".err));

                  console.log(idUser + " => TimeFull: " + timefull + " => TimeLast: " + last2min);

                  if (timefull <= new Date().getTime()) {
                    bank.eliminar(
                      `${idGuild}.timePeluca.${idUser}.${pel}.min2`
                    );
                    alert2min(clientTest, idGuild, idUser, pel);
                  }

                  if (last2min <= new Date().getTime()) {
                    bank.eliminar(
                      `${idGuild}.timePeluca.${idUser}.${pel}.last2`
                    );
                    finalAlert(clientTest, idGuild, idUser, pel, rolePel);
                  }
                });
            }
          }
        }
        console.log("Fin");
      }, 10000);
    });

    client = clientTest;
  },

  run: async (message, args, rolIT, client) => {

    function unconvert(timePel) {
      var hours = Math.floor(timePel / 3600000);
      var minutes = pad(Math.floor((timePel % 3600000) / 60000), 2);
      var seconds = pad(timePel % 60000, 2);

      var result = '';
      if (hours == 00) {
        result = minutes + " minutos y " + seconds + " segundos";
      } else if (minutes == 00 && seconds == 00) {
        result = hours + " horas ";
      } else {
        result = hours + " horas y " + minutes + " minutos";
      }
      return result;
    }

    function pad(padStr, max) {
      var str = padStr.toString();
      return str.length < max ? pad("0" + str, max) : str;
    }

    //if (message.channel.id != "560845194640228352" && message.channel.id != "562854876061892627" && message.channel.id != "550416761972064267") return message.channel.send("Canal equivocado para hacer esto, ve a <#560845194640228352>")

    var itemO = await tienda.keys(`${message.guild.id}.item`).catch(err => console.log("Error buy item => " + err))
    var membO = await tienda.keys(`${message.guild.id}.membresia`).catch(err => console.log("Error buy membresia => " + err))
    var pelO = await tienda.keys(`${message.guild.id}.peluca`).catch(err => console.log("Error buy membresia => " + err))

    var clubes;

    if (message.guild.id == '545720855578279958') {
      var clubes = [
        ['552699845459181598'], // Sin Voz
        ['552699727246917650'], // Fate
        ['553453412826611742'], // Oreo
        ['555402664301690883'], // Henculto
        ['552693694298456064'], // Artistas
        ['552699809811922944'], // Monogatari
        ['552699907618635776'], // Toldboden
        ['553451609107988480'], // Battleroyale
        ['554884633699811329'], // Scriptio
        ['555607531645435906'], // IT Crowd
        ['568989794877833391'], // Nocturnos
        ['553451557493145611']  // Esperanzas
      ]
    }

    if (args[0].toLowerCase() == "membresía" || args[0].toLowerCase() == "membresia") {

      // if (!message.member.roles.has(message.guild.roles.get('562079768795938827'))) {
      //     return message.channel.send("Necesitas comprar el rol traficante")
      // }
      var traficante = message.guild.roles.get("562079768795938827") || message.guild.roles.find(r => r.name === "everyone")
      if (message.member.roles.has(traficante)) {
        return message.channel.send("Necesitas comprar el item Traficante")
      }
      var maxClubes = 0;

      for (let i = 0; i < membO.length; i++) {
        var membresia = await tienda.obtener(`${message.guild.id}.membresia.${membO[i]}`).catch(err => message.channel.send("Error al obtener membresía data => " + err))

        console.log(membresia.role)




        if (message.member.roles.has(membresia.role)) {
          maxClubes += 1;
        }


        console.log(maxClubes)

        if (maxClubes >= 4) {
          return message.channel.send("No puedes pertanecer en más de 4 clubes")
        }
      }

      for (let i = 0; i < membO.length; i++) {
        var membresia = await tienda.obtener(`${message.guild.id}.membresia.${membO[i]}`).catch(err => message.channel.send("Error al obtener membresía data => " + err))

        if (args.slice(1).join(" ").toLowerCase() == membresia.name.toLowerCase()) {

          if (message.member.roles.has(membresia.role)) {
            return message.channel.send("Ya perteneces a este club")
          }

          var userMem = membresia.users
          var priceMem = membresia.price;

          if (!userMem.includes(message.author.id)) {
            priceMem = 25000
          }

          if (priceMem > (await bank.obtener(`${message.guild.id}.${message.author.id}.money`))) {
            return message.channel.send("Dinero insuficiente")
          }

          await tienda.push(`${message.guild.id}.membresia.${membO[i]}.users`, message.author.id).catch(err => message.channel.send(err))
          bank.sumar(`${message.guild.id}.bank.money`, priceMem).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error))
          bank.restar(`${message.guild.id}.${message.author.id}.money`, priceMem).catch(error => message.channel.send("Error al comprar ***restar*** => " + error))

          message.member.addRole(membresia.role).then(() => { if (membresia.name.toLowerCase() == "it crowd") { client.guilds.get("545720855578279958").channels.get("555596703412256779").send(`Bienvenido a IT Crowd ${$message.author} <a:JustMonika:571827698058526740>`) } }).catch(error => message.channel.send("Error al usar ***agregar rol*** => " + error))

          client.guilds.get("545720855578279958").channels.get("560685364319092758").send(`${message.author} compró la membresía de ***${membresia.name}***`)
          return message.channel.send(`Felicidades, ahora formas parte de **${membresia.name}**!`);
        }
      }
      return message.channel.send("Error")

    }

    else if (args[0].toLowerCase() == "peluca") {
      for (let i = 0; i < pelO.length; i++) {
        var peluca = await tienda
          .obtener(`${message.guild.id}.peluca.${pelO[i]}`)
          .catch(err =>
            message.channel.send("Error al obtener membresía data => " + err)
          );

        var timeNow = new Date().getTime();

        if (
          args
            .slice(1)
            .join(" ")
            .toLowerCase() == peluca.name.toLowerCase()
        ) {
          var pricePel = peluca.price;
          var timePel = timeNow + parseInt(peluca.time);
          var namePel = peluca.name;
          var rolePel = peluca.role;

          if (
            pricePel >
            (await bank.obtener(
              `${message.guild.id}.${message.author.id}.money`
            ))
          ) {
            return message.channel.send("Dinero insuficiente");
          }

          if (namePel.toLowerCase() == "máscara zombie") {
            bank.sumar(`${message.guild.id}.role.nocturnos.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "peluca de monogatari") {
            bank.sumar(`${message.guild.id}.role.monogatari.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "sombrero pirata") {
            bank.sumar(`${message.guild.id}.role.sinvoz.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "peluca de fate") {
            bank.sumar(`${message.guild.id}.role.fate.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "pluma y tinta") {
            bank.sumar(`${message.guild.id}.role.scriptio.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "peluca de artistas") {
            bank.sumar(`${message.guild.id}.role.artistas.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "magic hair") {
            bank.sumar(`${message.guild.id}.role.uwo.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "estafa") {
            bank.sumar(`${message.guild.id}.role.battleroyale.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "patas") {
            bank.sumar(`${message.guild.id}.role.henculto.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else if (namePel.toLowerCase() == "byte") {
            bank.sumar(`${message.guild.id}.role.itcrowd.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          } else {
            bank.sumar(`${message.guild.id}.bank.money`, pricePel).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error));
          }

          bank.restar(`${message.guild.id}.${message.author.id}.money`, pricePel).catch(error => message.channel.send("Error al comprar ***restar*** => " + error));

          var min2 = timePel - 300000;
          var last2 = min2 + 300000;

          bank.establecer(
            `${message.guild.id}.timePeluca.${message.author.id}.${namePel}`,
            { min2: min2, last2: last2, role: rolePel }
          ).catch(err => message.channel.send("ERROR establecer tiempo peluca => " + err))

          var timeLeft = await bank.obtener(`${message.guild.id}.timePeluca.${message.author.id}.${namePel}.min2`) + 300000;

          var timeLeft = timeLeft - timeNow;

          message.member
            .addRole(peluca.role)
            .then(() => {
              var time = unconvert(timeLeft);

              let joinPeluca = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .addField(
                  peluca.icon + peluca.name,
                  `Tiempo disponible: ${time}`
                )
                .setFooter(
                  "IT Crowd",
                  "https://cdn.discordapp.com/emojis/562075100116156418.png"
                );

              let joinPelucaLog = new Discord.RichEmbed()
                .setTitle("Compra de Peluca")
                .setDescription(`User: ${message.author} ${message.author.id}`)
                .addField(peluca.name, `Tiempo iniciado: ${time}`);

              client.guilds
                .get("545720855578279958")
                .channels.get("560685364319092758")
                .send(joinPelucaLog);
              message.channel.send(joinPeluca);

              if (peluca.name.toLowerCase() == "it crowd") { client.guilds.get("545720855578279958").channels.get("555596703412256779").send(`Disfruta de tu visita a IT Crowd ${$message.author} <a:JustMonika:571827698058526740>`) }
            })
            .catch(error =>
              message.channel.send(
                "Error al usar ***agregar rol*** => " + error
              )
            );

          return;
        }
      }
    }

    else {
      // ITEM
      for (let i = 0; i < itemO.length; i++) {
        var item = await tienda.obtener(`${message.guild.id}.item.${itemO[i]}`).catch(err => message.channel.send("Error al obtener item data => " + err))
        if (args.join(" ").toLowerCase().includes(item.name.toLowerCase())) {
          var alu1 = message.guild.roles.get("554183396432019497") || message.guild.roles.find(r => r.name === "everyone")
          if (item.name.toLowerCase() == "traficante" && !message.member.roles.has(alu1.id)) {
            return message.channel.send("Necesitas ser alumno de 1er año")
          }

          price = item.price

          if ((price) > (await bank.obtener(`${message.guild.id}.${message.author.id}.money`))) {
            return message.channel.send("Dinero insuficiente")
          }

          if (item.name.toLowerCase() == "candado") {
            var users1 = await tienda.obtener(`${message.guild.id}.item.candado.users1`)
            var users2 = await tienda.obtener(`${message.guild.id}.item.candado.users2`)
            var users3 = await tienda.obtener(`${message.guild.id}.item.candado.users3`)
            if (users1.includes(message.author.id)) {
              price += 1000000
              if ((price) > (await bank.obtener(`${message.guild.id}.${message.author.id}.money`))) {
                return message.channel.send("Dinero insuficiente")
              }
              if (users2.includes(message.author.id)) {
                price += 1000000
                if ((price) > (await bank.obtener(`${message.guild.id}.${message.author.id}.money`))) {
                  return message.channel.send("Dinero insuficiente")
                }
                if (users3.includes(message.author.id)) {
                  return message.channel.send("Ya has comprado el límite")
                } else {
                  await tienda.establecer(`${message.guild.id}.item.candado.users3`, message.author.id)
                }
              } else {
                await tienda.establecer(`${message.guild.id}.item.candado.users2`, message.author.id)
              }
            } else {
              await tienda.establecer(`${message.guild.id}.item.candado.users1`, message.author.id)
            }
            
          }

          if (item.name.toLowerCase() == "million dollar beibi") {
            var users1 = await tienda.obtener(`${message.guild.id}.item.millionDolar.users1`)
            if (users1.includes(message.author.id)) {
              return message.channel.send("Ya has comprado el límite")
            } else {
              await tienda.establecer(`${message.guild.id}.item.millionDolar.users1`, message.author.id)
            }
          }

          if ((price) > (await bank.obtener(`${message.guild.id}.${message.author.id}.money`))) {
            return message.channel.send("Dinero insuficiente")
          }

          bank.sumar(`${message.guild.id}.bank.money`, price).catch(error => message.channel.send("Error al comprar ***sumar*** => " + error))
          bank.restar(`${message.guild.id}.${message.author.id}.money`, price).catch(error => message.channel.send("Error al comprar ***restar*** => " + error))
          //bank.push(`${message.guild.id}.${message.author.id}.inventory`, item.name).catch(error => message.channel.send("Error al comprar ***adición*** => " + error))
          if(item.role != "false") message.member.addRole(item.role).catch(error => message.channel.send("Error al usar ***agregar rol*** => " + error));

          let buyEmbed = new Discord.RichEmbed()
            .setTitle("Compra")
            .setColor('#c922e3')
            .setDescription(`${message.author} compró el item ${item.name}`)
          //client.guilds.get("545720855578279958").channels.get("560685364319092758").send(buyEmbed)
          return message.channel.send(buyEmbed)
        }
      } return message.channel.send("Item no encontrado")
    }

  }
}


function unconvert(timeLeft) {
  console.log("Truetime: " + timeLeft);
  var hours = Math.floor(timeLeft / 3600000);
  var minutes = pad(Math.floor((timeLeft % 3600000) / 60000), 2);
  var seconds = pad(timeLeft % 60000, 2);

  var result = "";
  if (hours == 00) {
    result = minutes + " minutos y " + seconds + " segundos";
  } else if (minutes == 00 && seconds == 00) {
    result = hours + " horas ";
  } else {
    result = hours + " horas y " + minutes + " minutos";
  }
  return result;
}

function pad(padStr, max) {
  var str = padStr.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function alert2min(clientTest, idGuild, idUser, pel) {
  clientTest.users.get(idUser).send("Queda 5 minutos para que se finalice el tiempo del/la " + pel)
    .catch(err => console.log("Error => " + err));
}

function finalAlert(clientTest, idGuild, idUser, pel, rolePel) {
  console.log(" ** Executing finalAlert ** ")
  clientTest.guilds.get(idGuild).fetchMember(idUser).then(guildMember => {
    guildMember.removeRole(rolePel)
      .then(() => {
        bank.eliminar(
          `${idGuild}.timePeluca.${idUser}.${pel}`
        );
        let leavePelucaLog = new Discord.RichEmbed()
          .setTitle("Compra de Peluca")
          .setDescription(`User: <@${idUser}> ${idUser}`)
          .addField(pel, `Tiempo finalizado`);
        clientTest.guilds
          .get("545720855578279958")
          .channels.get("560685364319092758")
          .send(leavePelucaLog);
      })
      .catch(err => console.log("Fail" + err));
  })

}