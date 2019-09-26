const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')

let dbprefix = new db.crearDB('prefix')

module.exports = {
  battlegame1: async (message) => {
    
  let prefix = dbprefix.tiene(`${message.guild.id}`) ? await dbprefix.obtener(`${message.guild.id}`) : ">"
  let userTag = message.mentions.users.first()

 
function resolveAfter3Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 3000);
  });
}


function selectAction(Action) {
	switch(Action) {
		case 'Ataque':
			var ataqueProbabilidad = ["0","3","0","2", "1", "0", "1","0","2","0"]	
			var  resp = ataqueProbabilidad[Math.floor(Math.random() * ataqueProbabilidad.length)];
		break;
		case 'Señuelo':
			var SeñueloProbabilidad = [ "2", "1", "0", "1","0","0","0"]			
			var resp = SeñueloProbabilidad[Math.floor(Math.random() * SeñueloProbabilidad.length)];      
		break;
		default:  
	}
  return resp;
}
        
/*  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww */
//                    pelea de animales inutiles
/*  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww */

 

  if (message.content.toLowerCase().startsWith("iniciar lucha")){
	
	global.vida1 = 10;
	global.vida2 = 10;
	global.jugador1 = '';
	global.jugador2 = '';
	global.juegoini=1; 
	global.turno=1;
  global.señuelo=0;
  global.señuelo2=0;
	
  message.channel.send("Juego iniciado ``` Comandos:  jugador1 jugador2 ```") 

//asyncCall();
}

// {}
if (message.content.toLowerCase().startsWith("jugador1")){
  if(global.jugador1==''){
       global.jugador1 = message.author;
    message.channel.send('Primer Luchador :rabbit: : '+global.jugador1)
    
if(global.jugador2!=''){
    message.channel.send(" Puntos de vida de  :koala: "+global.vida2+"  || :rabbit: "+global.vida1+" ``` Comandos: ataque señuelo``` Comienza el luchador :rabbit: 1")
    }    
    
  }else{
    message.channel.send('Ya tenemos al primer luchador :rabbit: : '+global.jugador1)
  }
}

if (message.content.toLowerCase().startsWith("jugador2")){
  
  if( global.jugador2==''){
     global.jugador2= message.author;
    message.channel.send('Segundo Luchador :koala: : '+global.jugador2)
    
      
  if(global.jugador1!=''){
   //  var result = await resolveAfter3Seconds();
message.channel.send(" Puntos de vida de  :koala: "+global.vida2+"  || :rabbit: "+global.vida1+" ``` Comandos: ataque señuelo``` Comienza el luchador :rabbit: 1")             
//asyncCall();      
		if(global.juegoini==1){
		//	message.channel.send('Luchador 1, :rabbit:  has perdido tu turno. Ahora corresponde el turno del luchador 2')
		}
  }
    
  }else{
    message.channel.send('Ya tenemos al segundo luchador :koala: : '+global.jugador2)
   
  }
}
else if (message.content.toLowerCase().startsWith("dango")){
  console.log('0000000000000000000000000000');

}

