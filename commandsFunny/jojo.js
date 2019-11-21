const Discord = require('discord.js')

module.exports = {
  name:'jojo',
  alias:[],
  description:"Frase aleatoria de Jojo's",
  
  run: (message) => {
    var jojos = [
      {
        name: "ORA ORA ORA ORA!",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Foraoraoraora.gif?v=1564683716080"
      },
      {
        name: "YARE YARE DAZE!",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fyareyaredaze.gif?v=1564685171154"
      },
      {
        name: "OH MY GOD!",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FOh%20my%20God.gif?v=1564685423879"
      }, 
      {
        name: "RERO RERO RERO",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FRero%20rero%20rero.gif?v=1564685420798"
      },
      {
        name: "WRYYYYYYYYYY!!",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FWryyyyyy.gif?v=1564685603259"
      },
      {
        name: "GREATO DAZE",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FGreato%20Daze.gif?v=1564685750716"
      },
      {
        name: "DI MOLTO",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FDi%20molto.gif?v=1564685792745"
      },
      /*{
        name: "Watashi no Doppio",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FWatashi%20no%20Doppio.gif?v=1564685911362"
      },// reclamo por spoiler*/
      {
        name: "ARI ARI ARI ARI ARI ARRIVEDERCI",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FAri%20ari%20ari%20Arrivederci.gif?v=1564686061019"
      },
      {
        name: "MUDA MUDA MUDA MUDA!",
        url: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2FMuda%20muda%20muda.gif?v=1564686093217"
      }
    ];
    
    var jojosM = jojos[Math.floor(Math.random() * jojos.length)]
    
    let jojoembed = new Discord.RichEmbed()
      .setTitle(jojosM.name)
      .setColor('RANDOM')
      .setImage(jojosM.url)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
    return message.channel.send(jojoembed)
    
  }
}