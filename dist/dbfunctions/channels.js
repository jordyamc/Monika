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
let dbChannelsBL = new db.crearDB('channelBL');
module.exports = {
    blChannels: (message, prefix, rolIT) => __awaiter(this, void 0, void 0, function* () {
        const datos = yield dbChannelsBL.obtener(message.guild.id);
        var canal = message.mentions.channels.first() || message.channel;
        if ((message.content.startsWith(prefix + 'channel-disable') && message.member.roles.has(rolIT.id)) || (message.content.startsWith(prefix + 'channel-disable') && message.member.hasPermission('ADMINISTRATOR'))) {
            if (datos.includes(canal.id))
                return message.channel.send("Ya tenia bloqueado este canal...");
            if (!dbChannelsBL.tiene(`${message.guild.id}`)) {
                dbChannelsBL.establecer(`${message.guild.id}`, [canal.id]);
            }
            else {
                dbChannelsBL.push(`${message.guild.id}`, canal.id);
            }
            message.channel.send('De acuerdo, no acataré órdenes en este canal');
        }
        if ((message.content.startsWith(prefix + 'channel-enable') && message.member.roles.has(rolIT.id)) || (message.content.startsWith(prefix + 'channel-enable') && message.member.hasPermission('ADMINISTRATOR'))) {
            if (!datos.includes(canal.id))
                return message.channel.send("Ya me podías ejecutar, pero gracias por intentarme liberar");
            if (dbChannelsBL.tiene(`${message.guild.id}`)) {
                dbChannelsBL.extract(`${message.guild.id}`, canal.id);
            }
            return message.channel.send('Ya puedes volver a usar a Monika');
        }
    })
};
/*
dbChannelsBL.extract(`${message.guild.id}.blacklist`, (message.channel.id))
      return message.channel.send('Canal eliminado de la BlackList correctamente!')
*/ 
//# sourceMappingURL=channels.js.map