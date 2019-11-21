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
    name: 'total',
    alias: [],
    description: '',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        let bal = yield bank.obtener(`${message.guild.id}.${message.author.id}.money`);
    })
};
//# sourceMappingURL=total.js.map