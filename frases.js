const Discord = require("discord.js");

module.exports = {
  frases: async (message, client) => {
    
    let embed = new Discord.RichEmbed()
    
    //if (message.author.id == "396172082548965377") { 
        // Pony
        // message.react(client.emojis.get("650403404069470248"))
    //}
    
    var emojiRand = Math.floor(Math.random() * 10); // HEnculto
    //if (message.guild.id == "545720855578279958" && message.member.roles.has("555402664301690883") && emojiRand == 2) {
    //message.react(client.emojis.get("564505823427166303"))
    //}
    if (message.author.id == "259752334068809731") {
      // Neko
      message.react(client.emojis.get("650407423261016085"));
    }

    if (message.author.id == "490237267236093964") {
      // Senko
      message.react(client.emojis.get("575756974373994527"));
    }

    //if (message.author.id == "538608416260751361" && (message.channel.id == "555596703412256779" || message.guild.id == "589294239842828318")) { 
        // Sanf
        //message.react(client.emojis.get("652602944528711713"))
    //}

    //if (message.mentions.users.first() && message.mentions.users.first().id == "396172082548965377") {
      // Pony
      // message.channel.send("***Ahi viene la locaaaaaaaa!!***")
   // }
    
    if (message.mentions.users.first() && message.mentions.users.first().id == "368802052912054283") {
      // Seza
       message.channel.send("**¡¡¡Busca novia de una vez!!!**")
    }
    //if (message.author.id == "425352671990382605") { // Shu
    //  message.react(client.emojis.get("571827698058526740"))
    //}

    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id == "259752334068809731"
    ) {
      // Neko
      message.channel.send("TSUNDERE!!!!!");
    }

    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id == "561282270682677277"
    ) {
      // Diego
      message.channel.send("Paaaaaaaaaaaaaaatas!!!!!!!!");
    }
    
    
    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id == "569667645666754639"
    ) {
      // BRX
      message.channel.send("***Be erre equis!!***")
    }
    
    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id == "407659641569542154"
    ) {
      // Hefer
      message.channel.send("***Deja de cagarla coñooooo!!!!***")
    }
    
    if (
      message.mentions.users.first() &&
      message.mentions.users.first().id == "428961424551837717"
    ) {
      // Ferre
      embed.setImage("https://media1.tenor.com/images/e683152889dc703c77ce5bada1e89705/tenor.gif")
      message.channel.send(embed)
    }
    
  }
};
