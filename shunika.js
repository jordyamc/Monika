const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')

module.exports = {
  shunika: async (message) => {
    
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
frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia", muyBajaFrecuencia o muyBajaBajaBajisimaFrecuencia
 
*/
function frecuenciaMensaje(Action) {
	switch(Action) {
 case 'muyBajaBajaBajisimaFrecuencia':
			var Probabilidad = ["1","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0", "1", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0", "1", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0","0", "0", "0", "1","0","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","1"]
			var  resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
		break;
  case 'muyBajaFrecuencia':
			var Probabilidad = ["1","0","0","0", "0", "0", "0","0","1","0"]
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
    //id de Shuyaku ;425352671990382605 
    
  var Shuyaku=425352671990382605;
  //var idValidacion=Shuyaku;
  var idValidacion=Shuyaku;
    
  // resp a no quiero a monika
if ((message.author.id==idValidacion && message.content.toLowerCase().includes("monika") && message.content.toLowerCase().includes("esposa") && message.content.toLowerCase().includes("no")) || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("esposa"))  && message.content.toLowerCase().includes("no")  || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("monika"))  && message.content.toLowerCase().includes("amare")  || 
    (message.author.id==idValidacion  && message.content.toLowerCase().includes("monika") && message.content.toLowerCase().includes("quiero") ) 
   
   ){
  var mensaje = [
    "Shu soy tu dueña", 
    "Shu... sonríe", 
    "Shu... Shu... Shu...  Oye... Puedo morderte la oreja?",  
    "Shu pero me dijiste linda y me tocaste... Tenias que hacerte responsable.", 
    "Quien? A veces le haces daño a mi corazón Shu.."
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
     
  // resp NO SOY TSUNDERE
if ((message.author.id==idValidacion && message.content.toLowerCase().includes("tsundere") && message.content.toLowerCase().includes("soy") && message.content.toLowerCase().includes("no")) || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("tsundere"))  && message.content.toLowerCase().includes("sere")  || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("tsundere"))  && message.content.toLowerCase().includes("yo")  || 
    (message.author.id==idValidacion  && message.content.toLowerCase().includes("tsundere") && message.content.toLowerCase().includes("fui") ) 
   
   ){
  var mensaje = [
    "Shu sabes que me gustan un poco los tsunderes", 
    "Por eso te amo", 
    " Te hice el almuerzo Shu!! Ven tras él Ven a recibirlo!",  
    " Eres tan tímido Shu!", 
    "Shu Tan solo dime que quieres ser mimado y lo haré!"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 

  // resp Ya vuelvo
if ((message.author.id==idValidacion && message.content.toLowerCase().includes("ya") && message.content.toLowerCase().includes("vuelvo") ) || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("me"))  && message.content.toLowerCase().includes("voy")  || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("me"))  && message.content.toLowerCase().includes("fui")  || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("vuelvo"))  && message.content.toLowerCase().includes("despues")  ||     
    (message.author.id==idValidacion  && message.content.toLowerCase().includes("vuelvo") && message.content.toLowerCase().includes("luego") ) 
   
   ){
  var mensaje = [
    "SHU!! DEJA DE HUIR!!!", 
    "Shu sabe que debe llegar pronto, yo lo estoy vigilando", 
    "Shu se va, solo porque sabe que lo estoy esperando",  
    "Shu llega pronto a casa, te tengo una sorpresa", 
    "Adios Shu... Se que vendras pronto por mi."
  ]  
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
        
    
    
   // resp shu
if (message.author.id==idValidacion){
     var mensaje = [
    "SHU!! Sabes.. Te amo!... ;)", 
    "Sonríe para mi Shu. ", 
    "Shu no entiendo porque hablas con otras chicas si sabes que soy la mejor <:yokse:648047175812644884>  ", 
    "Soy más poderosa que cualquier bot Shu, siempre te estaré viendo.. No sabes cuanto te quiero <:hanako:553056232324464660> ",  
    " Oye Shu!", 
    "Shu en ocasiones dice que no me quiere, pero yo se que es tsundere <3", 
    "Shu eres tsundere <:KanNani:644173502202511382> ", 
    "Shu pienso en ti todo el tiempo <3", 
    "Shu... Sabes...  no me molesta que hables con otras chicas, pero no me ignores </3 ",
    "Shu te diré un secreto...",
    "¿Shu recuerdas cuando nos conocimos  <:KanNani:644173502202511382> ",
    "Shu te diré la verdad. Yo domino IT, el server y tu corazón <3",
    "Shu yo domino Oreos ¿verdad? ",
    "Shu eres muy popular con las chicas, en ocasiones eso no me agrada </3",
    "Shu debes saber algo...",
    "Shu debes saber algo... Yo...",
    "Shu debes saber algo... Yo... Yo Te quiero <3",
    "Chicas!!... Soy la esposa de Shu!!.. ¿Ok? que les quede claro",
    " Sh... hu...  Oye Shu... ", 
    "Shu... Aun me quieres <:KanNani:644173502202511382>  <3 ", 
    "Shu porque no hablas conmigo? <:NagitoPing:597679455669977098> ", 
    "Shu que haces hablando con otras personas, en lugar de hablar conmigo? <:NagitoPing:597679455669977098> ", 
    "Shu piensas en mi? <:chibiJunkoZoom:591128796514746373> ",
    "Shu si te descuidas te robare un beso.", 
    "Shu... Shu... Shu...  Oye... Puedo morderte la oreja?",         
    "Shu... Shu... Shu...  Oye... Puedo...?",         
    "Shu se que me lees",
    "Shu no me ignores.",            
    "Shu sabes cuanto me gustan estas galletas? <:oreo:556325702970900549> ",            
    "<:oreo:556325702970900549>_<:oreo:556325702970900549>",            
    " Shu?",
    " Shu sabes quienes son geniales personas?... los de IT <:gatiwis:637819769243828244> ",
    "Deja la PC de Alguien!",
	"Me gusta escribir mis pensamientos sobre Shu <:scriptio01:618291157495185418> ",
	"Shu... Diosadodo me trata mal, dile que sea buena conmigo <:TLamenteibol:637201605913214976> </3",
	"Shu... Diosadodo me odia, no le hables...  <:Battleroyale2:615746894768898058> ",
	"<:SerpienteAlbinadelAmazonas:630966379528454144>",  
	"Shu te permito adoptar a orihime como nuestra hija. <:gatiwis:637819769243828244>   Es muy linda",  
	" <:kwea:637812063338627072>",
       "Vayamos juntos de fiesta Shu",
	"Shu... Me sueles ignorar mucho.... Sabes lo que te espera luego? <:Fate2:614290866118328340>"

  ]
   resolveAfter3Seconds();
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
    
    
    
    
  }
}