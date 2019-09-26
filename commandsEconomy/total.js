const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
  name:'total',
  alias:[],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    let bal = await bank.obtener(`${message.guild.id}.${message.author.id}.money`)
    
    
    
  }
}