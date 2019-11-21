const Discord = require('discord.js');
const db = require('megadb');
var bank = new db.crearDB("bank1");
let fees = new Map();
let client;

module.exports = {
  name:'impuestos',
  alias:[],
  description:'Cobrar impuestos',

  init: async indexClient => {
    initClient(indexClient);
  },
  
  run: async (message, args, rolIT, client) => {
    // if (message.guild.id == '545720855578279958'){
    //   var clubes = [
    //     [message.guild.roles.get('552699845459181598').members.map(m => m.user.id)], // Sin Voz
    //     [message.guild.roles.get('552699727246917650').members.map(m => m.user.id)], // Fate
    //     [message.guild.roles.get('553453412826611742').members.map(m => m.user.id)], // Oreo
    //     [message.guild.roles.get('555402664301690883').members.map(m => m.user.id)], // Henculto
    //     [message.guild.roles.get('552693694298456064').members.map(m => m.user.id)], // Artistas
    //     [message.guild.roles.get('552699809811922944').members.map(m => m.user.id)], // Monogatari
    //     [message.guild.roles.get('552699907618635776').members.map(m => m.user.id)], // Toldboden
    //     [message.guild.roles.get('553451609107988480').members.map(m => m.user.id)], // Battleroyale
    //     [message.guild.roles.get('554884633699811329').members.map(m => m.user.id)], // Scriptio
    //     [message.guild.roles.get('555607531645435906').members.map(m => m.user.id)], // IT Crowd
    //     [message.guild.roles.get('568989794877833391').members.map(m => m.user.id)] // Nocturnos
    //     //[message.guild.roles.get('553451557493145611').members.map(m => m.user.id)]  // Esperanzas
    //   ]
    // } else if (message.guild.id == '606076389422268416'){
    //   var clubes = [
    //     message.guild.roles.get('621022534527352832').members.map(m => m.user.id), // IT Dev
    //     message.guild.roles.get('606076887650795532').members.map(m => m.user.id), // IT Crowd
    //     message.guild.roles.get('623920633302220820').members.map(m => m.user.id)  // Junko
    //   ]
    // }
    
    // for (let i = 0; i < clubes.length; i++) {
    //   const miembros = clubes[i];
    //   for (let j = 0; j < miembros.length; j++) {
    //     const usuario = clubes[i][j];
    //     console.log(usuario);
    //     bank.sumar(`${message.guild.id}.bank.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***sumar*** => " + error +" => "+usuario))
    //     bank.restar(`${message.guild.id}.${usuario}.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***restar*** => " + error + " => " + usuario))
    //     let bal = await bank.obtener(`${message.guild.id}.${usuario}.money`).catch(error => message.channel.send("Error al hacer impuestos ***balance*** => " + error + " => " + usuario))
    //     if (bal < 0){
    //       message.channel.send(`<@${usuario}> ${bal}`)
    //     }
    //   }
      
    // }
    setup(message, args);
  }
}

function initClient(indexClient) {
  indexClient.on('ready', async () => {
    if (!bank.has('paydays')) {
      bank.set('paydays', {});
      return;
    }
    var globalConfig = await bank.get('paydays');
    for (const [_, guildConfig] of Object.entries(globalConfig)) {
      setExpiration(guildConfig);
    }
  });
  client = indexClient;
}

async function setup(message, args) {
  if (!bank.has('paydays')) bank.set('paydays', {});
  if (args.length === 0) {
    message.channel.send('No sabes usar esto bien. Intenta poner el comando de forma parecida: /impuestos "dia del mes" "canal donde escribir los mensajes de impuestos"');
    return;
  }
  let paydays = await bank.get('paydays');
  if (paydays[message.guild.id]) {
    let payday = paydays[message.guild.id];
    if (message.member.highestRole.position - message.guild.roles.get(payday.role).position < 0) {
      message.channel.send('No tienes permisos para alterar el orden del sistema.');
      return;
    }
  }

  if (args[0] === 'clear') {
    paydays[message.guild.id] = undefined;
    bank.set('paydays', paydays);
    if (fees.has(message.guild.id)) clearTimeout(fees.get(message.guild.id));
    return;
  }

  let config = {
    expireDay: args[0],
    guild: message.guild.id,
    channel: args.length > 1 && message.mentions.channels.size === 1
              ? message.mentions.channels.first().id
              : undefined,
    role: message.member.highestRole.id,
    expirationLeft: 0
  }
  paydays[message.guild.id] = config;
  bank.set('paydays', paydays);
  if (fees.has(config.guild)) clearTimeout(fees.get(config.guild));
  setExpiration(config);
}

