const Discord = require('discord.js')

module.exports = {
  name:'moneda',
  alias:[],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    var moneda = ['https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fcara.png', 'https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fcruz.png']
    
    return message.channel.send(moneda[Math.floor(Math.random() * moneda.length)])
  }
}