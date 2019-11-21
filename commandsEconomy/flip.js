const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank1')

module.exports = {
    name: 'flip',
    alias: ['coin-flip', 'cf'],
    description: '50% de ganar',

    run: async (message, args, rolIT, client) => {

        var auth = await bank.obtener(`${message.guild.id}.${message.author.id}.money`).catch(error => message.channel.send("Error al obtener usuario ***coinflip*** => " + error))
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)
        var dinero = args[0]

        let p = Math.floor((Math.random()*100)+1);

        function opera(val) {
            console.log("Val + p: "+val, p)
            if (p < val) {
                bank.restar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***banco restar*** => " + error))
                bank.sumar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***usuario sumar*** => " + error))
                return message.channel.send(`Has ganado ${dinero} ${moneda}`)
            } else {
                bank.sumar(`${message.guild.id}.bank.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***banco sumar*** => " + error))
                bank.restar(`${message.guild.id}.${message.author.id}.money`, dinero).catch(error => message.channel.send("Error al hacer coinflip ***usuario restar*** => " + error))
                return message.channel.send(`Has perdido ${dinero} ${moneda}`)
            }
        }

        if(dinero > 500000){
            return message.channel.send("Donde vas intentando apostar tanto!!")
        }

        if(dinero > auth){
            return message.channel.send("Que intentas apostar si no tienes tanto?")
        }

        if(bot < 220000000){
            opera(35)
        } else if (bot < 240000000){
            opera(40)
        } else if (bot < 260000000){
            opera(50)
        } else if (bot <= 300000000){
            opera(60)
        } else if (bot > 300000000){
            opera(65)
        }

    }
}

/* 
    Si el banco tiene menos de 7M de :monocoins, el porcentaje de ganar será del 35%
    Si el banco tiene entre 10M y 7M de :monocoins:, el porcentajede ganar será de un 40%
    Si el banco tiene entre 15M y 10M de :monocoins:, el porcentaje de ganar será de un 50%
    Si el banco tiene entre 20M y 15M de :monocoins:, el porcentaje de ganar será de un 60%
    Si el banco tiene más de 20M de :monocoins:, el porcentaje de ganar será de un 65%

    - Si el banco tiene entre 180M y 220M, dará entre 1.000 y 2.000
    - Si el banco tiene entre 220M y 240M, dará entre 2.000 y 4.000
    - Si el banco tiene entre 240M y 260M, dará entre 4.000 y 6.000
    - Si el banco tiene entre 260M y 300M, dará entre 6.000 y 8.000
    - Si el banco tiene más de 300M, dará entre 8.000 y 10.000
*/