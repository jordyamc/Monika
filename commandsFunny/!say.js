const Discord = require('discord.js')

module.exports = {
  name:'!say',
  alias:[],
  description:'Repite el mensaje escrito y elimina el mensaje del usuario',
  
  run: (message, args, rolIT) => {
    
    if (!message.member.roles.has(rolIT.id)) return
      
    message.delete(0)
    
    if (message.mentions.channels.first() && message.mentions.channels.first().id != "562285619435536424"){
      message.mentions.channels.first().send(args.slice(1).join(" "))
    } else {
      message.channel.send(args.join(" "))
    }
    
  }
} 