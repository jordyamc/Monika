const Discord = require('discord.js')

module.exports = {
  name:'warn',
  alias:[],
  description:'Mods repartiendo warns',
  
  run: (message) => {
    
    var warns = [
      'https://cdn.discordapp.com/attachments/589066102315941908/589233570934030357/warn3.gif',
      'https://media.discordapp.net/attachments/550416761972064267/574810575725658123/234234234234234.jpg?width=371&height=473',
      'https://media.discordapp.net/attachments/550416761972064267/574810690267906048/one-punch.jpg',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792399860138014/Que_clase_de_Warn_es_este.png',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792257312653353/CaballoWarn.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574811125292466198/WARN.jpg?width=287&height=473',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792279345332235/HomoWARN.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574811739745550336/Goku.png?width=694&height=473',
      'https://media.discordapp.net/attachments/550416761972064267/574811182142062633/PicsArt_02-28-03.02.51.jpg?width=815&height=474',
      'https://media.discordapp.net/attachments/550416761972064267/574811544353898509/Maketa.jpg?width=420&height=473',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792405329641492/WarnGun.png',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792324685758485/xDDDDDDD.gif',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792459205345329/AmeWarn.gif',
      'https://media.discordapp.net/attachments/550416761972064267/574811385196838949/unknown.png?width=738&height=473',
      'https://media.discordapp.net/attachments/550416761972064267/574810685654171658/BAN_BAN.png?width=664&height=473',
      'https://media.discordapp.net/attachments/550416761972064267/574811553707327489/Junkowarn.jpg',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792296952889354/PicsArt_02-26-04.05.53.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574811618068922378/Warnazos_incoming.png?width=466&height=473',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792247887921152/AllahuAkbar.jpg',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792276937539605/KannaWarn.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574811342439972864/Remwolff_Warn.jpg?width=623&height=474',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792385393852433/tenor_1.gif',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792305366663188/PicsArt_03-01-03.11.55.jpg',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792328833794098/WarnPorWeon.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574811096653758466/Warn_Seagull.jpg?width=842&height=474',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792278699147284/Himalaya.jpg',
      'https://media.discordapp.net/attachments/550416761972064267/574810608927768606/ban.png?width=366&height=474',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792336694050826/WarnMeme.jpg',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792348056158234/WarneadoPorWeonChika.png',
      'https://cdn.discordapp.com/attachments/550416761972064267/574792400447209499/PicsArt_02-26-04.07.59.png'
    ]
    
    if(message.mentions.users.first()){
      let warnEmbed = new Discord.RichEmbed()
        .setColor("ff001a")
		    .setDescription(`La ira de los mods te caerá encima ${message.mentions.users.first()}`)
		    .setImage(warns[Math.floor(Math.random() * warns.length)])
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(warnEmbed)
    } else {
      let warnEmbed = new Discord.RichEmbed()
        .setColor("ff001a")
		    .setTitle(`Acaso tienen que llover warns aquí?`)
		    .setImage(warns[Math.floor(Math.random() * warns.length)])
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
    
      return message.channel.send(warnEmbed)
    }
  }
}