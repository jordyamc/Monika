const Discord = require('discord.js')

module.exports = {
  name:'help',
  alias:['h','ayuda','jjc'],
  description:'',
  
  run: async (message, args, rolIT, client, prefix) => {

    
    if(args[0]){   
    if(args[0].toLowerCase() == "economia"){   
      
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle('Economia')
      .addField(prefix+'work', 'Ganas dinero.')
      .addField(prefix+'bal [usuario]', 'Muestra tu dinero y objetos.', false)
      .addField(prefix+'tienda', 'Muestra los items de la tienda.', false)
      .addField(prefix+'tienda membresia', 'Muestra las membresias disponibles.', false)
      .addField(prefix+'tienda peluca', 'Muestra las pelucas disponibles.', false)
      .addField(prefix+'buy <item>', 'Comprar un item.', false)
      .addField(prefix+'buy membresia <membresia>','Compra una membresia.',false)
      .addField(prefix+'buy peluca <peluca>', 'Compra una peluca.',false)
      .addField(prefix+'club-bal <club>', 'Muestra el dinero del club.', false)
      .addField(prefix+'club-give <club> <dinero>', 'Dona dinero a un club.', false)
      .addField(prefix+'give <usuario> <dinero>', 'Dona dinero a un usuario.', false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")   
      
      return message.channel.send(embed)     
    }
    else if(args[0].toLowerCase() == "casino"){
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle('Casino')
      .addField(prefix+'flip <dinero>', 'Apuesta dinero.', false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(embed)
    }
    else if(args[0].toLowerCase() == "funny"){
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle('Funny')
      .addField(prefix+'8ball <pregunta>', 'Respuesta de si y no.', false)
      .addField(prefix+'hug [usuario]', 'Manda un abrazo.', false)
      .addField(prefix+'moneda', 'Lanza una moneda.', false)
      .addField(prefix+'say <frase>', 'Has que monika repita algo.',false)
      .addField(prefix+'jojo', 'Gif aleatorio de jojo', false)
      .addField(prefix+'sip', 'sip', false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(embed)
    }
    else if(args[0].toLowerCase() == "juegos"){
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle("Juegos")
      .addField(prefix+'retar [usuario]', 'Reta a un usuario a una pelea de animales.\n'+prefix+'help animales  para ver las reglas',false)
      .addField(prefix+'pacman', 'Inicia una partida de pacman.',false)
      .addField(prefix+'snow-start [usuario]', 'Inicia una pelea de nieve.\n'+prefix+'snow-help para ver las reglas',false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(embed)
    }
    else if(args[0].toLowerCase() == "animales"){
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle("Pelea de animales")
      .setDescription("Es una batalla 1v1 con animales en la que empiezas con 10 puntos de vida."+
                      "\nEn cada turno tendras 3 opciones:"+
                      "\n⚔️ Atacaras a tu oponente inflingiendo una cantidad aleatoria de daño que va de 1 a 3, puedes llegar a fallar."+
                      "\n🤡 Podras distraer a tu oponente y hacer que pierda 1 o 2 turnos, puedes llegar a fallar."+
                      "\n🏳️ Te rendiras."+
                      "\nAhora dense putazos animalescos y disfruten!")
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(embed)
    }
    else if(args[0].toLowerCase() == "utiles"){
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle('Utiles')
      .addField(prefix+'info', 'Muestra la info de monika.',false)
      .addField(prefix+'ping', 'Muestra la latencia de monika', false)
      .addField(prefix+'quote <id mensaje> [canal] [respuesta]', 'Para ver y responder un mensaje.',false)
      .addField(prefix+'feed <sugerencia>', 'Envia una sugerencia para monika. \n_Mal uso de este comando sera sancionado._',false)
      .addField(prefix+'bug <reporte>', 'Envia el reporte de un fallo. \n_Mal uso de este comando sera sancionado._',false)
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
      
      return message.channel.send(embed)
    }
    else if(args[0].toLowerCase() == "admin"){
      if(message.member.hasPermission('ADMINISTRATOR') || message.member.roles.has(rolIT.id)){
        var embed = new Discord.RichEmbed()
        .setColor('#3D87D1')
        .setTitle('Admin')
        .setDescription('_El uso de estos comandos por un alumno que no sea administrador sera sancionado._')
        .addField(prefix+'add-money <usuario> <dinero>', 'Da dinero de monika a un usuario.', false)
        .addField(prefix+'remove-money <usuario> <dinero>', 'Retira dinero de un usuario.', false)
        .addField(prefix+'channel-enable [canal]', 'Activa los comandos para el canal.', false)
        .addField(prefix+'channel-disable [canal]', 'Desactiva los comandos para el canal.', false)
        .addField(prefix+'create-item <nombre>$<precio>$<emoji>$<descripcion>$<texto al usar>$<IdRole>', 'Crea un item en la tienda con las caracteristicas especificadas', false)
        .addField(prefix+'impuestos', '**PELIGRO.** Cobra los impuestos por club a todos los alumnos.', false)
        .addField(prefix+'stop <usuario>', 'Detiene el acoso al usuario.')
        .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")
        
        return message.channel.send(embed)
      }
      else{
         return message.channel.send("Tu no tienes nada que ver aqui")
      }
    }}
    
      var embed = new Discord.RichEmbed()
      .setColor('#3D87D1')
      .setTitle(prefix+'help <categoria>')
      .setDescription('Elige que categoria quieres revisar. \nNo se deben poner los `<>` `[]`. \n`<>` Campo obligatorio. \n`[]` Campo opcional.')
      .addField('Economia','_ _',false)
      .addField('Casino', '_ _',false)
      .addField('Funny','_ _',false)
      .addField('Juegos','_ _',false)
      .addField('Utiles','_ _',false)
      .addField('Admin', '_Acceso restringido administradores._')
      .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")          
      
      return message.channel.send(embed)
    
  }
}