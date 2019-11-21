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
    name: 'add-money',
    alias: ['givebank', 'addmoney'],
    description: 'Dona dinero del banco a un usuario {Reguiere Administrador}',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return ("Me estás intentando atracar? A ver si te tendré que warnear!");
        let dineroBanco = yield bank.obtener(`${message.guild.id}.bank.money`);
        let user = message.mentions.users.first();
        let dineroGive = args[1];
        if (dineroBanco - dineroGive < 0) {
            return message.channel.send("No tengo tanto dinero, mal rollo " + message.author);
        }
        bank.restar(`${message.guild.id}.bank.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***restar*** => " + error));
        bank.sumar(`${message.guild.id}.${user.id}.money`, dineroGive).catch(error => message.channel.send("Error al hacer la transferencia ***sumar*** => " + error));
        var conv = (dineroGive) => String(dineroGive).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        let giveEmbed = new Discord.RichEmbed()
            .setTitle("Donación")
            .setColor('#42f452')
            .setDescription(`${user} a ganado ${conv(dineroGive)} <:monocoin:623298856309751808>`);
        return message.channel.send(giveEmbed);
    })
};
//# sourceMappingURL=add-money.js.map