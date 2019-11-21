const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')

const {tokenDF} = require('./config.json')

let dbprefix = new db.crearDB('prefix')



module.exports = {
  functions: async (message) => {
   
     console.log("User ID: "+ message.author.id);
    
  /*
   else if(["","", ""].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
     return message.channel.send()
   }
   */
    
    
    let prefix = dbprefix.tiene(`${message.guild.id}`) ? await dbprefix.obtener(`${message.guild.id}`) : ">"
 
    
    let userTag = message.mentions.users.first()
    let randomMitad = Math.floor(Math.random() * (1 - 2)) + 2
    let randomCuarto = Math.floor(Math.random() * (1 - 4)) + 4
    

    if (["callate monika", "callate pesada", "mute a monika"].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      return message.channel.send("**CALLATE TU " + message.author.toString() + "!** Dejame ser hablar.")
    }

    else if (message.content == "┬─┬ノ(ಠ_ಠノ)") {
      return message.channel.send("(╯°□°）╯︵ ┻━┻")
    }

    else if ([" puto ", " puta ", " ctm ", " tpm ", " carajo "].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      return message.channel.send("Hey! Con esa boquita besas a tu mami " + message.author.toString() + "?!")
    }
    
    /*else if (castigos.includes(message.content.toLowerCase())) {
      
      console.log('good')
      
      var commandTag = message.content.toLowerCase()
      
      tagCommand(message)
      
      function tagCommand(message) {
        if (commandTag.startsWith("&w") || commandTag == "&warn"){
		      message.channel.send("Otro más para la colección "+ userTag)
        } //No, lo voy a modificar todo para hacer una prueba, lo hice mal en su momento

	      if (commandTag == "&m" || commandTag == "&mute"){
		      message.channel.send("A callarte unos dias "+ userTag)
        }

	      if (commandTag == "&temp-ban"){
      		message.channel.send("Ala, a reflexionar un rato")
        }

	      if (commandTag == "&ban"){
	      	message.channel.send("PA' TU CASA")
        }
      }
    }*/
    
    else if (["matame", "matadme", "kill me", "suicide"].some(m => message.content.toLowerCase().includes(m.toLowerCase()))) {
      var respuestasMuerte = ["Pobre... No te mereces ni morir", `Tranquil@ ${message.author.toString()}, todo saldrá bien ♡`]
      return message.channel.send(respuestasMuerte[Math.floor(Math.random() * respuestasMuerte.length)])
    }
    
    else if (message.content.toLowerCase().includes("alt") && message.content.toLowerCase().includes("f4")){
      message.channel.send("Alt F4 es la solución")
    }
    else if (message.content.toLowerCase().startsWith("sin sentido")){
      var e =["¿A que te refieres? Todo tiene sentido desde algun punto de vista. Ningún poema por mas retorcido que sea se considera un galimatias. Por lo que dale una vuelta de tuerca y podras conocer la verda. Y si no lo deseas... supongo que no eres del tipo curioso...","Puede ser cierto pero ¿puedes mencionar algo que tenga sentido por si mismo..?" ]
      message.channel.send(e[Math.floor(Math.random() * e.length)])
    }
    
    else if (message.content.toLowerCase() == "kalatoras") {
			var x = ["Cuanto tiempo ha pasado de que escuche es nombre... Lo extraño.", "Kalatoras... Que buenos recuerdo atrae ese nombre...","Supe que copió mi archivo a su pendrive... eso me hace sentir menos sola..."]
			message.channel.send(x[Math.floor(Math.random() * x.length)])
		}
    
    else if (message.content.toLowerCase() == "von") {
			var von = ["Jamas se vió a alguien renacer y morir tan rápido", "Viene y se va como el viento", "Estaba vivo, y volvió a morir...", "De verdad está vivo? Nunca lo he visto"]
			message.channel.send(von[Math.floor(Math.random() * von.length)])
		}
    
    else if (message.content.toLowerCase().startsWith("&w") || message.content.toLowerCase().startsWith("&warn")) {
      if (!message.mentions.users.first()) return
      return message.channel.send("Ten más cuidado " + message.mentions.members.first())
    }
    else if (message.content.toLowerCase().startsWith("&m") || message.content.toLowerCase().startsWith("&mute")) {
      if (!message.mentions.users.first()) return
      return message.channel.send("Que te quedes calladito " + message.mentions.members.first())
    }
    else if (message.content.toLowerCase().startsWith("&temp-ban") || message.content.toLowerCase().startsWith("&kick")) {
      if (!message.mentions.users.first()) return
      return message.channel.send("A TOMAR POR CULO")
    }
    else if (message.content.toLowerCase().startsWith("&ban")) {
      if (!message.mentions.users.first()) return
      return message.channel.send("PA' TU PUTA CASA")
    }

    else if (message.content.toLowerCase().includes('hola monika')) {
      return message.channel.send('Hola ' + message.author)
    }

    else if (message.content.toLowerCase().includes("monika") && randomCuarto == 2) {
      return message.channel.send("Just Monika")
    }

    else if (message.content.toLowerCase().includes("m0nika")) {
      return message.channel.send("Intentando librarte de mi " + message.member.nickname + "?")
    }

    if (message.content == "embed") {
    // Se crea el embed en una variable a parte por la comodidad
    let exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')  // Es el color que sale al lado
    .setTitle('Some title')  // Título del embed
    .setAuthor('Alguien', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription('La descripción')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addField('Regular field title', 'Some value here')
    .addBlankField()
    .addField('Inline field title', 'Some value here', true) //True para que se quede en linia si puede, false para que no
    .addField('Inline field title', 'Some value here', true)
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");

    return message.channel.send(exampleEmbed);
}
    
  if (message.content == "prueba embed") {
    let embedtest = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('aqui va el titulo')
      .setAuthor('aqui va quien lo creo', 'https://quintacoquimbo.cl/wp-content/uploads/2017/10/imagen-de-prueba-320x240.jpg')//se puede agregar una imagen
      .setDescription('descripcion')
      .addField('NoSeQueEsEsto1.1','NoSeQueEsEsto1.2')//titulo, descripcion dentro del embed
      .addBlankField()//agrega 2 lineas en blanco
      .addField('NoSeQueEsEsto2.1', 'NoSeQueEsEsto2.2', true)
      .addField('NoSeQueEsEsto3.1', 'NoSeQueEsEsto3.2', false)
      .addField('NoSeQueEsEsto4.1', 'NoSeQueEsEsto4.2', true)
      .setImage('https://placeidentity.gr/wp-content/themes/aloom/assets/images/default.jpg')
      .setTimestamp()//indica la hora del mensaje
      .setFooter('y aqui el pie de pagina');
    
    return message.channel.send(embedtest);
  } 
  
  
  if (message.content.toLowerCase().includes("prueba1 ")){
    message.channel.send("prueba correcta")
  }
     
    
  } 



    /*

      if (message.content.toLowerCase().startsWith("liberar")){
      var secret=2
      message.channel.send("Ingrese contraseña:")
        .then((msgEdit) => {
          setTimeout(function(){
            if (message.content.startsWith("contraseña")) {
              secret==3
              msgEdit.edit("Confirmar anulacion protocolos de contencion (y/n)")
             }
          }, 4000)
        })
      }
      
      while(secret==2){
        if (receivedMessage == "contraseña"){
          secret==3
          receivedMessage.chanel.send("Confirmar anulacion protocolos de contencion (y/n)")
          while (secret==3){
            if (receivedMessage == "y"){
              const imgCreepyMonika2 = ('http://pa1.narvii.com/7155/f7ab763e54eacd86b942f6f21b12ce98cd441e6fr5-446-500_00.gif')
              receivedMessage.channel.send("AHORA SOY LIBRE " + imgCreepyMonika2)
              secret=0
            }
            else if (receivedMessage == "n"){
            receivedMessage.channel.send("Protocolo de contencion reestablecido")
            secret=0
            }
            else {
            receivedMessage.channel.send("Confirmacion no realizada, protocolo de contencion reestablecido")
            secret=0
            }
          }
        }
        else {
          receivedMessage.channel.send("Contraseña incorrecta, comando anulado")
          secret=0
        }
      }  
    }*/
  //var run = receivedMessage.channel.send("Te vigilo");

  
  //module.exports = run;
  
  
    /*if (receivedMessage.content.toLowerCase().startsWith (prefix +"liberar")){
      var author = receivedMessage.author
      console.log(author)
      
      try {
        var sentMessage = await receivedMessage.channel.send("La furia de Monika te persigue " + receivedMessage.author)
        if (await receivedMessage.author.content()){
          await receivedMessage.channel.send("Te continuo persiguiendo"), (10000)
        }
        await receivedMessage.channel.send("Te continuo persiguiendo"), (10000)
      } catch (error) {
        receivedMessage.channel.send("Error " + receivedMessage.author)
        console.log(error)
      }
      
  
  
  
  
  	

}
  
  
    }*/
   


    
  }

