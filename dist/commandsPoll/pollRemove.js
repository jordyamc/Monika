var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('megadb');
const Discord = require('discord.js');
const botconfig = require('./../config.json');
let pollsDB = new db.crearDB('polls');
let dbprefix = new db.crearDB('prefix');
let client = new Discord.Client();
let pendingRemoval = new Map();
let error = 'Esa encuesta no existe... Al menos en este universo, pero como eres un ser inferior, no podrás cambiar de dimensión';
module.exports = {
    name: 'pollremove',
    alias: ['pr'],
    description: 'Elimina una encuesta',
    run: (message, _, __, clientRemoval) => __awaiter(this, void 0, void 0, function* () {
        if (message.guild === undefined) {
            message.channel.send('Ara, ara... Necesitas estar en un servidor para utilizar esta función');
            return;
        }
        var id = /.\w+ (\d+)( confirm)?/.exec(message.content);
        if (id === undefined || id === null) {
            message.channel.send('Ara... ¿Qué estás intentando borrar? ¿Tu existencia, quizás?');
            return;
        }
        if (pendingRemoval.has(id[1])) {
            var pending = pendingRemoval.get(id[1]);
            if (message.author.id !== pending[2]) {
                message.channel.send('Ya hay una persona intentando eliminar la encuesta. Ahora, V-E-T-E');
                return;
            }
            if (id[2] === undefined) {
                message.channel.send('Ya te he dicho lo que tienes que escribir. ¿Quieres volver a la guardería?');
                return;
            }
            clearTimeout(pending[0]);
            pendingRemoval.delete(id[1]);
            clientRemoval.emit('pollRemove', id[1]);
            message.channel.send('Eliminando encuesta...');
            return;
        }
        if (!pollsDB.has(id[1])) {
            message.channel.send(error);
            return;
        }
        let poll = yield pollsDB.get(id[1]);
        if (poll.server !== message.guild.id) {
            message.channel.send(error);
            return;
        }
        if (poll.author !== message.author.id) {
            message.channel.send('¿En serio piensas que tienes el suficiente poder como para eliminar eso? Creo que probaré a eliminar tu existencia...');
            return;
        }
        message.channel.send(`¿Estás seguro de que quieres borrar esa encuesta? Escribe "${message.content[0]}pr ${id[1]} confirm" sin las comillas para confirmar. ¿A qué esperas? Tienes 60 segundos`);
        pendingRemoval.set(id[1], [setTimeout(clearRemoval.bind(null, id[1]), 60000), message.channel, message.author.id]);
    })
};
function clearRemoval(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var pending = pendingRemoval.get(id);
        var channel = pending[1];
        pendingRemoval.delete(id);
        channel.send(`Eliminación de la encuesta ${id} cancelada... Deja de hacerme perder el tiempo`);
    });
}
//# sourceMappingURL=pollRemove.js.map