const Discord = require('discord.js')

module.exports = {
  name: 'poledance',
  alias: [],
  description: 'Pole dance',

  run: (message) => {

    var request = require("request")
    var url = "http://serverfound.000webhostapp.com/data_img_poledance.json"

request({
    url: url,
    json: true
},
function (error, response, body) 
{
    
    if (!error && response.statusCode === 200) 
    {
         //  console.log(body[Math.floor(Math.random() * body.length)] ) // Print the json response
        var imgmostrar = body[Math.floor(Math.random() * body.length)];
        if (message.mentions.users.first()) {
          let poledanceEmbed = new Discord.RichEmbed()
            .setDescription(``)
            .setColor("#feb1fe")
            .setImage(imgmostrar)
            .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

          return message.channel.send(poledanceEmbed)
        } else {
          let poledanceEmbed = new Discord.RichEmbed()
            .setDescription(``)
            .setColor("#feb1fe")
            .setImage(imgmostrar)
            .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

          return message.channel.send(poledanceEmbed)
        }

    
   }
  
})
  
    

    
    
    
    
  }
}