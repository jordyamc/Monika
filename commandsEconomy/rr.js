const Discord = require('discord.js')
const db = require('megadb')
let game = new db.crearDB('games')
let client;

module.exports = {
    name: 'rr',
    alias: ['rusian-roulette'],
    description: 'Un máximo de 6 jugadores donde 1 va a morir',

    init: async clientTest => {
        clientTest.on('ready', async () => {
            setInterval(async () => {
                for (const idChannel of await game.keys('rr')) {
                    
                }
            }, 1000);
        })
        client = clientTest;
    },

    run: async (message, args, rolIT, client) => {

        var auth = await bank.obtener(`${message.guild.id}.${message.author.id}.money`).catch(error => message.channel.send("Error al obtener usuario ***coinflip*** => " + error))
        let moneda = await bank.obtener(`${message.guild.id}.moneda`)

        var dinero = Number.parseInt(args[0]);
        if (!dinero) return message.channel.send("Introduce valores válidos");

        if (dinero > auth) return message.channel.send("Dinero insuficiente!");

        if (!game.tiene(`${message.channel.id}`)) {
            await game.establecer(`rr.${message.channel.id}.player1`, { player: message.author.id, money: dinero });
            await game.establecer(`rr.${message.channel.id}`, {time: 300000})
        } else {
            let numPlayer = await game.keys(`rr.${message.channel.id}`) + 1;
            await game.establecer(`rr.${message.channel.id}.player${numPlayer}`, { player: message.author.id, money: dinero });
        }

    }
}