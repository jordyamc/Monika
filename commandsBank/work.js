const Discord = require("discord.js");
const db = require("megadb");
var work = new db.crearDB("work");
var bank = new db.crearDB("bank");

const { logs } = require("../logs.js");

function pad(padStr, max) {
	var str = padStr.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

module.exports = {
    name: "work",
    alias: ["trabajar"],
    description: "Da dinero del banco",

    run: async (message, args, rolIT, client, prefix) => {
      let moneda = await bank.obtener(`${message.guild.id}.moneda`)
      if (message.content.toLowerCase().includes("frases") && message.member.roles.has(rolIT.id)) {
        var dinero = 8248
        
        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  var fraseWork = [
	  `${message.author} has reportado a un alumno en class trial y has hecho a Junko feliz, toma ${conv(dinero)} ${moneda}`,
	  `${message.author} atrapaste a una waifu deseada por otro alumno y se la diste gratis, toma tu recompensa de ${conv(dinero)} ${moneda}`,
    `${message.author} publicaste un meme tan bueno que recibiste ${conv(dinero)} ${moneda} como premio al mejor memero`,
    `${message.author} atrapaste a la multicuenta de una multicuenta, junko agradece tu ayuda y te recompensa con ${conv(dinero)} ${moneda}`,
    `Soportaste el acoso de Monika como un campeón ${message.author}, ten ${conv(dinero)} ${moneda} para pagarte un psicólogo`,
    `${message.author} compraste todos los Anime Mind, el universo te recompensa con ${conv(dinero)} ${moneda}`,
    `${message.author} participaste en un concurso de cosplay y has ganado, toma ${conv(dinero)} ${moneda}`,
    `${message.author} has retado a otro usuario a unos waifuputazos y has ganado, toma ${conv(dinero)} ${moneda} como premio`,
    `${message.author} hiciste reir a Junko durante un debate, toma ${conv(dinero)} ${moneda}`,
    `${message.author} liberaste una top waifu a la poll, tal sacrificio ha sido recompensado con ${conv(dinero)} ${moneda}`,
    `${message.author} guiaste a un nuevo estudiante en sus primeros pasos por la academia Kalagamine, por tu buen trabajo se te recompensa con ${conv(dinero)} ${moneda}`,
    `Monika quiere fomentar tu ludopatia ${message.author} y para eso te ha donado ${conv(dinero)} ${moneda}. Ahora ve y ¡Apuéstalo!`,
    `${message.author} utilizaste el work correctamente, toma ${conv(dinero)} ${moneda}`,
    `Monika se volvió a caer ${message.author}. Para que aceptes sus disculpas te dona ${conv(dinero)} ${moneda}`,
    `${message.author} has hecho un buen uso del canal suggest, toma ${conv(dinero)} ${moneda}`,
	  `${message.author}, hubo un fallo en la matrix y recibes ${conv(dinero)} ${moneda} por error`,
	  `Te pasaste la tarde viendo anime en vez de hacer la tarea ${message.author}, toma ${conv(dinero)} ${moneda} por ser un buen otaku`
  ]

  let workFrases = new Discord.RichEmbed()
  .setTitle('Frases Work')
  
  let fraseMidare = [
    `${message.author}, te mereces 0 ${moneda} por ir faltando el respeto, suerte tienes de que no lo puedo hacer y recibes ${conv(dinero)} ${moneda}`,
    `${message.author}, mejor es trabajar que intentar estafar, ¿verdad? Gente como tú no merece dinero pero igual te lo doy por obligación. ${conv(dinero)} ${moneda}`,
    `${message.author}, has ido a trabajar pero te han intentado estafar, por suerte no han podido y te llevas ${conv(dinero)} ${moneda}`
  ]

  for (var i = 0; i < fraseWork.length/2; i++) {
	  workFrases.addField('_ _', message.author.id == "332011672401215489" ? fraseMidare[Math.floor(Math.random() * fraseMidare.length)] : fraseWork[i])
  }
  let workFrases2 = new Discord.RichEmbed()
  for (var j = fraseWork.length/2; i < fraseWork.length; i++) {
	  workFrases2.addField('_ _', message.author.id == "332011672401215489" ? fraseMidare[Math.floor(Math.random() * fraseMidare.length)] : fraseWork[i])
  }

  message.channel.send(workFrases)
  message.channel.send(workFrases2)
}

        if (message.channel.id !== "560845194640228352" && message.author.id !== "355104003572498435") return message.channel.send("Canal equivocado para hacer esto, ve a <#560845194640228352>")

        var bal = await bank.obtener(
            `${message.guild.id}.bank.money`
        );
        var balUser = await bank.obtener(
            `${message.guild.id}.${message.author.id}.money`
        );


        var dinero = 0;

        if (bal < 250000000) {
            return message.channel.send("Estás sin trabajo");
        } else if (bal < 300000000) {
            var dinero = Math.floor(Math.random() * (4000 - 2000)) + 2000;
        } else if (bal < 350000000) {
            var dinero = Math.floor(Math.random() * (6000 - 4000)) + 4000;
        } else if (bal < 400000000) {
            var dinero = Math.floor(Math.random() * (8000 - 6000)) + 6000;
        } else if (bal < 450000000) {
            var dinero = Math.floor(Math.random() * (9000 - 7000)) + 7000;
        } else if (bal < 500000000) {  
            var dinero = Math.floor(Math.random() * (10000 - 8000)) + 8000;
        } else if (bal < 550000000) {
            var dinero = Math.floor(Math.random() * (12000 - 10000)) + 10000;
        } else if (bal < 600000000) {
            var dinero = Math.floor(Math.random() * (15000 - 12000)) + 12000;
        } else if (bal < 700000000) {
            var dinero = Math.floor(Math.random() * (25000 - 20000)) + 20000;
        } else {
            var dinero = "Fail"
        }

        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        if (balUser > 3000000) {
            dinero = dinero / 2;
            dinero = Math.round(dinero);
        }

        var rolAlumno = message.guild.roles.get("556334453677490176");
        var rolSub = message.guild.roles.get("548312249618661406");
        var rolNitro = message.guild.roles.get("585549513692020757");

        //console.log(rolAlumno.id)

        var cdAlumno = 86400;
        var cdSub = 43200;
        var cdNitro = 28800;
        var cdSubNitro = 21600;

        var time = Math.floor(message.createdAt.getTime() / 1000);
		var nextTime = time;

        if (
            message.member.roles.has(rolNitro.id) &&
            message.member.roles.has(rolSub.id)
        ) {
            nextTime = time + cdSubNitro;
        } else if (message.member.roles.has(rolNitro.id)) {
            nextTime = time + cdNitro;
        } else if (message.member.roles.has(rolSub.id)) {
            nextTime = time + cdSub;
        } else if (message.member.roles.has(rolAlumno.id)) {
            nextTime = time + cdAlumno;
        } else {
            message.channel.send("Leete las reglas");
			return;
        }

        // if (message.content.includes("restart")) {
        //     work.eliminar(`${message.guild.id}.${message.author.id}`);
        //     return message.channel.send("Done")
        // }
		
		var key = `${message.guild.id}.${message.author.id}.work`;
		var nextWorkTime = !work.tiene(key) ? time : (await work.obtener(key));
		
		if (time >= nextWorkTime) {
			work.establecer(key, nextTime);
			bank.restar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer work ***restar*** => " + error))
            bank.sumar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer work ***sumar*** => " + error))
            
            var fraseWork = [
                `${message.author} has reportado a un alumno en class trial y has hecho a Junko feliz, toma ${conv(dinero)} ${moneda}`,
                `${message.author} atrapaste a una waifu deseada por otro alumno y se la diste gratis, toma tu recompensa de ${conv(dinero)} ${moneda}`,
                `${message.author} publicaste un meme tan bueno que recibiste ${conv(dinero)} ${moneda} como premio al mejor memero`,
                `${message.author} atrapaste a la multicuenta de una multicuenta, junko agradece tu ayuda y te recompensa con ${conv(dinero)} ${moneda}`,
                `Soportaste el acoso de Monika como un campeón ${message.author}, ten ${conv(dinero)} ${moneda} para pagarte un psicólogo`,
                `${message.author} compraste todos los Anime Mind, el universo te recompensa con ${conv(dinero)} ${moneda}`,
                `${message.author} participaste en un concurso de cosplay y has ganado, toma ${conv(dinero)} ${moneda}`,
                `${message.author} has retado a otro usuario a unos waifuputazos y has ganado, toma ${conv(dinero)} ${moneda} como premio`,
                `${message.author} hiciste reir a Junko durante un debate, toma ${conv(dinero)} ${moneda}`,
                `${message.author} liberaste una top waifu a la poll, tal sacrificio ha sido recompensado con ${conv(dinero)} ${moneda}`,
                `${message.author} guiaste a un nuevo estudiante en sus primeros pasos por la academia Kalagamine, por tu buen trabajo se te recompensa con ${conv(dinero)} ${moneda}`,
                `Monika quiere fomentar tu ludopatia ${message.author} y para eso te ha donado ${conv(dinero)} ${moneda}. Ahora ve y ¡Apuéstalo!`,
                `${message.author} utilizaste el work correctamente, toma ${conv(dinero)} ${moneda}`,
                `Monika se volvió a caer ${message.author}. Para que aceptes sus disculpas te dona ${conv(dinero)} ${moneda}`,
                `${message.author} has hecho un buen uso del canal suggest, toma ${conv(dinero)} ${moneda}`,
                `${message.author}, hubo un fallo en la matrix y recibes ${conv(dinero)} ${moneda} por error`,
                `Te pasaste la tarde viendo anime en vez de hacer la tarea ${message.author}, toma ${conv(dinero)} ${moneda} por ser un buen otaku`
            ]

            let workEmbed = new Discord.RichEmbed()
                .setTitle("Work")
                .setColor('#db783b')
                .setDescription(fraseWork[Math.floor(Math.random() * fraseWork.length)])
            message.channel.send(workEmbed);

            let workEmbedLog = new Discord.RichEmbed()
                .setTitle("Work")
                .setColor('#db783b')
                .setDescription(`${message.author} trabajó y ganó ${conv(dinero)} ${moneda}`)
            logs(client, message, dinero, "win", "Work")


		} else if (time < nextWorkTime) {
            var remainingTime = nextWorkTime - time;
            //console.log(nextWorkTime, nextTime, time, remainingTime);

            var hours = Math.floor(remainingTime / 3600);
            var minutes = pad(Math.floor((remainingTime % 3600) / 60), 2);
            var seconds = pad(remainingTime % 60, 2);

			var result = '';
            if (hours == 0) {
                result = minutes + " minutos y " + seconds + " segundos";
            } else {
                result = hours + " horas y " + minutes + " minutos";
            }

            var embedRestWork = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor("#ff0000")
                .setDescription(
                    "‼ No puedes hacer work hasta dentro de " + result
                );

            return message.channel.send(embedRestWork);
        } else {
            //if(message.member.roles.has(rolSub.id) && message.member.roles.has(rolNitro.id)){

            //}

            message.channel.send("Do you want work?");
        }
    }
};