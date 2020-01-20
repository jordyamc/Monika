const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
const { logs } = require("../logs.js");

module.exports = {
  name: 'mujerzuela',
  alias: [],
  description: 'Comando H',

  run: async (message, args, rolIT, client) => {
    

    var Probabilidad = ["0", "0","0","0","1", "0", "0","0","0", "0", "0","0","0","0","0","0", "1", "0", "0","0","0","0", "0","0","0","0"]
    var  respProbabilidad = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
    if (respProbabilidad == 1) return message.channel.send("Sorry... Neko te manda a salir con los guardias del local por manosear a las chicas. Yes loli... No touch... <:KalaExit:640068423015071766>")
    if (message.channel.id != "636031490345402388" ) return message.channel.send("Canal equivocado para hacer esto, ve a <#636031490345402388>")
    
    

        var author = message.author
        var user = message.mentions.users.first()
        var idMonika = '608493548177981491'
        var dinero = Number.parseInt(args[0])

        if (!Number.isInteger(dinero)) {
            return message.channel.send('Neko te habla: Habla de manera clara. Cuanto dinero le daras a mis chicas? al dar el dinero escribe sin puntos ni comas ni mierdas extrañas... ``/mujerzuela <dinero>``. <:MikuFU:614658638765752341> ');
        }

        var balance = await bank.obtener(`${message.guild.id}.${author.id}.money`)

        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        //console.log(dinero)
 
         /*    */    
        if (!args[0]) {
            return message.channel.send("Neko te habla: Debes dar dinero si quieres ver a mis chicas ``/mujerzuela <dinero>`` <:nekobaka:639450401376305182>")
        }
  
        if (dinero == NaN) {
            return message.channel.send("Neko te habla: A ver si aprendes, debes poner el dinero en números seguidos ``/mujerzuela <dinero>``. No me gusta explicar 2 veces lo mismo <:nekobaka:639450401376305182>")
        }

        if (dinero < 1) return message.channel.send('Neko te habla: Que demonios intentas? <:Yia:658864726566109199>')

        var futurBal = balance - dinero
        if (futurBal < 0) {
            return message.channel.send("Neko te habla: No puedes dar el dinero que no tienes <:Yia:658864726566109199>")
        }
        if (user == client.user) {
            bank.sumar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer dar dinero ***sumar*** => " + error))
        } else {
            bank.sumar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al dar dinero ***sumar*** => " + error))
        }
        bank.restar(`${message.guild.id}.${author.id}.money`, dinero).catch(error => message.channel.send("Error al  dar dinero ***restar*** => " + error))
        var conv = (dinero) => String(dinero).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    var request = require("request")
        var url = "http://serverfound.000webhostapp.com/data_img_yuri.json"

request({
    url: url,
    json: true
},
function (error, response, body) 
{
    const textoRespuesta = [
      "Se abre la puerta del lugar y entra lentamente para bailar y mostrar sus encantos la nueva chica", 
      "Neko golpea con un látigo el piso y sale la chica lentamente mostrando su mejor lado al publico",  
      "La chica entra... sonríe esperando propinas", 
      "En el fondo bar los miembros de neoHenculto, preparan los tragos para ti mientras esperas que lentamente entre la chica y...", 
      "Mira fijamente al publico y lanza un beso antes de mostrar sus encantos",  
      "Neko te da una cachetada por dar muy poca propina <:nekobaka:639450401376305182>"
    ]
    if (!error && response.statusCode === 200) 
    {
         //  console.log(body[Math.floor(Math.random() * body.length)] ) // Print the json response
        var imgmostrar = body[Math.floor(Math.random() * body.length)];
     console.log(imgmostrar)
        if (message.mentions.users.first()) {
          let mujerzuelaEmbed = new Discord.RichEmbed()
          .setDescription(textoRespuesta[Math.floor(Math.random() * textoRespuesta.length)])
          .setColor("#feb1fe")
          .setImage(imgmostrar)
          .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
          
          return message.channel.send(mujerzuelaEmbed)
        }
        else 
        {
          let mujerzuelaEmbed = new Discord.RichEmbed()
          .setDescription(textoRespuesta[Math.floor(Math.random() * textoRespuesta.length)])
          .setColor("#feb1fe")
          .setImage(imgmostrar)
          .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
          
          return message.channel.send(mujerzuelaEmbed)
        }
   }
  
})
  

  }
}