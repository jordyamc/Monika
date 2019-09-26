const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
  
  economy: async (message, prefix, rolIT) => {

    
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

            var porcentaje1 = 30
            var porcentaje2 = 100 - porcentaje1

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
            console.log('dinero90: ' + dinero90)
            console.log('dinero10: ' + dinero10)
          }
          
          /* fin uso de la respuesta */
        }  
      )
/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
    }

    if (!bank.tiene(`${message.guild.id}.${message.author.id}`)){
      bank.establecer(`${message.guild.id}.${message.author.id}`, { money: 0, inventory: Array() })
    }

  }
}