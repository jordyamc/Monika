const Discord = require("discord.js")

module.exports = {
  name:'marry',
  alias:[],
  description:'',
  
  execute(message, args){
    
    let usuario = message.mentions.users.first()

    if (!usuario) return message.channel.send("Este usuario no existe. Método: `!marry <@usuario/usuarioid>`");

    message.channel.send(`${usuario.tag}, aceptas la propuesta de ${message.author.tag}?`)

    const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 30000}); // Creamos una colección de mensajes acá
      collector.on("collect", collected => { // llamados al evento de la coleción
      if (collected.content.toLowerCase() === "yes"){  // Condicionamos una respuesta al decir yes
        message.channel.send("Felicidades a la nueva pareja")
      } else if (collected.content.toLowerCase() === "no"){ // Acá otra respuesta al decir que no
        message.channel.send("Parece que la propuesta ha sido rechazada")
      }
});

collector.on("end", collected => { // Esto es por si se acaba el tiempo
    if (collected.size === 0) return message.channel.send("Parece que alguien huye del matrimonio :rolling_eyes:");
}) 
    
  }
}



/*



*/