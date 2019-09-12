const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')

module.exports = {
  junko: async (message) => {
    
function resolveAfter3Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 3000);
  });
}   
/* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr */        
/* 
frecuenciaMensaje: originalmente pensado para 3 tipos de mensaje, lo modifique solo para 2 
frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
 
*/
function frecuenciaMensaje(Action) {
	switch(Action) {
  case 'muyBajaFrecuencia':
			var Probabilidad = ["1","0","0","0", "0", "0", "0","0","1","0","0","0", "0", "0", "0","0"]
			var  resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
		break;
		case 'bajaFrecuencia':
			var Probabilidad = ["1","0","0","1", "0", "0", "1","0","1","0"]
			var  resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
		break;
		case 'altaFrecuencia':
			var  Probabilidad = [ "1", "1", "0", "1","0","1","1"]			
			var resp = Probabilidad[Math.floor(Math.random() *  Probabilidad.length)];      
		break;
		case 'siempre':
			var Probabilidad = [ "1"]			
			var resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];      
		break;
		default:        
	}
  console.log('Respuesta Shu: ' +resp)
  return resp;
} 
    /* 
     frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
    */
    //id de junko:234100958148296704 
    
  var junko=234100958148296704;
  //var idValidacion=junko;
  var idValidacion=418185145594544150;
    
 
   // resp shu
if (message.author.id==idValidacion){
     var mensaje = [
    "Junkitochan te estoy vigilando... :3", 
    "Junko yo no le voy al yuri, pero en ocaciones dan ganas de besarte... :*", 
    "¿Como va tu dia Junko?",  
    "¿Junko todo bien?", 
    " Jun... ko...  Chan... <3", 
    "Junko... en que piensas?", 
    "Junkito.. :c Deberias hablar mas conmigo", 
    "Junko el pueblo te ama!!", 
    "Junko el server te ama. Bueno... Casi todos... ;D",
    "Junko recuerda descansar bien", 
    "Junko te molestan mucho en el server?",         
    "Junkito bonita!!... <3 ",       
    "Junko se que me lees",              
    "Junko no me ignores.",            
    " Junkitochan?"
  ]
   resolveAfter3Seconds();
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
    
    
    
    
  }
}