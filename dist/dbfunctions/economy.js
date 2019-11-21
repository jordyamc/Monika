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
    economy: (message, prefix, rolIT) => __awaiter(this, void 0, void 0, function* () {
        if (message.content.toLowerCase().includes("$$$")) {
            /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
            /*
            ejemplos get data
            */
            var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzU1MTA0MDAzNTcyNDk4NDM1IiwiaWF0IjoxNTYyMjYyMTg0fQ.k1ulwHnvf2vwnYy3LOJkijQkpkc7mBem_PkLDzpeWSc"; // token dialogflow
            var baseUrl = "https://unbelievable.pizza/api/guilds/545720855578279958/users";
            var Request = require("request");
            Request.get({
                "headers": {
                    "content-type": "application/json",
                    "Authorization": accessToken
                },
                "url": baseUrl
            }, (error, response, body) => {
                /* uso de la respuesta */
                /* armar array con el nuevo formato */
                var respuesta = body;
                var total = 0;
                var users = 0;
                var dinero10 = 0;
                respuesta = JSON.parse(respuesta);
                for (var k in respuesta) {
                    var userID = respuesta[k].user_id;
                    var dinero = respuesta[k].total;
                    var inventario = Array();
                    total = total + dinero;
                    users = users + 1;
                    var porcentaje1 = 50;
                    var porcentaje2 = 100 - porcentaje1;
                    var dinero90 = Math.floor(dinero * porcentaje2) / 100;
                    var dinero10b = Math.floor(dinero * porcentaje1) / 100;
                    var dinero90 = Math.round(dinero90);
                    var dinero10 = dinero10 + Math.round(dinero10b);
                    bank.establecer(`${message.guild.id}.${userID}`, { money: dinero90, inventory: inventario });
                    if (dinero == 0) {
                        var conv = (total) => String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        var conv = (users) => String(users).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        var conv = (dinero10) => String(dinero10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        bank.establecer(`${message.guild.id}.bank`, { money: dinero10 });
                        return message.channel.send(`Número de usuarios: ${conv(users)}
              Dinero total en el server: ${conv(total)} <:monocoin:623298856309751808>
              Dinero en el banco ${porcentaje1}%: ${conv(dinero10)} <:monocoin:623298856309751808>`);
                    }
                    console.log('total: ' + total);
                    console.log(porcentaje1 + ' : ' + dinero90);
                    console.log(porcentaje2 + ' : ' + dinero10);
                }
                /* fin uso de la respuesta */
            });
            /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
        }
        if (!bank.tiene(`${message.guild.id}.sinvoz`)) {
            bank.establecer(`${message.guild.id}.sinvoz`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.fate`)) {
            bank.establecer(`${message.guild.id}.fate`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.oreo`)) {
            bank.establecer(`${message.guild.id}.oreo`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.henculto`)) {
            bank.establecer(`${message.guild.id}.henculto`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.artistas`)) {
            bank.establecer(`${message.guild.id}.artistas`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.monogatari`)) {
            bank.establecer(`${message.guild.id}.monogatari`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.toldboden`)) {
            bank.establecer(`${message.guild.id}.toldboden`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.battleroyale`)) {
            bank.establecer(`${message.guild.id}.battleroyale`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.scriptio`)) {
            bank.establecer(`${message.guild.id}.scriptio`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.itcrowd`)) {
            bank.establecer(`${message.guild.id}.itcrowd`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.nocturnos`)) {
            bank.establecer(`${message.guild.id}.nocturnos`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.esperanzas`)) {
            bank.establecer(`${message.guild.id}.esperanzas`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.mods`)) {
            bank.establecer(`${message.guild.id}.mods`, { money: 0 });
        }
        if (!bank.tiene(`${message.guild.id}.${message.author.id}`)) {
            bank.establecer(`${message.guild.id}.${message.author.id}`, { money: 0, inventory: Array() });
        }
    })
};
//# sourceMappingURL=economy.js.map