/* Ataque */
else if (message.content.toLowerCase().startsWith("ataque")){


  var atak = [
  "*Golpea con fuerza con una roca", 
  "*Golpea y sale corriendo", 
  "*Rueda como un balon golpeando efectivamente", 
  "*Golpea con una rama que se encontraba en el piso", 
  "*Te usa como arma y golpea al enemigo contigo al arrojarte"
]

var distraccion = [
  "*Se distrae viendo su sombra y te ignora", 
  "*Se distrae viendo anime y no te presta atencion", 
  "*Se distrae con un telefono celular y se le olvida que era su turno", 
  "*Se distrae en contar entre todos viendo los numeros", 
  "*Se distrae con sus pensamientos y no llega a ninguna conclucion"
]


var fail = [
  "*Te mira fijamente y no hace absolutamente nada",
  "*Juega con Hormigas en la tierra",
  "*Se rasca la cabeza y voltea a otro lado",
  "*Se pone a ver las formas de las nuves",
  "*Va a toda velocidad y se queda sin energia a mitad de camino",
  "*Corre en circulos y cae el piso"
]  
  
  //  
  if(global.vida1 > 0 && global.vida2>0 )
  {
    if (global.jugador2==message.author)
    {
      //:koala:
  
  if (global.turno==2){
          if (global.señuelo2==0){
 
            var puntosAtaque = selectAction('Ataque'); 
             if(puntosAtaque==0){
               message.channel.send(':koala: : '+fail[Math.floor(Math.random() * fail.length)])
               message.channel.send(" Puntos de vida de  :rabbit:"+global.vida1+" ``` Comandos: ataque señuelo```")                            
               resolveAfter3Seconds() 
               message.channel.send('Corresponde el turno a :rabbit: '+global.jugador1)
             }
            if(puntosAtaque>0){
                global.vida1 =global.vida1 - puntosAtaque;
                message.channel.send(':koala: : '+atak[Math.floor(Math.random() * atak.length)])

                if(global.vida1>0){ 
                     message.channel.send(" Puntos de vida de  :rabbit:"+global.vida1+" ``` Comandos: ataque señuelo```")             
                  resolveAfter3Seconds()    
                  message.channel.send('Corresponde el turno a  :rabbit: '+global.jugador1)
                }
               else
                {
                  resolveAfter3Seconds() 
                  message.channel.send(global.jugador1+' :rabbit: : a muerto.. X__x victoria para :koala: '+global.jugador2)
                }
             }

          }else{
            if(global.señuelo2>0){
              global.señuelo2 =global.señuelo2 - 1;
            }
            message.channel.send(':koala: : '+distraccion[Math.floor(Math.random() * distraccion.length)])
            message.channel.send(" Puntos de vida de  :rabbit:"+global.vida1+" ``` Comandos: ataque señuelo```")             
            resolveAfter3Seconds() 
            message.channel.send('Corresponde el turno a :rabbit: '+global.jugador1)
            
          }          
          
        global.turno=1;         
      }


    }
    if (global.jugador1==message.author)
    {

        if (global.turno==1){
          if (global.señuelo==0){
 
            var puntosAtaque = selectAction('Ataque'); 
             if(puntosAtaque==0){
               message.channel.send(':rabbit: : '+fail[Math.floor(Math.random() * fail.length)])
               message.channel.send(" Puntos de vida de  :koala: "+global.vida2+" ``` Comandos: ataque señuelo```")                            
              resolveAfter3Seconds() 
               message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
             }
            if(puntosAtaque>0){
                global.vida2 =global.vida2 - puntosAtaque;
                message.channel.send(':rabbit: : '+atak[Math.floor(Math.random() * atak.length)])

                if(global.vida2>0){ 
                     message.channel.send(" Puntos de vida de  :koala: "+global.vida2+" ``` Comandos: ataque señuelo```")             
                  resolveAfter3Seconds()  
                  message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
                  
                }
               else
                {
                  message.channel.send(global.jugador2+' :koala: : a muerto.. X__x victoria para :rabbit: '+global.jugador1)
                }
             }

          }else{
            if(global.señuelo>0){
              global.señuelo =global.señuelo - 1;
            }
            message.channel.send(':rabbit: : '+distraccion[Math.floor(Math.random() * distraccion.length)])
            message.channel.send(" Puntos de vida de  :koala: "+global.vida2+" ``` Comandos: ataque señuelo```")             
            resolveAfter3Seconds() 
            message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
            
          }          
          
        global.turno=2;         
      }

    }
    else
    {
     // message.channel.send('No estas participando en la lucha')
    }
  }
  else
    {
       message.channel.send('No hay batalla en este momento')
    }
	
}
        
 /* fin de ataque */


