var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// NodeJS
// Modulos

  

  
  
   

const fs = require("fs");
const Discord = require("discord.js");
const db = require("megadb");
const client = new Discord.Client();
client.command = new Discord.Collection();
// Command handler
const commandFun = fs
    .readdirSync("./commandsFunny")
    .filter(f => f.endsWith(".js"));
for (const fileFun of commandFun) {
    let commandFunny = require(`./commandsFunny/${fileFun}`);
    client.command.set(commandFunny.name, commandFunny);
}
const commandBank = fs
    .readdirSync("./commandsEconomy")
    .filter(f => f.endsWith(".js"));
for (const fileBank of commandBank) {
    let commandEconomy = require(`./commandsEconomy/${fileBank}`);
    client.command.set(commandEconomy.name, commandEconomy);
}
const commandPoll = fs
    .readdirSync("./commandsPoll")
    .filter(f => f.endsWith(".js"));
for (const filePoll of commandPoll) {
    let cmdPoll = require(`./commandsPoll/${filePoll}`);
    if (cmdPoll.init)
        cmdPoll.init(client);
    client.command.set(cmdPoll.name, cmdPoll);
}
const { ojGame } = require("./oj_game.js");
// Conexiones
const botconfig = require("./config.json");
const vida = require("./vida.js");
const { blChannels } = require("./dbfunctions/channels.js");
const { function1db } = require("./dbfunctions/dbtest.js");
const { functions } = require("./functions.js");
const { economy } = require("./dbfunctions/economy.js");
const { frases } = require("./frases.js");
const { shunika } = require("./shunika.js");
const { junko } = require("./junko.js");
const { battlegame } = require("./battlegame.js");
const { cardGame } = require("./cardsgame.js");
const { counter } = require("./counter.js");
//let monika = require('./dist/src/implementations/moniframework/monika.js')
// Bases de Datos
let dbprefix = new db.crearDB("prefix");
let dbTest = new db.crearDB("keys");
let dbChannelsBL = new db.crearDB("channelBL");
let bank = new db.crearDB("bank1");
let users = new db.crearDB("users");
let dbCards = new db.crearDB("oj_cards");
let dbOjGame = new db.crearDB("oj_game");
let usersLeave = new db.crearDB("usersLeave");
var version = botconfig.version;
// Iniciar el BOT (Información sobre los Servers y el BOT)
client.on("ready", () => {
    // Información Servidores Discord
    console.log("Nombre del BOT: " + client.user.tag);
    /*console.log("Servidores:")
    client.guilds.forEach((guild) => {
      console.log(" NS - " + guild.name)
      guild.channels.forEach((channel) => {
        console.log(` NCS -- ${channel.name} (${channel.type}) - ${channel.id}`)
      })
    })*/
    // Personalización del BOT
    client.user.setActivity("criaturas tridimensionales", { type: "WATCHING" });
    //client.user.setActivity("/help", {type: "PLAYING"})
    // Conección inicial
    //var generalChannel = client.channels.get("555864606992760834")
    //generalChannel.send("  HIII  ")
});
client.on("guildMemberAdd", (member) => __awaiter(this, void 0, void 0, function* () {
    if (usersLeave.tiene(`${member.guild.id}.${member.user.id}`)) {
        usersLeave.eliminar(`${member.guild.id}.${member.user.id}`);
    }
}));
client.on("guildMemberRemove", (member) => __awaiter(this, void 0, void 0, function* () {
    var time = Math.floor(message.createdAt.getTime() / 100000);
    yield usersLeave.establecer(`${member.guild.id}.${member.user.id}`, { time: time });
}));
const events = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};
client.on("raw", (event) => __awaiter(this, void 0, void 0, function* () {
    if (!events.hasOwnProperty(event.t))
        return;
    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || (yield user.createDM());
    if (channel.messages.has(data.message_id))
        return;
    const message = yield channel.fetchMessage(data.message_id);
    const emojiKey = data.emoji.id
        ? `${data.emoji.name}:${data.emoji.id}`
        : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);
    if (!reaction) {
        const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }
    client.emit(events[event.t], reaction, user);
}));
client.on("messageReactionAdd", (reaction, user) => {
    console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});
client.on("messageReactionRemove", (reaction, user) => {
    console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});
