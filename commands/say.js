module.exports = {
  name:'say',
  alias:[],
  description: 'Repite el mensaje escrito',
  
  run: (message, args, rolIT) =>{
  
		let random = Math.floor(Math.random() * (1 - 100)) + 100;
		console.log("Say number: "+ random)
    
    if(!args[0]) {
      message.channel.send(message.author +", que me quieres hacer decir?")
    } 
    
    else if (message.mentions.channels.first() && message.member.roles.has(rolIT.id)) {
      message.mentions.channels.first().send(args.slice(1).join(" "))
    } else {
      
      if (0<random && random<=3) {
		    message.channel.send("#$$%&ERROR?¿¡¡11A#")
	  	}
      
      else if (10<random && random<=20) {
        message.channel.send("No pienso decir eso")
      }
      
      else if (random==50) {
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