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
let pollsDB = new db.crearDB('polls');
let cmdName = 'v';
let alias = ['vote'];
let error = 'La encuesta no existe... Al menos en esta dimensión, pero claro, siendo un ser inferior no puedes votar en ella';
let regex = /.\w+ (\d+)(?: (.+))?/;
let ranges = [
    { name: 'segundos', multiplier: 60 },
    { name: 'minutos', multiplier: 60 },
    { name: 'horas', multiplier: 24 },
    { name: 'días', multiplier: 7 },
    { name: 'semanas', multiplier: 4 }
];
module.exports = {
    name: cmdName,
    alias: alias,
    description: 'Vota en una encuesta con varias opciones',
    run: (message, args) => __awaiter(this, void 0, void 0, function* () {
        if (message.guild === undefined) {
            message.channel.send('Ara, ara... Necesitas estar en un servidor para utilizar esta función');
            return;
        }
        var command = regex.exec(message.content);
        let id = command[1];
        if (!pollsDB.has(id)) {
            message.channel.send(error);
            return;
        }
        let poll = yield pollsDB.get(id);
        if (poll.server !== message.guild.id) {
            message.channel.send(error);
            return;
        }
        if (command[2] == undefined) {
            if (!poll.visible) {
                message.channel.send("Lo siento, pero la encuesta no está configurada para ser leída por seres inferiores");
                return;
            }
            let results = [];
            for (let [o, nVotes] of new Map([...Object.entries(poll.options)].sort((a, b) => b[1] - a[1]))) {
                results.push(`¡"${o}" va con ${nVotes} votos!`);
            }
            message.channel.send(`La encuesta finaliza en ${calculateRange(poll)}.\n\n` + results.join('\n'));
            return;
        }
        if (poll.anonymous) {
            yield message.delete();
        }
        if (poll.roles.length > 0 && !message.member.roles.some(r => poll.roles.includes(r.name))) {
            message.channel.send(`¿Crees que un ser inferior puede votar aquí?`);
            return;
        }
        let votes = new Set(poll.usersVoted);
        if (votes.has(message.author.id)) {
            message.channel.send(`¿Intentas timarme con tu voto duplicado? Huye antes de que cambie de idea y te haga arrepentirte...`);
            return;
        }
        if (poll.options[command[2]] === undefined) {
            message.channel.send('¿No sabes leer? Esa opción no existe. Vuelve a educación primaria y aprende a leer');
            return;
        }
        poll.usersVoted.push(message.author.id);
        poll.options[command[2]]++;
        pollsDB.set(id, poll);
        message.channel.send('Voto emitido con exito');
    })
};
function calculateRange(poll) {
    var expire = new Date(poll.expiresAt).getTime();
    var now = new Date().getTime();
    var span = (expire - now) / 1000;
    var accumulator = 1;
    var times = [];
    for (let i = 0; i < ranges.length && span >= 1; i++) {
        const r = ranges[i];
        accumulator *= r.multiplier;
        var diff = Math.trunc(span % accumulator);
        span = span / accumulator;
        times.push(`${diff} ${r.name}`);
    }
    return times.reverse().join(', ');
}
//# sourceMappingURL=vote.js.map