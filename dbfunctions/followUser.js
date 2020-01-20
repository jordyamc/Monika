const Discord = require('discord.js')
const client = new Discord.Client()

const db = require('megadb')
let dbFollow = new db.crearDB('followUsers')

module.exports = {
  
  followUsers: async (message, prefix, rolIT) => {
    
    if (message.author.bot) return // Si el mensaje es de un bot, paramos
    
    
    
    if (!dbFollow.tiene(`${message.author.id}`)){ // Miramos si la BD tiene la ID del server
            dbFollow.establecer(`${message.author.id}`, {ID: `${message.author.id}`, key: 0})
    }
    
    
    let randomStart = Math.floor(Math.random() * (1 - 880)) + 880
		// console.log("Key number: "+ randomStart)
    let randomStop = Math.floor(Math.random() * (1 - 7)) + 7;
    
        var keys = await dbFollow.obtener(`${message.author.id}.key`)
    
    if (randomStart == "2" && keys == "0" && message.member.hasPermission('ADMINISTRATOR')){ //  !(message.member.roles.has(rolIT.id) ||
        dbFollow.sumar(`${message.author.id}.key`, 1)
      return message.channel.send("A partir de ahora te vigilaré!"+ message.author)
    }
    
    if (message.content.startsWith(prefix +"stop")){
      
      if (!message.member.roles.has(rolIT.id) && !message.member.hasPermission('ADMINISTRATOR')) return
      
      let user = message.mentions.members.first() || message.author
      if (user){
        dbFollow.restar(`${user.id}.key`, 1)
        return message.channel.send(user +" fue liberad@ temporalmente")
      } 
    }
    
    if (randomStop == "2" && keys == "1") {
        dbFollow.restar(`${message.author.id}.key`, 1)
        return message.channel.send("Por esta vez te liberaste de mi " + message.author)
    
    }
  }
  
  
}