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
    name: 'flip',
    alias: ['coin-flip', 'cf'],
    description: '50% de ganar',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        var bot = yield bank.obtener(`${message.guild.id}.bank.money`).catch(error => message.channel.send("Error al obtener banco ***coinflip*** => " + error));
        var auth = yield bank.obtener(`${message.guild.id}.${message.author.id}.money`).catch(error => message.channel.send("Error al obtener usuario ***coinflip*** => " + error));
        var dinero = args[0];
        let p = Math.floor((Math.random() * 100) + 1);
        function opera(val) {
            console.log("Val + p: " + val, p);
            if (p < val) {
                bank.restar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***banco restar*** => " + error));
                bank.sumar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***usuario sumar*** => " + error));
                return message.channel.send("Has ganado " + dinero + "<:monocoin:623298856309751808>");
            }
            else {
                bank.sumar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***banco sumar*** => " + error));
                bank.restar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***usuario restar*** => " + error));
                return message.channel.send("Has perdido " + dinero + "<:monocoin:623298856309751808>");
            }
        }
        if (dinero > 500000) {
            return message.channel.send("Donde vah illodepta intentando aposhtar tanto!!");
        }
        if (dinero > auth) {
            return message.channel.send("Que intentas apostar si no tienes tanto?");
        }
        if (bot < 220000000) {
            opera(35);
        }
        else if (bot < 240000000) {
            opera(40);
        }
        else if (bot < 260000000) {
            opera(50);
        }
        else if (bot <= 300000000) {
            opera(60);
        }
        else if (bot > 300000000) {
            opera(65);
        }
    })
};
/*
    Si el banco tiene menos de 7M de :monocoins, el porcentaje de ganar será del 35%
    Si el banco tiene entre 10M y 7M de :monocoins:, el porcentajede ganar será de un 40%
    Si el banco tiene entre 15M y 10M de :monocoins:, el porcentaje de ganar será de un 50%
    Si el banco tiene entre 20M y 15M de :monocoins:, el porcentaje de ganar será de un 60%
    Si el banco tiene más de 20M de :monocoins:, el porcentaje de ganar será de un 65%

    - Si el banco tiene entre 180M y 220M, dará entre 1.000 y 2.000
    - Si el banco tiene entre 220M y 240M, dará entre 2.000 y 4.000
    - Si el banco tiene entre 240M y 260M, dará entre 4.000 y 6.000
    - Si el banco tiene entre 260M y 300M, dará entre 6.000 y 8.000
    - Si el banco tiene más de 300M, dará entre 8.000 y 10.000
*/ 
//# sourceMappingURL=flip.js.map