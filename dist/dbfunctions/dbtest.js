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
let dbTest = new db.crearDB('keys');
module.exports = {
    function1db: (message, prefix, rolIT) => __awaiter(this, void 0, void 0, function* () {
        if (message.author.bot)
            return; // Si el mensaje es de un bot, paramos
        if (!dbTest.tiene(`${message.author.id}`)) { // Miramos si la BD tiene la ID del server
            dbTest.establecer(`${message.author.id}`, { Username: `${message.author.username}`, key: 0 });
        }
        let randomStart = Math.floor(Math.random() * (1 - 880)) + 880;
        console.log("Key number: " + randomStart);
        let randomStop = Math.floor(Math.random() * (1 - 25)) + 25;
        var keys = yield dbTest.obtener(`${message.author.id}.key`);
        if (randomStart == "2" && keys == "0" && !(message.member.roles.has(rolIT.id) || message.member.hasPermission('ADMINISTRATOR'))) {
            dbTest.sumar(`${message.author.id}.key`, 1);
            return message.channel.send("A partir de ahora te vigilaré!" + message.author);
        }
        /*if (message.content.startsWith(prefix +"stop") && keys == "1") {
          if (message.member.roles.has(rolIT.id) || message.member.hasPermission('ADMINISTRATOR')){
            let user = message.mentions.members.first() || message.member
            console.log(user.id)
            dbTest.restar(`${user.id}.key`, 1)
            return message.channel.send(user +" fue liberad@ temporalmente")
          } else {
            return message.channel.send("No eres tan privilegiad@ como para tocarme de esta manera ¬.¬")
          }
        } else if (randomStop == "2" && keys == "1") {
          dbTest.restar(`${message.author.id}.key`, 1)
          return message.channel.send("Por esta vez te liberaste de mi "+ message.author)
        }*/
        if (message.content.startsWith(prefix + "stop")) {
            if (message.member.roles.has(rolIT.id) || message.member.hasPermission('ADMINISTRATOR')) {
                if (message.mentions.members.first()) {
                    let user = message.mentions.members.first();
                    dbTest.restar(`${user.id}.key`, 1);
                    return message.channel.send(user + " fue liberad@ temporalmente");
                }
            }
            else if (randomStop == "2" && keys == "1") {
                dbTest.restar(`${message.author.id}.key`, 1);
                return message.channel.send("Por esta vez te liberaste de mi " + message.author);
            }
            else {
                return message.channel.send("Ahora te perseguiré más " + message.author);
            }
        }
    })
};
/*

*/
//# sourceMappingURL=dbtest.js.map