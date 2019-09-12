const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
let users =new db.crearDB('users')

module.exports = {
  
  economy: async (message) => {
    
    
    
    const datos = await bank.obtener(message.guild.id)
    
    if (!users.tiene(message.author.tag)){
      users.establecer(message.author.tag, {id: message.author.id})
    }   
    
    users.find(message.author.tag).then(userTag => {
      var id = userTag.id
    })
    
    if (!datos.includes(message.author.id)) {
      bank.establecer(`datos.${message.author.id}`, {Username: `${message.author.username}`, money: 0, inventory: []})
    }
    
    if (id == embed.author.name){
      users.sumar(`${datos}.${id}.money`, 100)
    }
    
  }
}