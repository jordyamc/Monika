const Discord = require('discord.js')

var name = '!say';
var alias = [];
var cat = 'admin';

module.exports = {
  name: name,
  alias: alias,
  
  run: (message, args, rolIT) => {
    
      
    message.delete(0)
    
    if (message.mentions.channels.first() && message.member.roles.has(rolIT.id)){
      message.mentions.channels.first().send(args.slice(1).join(" "))
    } else {
      message.channel.send(args.join(" "))
    }
    
  }
}

module.exports.help = {
  name: name,
  alias: alias,
  categoria: 'admin',
  description: 'Repite el mensaje escrito y elimina el mensaje del usuario',
}

/*
message.mentions.channels.first()  */