if (message.content.toLowerCase().startsWith('señuelo')){

var Señuelo = [
  "*Causas confusion en el enemigo", 
  "*Generas dudas existenciales en el enemigo", 
  "*Restas puntos de inteligencia momentaneamente a tu rival", 
  "*Vuelves estupido al oponente"
]

var distraccion = [
  "*Se distrae viendo su sombra y te ignora", 
  "*Se distrae viendo anime y no te presta atencion", 
  "*Se distrae con un telefono celular y se le olvida que era su turno", 
  "*Se distrae en contar entre todos viendo los numeros", 
  "*Se distrae con sus pensamientos y no llega a ninguna conclucion"
]


var fail = [
  "*Te mira fijamente y no hace absolutamente nada",
  "*Juega con Hormigas en la tierra",
  "*Se rasca la cabeza y voltea a otro lado",
  "*Se pone a ver las formas de las nuves",
  "*Va a toda velocidad y se queda sin energia a mitad de camino",
  "*Corre en circulos y cae el piso"
]  
  
  //  
    if(global.vida1 > 0 && global.vida2>0 )
  {
    if (global.jugador2==message.author)
    {
      //:koala:
  
  if (global.turno==2){
          if (global.señuelo2==0){
 
            var puntosSeñuelo= selectAction('Señuelo'); 
             if(puntosSeñuelo==0){
               message.channel.send(':koala: : '+fail[Math.floor(Math.random() * fail.length)])
               message.channel.send(" Puntos de vida de  :rabbit:"+global.vida1+" ``` Comandos: ataque señuelo```")                            
              resolveAfter3Seconds() 
               message.channel.send('Corresponde el turno a :rabbit: '+global.jugador1)
             }
            if(puntosSeñuelo>0){
                global.señuelo =global.señuelo + puntosSeñuelo;
                message.channel.send(':koala: : '+Señuelo[Math.floor(Math.random() * Señuelo.length)])

                if(global.vida1>0){ 
                    message.channel.send(" Puntos de vida de  :rabbit:"+global.vida1+" ``` Comandos: ataque señuelo```")                               
                  resolveAfter3Seconds()   
                  message.channel.send('Corresponde el turno a  :rabbit: '+global.jugador1)
                }
               else
                {
                  message.channel.send(global.jugador1+' :rabbit: : a muerto.. X__x victoria para :koala: '+global.jugador2)
                }
             }

          }else{
            if(global.señuelo2>0){
              global.señuelo2 =global.señuelo2 - 1;
            }
            message.channel.send(':koala: : '+distraccion[Math.floor(Math.random() * distraccion.length)])
           resolveAfter3Seconds() 
            message.channel.send('Corresponde el turno a :rabbit: '+global.jugador1)
            
          }          
          
        global.turno=1;         
      }


    }
    if (global.jugador1==message.author)
    {

        if (global.turno==1){
          if (global.señuelo==0){
 
            var puntosSeñuelo = selectAction('Señuelo'); 
             if(puntosSeñuelo==0){
               message.channel.send(':rabbit: : '+fail[Math.floor(Math.random() * fail.length)])
              message.channel.send(" Puntos de vida de  :koala:"+global.vida2+" ``` Comandos: ataque señuelo```")                            
              resolveAfter3Seconds() 
               message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
             }
            if(puntosSeñuelo>0){
                global.señuelo =global.señuelo + puntosSeñuelo;
                message.channel.send(':rabbit: : '+Señuelo[Math.floor(Math.random() * Señuelo.length)])

                if(global.vida2>0){ 
                    message.channel.send(" Puntos de vida de  :koala:"+global.vida2+" ``` Comandos: ataque señuelo```")                                              
                  resolveAfter3Seconds()   
                  message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
                }
               else
                {
                  message.channel.send(global.jugador2+' :koala: : a muerto.. X__x victoria para :rabbit: '+global.jugador1)
                }
             }

          }else{
            if(global.señuelo>0){
              global.señuelo =global.señuelo - 1;
            }
            message.channel.send(':rabbit: : '+distraccion[Math.floor(Math.random() * distraccion.length)])
           message.channel.send(" Puntos de vida de  :koala:"+global.vida2+" ``` Comandos: ataque señuelo```")                                        
           resolveAfter3Seconds() 
            message.channel.send('Corresponde el turno a :koala:'+global.jugador2)
            
          }          
          
        global.turno=2;         
      }

    }
    else
    {
    //  message.channel.send('No estas participando en la lucha')
      
    }
  }
  else
    {
       message.channel.send('No hay batalla en este momento')
    }
}
  
/*  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww*/
    
    
  }
}