const Discord = require('discord.js')
const pacman = require('pacman-djs')

module.exports = {
  name:'pacman',
  alias:[],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    let mapa = {
      map1: { 
        dificult: easy,
        time: 2,
        map: [
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣",
          "▣▩◇◇◇▩▩▩ᗣ▩▩▩◇◇◇▩▣",
          "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
          "▣▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▣",
          "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
          "▣◇▩▩▩▩▩▩ᗣ▩▩▩▩▩▩◇▣",
          "▣◇▩▩▩▩▩▩▩▩▩▩▩▩▩◇▣",
          "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
          "▣▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▣",
          "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
          "▣▩◇◇◇▩▩▩ᗧ▩▩▩◇◇◇▩▣",
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"
        ]
      },
      map2: {
        dificult: medium,
        time: 4,
        map: [
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣",
          "▣▩▩▩▩▩▩▩▩▩▣▩▩▩▩▩▩▩▩▩▣",
          "▣▩▣▣▣▩▣▣▣▩▣▩▣▣▣▩▣▣▣▩▣",
          "▣▩▣▣▣▩▣▣▣▩▣▩▣▣▣▩▣▣▣▩▣",
          "▣▩▣▣▣▩▣▣▣▩▣▩▣▣▣▩▣▣▣▩▣",
          "▣▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▣",
          "▣▩▣▣▣▩▣▩▣▣▣▣▣▩▣▩▣▣▣▩▣",
          "▣▩▣▣▣▩▣▩▣▣▣▣▣▩▣▩▣▣▣▩▣",
          "▣▩▩▩▩▩▣▩▩▩▣▩▩▩▣▩▩▩▩▩▣",
          "▣▣▣▣▣▩▣▣▣▩▣▩▣▣▣▩▣▣▣▣▣",
          "▣▣▣▣▣▩▣▩▩▩▩▩▩▩▣▩▣▣▣▣▣",
          "▣▣▣▣▣▩▣▩▣▣▣▣▣▩▣▩▣▣▣▣▣",
          "▣▣▣▣▣▩▣▩▣▣▣▣▣▩▣▩▣▣▣▣▣",
          "▣▩▩▩▩▩▩▩▩▩▣▩▩▩▩▩▩▩▩▩▣",
          "▣▩▣▣▣▩▣▣▣▩▣▩▣▣▣▩▣▣▣▩▣",
          "▣▩▩▩▣▩▩▩▩▩▩▩▩▩▩▩▣▩▩▩▣",
          "▣▣▣▩▣▩▣▩▣▣▣▣▣▩▣▩▣▩▣▣▣",
          "▣▣▣▩▣▩▣▩▣▣▣▣▣▩▣▩▣▩▣▣▣",
          "▣▩▩▩▩▩▣▩▩▩▣▩▩▩▣▩▩▩▩▩▣",
          "▣▩▣▣▣▣▣▣▣▩▣▩▣▣▣▣▣▣▣▩▣",
          "▣▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▣",
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"
        ]
      },
      map3: {
        dificult: medium,
        time: 2,
        map: [
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣",
          "▣▩◇◇◇▣▩▩▩▩▩▣◇◇◇▩▣",
          "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
          "▣ᗣ▣▩▩▩▩▣▣▣▩▩▩▩▣ᗣ▣",
          "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
          "▣◇▣▩▩▣▣▩▩▩▣▣▩▩▣◇▣",
          "▣◇▣▣▩▩▩▩▣▩▩▩▩▣▣◇▣",
          "▣◇▣▩▩▣▣▩▩▩▣▣▩▩▣◇▣",
          "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
          "▣▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▣",
          "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
          "▣▩◇◇◇▣▩▩ᗧ▩▩▣◇◇◇▩▣",
          "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"
        ]
      }
    }
      
    

    let start = new pacman.PacGame(mapa, 1, {
      win_text: `Felicidades ${message.author.username}, ganaste!`,
      to_lose_text: `F por ${message.author.username}`,
      coin_points: 1,
      coin_text: "💰",
      time_text: "⏲"
    })

    start.start_game(message)

    // start.on("end", (type, monedas, tiempo) => {
    //   if(type == "ghost") {
    //     message.channel.send("El jugador a perdido")
    //   } else if (type == "player") {
    //     message.channel.send("El jugador a ganado")
    //   } else if (type == "time") {
    //     message.channel.send("Tiempo finalizado")
    //   } else if (type == "error") {
    //     message.channel.send("ERROR")
    //   }
    // })
  }
}