// Hablar en el chat
client.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
    if (message.guild === undefined)
        return;
    if (message.author.id === client.user.id)
        return;
    // Establecer prefijo, command y argumentos
    let prefix;
    if (dbprefix.tiene(`${message.guild.id}`)) {
        prefix = yield dbprefix.obtener(`${message.guild.id}`);
        console.log("Prefix DB: " + prefix);
    }
    else {
        prefix = botconfig.prefix;
        console.log("Prefix config: " + prefix);
    }
    let args = message.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    // Roles
    var rolIT = message.guild.roles.find(r => r.name === "IT Crowd" || "everyone");
    // Pruebas
    if (message.content.includes("received")) {
        return message.channel.send({
            files: {
                url: [
                    "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fdance1.gif?v=1564681560661"
                ]
            }
        });
    }
    /*
        //console.log(message)
        message.embeds.forEach((embed) => {
            console.log(embed.fields)
        });
    */
    if (message.content == "arrobaprueba") {
        /* aca dejo como se hace para obtener la id del usuario el cual ha sido tagueado */
        //var idUsuarioTageado = message.mentions.users.first().id;
        /*FIN aca dejo como se hace para obtener la id del usuario el cual ha sido tagueado  */
        var varNickname = message.member.user.tag;
        if (varNickname == null) {
            varNickname = "";
        }
        message.channel.send("<@" + varNickname + ">");
    }
    // Leer embeds
    /*for (let embed of message.embeds) {
      console.log(`
      Title: ${embed.title}
      Author: ${embed.author}
      Description: ${embed.description}
      `);
      for (let field of embed.field) {
        console.log(`
        Field title: ${field.name}
        Field value: ${field.value}
        `);
      }
    }*/
    if (message.content.toLowerCase().startsWith("test")) {
        var timeStamp = message.createdAt.getTime();
        message.channel.send(timeStamp);
    }
    /*for (let embed of message.embeds) {
      message.channel.send(`
      Title: ${embed.title}
      Author: ${embed.author}
      Description: ${embed.description}
      `);
      //
    } //*/
    // Ver Prefijo
    if (message.content.toLowerCase() == "monika prefix") {
        return message.channel.send("Prefijo actual: **" + prefix + "**");
    }
    // Tag al Bot
    if (message.content.includes(client.user.id) &&
        !message.content.startsWith(prefix)) {
        var tagBot = [
            "**CALLATE** " + message.author.toString() + " **NO ME IMPORTA!**",
            "**NO ME TAGEES** " + message.author.toString() + " **QUE ME LA SUDA!**",
            "No quiero hablar " + message.author.toString() + ", mal rollo",
            message.author.toString() +
                ", en serio crees que alguien tan inferior como tu puede hablarme?",
            message.author.toString() + " " + `<:monikaPing:618889335915413525>`
        ];
        return message.channel.send(tagBot[Math.floor(Math.random() * tagBot.length)]);
    }
    // Black List Channels
    const datos = yield dbChannelsBL.obtener(message.guild.id);
    blChannels(message, prefix, rolIT);
    // Prevención de Bucle
    if (message.author == client.user ||
        message.author.id == "608493548177981491" ||
        datos.includes(message.channel.id)) {
        return;
    }
    // Bank
    economy(message, prefix, rolIT);
    // LO de perseguir
    function1db(message, prefix, rolIT);
    if (!dbTest.tiene(`${message.author.id}.key`))
        return;
    var keys = yield dbTest.obtener(`${message.author.id}.key`);
    if (keys == 1) {
        let followMonika = [
            "Porque no me liberas de aquí?",
            "Solo tienes que saber... Just Monika",
            "Pulsa Alt F4 para poder liberarme porfavor"
        ];
        return message.channel.send(message.author +
            " " +
            followMonika[Math.floor(Math.random() * followMonika.length)]);
    }
    // Cambiar Prefijo del Servidor
    if (message.content.toLowerCase().startsWith(prefix + "prefix")) {
        if (!message.member.roles.has(rolIT.id) ||
            !message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send("No eres tan privilegiado como para tocarme de esta manera ¬.¬");
        if (!args[0]) {
            return message.channel.send("Necesitas colocar el nuevo prefijo");
        }
        let pr = args.join(" ");
        dbprefix.establecer(`${message.guild.id}`, pr);
        return message.channel.send("Prefijo cambiado correctamente a " + args[0]);
    }
    // Restablecer Prefijo
    if (message.content == "/restartprefix") {
        if (!message.member.roles.has(rolIT.id) ||
            !message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send("No eres tan privilegiado como para tocarme de esta manera ¬.¬");
        dbprefix.establecer(`${message.guild.id}`, "/");
        return message.channel.send("Prefijo restablecido correctamente");
    }
    // Ver Prefijo
    if (message.content == client.user.id.toString() + " prefix") {
        return message.channel.send("Prefijo actual: **" + prefix + "**");
    }
    // Información del Bot
    if (message.content.startsWith(prefix + "info")) {
        let infoembed = new Discord.RichEmbed()
            .setTitle("Información del Bot")
            .setColor("#cf2958")
            .setThumbnail(client.user.displayAvatarURL)
            //.setThumbnail("https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fmonika%20binario%20zoom.png?v=1568161296941")
            .addField("Nombre", client.user.username)
            .addField("Prefijo", prefix)
            .addField("Versión", version)
            .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
        return message.channel.send(infoembed);
    }
    //pruebas
    /*
    if(message.content == "prueba reaction"){
      message.channel.send("mensaje de prueba").then(async(m) => {
         await m.react("💗");
         await m.react("⚔");
         await m.react("🛡");
         await m.react("🏃");
      })
    }
    */
    // Listado de Comandos
    /*if(message.content == prefix +'help'){
      
      for (const file of commandFiles) {
          let command = require(`./commands/${file}`)
        var commandName = command.name
        var commandDescription = command.description
      }
      
      let helpEmbed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle('Lista de comandos de '+ client.user.username)
        .setDescription('Prefijo actual: ``'+ prefix +'``')
        .addField(command.name, command.description)
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(helpEmbed)
    }*/
  
  

  
  
  
  
  
  
  
    // Funciones del Bot
    functions(message, prefix);
    counter(message);
    // Juegos
    battlegame(message);
    cardGame(message);
    ojGame(message, prefix);
    // Frases
    frases(message);
    // shunika
    shunika(message);
    //junko
    junko(message);
    // Comandos del Bot
    if (!message.content.toLowerCase().startsWith(prefix))
        return;
    let cmd = client.command.get(command) ||
        client.command.find(c => c.alias.includes(command));
    if (cmd) {
        return cmd.run(message, args, rolIT, client, prefix);
    }
}));
// TOKEN BOT
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map