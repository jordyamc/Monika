const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')

const {tokenDF} = require('./config.json')

let dbprefix = new db.crearDB('prefix')



module.exports = {
  functions: async (message, args) => {

    //console.log("User ID: "+ message.author.username, message.author.id);
    
    let userTag = message.mentions.users.first()
    let randomMitad = Math.floor(Math.random() * (1 - 2)) + 2
    let randomCuarto = Math.floor(Math.random() * (1 - 4)) + 4

    
    if(["callate monika","callate pesada", "mute a monika"].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      if (message.author.id == "247073874951405578") {
        return message.channel.send("Eso eso, insulta más!")
      }
      return message.channel.send("**CALLATE TU " + message.author.toString() + "!** Dejame ser hablar.")
    }

    else if (message.content == "(╯°□°）╯︵ ┻━┻"){
      return message.channel.send("┬─┬ ノ( ゜-゜ノ)")
    }
    else if (message.content == "┬─┬ ノ( ゜-゜ノ)"){
      return message.channel.send("(╯°□°）╯︵ ┻━┻")
    }
    
    else if([" puto "," puta ", " ctm ", " tpm ", " carajo "].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      if (message.author.id == "450488846296154126") return message.channel.send("Normal que con esta boca no beses a tu madre <@450488846296154126>")
      return message.channel.send("Hey! Con esa boquita besas a tu mami "+ message.author.toString() + "?!")
    }

    else if (message.content.toLowerCase().includes("debería mutear al alumno?")) {
      return message.channel.send("Si, " + message.author + " porfavor mutealo")
    }

    else if(["matame","matadme", "kill me", "suicide"].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      var respuestasMuerte = ["Pobre... No te mereces ni morir", `Tranquil@ ${message.author.toString()}, todo saldrá bien ♡`]
      return message.channel.send(respuestasMuerte[Math.floor(Math.random() * respuestasMuerte.length)])
    }

    else if (message.content.toLowerCase().includes("alt") && message.content.toLowerCase().includes("f4")) {
      message.channel.send("Alt F4 es la solución")
    }

    else if (message.content.toLowerCase().startsWith("sin sentido")){
      var e =["¿A que te refieres? Todo tiene sentido desde algun punto de vista. Ningún poema por mas retorcido que sea se considera un galimatias. Por lo que dale una vuelta de tuerca y podras conocer la verda. Y si no lo deseas... supongo que no eres del tipo curioso...","Puede ser cierto pero ¿puedes mencionar algo que tenga sentido por si mismo..?" ]
      return message.channel.send(e[Math.floor(Math.random() * e.length)])
    }

    else if (message.content.toLowerCase() == "kalatoras") {
			var x = ["Cuanto tiempo ha pasado de que escuche es nombre... Lo extraño.", "Kalatoras... Que buenos recuerdo atrae ese nombre...","Supe que copió mi archivo a su pendrive... eso me hace sentir menos sola..."]
			return message.channel.send(x[Math.floor(Math.random() * x.length)])
		}

    else if (message.content.toLowerCase() == "von") {
			var von = ["Jamas se vió a alguien renacer y morir tan rápido", "Viene y se va como el viento", "Estaba vivo, y volvió a morir...", "De verdad está vivo? Nunca lo he visto"]
			return message.channel.send(von[Math.floor(Math.random() * von.length)])
    }
    
    //else if (message.content.toLowerCase().startsWith("&w") || message.content.toLowerCase().startsWith("&warn")){
      //if (!message.mentions.users.first()) return
      //return message.channel.send("Ten más cuidado "+ message.mentions.members.first())
    //}
    //else if (message.content.toLowerCase().startsWith("&m") || message.content.toLowerCase().startsWith("&mute")){
      //if (!message.mentions.users.first()) return
      //return message.channel.send("Que te quedes calladito "+ message.mentions.members.first())
    //}
    else if (message.content.toLowerCase().startsWith("&temp-ban") || message.content.toLowerCase().startsWith("&kick")){
      if (!message.mentions.users.first()) return
      return message.channel.send("A TOMAR POR CULO")
    }
    else if (message.content.toLowerCase().startsWith("&ban")) {
      if (!message.mentions.users.first()) return
      return message.channel.send("PA' TU PUTA CASA")
    }
    
    else if (message.content.toLowerCase().includes('hola monika') && !message.mentions.users.first()) {
      return message.channel.send('Hola '+ message.author)
    }
    
    //else if (message.content.toLowerCase().includes("monika") && randomCuarto == 2) {
      //return message.channel.send("Just Monika")
    //}
    
    else if (message.content.toLowerCase().includes("m0nika")) {
      return message.channel.send("Intentando librarte de mi "+ message.member.nickname +"?")
    }

    

  }
}
