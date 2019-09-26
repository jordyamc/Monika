const Discord = require('discord.js')
const db = require('megadb')
let dbChannelsBL = new db.crearDB('channelBL')

module.exports = {
  
  blChannels: async (message, prefix, rolIT) => {
    
    const datos = await dbChannelsBL.obtener(message.guild.id)

    var canal = message.mentions.channels.first() || message.channel
    
    if ((message.content.startsWith(prefix+'channel-disable') && message.member.roles.has(rolIT.id)) || (message.content.startsWith(prefix+'channel-disable') && message.member.hasPermission('ADMINISTRATOR'))){ 
      
      if (datos.includes(canal.id)) return message.channel.send("Ya tenia bloqueado este canal...")
      
      if (!dbChannelsBL.tiene(`${message.guild.id}`)){
        dbChannelsBL.establecer(`${message.guild.id}`, [canal.id])
      }else{
        dbChannelsBL.push(`${message.guild.id}`, canal.id)
      }
      message.channel.send('De acuerdo, no acataré órdenes en este canal')
    }
    
    
    if ((message.content.startsWith(prefix+'channel-enable') && message.member.roles.has(rolIT.id)) || (message.content.startsWith(prefix+'channel-enable') && message.member.hasPermission('ADMINISTRATOR'))){
      
      if (!datos.includes(canal.id)) return message.channel.send("Ya me podías ejecutar, pero gracias por intentarme liberar")
      
      if (dbChannelsBL.tiene(`${message.guild.id}`)) {
        dbChannelsBL.extract(`${message.guild.id}`, canal.id)
      }
      return message.channel.send('Ya puedes volver a usar a Monika')
    }
      
    
  } 
}

/*
dbChannelsBL.extract(`${message.guild.id}.blacklist`, (message.channel.id))
      return message.channel.send('Canal eliminado de la BlackList correctamente!')
*/