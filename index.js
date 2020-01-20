// ------- IT CROWD ------- //

// Modulos
const fs = require('fs')
const Discord = require('discord.js')
const db = require('megadb')
const ydtl = require("ytdl-core")
const ffmpeg = require("ffmpeg")

const client = new Discord.Client()
client.command = new Discord.Collection()



// Command handler
const commandFun = fs
  .readdirSync("./commandsFunny")
  .filter(f => f.endsWith(".js"));

for (const fileFun of commandFun) {
  let commandFunny = require(`./commandsFunny/${fileFun}`);
  client.command.set(commandFunny.name, commandFunny);
}


const commandBank = fs
  .readdirSync("./commandsBank")
  .filter(f => f.endsWith(".js"));

for (const fileBank of commandBank) {
  let commandEconomy = require(`./commandsBank/${fileBank}`);
  if (commandEconomy.init) commandEconomy.init(client);
  client.command.set(commandEconomy.name, commandEconomy);
}


const commandPoll = fs
  .readdirSync("./commandsPoll")
  .filter(f => f.endsWith(".js"));

for (const filePoll of commandPoll) {
  let cmdPoll = require(`./commandsPoll/${filePoll}`);
  if (cmdPoll.init) cmdPoll.init(client);
  client.command.set(cmdPoll.name, cmdPoll);
}



// Connections
const botconfig = require('./config.json')
const vida = require('./vida.js')

const { blChannels } = require("./dbfunctions/channels.js");
const { followUsers } = require("./dbfunctions/followUser.js");
const { economy } = require("./dbfunctions/economy.js");

const { functions } = require("./functions.js");
const { shunika } = require("./shunika.js");
const { frases } = require("./frases.js");

const { battlegame } = require("./battlegame.js");
const { snowFight } = require("./snow.js");

const { ojGame } = require("./oj/oj_game.js");
const { cardGame } = require("./oj/cardsgame.js");

const { music } = require("./music.js");

// Bases de Datos
let dbprefix = new db.crearDB('prefix')
let dbChannelsBL = new db.crearDB("channelBL");

let bank = new db.crearDB('bank')
let tienda = new db.crearDB('tienda')
var work = new db.crearDB("work");

let dbFollow = new db.crearDB('followUsers')

let dbBattle = new db.crearDB('battle');

let dbCards = new db.crearDB('oj_cards');
let dbOjGame = new db.crearDB('oj_game');
let dbUserCards = new db.crearDB('user_cards');

let pollsDB = new db.crearDB('polls');

var version = botconfig.version



// Iniciar el BOT (Información sobre los Servers y el BOT)
client.on('ready', () => {
  // Información Servidores Discord
  console.log("Nombre del BOT: " + client.user.tag)

  // Personalización del BOT
  client.user.setActivity("criaturas tridimensionales", {type: "WATCHING"})
  
})



// Auditoria de reacciones
const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};

client.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;

  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel =
    client.channels.get(data.channel_id) || (await user.createDM());

  if (channel.messages.has(data.message_id)) return;

  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = data.emoji.id
    ? `${data.emoji.name}:${data.emoji.id}`
    : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);

  if (!reaction) {
    const emoji = new Discord.Emoji(
      client.guilds.get(data.guild_id),
      data.emoji
    );
    reaction = new Discord.MessageReaction(
      message,
      emoji,
      1,
      data.user_id === client.user.id
    );
  }

  client.emit(events[event.t], reaction, user);
});

