const Discord = require('discord.js')
const db = require('megadb')
var work = new db.crearDB("work"); // db


module.exports = {
    name: 'work',
    alias: ['trabajar'],
    description: 'Da dinero del banco',

    run: async (message, args, rolIT, client) => {

        var timeCD = new Date();
        var horasUser = 0; // El tiempo del cooldown; horas
        var horasTwitch = 12;
        var horasNitro = 8;
        var horasNitroTwitch = 6;

        var restart00 = timeCD.getHours() + timeCD.getMinutes() + timeCD.getSeconds()
        console.log(restart00)

        if (timeCD == 0){
            work.eliminar(`${message.guild.id}.${message.author.id}`)
        }


        if (!work.tiene(`${message.guild.id}.${message.author.id}.work`)) { // Acá verificados si no tiene cooldown 

            work.establecer(`${message.guild.id}.${message.author.id}.work`) // Acá establecemos el las horas y minutos actuales
            message.channel.send("Work Correcto")
            
        } else {
            // para compararlo con el tiempo que necesitamos para el cooldown y ver si ya se ha pasado el tiempo, y si es superior o igual el cooldown ya pasó
            message.channel.send("Cooldown") //Resultado
        }
    }
}