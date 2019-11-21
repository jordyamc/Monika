const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')
let tienda = new db.crearDB('tienda')

module.exports = {
  
  economy: async (message, args, prefix, rolIT) => {

    
    if (message.content.toLowerCase().includes("$$$")){
    /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
    /*
    ejemplos get data 
    */
      
      var accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzU1MTA0MDAzNTcyNDk4NDM1IiwiaWF0IjoxNTYyMjYyMTg0fQ.k1ulwHnvf2vwnYy3LOJkijQkpkc7mBem_PkLDzpeWSc"; // token dialogflow
      var baseUrl = "https://unbelievable.pizza/api/guilds/545720855578279958/users";
      var Request = require("request");
      Request.get(
        {
          "headers": 
          {
            "content-type": "application/json",
            "Authorization": accessToken
          },
          "url": baseUrl
        }, 
        (error, response, body) => 
        {
          /* uso de la respuesta */

          /* armar array con el nuevo formato */       

          var respuesta = body;
          
          var total = 0
          var users = 0
          var dinero10 = 0

          respuesta = JSON.parse(respuesta);

          
          
          for(var k in respuesta) {
            var userID = respuesta[k].user_id
            var dinero = respuesta[k].total
	          var inventario = Array()
  
            total = total + dinero
            users = users + 1

            var porcentaje1 = 69 // banco
            var porcentaje2 = 100 - porcentaje1 // usuario

            var dinero90 = Math.floor(dinero * porcentaje2) / 100
            var dinero10b = Math.floor(dinero * porcentaje1) / 100

            var dinero90 = Math.round(dinero90)
            var dinero10 = dinero10 + Math.round(dinero10b)
          
            bank.establecer(`${message.guild.id}.${userID}`, {money: dinero90, inventory: inventario})

            

            if(dinero == 0) {
              var conv = (total) => String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
              var conv = (users) => String(users).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
              var conv = (dinero10) => String(dinero10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
              bank.establecer(`${message.guild.id}.bank`, { money: dinero10 })
              return message.channel.send(`Número de usuarios: ${conv(users)}
              Dinero total en el server: ${conv(total)} <:monocoin:623298856309751808>
              Dinero en el banco ${porcentaje1}%: ${conv(dinero10)} <:monocoin:623298856309751808>`)

            }

            console.log('total: ' + total)
            console.log(porcentaje1+' : ' + dinero90)
            console.log(porcentaje2+' : ' + dinero10)
          }
          
          /* fin uso de la respuesta */
        }  
      )
/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
      bank.establecer(`${message.guild.id}.role.sinvoz`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325733937446912.png`, name: `los sin voz` })
    
      //bank.establecer(`${message.guild.id}.role.fate`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556332962799419392.png`, name: `fate` })

      bank.establecer(`${message.guild.id}.role.oreo`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325702970900549.png`, name: `oreo` })

      bank.establecer(`${message.guild.id}.role.henculto`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/564505823427166303.png`, name: `henculto` })

      bank.establecer(`${message.guild.id}.role.artistas`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/601207869051764767.png`, name: `artistas` })

      bank.establecer(`${message.guild.id}.role.monogatari`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325680133177344.png`, name: `monogatari` })

      bank.establecer(`${message.guild.id}.role.toldboden`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/557380883112525834.png`, name: `toldboden` })

      //bank.establecer(`${message.guild.id}.role.battleroyal`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/566041148611756033.png`, name: `battleroyal` })

      bank.establecer(`${message.guild.id}.role.scriptio`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325719932928000.png`, name: `scriptio` })

      bank.establecer(`${message.guild.id}.role.itcrowd`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/562075100116156418.png`, name: `it crowd` })

      bank.establecer(`${message.guild.id}.role.nocturnos`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/571345022772051968.png`, name: `nocturnos` })

      //bank.establecer(`${message.guild.id}.role.esperanzas`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556332981279522837.png`, name: `esperanzas` })
  
      bank.establecer(`${message.guild.id}.role.mods`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/571557185251966986.gif`, name: `mods` })
  
      /*
      tienda.establecer(`${message.guild.id}.membresia.sinvoz`, { price: 75000, icon: `<:sinvoz:556325733937446912>`, name: `Los Sin Voz`, role: "false", users:["0"] })
    
      tienda.establecer(`${message.guild.id}.membresia.fate`, { price: 75000, icon: `<:fate:556332962799419392>`, name: `Fate`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.oreo`, { price: 75000, icon: `<:oreo:556325702970900549>`, name: `Oreo`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.henculto`, { price: 75000, icon: `<:henculto:564505823427166303>`, name: `Henculto`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.artistas`, { price: 75000, icon: `<:artistas:601207869051764767>`, name: `Artistas`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.monogatari`, { price: 75000, icon: `<:monogatari:556325680133177344>`, name: `Monogatari`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.toldboden`, { price: 75000, icon: `<:toldboden:557380883112525834>`, name: `Toldboden`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.battleroyal`, { price: 75000, icon: `<:Battleroyal:566041148611756033>`, name: `Battleroyal`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.scriptio`, { price: 75000, icon: `<:scriptio:556325719932928000>`, name: `Scriptio`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.itcrowd`, { price: 75000, icon: `<:itcrowd:562075100116156418>`, name: `IT Crowd`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.nocturnos`, { price: 75000, icon: `<:Nocturnos:571345022772051968>`, name: `Nocturnos`, role: "false", users:["0"] })

      tienda.establecer(`${message.guild.id}.membresia.esperanzas`, { price: 75000, icon: `<:esperanzas:556332981279522837>`, name: `Esperanzas`, role: "false", users:["0"] })
      

      tienda.establecer(`${message.guild.id}.peluca.sinvoz`, { price: 0, icon: `<:sinvoz:556325733937446912>`, name: `Los Sin Voz`, role: "", time:"" })
    
      tienda.establecer(`${message.guild.id}.peluca.fate`, { price: 0, icon: `<:fate:556332962799419392>`, name: `Fate`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.oreo`, { price: 0, icon: `<:oreo:556325702970900549>`, name: `Oreo`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.henculto`, { price: 0, icon: `<:henculto:564505823427166303>`, name: `Henculto`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.artistas`, { price: 0, icon: `<:artistas:601207869051764767>`, name: `Artistas`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.monogatari`, { price: 0, icon: `<:monogatari:556325680133177344>`, name: `Monogatari`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.toldboden`, { price: 0, icon: `<:toldboden:557380883112525834>`, name: `Toldboden`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.battleroyal`, { price: 0, icon: `<:Battleroyal:566041148611756033>`, name: `Battleroyal`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.scriptio`, { price: 0, icon: `<:scriptio:556325719932928000>`, name: `Scriptio`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.itcrowd`, { price: 0, icon: `<:itcrowd:562075100116156418>`, name: `IT Crowd`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.nocturnos`, { price: 0, icon: `<:Nocturnos:571345022772051968>`, name: `Nocturnos`, role: "", time:"" })

      tienda.establecer(`${message.guild.id}.peluca.esperanzas`, { price: 0, icon: `<:esperanzas:556332981279522837>`, name: `Esperanzas`, role: "", time:"" })
      */

      moneda = args.join(" ");

      if (args[0]) {
        bank.establecer(`${message.guild.id}.moneda`, moneda)
      } else {
        bank.establecer(`${message.guild.id}.moneda`, "<:foxIT:626526183542095882>")
      }
      console.log("A: " + await bank.obtener(`${message.guild.id}.moneda`))
      
    }    
    
    

    if (!bank.tiene(`${message.guild.id}.${message.author.id}`)){
      bank.establecer(`${message.guild.id}.${message.author.id}`, { money: 0, inventory: Array() })
    }

  }
}