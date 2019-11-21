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
let bank = new db.crearDB('bank1');
module.exports = {
    name: 'bal',
    alias: ['balance', 'bank', 'money', 'inv', 'dinero', 'inventario'],
    description: 'Dinero del banco',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        let User = message.mentions.users.first() || message.author;
        let dineroBanco = yield bank.obtener(`${message.guild.id}.bank.money`).catch(error => message.channel.send("**Error dinero banco, comunicalo a un miembro de IT: " + error));
        var conv = (dineroBanco) => String(dineroBanco).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if (!message.member.roles.has(rolIT.id))
            console.log("No tienes el rol");
        if (!message.member.hasPermission('ADMINISTRATOR'))
            console.log("No eres admin");
        console.log("User: " + User);
        if (User == client.user) {
            if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send("Nop! Así no podéis romper el sistema");
            }
            else {
                var embedBanc = new Discord.RichEmbed()
                    .setTitle(User.tag + ' 💰')
                    .setColor('#ff7b00')
                    .addField("Monocoins en el banco:", conv(dineroBanco) + ' <:monocoin:623298856309751808>', true);
                return message.channel.send(embedBanc);
            }
        }
        let bal = yield bank.obtener(`${message.guild.id}.${User.id}.money`).catch(error => console.log(error));
        let inv = yield bank.obtener(`${message.guild.id}.${User.id}.inventory`).catch(error => console.log(error));
        var conv = (bal) => String(bal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if (inv == "") {
            inv = "Inventario vacío";
        }
        console.log('inv: ' + inv);
        var embedBal = new Discord.RichEmbed()
            .setTitle(User.tag + ' 💰')
            .setColor('#33D4FF')
            .addField("Monocoins:", conv(bal) + ' <:monocoin:623298856309751808>', true)
            .addField("Inventario:", inv, true);
        return message.channel.send(embedBal);
    })
};
//# sourceMappingURL=bal.js.map