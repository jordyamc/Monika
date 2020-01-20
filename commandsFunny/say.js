module.exports = {
  name:'say',
  alias:[],
  description: 'Repite el mensaje escrito',
  
  run: (message, args, rolIT) =>{
  
		let randomS = Math.floor(Math.random() * (1 - 100)) + 100;
		console.log("Say number: "+ randomS)
    
    if(!args[0]) {
      message.channel.send(message.author +", que me quieres hacer decir?")
    } 
    
    else if (message.mentions.channels.first() && message.member.roles.has(rolIT.id) && message.mentions.channels.first().id != "562285619435536424" || message.author.id == "355104003572498435") {
      message.mentions.channels.first().send(args.slice(1).join(" "))
    } else {
      
      if (0<randomS && randomS<=3) {
		    message.channel.send("#$$%&ERROR?¿¡¡11A#")
	  	}
      
      else if (10<randomS && randomS<=20) {
        message.channel.send("No pienso decir eso")
      }
      
      else if (randomS==50) {
        message.channel.send("00 1 1010 010 111 011 100")
      }
      
      else if (message.content.includes("soy un bot")) {
	  	  message.channel.send("No voy a decir eso, no soy un bot!")
      }
		
      else {
	  		message.channel.send(args.join(" ")) 
  		} 
    
    }
		
  }
}
