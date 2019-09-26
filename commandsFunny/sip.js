const Discord = require('discord.js')

module.exports = {
  name:'sip',
  alias:["drink", "tea", "tecito", "coffee", "cafecito"],
  description:'Para beber un poco de te',
  
  run: (message) => {
    
    var sip = [
      "https://i.ibb.co/b51tQ84/izayaSip.gif",
      "https://i.ibb.co/j4Pm9Cc/kannaSip.gif",
      "https://i.ibb.co/4WrN41c/stareSip.gif",
      "https://i.ibb.co/C55MvKR/sip.gif",
      "https://i.ibb.co/9ZCCrGs/sip-2.gif",
      "https://i.ibb.co/5LKzGh6/sip-3.gif",
      "https://i.ibb.co/WcXWyNg/sip-4.gif",
      "https://i.ibb.co/pwbbBzw/sip-5.gif",
      "https://i.ibb.co/tcrH53D/sip-6.gif",
      "https://i.ibb.co/HDZTZYP/sip-7.gif",
      "https://i.ibb.co/hHt9zZJ/sip-8.gif",
      "https://i.ibb.co/HXymcb7/sip-9.gif",
      "https://i.ibb.co/FV7jXhM/sip-10.gif",
      "https://i.ibb.co/3zTwkbM/sip-11.gif",
      "https://i.ibb.co/LQr2Hh0/sip-12.gif",
      "https://i.ibb.co/zxhM4Cr/sip-13.gif",
      "https://i.ibb.co/JRkRVJf/sip-14.gif",
      "https://i.ibb.co/bHM0M7w/sip-15.gif",
      "https://i.ibb.co/VBZRszY/sip-16.gif",
      "https://i.ibb.co/B3Fnr7v/sip-17.gif",
      "https://i.ibb.co/HV3cKRb/sip-18.gif"
    ]
    
    if(message.mentions.users.first()){
      let sipEmbed = new Discord.RichEmbed()
		    .setDescription(`${message.author} was sipping with ${message.mentions.users.first()}`)
        .setColor('#426800')
		    .setImage(sip[Math.floor(Math.random() * sip.length)])
    
      return message.channel.send(sipEmbed)
    } else {
      let sipEmbed = new Discord.RichEmbed()
		    .setDescription(`${message.author} was sipping`)
        .setColor('#426800')
		    .setImage(sip[Math.floor(Math.random() * sip.length)])
    
      return message.channel.send(sipEmbed)
    }
  
  }
}