client.on("messageReactionAdd", (reaction, user) => {
  //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});

client.on("messageReactionRemove", (reaction, user) => {
  //console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});



// Ejecución
client.on('message', async (message) => {
  return
  
  //console.log("User ID: " + message.author.username, message.author.id);
  if (message.guild === undefined) return;
  if (message.author.id === client.user.id) return;
  if (message.channel.id == "562285619435536424") return; // contar numeros
  if (message.channel.id == "588569991847084042") return // contar historias entre todos

  // Configuración del prefijo y comandos
  let prefix

  if(dbprefix.tiene(`${message.guild.id}`)){
    prefix = await dbprefix.obtener(`${message.guild.id}`)
    // console.log('Prefix DB: '+prefix)
  }else{
    prefix = botconfig.prefix
    // console.log('Prefix base: '+prefix)
  }

  message.prefix = prefix

  let randomMitad = Math.floor(Math.random() * (2 - 1 + 1)) + 1
  let randomCuarto = Math.floor(Math.random() * (1 - 4)) + 4

  const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
  

  // Roles
  var rolIT = message.guild.roles.get("641716726236577792") || message.guild.roles.find(r => r.name === "IT Crowd") || message.guild.roles.find(r => r.name === "everyone")

  // Ver Prefijo
  if (message.content.toLowerCase() == 'monika prefix' || message.content == client.user.id.toString() + " prefix") {
    return message.channel.send('Prefijo actual: **'+prefix+'**')
  }


if (message.guild.id == "545720855578279958" || message.guild.id == "606076389422268416") {
	economy(message,args, prefix, rolIT);
}
  // Tag al Bot
  if (message.content.includes(client.user.id) && !message.content.startsWith(prefix) && !message.content.startsWith("%") && randomMitad == 2) {
    var tagBot = [
      "**CALLATE** " + message.author.toString() + " **NO ME IMPORTA!**",
      "**NO ME TAGEES** " + message.author.toString() + " **QUE ME LA SUDA!**",
      "No quiero hablar " + message.author.toString() + ", mal rollo",
      message.author.toString() + ", en serio crees que alguien tan inferior como tu puede hablarme?",
      message.author.toString() + ` <:monikaPing:618889335915413525>`
    ];
    return message.channel.send(tagBot[Math.floor(Math.random() * tagBot.length)])
  }


  // Black List Channels
  blChannels(message, prefix, rolIT);
  const datos = await dbChannelsBL.obtener(message.guild.id)


  // Prevención de Bucles y canales
  if (
    message.author == client.user || 
    message.author.id == "555866523336572965" || 
    datos.includes(message.channel.id)
    //message.author.bot
  ) {
    return
  }
 
  //message.guild.members.get("423386107187560468").setNickname("No soy Natsu723")

  // Comando para feedback
  if (message.content.toLowerCase().startsWith(prefix +'feed')) {
    if (!args[0]) return message.channel.send('Te falta escribir la sugerencia')
    let embedFeed = await new Discord.RichEmbed()
    .setColor('#0099ff')
    .addField('User', message.author + " "+ message.author.id)
    .addField('Suggest', args.join(" "))
    .setTimestamp()
    
    client.guilds.get("606076389422268416").channels.get("606078194000461824").send(embedFeed).then(m => {
      m.react(client.emojis.get("621493290226941952"))
      m.react(client.emojis.get("621493343972491283"))
      m.react(client.emojis.get("621493322451517450"))
    }).then(message.channel.send('Sugerencia enviada exitosamente '+ message.author +'!')).catch(err => message.channel.send(err))
  }
  
  if (message.content.toLowerCase().startsWith(prefix +'bug')) {
    if (!args[0]) return message.channel.send('Te falta escribir el fallo')
    let embedFeed = await new Discord.RichEmbed()
    .setColor('#0099ff')
    .addField('User', message.author)
    .addField('ID', message.author.id, true)
    .addField('Reporte', args.join(" "))
    .setTimestamp()
    
    client.guilds.get("606076389422268416").channels.get("639839345032822824").send(embedFeed)
    return message.channel.send('Reporte enviado exitosamente '+ message.author +'!')
  }
       
  
  // Cambiar Prefijo del Servidor
  if (message.content.toLowerCase().startsWith(prefix+'prefix')) {
    if(!message.member.roles.has(rolIT.id))
      return message.channel.send("No tienes persmisos para cambiar el prefijo")
    if(!args[0]) {
      return message.channel.send("Necesitas colocar el nuevo prefijo")
    }

    let pr = args.join(' ')
    dbprefix.establecer(`${message.guild.id}`, pr)
      return message.channel.send("Prefijo cambiado correctamente a "+ args[0])
  }


  // Restablecer Prefijo
  if (message.content == '/restartprefix'){
    if (!message.member.roles.has(rolIT.id) || !message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("No eres tan privilegiado como para tocarme de esta manera ¬w¬");
    dbprefix.establecer(`${message.guild.id}`, "/")
    return message.channel.send("Prefijo restablecido correctamente a ``/``")
  }


  // Información del Bot
  if (message.content.startsWith(prefix +"info")){

    let infoembed = new Discord.RichEmbed()
      .setTitle("Información del Bot")
      .setColor("#cf2958")
      .setThumbnail(client.user.displayAvatarURL)
      .addField("Nombre", client.user.username)
      .addField("Prefijo", prefix)
      .addField("Versión", version)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

    return message.channel.send(infoembed)
  }

  // Perseguir a Von
  if (message.author.id == "548655370181279749" && !message.content.startsWith(prefix)) {
    var followVon = [message.author + " Te estoy vigilando", message.author + " No se desconecte aún", message.author + " Pervertido", message.author + " Deja estar los malditos mensajes cifrados", "Estoy aquí " + message.author, message.author + " Termina lo que dices"]
    return message.channel.send(followVon[Math.floor(Math.random() * followVon.length)])
  }

  // Funciones del Bot
  frases(message, client)
  functions(message, args)
  if (message.author.bot) return
  battlegame(message);
  music(message, prefix, rolIT);

  ojGame(message, prefix);
  cardGame(message);
  snowFight(message);

  
  followUsers(message, prefix, rolIT);

  var keys = await dbFollow.obtener(`${message.author.id}.key`);
  

  // Comandos del Bot
  if (!message.content.toLowerCase().startsWith(prefix) || message.content.toLowerCase().startsWith(prefix+"snow")) return;
  let cmd = client.command.get(command) || client.command.find(c => c.alias.includes(command));
  if (cmd && message.content.toLowerCase().startsWith(prefix)) {
    // let alias = cmd.alias;
    // let name = cmd.name;
    // let description = cmd.description;
    // console.log(alias, name, description)
    return cmd.run(message, args, rolIT, client, prefix);
  }

  //shunika(message);
  
  

  // Follow User
  

  if (keys == 1) {
    let followMonika = [
      "Porque no me liberas de aquí?",
      "Solo tienes que saber... Just Monika",
      "Pulsa Alt F4 para poder liberarme porfavor",
      "Dos veces hacia atrás para liberarme de este cruel sitio",
      "otaku",
      "<a:JustMonika:571827698058526740>",
      "\n<a:monikaDance1:640681784039964695>\n<a:monikaDance2:640681807901097984>\n<a:monikaDance3:640681818332332049>\n<a:monikaDance4:640681830236028928>"
    ];

    return message.channel.send(
      message.author + " " + followMonika[Math.floor(Math.random() * followMonika.length)]
    );
  }

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  
  return;

})


// TOKEN BOT
client.login(botconfig.token)
