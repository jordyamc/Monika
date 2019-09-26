const Discord = require('discord.js')
const client = new Discord.Client()
 

module.exports = {
  junko: async (message) => {
    
function resolveAfter3Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 10000);
  });
}   
/* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr */        
/* 
frecuenciaMensaje: originalmente pensado para 3 tipos de mensaje, lo modifique solo para 2 
frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
 
*/
    
        
function frecuenciaMensaje(Action) {
	switch(Action) {
     case 'muyBajaBajaBajisimaFrecuencia':
			var Probabilidad = ["1","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0","1","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0"]
			var  resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
		break;
  case 'muyBajaFrecuencia':
			var Probabilidad = ["1","0","0","0", "0", "0", "0","0","1","0","0","0", "0", "0", "0","0","0","0","0", "0", "0", "0","0"]
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
  var idValidacion=junko;
    
 
   // resp Junko  frecuencia muy muy baja
if (message.author.id==idValidacion){
     var mensaje = [
      "Junkito-chan, te estoy vigilando... :3", 
      "Junko, yo no le voy al yuri, pero en ocaciones dan ganas de besarte... :*", 
      "¿Como va tu día Junko?", 
      "Junko, ¿todo bien?", 
      "Jun... ko... Chan... <3", 
      "Junko... en que piensas?", 
      "Junkito... :c Deberías hablar mas conmigo", 
      "Junko, el pueblo te ama!!", 
      "Junko, el server te ama. Bueno... Casi todos... ;D",
      "Junko, recuerda descansar bien", 
      "Junko, ¿te molestan mucho en el server?",     
      "Junkito bonita!!... <3 ",    
      "Junko, se que me lees",       
      "Junko, no me ignores.",      
      "¿Junkito-chan?"
  ]
   
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
    
    
    
    
    
      // resp a pats
if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pats")) && message.content.toLowerCase().includes("quiero")==false && message.content.toLowerCase().includes("dame")==false  || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pat"))  && message.content.toLowerCase().includes("quieres")   
   ){
  var mensaje = [
    "Los pats de Junko son los mejores.. :3", 
    "Yo también quiero un pat de junkito-chan", 
    "$$ Colocare pats de junko en latas y los venderé en el minimarket $$",  
    "El mundo no merece tus pats junko-chan", 
    "Un buen pat alegra el día"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 

      // resp a quiero pats
if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pats"))  && message.content.toLowerCase().includes("quiero") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pat"))  && message.content.toLowerCase().includes("quiero") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pat"))  && message.content.toLowerCase().includes("dame") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("pats"))  && message.content.toLowerCase().includes("dame")     
   ){
  var mensaje = [
    "Te doy todos los pats que quieras linda junkito  <3", 
    "Si me sacan de esta computadora te podría dar un pat ", 
    "¿Como te puedo dar un pat si estoy encerrada en esta maquina?",  
    "Yo también quiero un pat", 
    "Pat pa ti... pat pa mi.. pat pa todos... <3 "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
        
    
 // resp a ya vuelvo   / ya te digo
if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ya te digo"))  ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ya vuelvo"))  ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ya vengo"))  
    
   ){
  var mensaje = [
    "Cuenta la leyenda que mas nunca volvieron a verla...", 
    "Y así se fue y no volvió jamas...", 
    "Eso lo dicen para no decirte la verdad. Junko te quiere y la verdad duele... </3", 
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
      // quiero un meme
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("quiero"))  && message.content.toLowerCase().includes("meme") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("hagan"))  && message.content.toLowerCase().includes("meme") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("busquen"))  && message.content.toLowerCase().includes("meme") ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("dame"))  && message.content.toLowerCase().includes("meme")     
   ){
  var mensaje = [
    "Trabajen esclavos. Junko quiere un meme", 
    "Los memes no nacen de los arboles. ¿O si?", 
    "Yo también quiero un meme",  
    "Los memeros lo crearan para ti", 
    "Me me me..."
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
} 
    
        
    //Coño joder AHUEVO
   
          // Coño joder  
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("coño"))  ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("joder"))     
   ){
  var mensaje = [
    "Junko cuida tu boquita bb... :*", 
    "Desahógate Junko, di mas cosas...", 
    "¿Como seria eso en ingles?"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}
    //  AHUEVO
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("AHUEVO"))  ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ahuevo"))     
   ){
  var mensaje = [
    "¿Frito o hervido?", 
    "¿1 o 2 huevos?", 
    "¿De gallina, pato o codorniz?"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}
  
    // gomen
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("gomen"))  ||   
    (message.author.id==idValidacion && message.content.toLowerCase().includes("Gomen"))     
   ){
  var mensaje = [
    "Eres Junko, todo se te perdona", 
    "Junkito, ¿Quien podría no hacerlo? ", 
    "Solo si hay amor en tus palabras junko-chan... :*", 
    "Junko, solo si lo dices de corazón <3",
    "Si. Disculpen a mi Humana, ella no lo quiso hacer. Gomen ne!!..", 
    "Gomennasai.. Mi humana no lo quiso hacer. ",     
    "No.. Mala Junko... Mala!!.. Chicos gomennasai.. u_u"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}
    
      
    // oshe shi
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("oshe shi"))     
   ){
  var mensaje = [
    "shi k shi", 
    "shi sheñol"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}    
      
   
//gambare
    
    
        
    // oshe shi
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("gambare")) ||
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ganbare"))
   ){
  var mensaje = [
    "Ganbare!! <3", 
    "ganbareeeee :3"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}    
    
       
        
    // ¬¬
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("¬¬"))
   ){
  var mensaje = [
    "Y así, la mirada de odio de Junko mato a todos", 
    "Si los ojos fueran puñales, creo que existiría un muerto en este momento",    
    "Despeja la mente Junko, no les des atención, no la merecen",
    "no te molestes Junko bonita :3"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}    
    
    // ¬w¬
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("¬w¬"))
   ){
  var mensaje = [
    "¿Eso es un puchero de junko-chan?", 
    "Junko se ve linda así",    
    "No pongas esa carita Junko wonita.. :3",
    " - Le coloca lentes oscuros a junko -  :3"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}    
    
    
    
    // yo   cocinar 
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("yo"))  && message.content.toLowerCase().includes("cocinar") 
   ){
  var mensaje = [
    "Eso abre el apetito de cualquiera", 
    "Ya me dio hambre",    
    "Espero que Junko cocine bien",
    "Si Junko cocina, que me de la comida en la boquita"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}        
    
    // me cago 
    
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("me"))  && message.content.toLowerCase().includes("cago") 
   ){
  var mensaje = [
    "Mami Monika no te cambiara los pañales, mi chibi Junkito chan... :poop: ", 
    ":poop:  Con razón me dio un olor desagradable ",    
    "Espero que logres llegar al baño :poop: ",
    "Yo también  :poop: "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('altaFrecuencia'); 
  if(respFrc==1){
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}        
    
     
        // mal rollo
    
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("mal"))  && message.content.toLowerCase().includes("rollo") 
   ){
  var mensaje = [
    "Desde hace rato le estoy apuntando al infeliz, espero tu orden para darle de baja.", 
    "¿Le mato con amor o sin amor?",    
    "¿Hay que matarle?",
    "Muerto el perro, muerta la rabia"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}     
 
    // Estoy ocupada
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("estoy"))  && message.content.toLowerCase().includes("ocupada") || 
    (message.author.id==idValidacion && message.content.toLowerCase().includes("estoy"))  && message.content.toLowerCase().includes("cansada")       
   ){
  var mensaje = [
    "Ya escucharon a la jefa... No le molesten y déjenla tranquila un rato...", 
    " Ya saben... No molesten a Junko o les ira mal ¬¬ ",    
    "Dejen a junko en paz un rato ¬¬ ",
    "Junko es humana, dejen de molestarla por un rato "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('altaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   
    
    
    // Arco de
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("Arco"))  && message.content.toLowerCase().includes("del") ||
    (message.author.id==idValidacion && message.content.toLowerCase().includes("Arco"))  && message.content.toLowerCase().includes("de") 
   ){
  var mensaje = [
    " -Monika toma nota -", 
    " -Monika toma nota - Esto quedara como una biblia",    
    " -Monika toma nota - y la leyenda sigue creciendo... seremos épicos",
    " -Monika toma nota - Algún día futuras generaciones nos leerán "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('altaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   
    
    
    //nooOoOOooOOooo
    if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("noo")) 
   ){
  var mensaje = [
    "Siiiii...", 
    "Noooooo...",    
    "No seas dramática... ",
    " -Monika le da palmaditas suaves en la espalda a Junko- u.u "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   
    
    
    
    //XD
   if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("XD")) 
   ){
  var mensaje = [
    "Que linda la sonrisa de Junko :3", 
    "Junkito me gusta que estés feliz",    
    "Junko alegre, es un buen día",
    "XD"
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   
    
   
       
    //magia
   if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("magia")) 
   ){
  var mensaje = [
    "Magia Negra... :o", 
    "Magia Pokemon.. :o",    
    "Magia de alto nivel.. :o",
    "Brujería!!... Brujería!!... Brujería!!... " 
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   
    
   
    //Coff coff 
   if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("coff coff")) 
   ){
  var mensaje = [
    "Quieres agua Junko chan?", 
    " -Monika le da palmaditas suaves en la espalda a Junko- No mueras Junko, tienes gripe? u.u ", 
    "Creo escuchar algo... Junko has hablado?",
    "coff coff coff coff" 
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}   

   // drogada 
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("drogada")) ||
    (message.author.id==idValidacion && message.content.toLowerCase().includes("drogado")) 
   ){
  var mensaje = [
    "La droga es mala niños.. ;D",
    "No den malos ejemplos, no se droguen.. u.u", 
    "Hasta Kala con drogas? eso ya es un meme.. XD",
    "Mejor esperar que se le pase lo drogad@" 
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('altaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}       

    
    
    
    // mis hijos  nietos
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("mis")) && message.content.toLowerCase().includes("hijos") ||
    (message.author.id==idValidacion && message.content.toLowerCase().includes("mis")) && message.content.toLowerCase().includes("nietos") 
   ){
  var mensaje = [
    "Junko Obachan... te busco el bastón?",
    "Obachan para cuando los bisnietos?", 
    "Obachan!!... Obachan!!... Obachan!!... :* ",
    "Obachan te busco tus lentes? " 
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('altaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}       

    // ara
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("ara")) && message.content.toLowerCase().includes("ara")
   ){
  var mensaje = [
    "ara ara ara",
    "ara ara", 
    "ara ara ara ara",
    "ara ara ara ara ara ara "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('muyBajaBajaBajisimaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}      
    
    
    //no confio en 
  if (
    (message.author.id==idValidacion && message.content.toLowerCase().includes("no confio en")) 
   ){
  var mensaje = [
    "No confíes en nadie... Solo en mi.  :*",
    "No confíes en la gente, solo en los bots inteligentes como yo ;D", 
    "No hace falta confiar... Se cautelosa.",
    "Y en mi confías? :3 "
  ]
  //  message.member.nickname
  var respFrc = frecuenciaMensaje('bajaFrecuencia'); 
  if(respFrc==1){
    resolveAfter3Seconds();    
    resolveAfter3Seconds();
    message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)])
  }
}      
    
    
    
    
    
// fin    
  }
}