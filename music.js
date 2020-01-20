const Discord = require('discord.js');
const ydtl = require("ytdl-core")
const ffmpeg = require("ffmpeg")

module.exports = {
    music: async(message, prefix, rolIT) => {

        /*function isCommand(text) {
            return message.content.toLowerCase().startsWith(prefix + text);
        }*/
      
      if (message.channel.id != "555596703412256779") return // Pa que no nos jodan
      
        let args = message.content.slice(prefix.length).split(/ +/);
        let command = args.shift().toLowerCase();
      
      //console.log(command)

        let canal = message.member.voiceChannel;
        let cvIt = '639631920455483422'
        
        if (command != "join" && command != "leave" && command != "play")
          return
      
        if(!canal || canal.type !== 'voice'){
                message.channel.send("Debes ingresar a un canal de voz primero")
              return
            }

        if(canal.id != cvIt){ // vale, igual lo dejo aqui si pork son menos lineas
           return message.channel.send(`Nope, solo puedes usar esto en <#${cvIt}>`)
        }
        
        if(command == "join"){ 

            if(!canal || canal.type !== 'voice'){
                message.channel.send("Debes ingresar a un canal de voz primero")
              return
            }else if(message.guild.voiceConnection){
                message.channel.send("Ya estoy en un canal de voz")
              return
            }else{
                canal.join().then(() => {
                  message.channel.send("Contected")
                }).catch(err => console.log(err))
              return
            }
        }

        if(command == "leave"){

            if(!canal){
                message.channel.send("Debes estar en el canal de voz")
              return
            }else{
                canal.leave()
              return 
            } 
        }

        if(command == "play"){
            if(!canal){
                message.channel.send("Debes estar en el canal de voz")
            }
            if(!args[0]){
                message.channel.send("Ingresa el link")
            }
            else{
                canal.join()
                .then(async connection => {
                    const url = await ydtl.getInfo(args[0])
                    const dispatcher = connection.playStream(ydtl(url.video_url))
                    dispatcher.on('end', () => {
                      //console.log("Song end!")
                    })
                })
            }
        }
      
        else {
          //console.log("Error comando music")
        }

    }
}