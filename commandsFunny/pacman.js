const Discord = require('discord.js')
const pacman = require('pacman-djs')

module.exports = {
  name:'pacman',
  alias:[],
  description:'',
  
  run: async (message, args, rolIT, client) => {
    
    //if(message.channel.id != "555596703412256779" && message.channel.id != "562854876061892627" && message.author.id != "355104003572498435") return message.channel.send("Compra la peluca de IT para jugar! ``/buy peluca byte``")
    
    let mapa = [
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

    let start = new pacman.PacGame(mapa, 2, {
      win_text: `Felicidades ${message.author.username}, ganaste!`,
      to_lose_text: `F por ${message.author.username}`,
      coin_points: 1000,
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