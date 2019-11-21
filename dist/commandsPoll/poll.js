var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Discord = require('discord.js');
const db = require('megadb');
const https = require('https');
const botconfig = require('./../config.json');
let pollsDB = new db.crearDB('polls');
let dbprefix = new db.crearDB('prefix');
let client; // = new Discord.Client();
let polls = new Map();
let regex = /.(\w+)(?: -r\((.*)\))? ((?:\d+\w)+) (.*)/;
let regexHelp = /.\w+ \?|(?:help)/;
let timeReg = /(\d+)(\w)/g;
let creationError = 'Has creado mal la encuesta... ¿En serio eres alguien tan inferior que no puedes ni crear una sencilla encuesta?';
let cmdName = 'p';
let alias = ['pa', 'pv', 'pav', 'pva'];
// client.login(process.env.TOKEN);
// // Init timeouts
// client.on('ready', async () => {
//   console.log(`Setting up ${pollsDB.size() - 1} polls`);
//   for (const id of await pollsDB.keys()) {
//     var poll = await pollsDB.get(id);
//     setUpPollExpiration(poll.expiresAt, id);
//   }
// });
// client.on('pollRemove', pollId => {
//   if (!pollSVGAnimatedBoolean.has(pollId)) return;
//   console.log(`Removing poll ${pollId}`);
//   clearTimeout(polls.get(pollId));
//   polls.delete(pollId);
//   pollsDB.delete(pollId);
// });
module.exports = {
    name: cmdName,
    alias: alias,
    description: 'Crea una encuesta con varias opciones',
    init: (clientTest) => __awaiter(this, void 0, void 0, function* () {
        clientTest.on('ready', () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Setting up ${pollsDB.size() - 1} polls`);
            for (const id of yield pollsDB.keys()) {
                var poll = yield pollsDB.get(id);
                setUpPollExpiration(poll.expiresAt, id);
            }
        }));
        clientTest.on('pollRemove', pollId => {
            if (!pollsDB.has(pollId))
                return;
            console.log(`Removing poll ${pollId}`);
            clearTimeout(polls.get(pollId));
            polls.delete(pollId);
            pollsDB.delete(pollId);
        });
        client = clientTest;
    }),
    run: (message, _, __, removeClient) => __awaiter(this, void 0, void 0, function* () {
        if (message.guild === undefined) {
            message.channel.send('Ara, ara... Necesitas estar en un servidor para utilizar esta función');
            return;
        }
        var help = regexHelp.exec(message.content);
        if (help !== undefined && help != null && help.length == 1) {
            displayHelp(message);
            return;
        }
        /*
        Command:
          /p(av) -r(list of roles separated by |)(optional) time(ex 1h5m) title
          options separated by newlines
        */
        var command = message.content.split('\n');
        var commandDef = command.shift();
        if (command.length <= 1) {
            if (message.attachments.size < 1) {
                displayHelp(message, creationError);
                return;
            }
            else {
                command = yield parseAttachments(message.attachments.first());
                if (!command || command === undefined) {
                    displayHelp(message, creationError);
                    return;
                }
            }
        }
        var groups = regex.exec(commandDef);
        if (groups === undefined || groups === null || groups.length != 5) {
            displayHelp(message, creationError);
            return;
        }
        groups.shift();
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
        setUpPollCommandOptions(poll, groups[0]);
        var errorRoles = setUpPollRoles(message.guild, poll, groups[1]);
        if (errorRoles.length > 0) {
            message.channel.send(`Te estoy vigilando ${message.author.toString()}... ¿En serio pensabas que me puedes engañar? ESTOS ROLES NO EXISTEN: ${errorRoles.join(', ')}`);
            return;
        }
        setUpOptions(poll, command);
        var nextId = pollsDB.has('idGen') ? yield pollsDB.get('idGen') : 1;
        if (!parseExpiration(nextId.toString(), poll, groups[2])) {
            message.channel.send('Oops, parece que algo raro me ha ocurrido... Iré a quejarme a shu un rato :heart_eyes:, vuelve a introducir el comando mientras tanto');
            return;
        }
        pollsDB.set('idGen', nextId + 1);
        pollsDB.set(nextId.toString(), poll);
        message.channel.send(`¡Encuesta creada con éxito! Usa /v ${nextId} "la opción que mas te guste sin las comillas" para votar en ella. Si quieres ver las opciones y los resultados, solo si están visibles, usa /v ${nextId} únicamente... ¿Quieres algo más o me vas a tener aquí esperando todo el día? ¡VOTA!`);
    })
};
// Timeout function
function expiredPoll(pollId) {
    return __awaiter(this, void 0, void 0, function* () {
        var poll = yield pollsDB.get(pollId);
        pollsDB.delete(pollId);
        var results = new Map([...Object.entries(poll.options)].sort((a, b) => b[1] - a[1]));
        var message = '';
        var i = 1;
        for (let [k, v] of results) {
            message += `${i++}: ¡"${k}" acaba con ${v} votos!\n`;
        }
        var user = yield client.fetchUser(poll.author);
        user.send(`Encuesta ${poll.title} finalizada con los siguientes resultados:\n${message}`);
        polls.delete(pollId);
    });
}
function setUpPollCommandOptions(poll, commandName) {
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
function setUpPollRoles(server, poll, roleStr) {
    var errorRoles = [];
    if (roleStr === undefined)
        return errorRoles;
    var roles = roleStr.split('|');
    for (let role of roles) {
        if (role === '')
            continue;
        if (server.roles.find(r => r.name === role)) {
            poll.roles.push(role);
        }
        else {
            errorRoles.push(role);
        }
    }
    return errorRoles;
}
function setUpOptions(poll, options) {
    for (let o of options) {
        poll.options[o] = 0;
        console.log(o.split(''));
    }
}
function parseExpiration(pollId, poll, expirationRange) {
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
    while ((result = timeReg.exec(expirationRange)) !== null) {
        if (result.length != 3)
            return false;
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
    if (isType(expireDate, String)) {
        expireDateMs = new Date(expireDate).getTime();
    }
    else if (isType(expireDate, Date)) {
        expireDateMs = expireDate.getTime();
    }
    else
        return false;
    var remainingMs = expireDateMs - new Date().getTime();
    polls.set(id, setTimeout(expiredPoll.bind(null, id), remainingMs));
    return true;
}
function parseAttachments(att) {
    return new Promise((resolve, _) => {
        https.get(att.url, resp => {
            let single = '';
            resp.on('data', chunk => {
                single += chunk;
            });
            resp.on('end', () => {
                resolve(single.replace(/\r+/g, '').split('\n'));
            });
        });
    });
}
function displayHelp(message, error = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error != undefined)
            message.channel.send(error);
        let prefix = dbprefix.has(`${message.guild.id}`) ? yield dbprefix.get(`${message.guild.id}`) : botconfig.prefix;
        let embed = new Discord.RichEmbed()
            .setTitle('Creación de encuestas')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor(0xff9626)
            .setDescription(`Para crear la encuesta tienes que utilizar el siguiente comando: ${prefix}pav -r(rol1|rol2|...) 1w1d1h1m1s titulo\nopcion1\nopcion2\n...`)
            .setFooter('Encuestas', client.user.avatarURL)
            .setTimestamp()
            .addField('pav', 'El comando "P" genera la encuesta. La opción "A" indica si la encuesta es anónimca. La opción "V" indica si los resultados son visibles.', true)
            .addField('-r(rol1|rol2|...)', 'Indica los roles que pueden votar en la encuesta. Los roles deben estar separados por el carácter |. Este parámetro es opcional, si se omite todo el mundo puede votar.', true)
            .addField('1w2d3h4m5s', 'Indica el tiempo que la encuesta estará abierta, en este ejemplo sería de 1 semana, 2 días, 3 horas, 4 minutos y 5 segundos. ' +
            'Cada comando indica el número de semanas, días, horas, minutos o segundos.' +
            '\n-w: Indica el número de semanas.' +
            '\n-d: Indica el número de días.' +
            '\n-h: Indica el número de horas.' +
            '\n-m: Indica el número de minutos.' +
            '\n-s: Indica el número de segundos.', true)
            .addField('titulo', 'Indica el título de la encuesta.', true)
            .addField('opcion1, opcion2, etc', 'Indica las opciones que tendrá la encuesta separadas en líneas. Es posible utilizar un archivo txt subido junto al comando para indicar las opciones.', true);
        message.channel.send({ embed });
    });
}
function isType(obj, type) {
    return (obj != undefined &&
        obj != null &&
        obj.constructor != undefined &&
        obj.constructor === type);
}
//# sourceMappingURL=poll.js.map