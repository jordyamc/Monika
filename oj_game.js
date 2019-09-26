const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const botConfig = require('./config.json');
const Timeout = require('smart-timeout');
// 
//
let dbCards = new db.crearDB('oj_cards');
let dbEditionCards = new db.crearDB('oj_edition');

module.exports = {
  ojGame: async (message, prefix) => {

    function isCommand(text) {
      return message.content.toLowerCase().startsWith(prefix + text);
    }

    function isEmbedCard(data) { //retorna carta embed
      return new Discord.RichEmbed()
        .setTitle(data.nombre)
        .setColor("#1B8D2C")
        .addField(":heartpulse: Vida: " + data.vida, "_ _", false)
        .addField(":crossed_swords: Ataque: " + data.ataque, "_ _", false)
        .addField(":shield: Defensa: " + data.defensa, "_ _", false)
        .addField(":runner: Evasion: " + data.evasion, "_ _", false)
        .addField(":gem: Puntos sobrantes: " + data.puntos, "_ _", false)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
    }

    async function datosCard(user) {
      return await dbCards.obtener(user);
    }
    async function datosCardEd(user) {
      return await dbEditionCards.obtener(user)
    }
    function clearTimeOutEd(channel) {
      Timeout.clear(`ojEd.${channel.id}`);
    }
    function setTimeOutEd(message) {
      clearTimeOutEd(message.channel);
      Timeout.set(`ojEd.${message.channel.id}`, () => {
        dbEditionCards.establecer(channelId, { estadoEd: 0, nombre: 0, vida: 0, ataque: 0, defensa: 0, evasion: 0, puntos: 0 })
        message.delete();
        message.channel.send("Edicion terminada por inactividad")
      }, 30000);
    }

    function skillEd(embed) {
      return message.channel.send(embed).then(async (m) => {
        const collector = m.createReactionCollector((reaction, user) => {
          return (reaction.emoji.name === "🔼" || reaction.emoji.name === "🔽" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === user.id;
        });
      })
    }


    if (isCommand("oj_card")) { //ver carta
      let userid = message.author.id;
      let usertag = message.author.tag;
      console.log(`Tag: ${usertag}`);
      if (!dbCards.tiene(userid)) { //si el usuario no tiene carta, crea una
        dbCards.establecer(userid, { nombre: usertag, vida: 5, ataque: 0, defensa: 0, evasion: 0, puntos: 1 });
        message.channel.send("Carta creada, usa el comando nuevamente para verla");
      }
      else { //si el usuario tiene carta, muestra la carta
        let embedCard = isEmbedCard(await datosCard(userid));
        message.channel.send(embedCard);
      }
    }

    let channelId = message.channel.id
    if (isCommand("restart_edition")) { //devuelve estado de edicion a 0, comando para mods del bot (no supe verificar rol)
      dbEditionCards.establecer(channelId, { estadoEd: 0, nombre: 0, vida: 0, ataque: 0, defensa: 0, evasion: 0, puntos: 0 })
      message.channel.send("Edicion reiniciada")
    }


    if (isCommand("oj_skills")) { //editar skills
      let userid = message.author.id;
      let estado = 0;
      if (dbEditionCards.has(channelId)) {
        let editionCard = await dbEditionCards.obtener(channelId);
        estado = editionCard.estadoEd;
      }

      if (!dbCards.tiene(userid)) { //si el jugador no tiene carta, pide que la cree
        message.channel.send("Tu carta no ha sido creada, usa " + prefix + "oj_card para crearla " + message.author.toString());
      }
      else if (estado != 0) { //boquea comando si hay edicion en curso
        message.channel.send("Otro usuario esta editando su carta, espera a que termine " + message.author.toString());
      }
      else if (estado == 0) {
        let card = await datosCard(userid); //obtiene los datos de la db principal
        dbEditionCards.establecer(channelId, { estadoEd: 1, nombre: card.nombre, vida: card.vida, ataque: card.ataque, defensa: card.defensa, evasion: card.evasion, puntos: card.puntos }); //indica que la db esta en uso y clona la carta del usuario
        let cardEd = await datosCardEd(channelId) //obtiene los datos de la db de edicion
        let embedCard = isEmbedCard(cardEd); //genera embed con estos datos
        message.channel.send("Puedes agregar o quitar hasta 2 puntos en cada skills " + message.author.toString(), embedCard).then(async (m) => {
          const collector = m.createReactionCollector((reaction, user) => {
            return (reaction.emoji.name === "💗" || reaction.emoji.name === "⚔" || reaction.emoji.name === "🛡" || reaction.emoji.name === "🏃" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === userid;
          });
          collector.on("collect", async (reaction, reactionCollector) => { //💗 ⚔ 🛡 🏃 ✅ ❌ 🔼 🔽
            setTimeOutEd(m);
            if (reaction.emoji.name === "💗") {
              m.delete(); //borra el mensaje para enviar uno nuevo con las reactions necesarias
              message.channel.send(embedCard).then(async (mHeart) => {
                const collector = mHeart.createReactionCollector((reaction, user) => {
                  return (reaction.emoji.name === "🔼" || reaction.emoji.name === "🔽" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === userid;
                });
                let editable = { estadoEd: 1, nombre: card.nombre, vida: card.vida, ataque: card.ataque, defensa: card.defensa, evasion: card.evasion, puntos: card.puntos };
                collector.on("collect", async (reaction, reactionCollector) => {
                  if (reaction.emoji.name === "🔼" && editable.puntos > 0 && editable.vida <7) { 
                    editable.vida += 1;
                    editable.puntos -= 1;
                    dbEditionCards.establecer(channelId, editable);
                    mHeart.edit(isEmbedCard(editable)) //reescribe el embed anterior con el nuevo
                  }
                  if (reaction.emoji.name === "🔽" && editable.vida > 3) {
                    editable.vida -= 1;
                    editable.puntos += 1;
                    dbEditionCards.establecer(channelId, editable);
                    mHeart.edit(isEmbedCard(editable)) //reescribe el embed anterior con el nuevo
                  }
                  if (reaction.emoji.name === "✅"){
                    //aqui no se como carajo volver al if anterior
                  }
                  if (reaction.emoji.name === "❌"){
                    dbEditionCards.establecer(channelId, { estadoEd: 0, nombre: 0, vida: 0, ataque: 0, defensa: 0, evasion: 0, puntos: 0 })
                    message.channel.send("Edicion cancelada")
                  }
                })
                await mHeart.react("🔼")
                await mHeart.react("🔽")
                await mHeart.react("✅")
                await mHeart.react("❌")
              })
            }
            else if (reaction.emoji.name === "⚔") {
              message.channel.send("elegiste ⚔");
            }
            else if (reaction.emoji.name === "🛡") {
              message.channel.send("elegiste 🛡");
            }
            else if (reaction.emoji.name === "🏃") {
              message.channel.send("elegiste 🏃");
            }
            else if (reaction.emoji.name === "✅") {
              message.channel.send("elegiste ✅");
            }
            else if (reaction.emoji.name === "❌") {
              message.channel.send("elegiste ❌");
            }
            dbEditionCards.establecer(channelId, { estadoEd: 0, vida: 0, ataque: 0, defensa: 0, evasion: 0, puntos: 0 })
          });
          await m.react("💗");
          await m.react("⚔");
          await m.react("🛡");
          await m.react("🏃");
          await m.react("✅");
          await m.react("❌");
          setTimeOutEd(m);
        })
      } else {
        message.channel.send('error');
      }
    }
  }
}