function setExpiration(config, month) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  if (month === undefined) month = today.getUTCMonth();
  let maxMonthDay = new Date(today.getUTCFullYear(), today.getUTCMonth(), 0).getDate();
  let expireDay = Math.min(maxMonthDay, config.expireDay);
  let expirationTime = new Date(today.getUTCFullYear(),
                                month + (expireDay >= today.getDate() ? 0 : 1),
                                expireDay,
                                0).getTime() - today.getTime();
  config.expirationLeft = expirationTime;
  fees.set(config.guild, setTimeout(checkExpiration.bind(null, config), Math.min(60000, expirationTime)));
}

function checkExpiration(config) {
  if (config.expirationLeft <= 0) payday(config);
  else {
    config.expirationLeft -= Math.min(60000, config.expirationLeft);
    bank.set(`paydays.${config.guild}`, config);
    fees.set(config.guild, setTimeout(checkExpiration.bind(null, config), Math.min(60000, config.expirationLeft)));
  }
}

async function payday(config) {
  let guild = client.guilds.get(config.guild);
  let channel = config.channel !== undefined
                ? client.channels.get(config.channel)
                : dummyChannel();
  if (guild.id == '545720855578279958'){
    var clubes = [
      [guild.roles.get('552699845459181598').members.map(m => m.user.id)], // Sin Voz
      [guild.roles.get('552699727246917650').members.map(m => m.user.id)], // Fate
      [guild.roles.get('553453412826611742').members.map(m => m.user.id)], // Oreo
      [guild.roles.get('555402664301690883').members.map(m => m.user.id)], // Henculto
      [guild.roles.get('552693694298456064').members.map(m => m.user.id)], // Artistas
      [guild.roles.get('552699809811922944').members.map(m => m.user.id)], // Monogatari
      [guild.roles.get('552699907618635776').members.map(m => m.user.id)], // Toldboden
      [guild.roles.get('553451609107988480').members.map(m => m.user.id)], // Battleroyale
      [guild.roles.get('554884633699811329').members.map(m => m.user.id)], // Scriptio
      [guild.roles.get('555607531645435906').members.map(m => m.user.id)], // IT Crowd
      [guild.roles.get('568989794877833391').members.map(m => m.user.id)] // Nocturnos
      //[guild.roles.get('553451557493145611').members.map(m => m.user.id)]  // Esperanzas
    ]
  } else if (guild.id == '606076389422268416'){
    var clubes = [
      guild.roles.get('621022534527352832').members.map(m => m.user.id), // IT Dev
      guild.roles.get('606076887650795532').members.map(m => m.user.id), // IT Crowd
      guild.roles.get('623920633302220820').members.map(m => m.user.id)  // Junko
    ]
  }
  
  for (let i = 0; i < clubes.length; i++) {
    const miembros = clubes[i];
    for (let j = 0; j < miembros.length; j++) {
      const usuario = clubes[i][j];
      //console.log(usuario);
      bank.sumar(`${guild.id}.bank.money`, 50000).catch(error => channel.send("Error al hacer impuestos ***sumar*** => " + error +" => "+usuario))
      bank.restar(`${guild.id}.${usuario}.money`, 50000).catch(error => channel.send("Error al hacer impuestos ***restar*** => " + error + " => " + usuario))
      let bal = await bank.obtener(`${guild.id}.${usuario}.money`).catch(error => channel.send("Error al hacer impuestos ***balance*** => " + error + " => " + usuario))
      if (bal < 0 && channel){
        channel.send(`<@${usuario}> ${bal}`)
      }
    }
    
  }
  setExpiration(config, new Date().getUTCMonth() + 1);
}

function dummyChannel(guild) {
  let dummy = {};
  dummy.send = function(msg) {
    console.log(`${guild}: ${msg}`);
  }
  return dummy;
}