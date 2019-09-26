const Discord = require('discord.js');
const db = require('megadb');
const https = require('https');
const botconfig = require('./../config.json');
let pollsDB = new db.crearDB('polls');
let client = new Discord.Client();
let polls = new Map();
let regex = /.(\w+)(?: -r\((.*)\))? ((?:\d+\w)+) (.*)/g;
let timeReg = /(\d+)(\w)/g;
let creationError = "Has creado mal la encuesta... en serio eres alguien tan inferior que no puedes ni crear una sencilla encuesta?";
let cmdName = 'p';
let alias = ['pa', 'pv', 'pav', 'pva']

client.login(botconfig.token);

// Init timeouts
/*
client.on('ready', async () => {
  console.log(`Setting up ${pollsDB.size()} polls`);

  for (const id of pollsDB.keys()) { // Hay un error "TypeError: pollsDB.keys(...) is not a function or its return value is not iterable"
    var poll = await pollsDB.get(id); // Te lo comento porque peta todo el código sino
    setUpPollExpiration(poll.expiresAt, id);
  }
});
*/

module.exports = {
  name: cmdName,
  alias: alias,
  description: 'Crea una encuesta con varias opciones',
  run: async (message) => {
    if (message.guild === undefined){
      message.channel.send("Necesitas estar en un servidor para utilizar esta función");
      return;
    }

    /*
    Command:
      /p(av) -r(list of roles separated by |)(optional) time(ex 1h5m) title
      options separated by newlines
    */

    var command = message.content.split('\n');
    var commandDef = command.shift();
    if (command.length <= 1){
      if (message.attachments.size < 1 || (command = parseAttachments(message.attachments) === undefined)){
        message.channel.send(`Att: ${creationError}`);
        return;
      }
    }

    var groups = regex.exec(commandDef);
    groups.shift();
    if (groups.length != 4){
      message.channel.send(`Reg: ${creationError}`);
      return;
    }

    var poll = {
      author: message.author.id,
      server: message.guild.id,
      createdAt: new Date().toJSON(),
      expiresAt: null,
      title: groups[3],
      roles: [],
      options: {},
      usersVoted: [],
      visible: false,
      anonymous: false
    };

    setUpPollCommand(poll, groups[0]);

    var errorRoles = setUpPollRoles(message.guild, poll, groups[1]);
    if (errorRoles.length > 0){
      message.channel.send(`Te estoy vigilando ${message.author.toString()}... En serio pensabas que me puedes engañar? ESTOS ROLES NO EXISTEN: ${errorRoles.join(', ')}`);
      return;
    }

    setUpOptions(poll, command);

    var nextId = pollsDB.has('idGen') ? await pollsDB.get('idGen') : 1;
    if (!parseExpiration(nextId.toString(), poll, groups[2])){
      message.channel.send('Oops, parece que algo raro me ha ocurrido... Ire a quejarme a shu un rato :heart_eyes:, vuelve a introducir el comando mientras tanto');
      return;
    }

    pollsDB.set('idGen', nextId + 1);
    pollsDB.set(nextId.toString(), poll);
    
    message.channel.send(`¡Encuesta creada con exito! Usa /v ${nextId} "la opcion que mas te guste" para votar en ella. Si quieres ver las opciones y los resultados,
    si estan visibles usa /v ${nextId} unicamente... Quieres algo mas o me vas a tener aqui esperando todo el dia? VOTA!`);
  }
}

// Timeout function
async function expiredPoll(pollId) {
  var poll = await pollsDB.get(pollId);
  pollsDB.delete(pollId);
  var results = new Map([...Object.entries(poll.options)].sort((a, b) => b[1] - a[1]));
  var message = "";
  var i = 1;
  for (let [k, v] of results) {
    message += `${i++}: ¡"${k}" acaba con ${v} votos!\n`;
  }

  var user = await client.fetchUser(poll.author);

  client.users.get(poll.author).send(`Encuesta ${poll.title} finalizada con los siguientes resultados:\n${message}`);
  poll.delete(pollId);
}

function setUpPollCommand(poll, commandName){
  for (let c of commandName) {
    switch (c) {
      case 'a':
        poll.anonymous = true;
        break;
      case 'v':
        poll.visible = true;
      default:
        break;
    }
  }
}

function setUpPollRoles(server, poll, roleStr){
  var errorRoles = [];
  if (roleStr === undefined) return errorRoles;

  var roles = roleStr.split('|');
  for (let role of roles) {
    if (role === "") continue;

    if (server.roles.find(r => r.name === role)){
      poll.roles.push(role);
    } else{
      errorRoles.push(role);
    }
  }

  return errorRoles;
}

function setUpOptions(poll, options){
  for (let o of options) {
    poll.options[o] = 0;
  }
}

function parseExpiration(pollId, poll, expirationRange){
  let mapping = {
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60,
    s: 1
  };

  // Parses from string to seconds
  var expirationRangeParsed = 0;
  var result;
  while((result = timeReg.exec(expirationRange)) !== null){
    if (result.length != 3) return false;

    expirationRangeParsed += parseInt(result[1]) * mapping[result[2]];
  }

  var expire = new Date();
  expire.setSeconds(expirationRangeParsed);
  poll.expiresAt = expire.toJSON();

  return setUpPollExpiration(expire, pollId);
}

// Creates the poll timeout
function setUpPollExpiration(expireDate, id) {
  var expireDateMs = undefined;
  if (expireDate instanceof String){
    expireDateMs = new Date(expireDate).getTime();
  } else if (expireDate instanceof Date){
    expireDateMs = expireDate.getTime();
  } else return false;

  // TODO: Check why this difference is negative...
  var remainingMs = expireDateMs - new Date().getTime();
  console.log(remainingMs);
  polls[id] = setTimeout(expiredPoll.bind(null, id), remainingMs);

  return true;
}

function parseAttachments(attachments){
  var data = '';
  for (let att of attachments) {
    https.get(att.URL, (resp) => {
      let single = '';
      resp.on('data', (chunk) => {
        single += chunk;
      });
      resp.on('end', () => data += single);
    })
  }

  return data.split('\n');
}