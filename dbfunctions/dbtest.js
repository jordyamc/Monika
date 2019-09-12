const Discord = require('discord.js')
const client = new Discord.Client()

const db = require('megadb')
let dbTest = new db.crearDB('keys')

const botconfig = require('../config.json')

module.exports = {
  
  function1db: async (message, prefix, rolIT) => {
    
    if (message.author.bot) return // Si el mensaje es de un bot, paramos
    
    if (!dbTest.tiene(`${message.author.id}`)){ // Miramos si la BD tiene la ID del server
      dbTest.establecer(`${message.author.id}`, {Username: `${message.author.username}`, key: 0})
    }
    
    
    let randomStart = Math.floor(Math.random() * (1 - 880)) + 880
		console.log("Key number: "+ randomStart)
    let randomStop = Math.floor(Math.random() * (1 - 25)) + 25;
    
    var keys = await dbTest.obtener(`${message.author.id}.key`)
    
    if (randomStart == "2" && keys == "0"){
      dbTest.sumar(`${message.author.id}.key`, 1)
      return message.channel.send("A partir de ahora te vigilaré!"+ message.author)
    }
    
    if (message.content.startsWith(prefix +"stop") && keys == "1") {
      if (message.member.roles.has(rolIT.id) || message.member.hasPermission('ADMINISTRATOR')){
        let user = message.mentions.members.first() || message.member || message.mentions.members.first().id
        console.log(user.id)
        dbTest.restar(`${user.id}.key`, 1)
        return message.channel.send(user +" fue liberad@ temporalmente")
      } else {
        return message.channel.send("No eres tan privilegiad@ como para tocarme de esta manera ¬.¬")
      }
    } else if (randomStop == "2" && keys == "1") {
      dbTest.restar(`${message.author.id}.key`, 1)
      return message.channel.send("Por esta vez te liberaste de mi "+ message.author)
    }

  }
  
  
}

/*

*/
