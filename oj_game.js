const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const Timeout = require('smart-timeout');
const botConfig = require('./config.json');
let dbPrefix = new db.crearDB('prefix');
let dbCards = new db.crearDB('oj_cards');
let dbOjGame = new db.crearDB('oj_game');

/*
{
editPosition: -1,
health: 0,
attack: 0,
defence: 0,
evasion: 0,
points: 0,
}
 */

module.exports = {
  ojGame: async (message) => {

    let prefix = await getPrefix();

    async function getPrefix() {
      if (dbPrefix.has(`${message.guild.id}`)) {
        return await dbPrefix.get(`${message.guild.id}`)
      } else {
        return botConfig.prefix
      }
    }

    function dado(dado) { 
      return Math.floor(Math.random()*(dado-1))+1;
    }

    function nextTurn(db){
      if(db.turno === 1){
        db.turno = 2
      }
      else{
        db.turno = 1
      }
    }

    function isCommand(text) {
      return message.content.toLowerCase().startsWith(prefix + text);
    }

    function getMenuSelector(index, selected) { //coloca la flecha en la zona correspondiente del embed de edicion
      if (selected === -1)
        return "";
      if (index === selected) {
        return ":arrow_right: ";
      } else {
        return "_         _";
      }
    }

    function createEmbed(name, card) { //genera una carta embed con las stats del usuario y en caso de edicion, inserta le flecha de seleccion
      return new Discord.RichEmbed()
        .setTitle(name)
        .setColor("#1B8D2C")
        .addField(getMenuSelector(0, card.editPosition) + ":heartpulse: Vida: " + card.health, "_ _", false)
        .addField(getMenuSelector(1, card.editPosition) + ":crossed_swords: Ataque: " + card.attack, "_ _", false)
        .addField(getMenuSelector(2, card.editPosition) + ":shield: Defensa: " + card.defence, "_ _", false)
        .addField(getMenuSelector(3, card.editPosition) + ":runner: Evasion: " + card.evasion, "_ _", false)
        .addField(getMenuSelector(4, card.editPosition) + ":gem: Puntos sobrantes: " + card.points, "_ _", false)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
    }

    async function embedAtaque(user){
      let card = await dbCards.get(user)
      let ataque = dado(6)
      let ataqueBase = card.attack
      let ataqueFin = ataque+ataqueBase
      let imgDado = imgDado(ataque)
      return new Discord.RichEmbed()
        .setTitle("Ataque")
        .setColor("#1B8D2C")
        .setDescription(imgDado)
        .addField(`<@${user}> a atacado con `+ ataqueFin)
    }

    function imgDado(dado){ //Optimizado XD
      switch (dado){
        case 1:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_1.png?v=1565145796813";
        case 2:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_2.png?v=1565145790352";
        case 3:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_3.png?v=1565145789822";
        case 4:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_4.png?v=1565145796814";
        case 5:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_5.png?v=1565145807104";
        case 6:
          return "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDie_Blue_Azul_6.png?v=1565145796813";
        default:
          return "error";
      }
    }

    function changeMenu(card, isUp) { //permite mover la flecha del embed de edicion
      switch (card.editPosition) {
        case 0:
          if (!isUp) card.editPosition += 1;
          break;
        case 1:
        case 2:
          if (isUp) card.editPosition -= 1; else card.editPosition += 1;
          break;
        case 3:
          if (isUp) card.editPosition -= 1;

      }
    }

    function editCard(card, isPlus) { //cambia las stats dentro de la carta cuando se esta editando
      let index = card.editPosition;
      if (index === -1) return;
      if (card.points === 0 && isPlus) return;
      switch (index) {
        case 0:
          if (isPlus && card.health < 7) {
            card.health += 1;
            card.points -= 1;
          } else if (!isPlus && card.health > 3) {
            card.health -= 1;
            card.points += 1;
          }
          break;
        case 1:
          if (isPlus && card.attack < 2) {
            card.attack += 1;
            card.points -= 1;
          } else if (!isPlus && card.attack > -2) {
            card.attack -= 1;
            card.points += 1;
          }
          break;
        case 2:
          if (isPlus && card.defence < 2) {
            card.defence += 1;
            card.points -= 1;
          } else if (!isPlus && card.defence > -2) {
            card.defence -= 1;
            card.points += 1;
          }
          break;
        case 3:
          if (isPlus && card.evasion < 2) {
            card.evasion += 1;
            card.points -= 1;
          } else if (!isPlus && card.evasion > -2) {
            card.evasion -= 1;
            card.points += 1;
          }
          break;
      }
    }

    function clearTimeOut(channel) {
      Timeout.clear(`battlegame.${channel}`);
  }

  function setTimeOut(channel) {
      clearTimeOut(channel);
      Timeout.set(`oj_game.${channel}`, () => {
          dbBattle.delete(channel);
          channel.send("Duelo cancelado por inactividad!")
      }, 30000);
  }

    async function showUserCard(userId, message) {  //muestra la carta del usuario y agrega las reactions tanto para entrar a edicion como para editar
      let tmpCard = JSON.parse(JSON.stringify(await dbCards.get(userId)));
      let cardMessage = await message.channel.send("Si deseas editar tu carta usa ✏",createEmbed(message.author.tag, tmpCard));
      const cardCollector = cardMessage.createReactionCollector((reaction, user) => {
        return reaction.emoji.name === "✏" && user.id === userId && !user.bot
      });
      cardCollector.on("collect", async () => {  // ✏ ➕ ➖ 🔼 🔽 ✅ ❌
        cardMessage.delete();
        tmpCard.editPosition = 0;
        await message.channel.send("Si no sabes editar la carta, usa "+prefix+"oj_help "+message.author+"\n**Recuerda guardar tus cambios antes de irte**")
        let editionMessage = await message.channel.send(createEmbed(message.author.tag, tmpCard));
        const editionCollector = editionMessage.createReactionCollector((reaction, user) => {
          return (reaction.emoji.name === "➕" || reaction.emoji.name === "➖" || reaction.emoji.name === "🔼" || reaction.emoji.name === "🔽" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌"
          ) && user.id === userId && !user.bot
        });
        editionCollector.on("collect", async (reaction, collector) => {
          switch (reaction.emoji.name) {
            case "➕":
              editCard(tmpCard, true);
              await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
              break;
            case "➖":
              editCard(tmpCard, false);
              await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
              break;
            case "🔼":
              changeMenu(tmpCard, true);
              await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
              break;
            case "🔽":
              changeMenu(tmpCard, false);
              await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
              break;
            case "✅":
              tmpCard.editPosition = -1;
              dbCards.set(userId, tmpCard);
              editionMessage.delete();
              editionMessage.channel.send(`Cambios guardados <@${userId}>`);
              await showUserCard(userId, message);
              break;
            case "❌":
              tmpCard.editPosition = -1;
              editionMessage.delete();
              await showUserCard(userId, message);
              break;
          }
        });
        await editionMessage.react("➕");
        await editionMessage.react("➖");
        await editionMessage.react("🔼");
        await editionMessage.react("🔽");
        await editionMessage.react("✅");
        await editionMessage.react("❌");
      });
      await cardMessage.react("✏");
    }

    // COMANDOS

    if(isCommand("oj_help")){ //manda DM con la info sobre este juego
      let ojHelpEmbed = new Discord.RichEmbed()
      .setTitle("INSERTAR NOMBRE DEL JUEGO")
      .setColor("#1B8D2C")
      .addField("🔰 **Cartas**","_ _",false)
      .addField("🔹 "+prefix+"oj_card", "Te permite ver tu carta y si usas la reaction ✏ entraras en la interfaz para editarla.", false)
      .addField("🔹 "+prefix+"restart_card", "Devuelve tu carta a los valores predeterminados.",false)
      .addField("🔹 Edicion de cartas","A partir de la carta inicial puedes repartir tus puntos entre tus skills,"+
                " pero **solo** puedes sumar o restar 2 puntos a cada skill **a partir del valor predeterminado.**"+
                "\n||(tu vida **solo** puede estar entre 3 y 7, y tu ataque, defensa y evasion entre -2 y 2)||"+
                "\n\n__Para repartir los puntos usa las reacciones que aparecen en el mensaje:__"+
                "\n🔼🔽 para seleccionar la skill que deseas cambiar."+
                "\n➕➖ para sumar o restar puntos a cada skill seleccionada."+
                "\n✅ o ❌ para guardar o cancelar los cambios que hayas realizado.")
      .addBlankField()
      .addField("🔰 **Peleas**","_ _",false)
      .addField("🔸 "+prefix+"oj_fight","COMANDO NO TERMINADO", false)
      .addField("🔸 "+prefix+"oj_accept","COMANDO NO TERMINADO", false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      message.author.send(ojHelpEmbed)
      message.channel.send("DM enviado "+ message.author)
    }

    if (isCommand("oj_card")) { //En caso de k el usuario no posea una carta genera una standart y la muestra, o si ya la tiene, la muestr
      if (!dbCards.has(message.author.id))
        await dbCards.set(message.author.id, {
          editPosition: -1,
          health: 5,
          attack: 0,
          defence: 0,
          evasion: 0,
          points: 1
        });
      await showUserCard(message.author.id, message)
    }

    if(isCommand("restart_card")){ //devuelve la carta del usuario a la carta standart
      dbCards.set(message.author.id,{
        editPosition: -1,
        health: 5,
        attack: 0,
        defence: 0,
        evasion: 0,
        points: 1
      })
      message.channel.send("Tu carta ha vuelto a los valores iniciales"+message.author)
    }

    let channelId = message.channel.id;

    if(isCommand("cancel_fight")){ //borra la key correspondiente al canal de la db de pelea
      dbOjGame.delete(channelId)
      message.channel.send("La pelea en este canal se a eliminado")
    }
    if(isCommand("simulate_fight")){ //coloca datos en la db correspondientes al canal, para pruebas
      dbOjGame.set(channelId,{
        turno: 0,
        player1: 0,
        player1H: 0,
        player2: 0,
        player2H: 0
      })
      message.channel.send("DB creada para el canal, terminada la prueba usa "+prefix+"cancel_fight para resetearlo y no generar bugs")
    }

    

    if(isCommand("oj_fight")){ //comando para iniciar duelo
      if(dbOjGame.has(channelId)){
        message.channel.send(`Ya hay una partida en curso en este canal, deves esperar que termine <@${message.author.id}>`)
      } 
      /*else if(message.mention.user.first()){ //si el duelo esta dirigido a una persona
        //no se guardar una variable en memoria temporal para luego identificar si el jugador k acepta el duelo es el mencionado
      }*/
      else{
        let p1 = message.author.id; 
        let Cards = await dbCards.get(p1);
        dbOjGame.set(channelId,{
          turno: 0,
          player1: p1,
          player1H: Cards.health,
          player2: 0,
          player2H: 0 
        })
        message.channel.send(`<@${p1}> es el primer jugador. Esperando oponente (` + prefix + "oj_accept)");
        //setTimeOut(channelId);
      }
    }
    if(isCommand("oj_accept")){ //comando para aceptar un duelo iniciado
      let sameUser = await dbOjGame.get(channelId).player1;
      if(message.author.id == sameUser){
        message.channel.send(`no puedes pelear contra ti mismo <@${message.author.id}`);
      }
      else if(!dbOjGame.has(channelId)){
        message.channel.send(`No hay una partida en curso <@${message.author.id}>, usa ` + prefix + "oj_fight para crearla");
      }
      else{
        let p2 = message.author.id;
        var game = await dbOjGame.get(channelId);
        let cards = await dbCards.get(p2);
        dbOjGame.set(channelId,{
          turno: dado(2),
          player1: game.player1,
          player1H: game.player1H,
          player2: p2,
          player2H: cards.health
        })
        console.log(dbOjGame);
        var game = await dbOjGame.get(channelId);
        message.channel.send(`<@${p2}> es el segundo jugador.`);
        console.log(dbOjGame)
        //setTimeOut(channelId);
        ojPartida(game.player1, game.player2, channelId);
      }
    }

    async function ojPartida(jugador1, jugador2, channel){
      let game = await dbOjGame.get(channel);
      let turno = game.turno;
      if(turno == 1){
        return turnoAtaque(jugador1, channel);
      }
      else if(turno == 2){
        return turnoAtaque(jugador2, channel);
      }
      else{
        message.channel.send("error");
      }

    }

    async function turnoAtaque(player, canal){
      let ataque = message.channel.send(`<@${player}> ataca.`).then(async reactMessage =>{
      const ataqueCollector = ataque.createReactionCollector((reaction, user) =>{
        return (reaction.emoji.name === "⚔") && !user.bot && user.id === player
      })
      ataqueCollector.on("collect", async (reaction, collector) =>{
        if(reaction.emoji.name === "⚔"){
          return ataque(player, canal)
        }
      })
      await ataque.react("⚔")
    })
    }

    function ataque(player, channel){
      return message.channel.send(embedAtaque(player))
    }
  }
}