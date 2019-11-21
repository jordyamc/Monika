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
var bank = new db.crearDB("bank1");
module.exports = {
    name: 'impuestos',
    alias: [],
    description: 'Cobrar impuestos',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        if (message.guild.id == '545720855578279958') {
            var clubes = [
                [message.guild.roles.get('552699845459181598').members.map(m => m.user.id)],
                [message.guild.roles.get('552699727246917650').members.map(m => m.user.id)],
                [message.guild.roles.get('553453412826611742').members.map(m => m.user.id)],
                [message.guild.roles.get('555402664301690883').members.map(m => m.user.id)],
                [message.guild.roles.get('552693694298456064').members.map(m => m.user.id)],
                [message.guild.roles.get('552699809811922944').members.map(m => m.user.id)],
                [message.guild.roles.get('552699907618635776').members.map(m => m.user.id)],
                [message.guild.roles.get('553451609107988480').members.map(m => m.user.id)],
                [message.guild.roles.get('554884633699811329').members.map(m => m.user.id)],
                [message.guild.roles.get('555607531645435906').members.map(m => m.user.id)],
                [message.guild.roles.get('568989794877833391').members.map(m => m.user.id)] // Nocturnos
                //[message.guild.roles.get('553451557493145611').members.map(m => m.user.id)]  // Esperanzas
            ];
        }
        else if (message.guild.id == '606076389422268416') {
            var clubes = [
                message.guild.roles.get('621022534527352832').members.map(m => m.user.id),
                message.guild.roles.get('606076887650795532').members.map(m => m.user.id),
                message.guild.roles.get('623920633302220820').members.map(m => m.user.id) // Junko
            ];
        }
        for (let i = 0; i < clubes.length; i++) {
            const miembros = clubes[i];
            for (let j = 0; j < miembros.length; j++) {
                const usuario = clubes[i][j];
                //console.log(usuario);
                bank.sumar(`${message.guild.id}.bank.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***sumar*** => " + error + " => " + usuario));
                bank.restar(`${message.guild.id}.${usuario}.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***restar*** => " + error + " => " + usuario));
                let bal = yield bank.obtener(`${message.guild.id}.${usuario}.money`).catch(error => message.channel.send("Error al hacer impuestos ***balance*** => " + error + " => " + usuario));
                if (bal < 0) {
                    message.channel.send(`<@${usuario}> ${bal}`);
                }
            }
        }
    })
};
//# sourceMappingURL=impuestos.js.map