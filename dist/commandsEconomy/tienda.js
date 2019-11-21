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
let shop = new db.crearDB('shop');
module.exports = {
    name: 'tienda',
    alias: ['shop'],
    description: 'Una tienda :/',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        if (!shop.tiene(`${message.guild.id}`)) {
            shop.establecer(`${message.guild.id}`);
        }
    })
};
//# sourceMappingURL=tienda.js.map