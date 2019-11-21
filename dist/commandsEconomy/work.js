var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Discord = require("discord.js");
const db = require("megadb");
var work = new db.crearDB("work"); // db
var bank = new db.crearDB("bank1");
module.exports = {
    name: "work",
    alias: ["trabajar"],
    description: "Da dinero del banco",
    /*
      - Si el banco tiene menos de 180M, no dará dinero
      - Si el banco tiene entre 180M y 220M, dará entre 1.000 y 2.000
      - Si el banco tiene entre 220M y 240M, dará entre 2.000 y 4.000
      - Si el banco tiene entre 240M y 260M, dará entre 4.000 y 6.000
      - Si el banco tiene entre 260M y 300M, dará entre 6.000 y 8.000
      - Si el banco tiene más de 300M, dará entre 8.000 y 10.000
      - Si el usuario tiene más de 3M, el work le dará el 50%
    */
    run: (message, args, rolIT, client, prefix) => __awaiter(this, void 0, void 0, function* () {
        /*if (!work.tiene(`${message.guild.id}.roles`)){
          return message.channel.send("Usa ``/work-role <12h> <Nombre del rol>`` para indicar cada cuanto hacer el work");
        }*/
        var bal = yield bank.obtener(`${message.guild.id}.bank.money`);
        var balUser = yield bank.obtener(`${message.guild.id}.${message.author.id}.money`);
        var dinero = 0;
        if (bal < 180000000) {
            return message.channel.send("Estás sin trabajo");
        }
        else if (bal < 220000000) {
            var dinero = Math.floor(Math.random() * (2000 - 1000)) + 1000;
        }
        else if (bal < 240000000) {
            var dinero = Math.floor(Math.random() * (4000 - 2000)) + 2000;
        }
        else if (bal < 260000000) {
            var dinero = Math.floor(Math.random() * (6000 - 4000)) + 4000;
        }
        else if (bal < 300000000) {
            var dinero = Math.floor(Math.random() * (8000 - 6000)) + 6000;
        }
        else if (bal >= 300000000) {
            var dinero = Math.floor(Math.random() * (10000 - 8000)) + 8000;
        }
        else {
            var dinero = "Fail";
        }
        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if (balUser > 3000000) {
            dinero = dinero / 2;
            Math.round(dinero);
        }
        var rolAlumno = message.guild.roles.find(r => r.name === "Alumnos" || "everyone");
        var rolSub = message.guild.roles.find(r => r.name === "Twitch Subscriber" || "everyone");
        var rolNitro = message.guild.roles.find(r => r.name === "Nitro Booster" || "everyone");
        var cdAlumno = 86400;
        var cdSub = 43200;
        var cdNitro = 28800;
        var cdSubNitro = 21600;
        var time = Math.floor(message.createdAt.getTime() / 1000);
        if (message.member.roles.has(rolNitro.id) &&
            message.member.roles.has(rolSub.id)) {
            var tiempo = cdSubNitro;
        }
        else if (message.member.roles.has(rolNitro.id)) {
            var tiempo = cdNitro;
        }
        else if (message.member.roles.has(rolSub.id)) {
            var tiempo = cdSub;
        }
        else if (message.member.roles.has(rolAlumno.id)) {
            var tiempo = cdAlumno;
        }
        else {
            return message.channel.send("Leete las reglas");
        }
        if (message.content.includes("restart")) {
            work.eliminar(`${message.guild.id}.${message.author.id}`);
            return message.channel.send("Done");
        }
        if (!work.tiene(`${message.guild.id}.${message.author.id}.work`)) {
            work.establecer(`${message.guild.id}.${message.author.id}.work`, `${time}`);
            bank.restar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer work ***restar*** => " + error));
            bank.sumar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer work ***sumar*** => " + error));
            return message.channel.send("Has ganado " + conv(dinero) + ' <:monocoin:623298856309751808>');
        }
        else if (`${time}` - (yield work.obtener(`${message.guild.id}.${message.author.id}.work`)) >= tiempo) {
            work.eliminar(`${message.guild.id}.${message.author.id}`);
            bank.restar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer work ***restar*** => " + error));
            bank.sumar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer work ***sumar*** => " + error));
            return message.channel.send("Has ganado " + dinero + ' <:monocoin:623298856309751808>');
        }
        else if (`${time}` -
            (yield work.obtener(`${message.guild.id}.${message.author.id}.work`)) <=
            tiempo) {
            var totalTime = yield work.obtener(`${message.guild.id}.${message.author.id}.work`);
            var tiempoRestante = time - totalTime - tiempo;
            if (tiempoRestante < 0) {
                tiempoRestante *= -1;
            }
            var hours = Math.floor(tiempoRestante / 3600);
            var minutes = Math.floor((tiempoRestante % 3600) / 60);
            var seconds = tiempoRestante % 60;
            //Anteponiendo un 0 a los minutos si son menos de 10
            minutes = minutes < 10 ? "0" + minutes : minutes;
            //Anteponiendo un 0 a los segundos si son menos de 10
            seconds = seconds < 10 ? "0" + seconds : seconds;
            var result = hours + " horas, " + minutes + " minutos, " + seconds + "segundos";
            if (hours == 0) {
                var tiempoRestante = minutes + " minutos y " + seconds + " segundos";
            }
            else {
                var tiempoRestante = hours + " horas y " + minutes + " minutos";
            }
            var embedRestWork = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor("#ff0000")
                .setDescription("‼ No puedes hacer work hasta dentro de " + tiempoRestante);
            return message.channel.send(embedRestWork);
        }
        else {
            //if(message.member.roles.has(rolSub.id) && message.member.roles.has(rolNitro.id)){
            //}
            message.channel.send("Do you want work?");
        }
    })
};
/*
var cool = new db.crearDB("cooldown"); // db
var minutos = 30; // El tiempo del cooldown; minutos
var horas = 01; // El tiempo del cooldown; horas

  if (!cool.tiene(`${msg.author.id}.work`)){ // Acá verificados si no tiene cooldown
    console.log(`${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`) //Output del tiempo
  cool.establecer(`${msg.author.id}.work`, `${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`) // Acá establecemos el las horas y minutos actuales
    msg.channel.send("Cooldown agregado.")
  } else if (`${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`-await cool.obtener(`${msg.author.id}.work`) >= minutos){ // Con esto restamos el tiempo actual con el tiempo establecido
    // para compararlo con el tiempo que necesitamos para el cooldown y ver si ya se ha pasado el tiempo, y si es superior o igual el cooldown ya pasó
 console.log(`${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`-await cool.obtener(`${msg.author.id}.work`)) // Output del tiempo
  msg.channel.send("Cooldown en marcha >=") //Resultado
    cool.eliminar(`${msg.author.id}`) //Eliminamos el cooldown para que esté disponible de nuevo
  } else if (`${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`-await cool.obtener(`${msg.author.id}.work`) <= minutos){ // Hacemos la misma comparación que antes pero en inferior
    console.log(`${msg.createdAt.getHours()}${msg.createdAt.getMinutes()}`-await cool.obtener(`${msg.author.id}.work`))
    msg.channel.send("Cooldown en marcha <=")
  }
*/
//# sourceMappingURL=work.js.map