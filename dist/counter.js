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
const client = new Discord.Client();
const db = require('megadb');
const botConfig = require('./config.json');
let dbPrefix = new db.crearDB('prefix');
module.exports = {
    counter: (message) => __awaiter(this, void 0, void 0, function* () {
        function getPrefix() {
            return __awaiter(this, void 0, void 0, function* () {
                if (dbPrefix.has(`${message.guild.id}`)) {
                    return yield dbPrefix.get(`${message.guild.id}`);
                }
                else {
                    return botConfig.prefix;
                }
            });
        }
        if (message.content.startsWith(`${yield getPrefix()}userStats`)) {
            let waitingMessage = yield message.channel.send("Fetching info...");
            message.guild.fetchMembers().then((guild) => __awaiter(this, void 0, void 0, function* () {
                let total = guild.members.filter(member => !member.user.bot).size;
                yield waitingMessage.edit("Fetching prunes...");
                let inactive;
                try {
                    inactive = yield guild.pruneMembers(30, true);
                }
                catch (e) {
                    inactive = "NaN";
                }
                yield waitingMessage.delete();
                const stateEmbed = new Discord.RichEmbed()
                    .setColor('#5eff91')
                    .setTitle('Guild members status')
                    .addField('Inactive:', `${inactive} members`, true)
                    .addField('Total:', `${total} members`, true);
                message.channel.send(stateEmbed);
            }));
        }
    })
};
//# sourceMappingURL=counter.js.map