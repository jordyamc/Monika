const Discord = require('discord.js');
const db = require('megadb');
let pollsDB = new db.crearDB('polls');
let cmdName = 'v';
let alias = ['vote']
let error = 'La encuesta no existe... Al menos en esta dimensión, pero claro, siendo un ser inferior no puedes votar en ella';

module.exports = {
  name: cmdName,
  alias: alias,
  description: 'Vota en una encuesta con varias opciones',
  run: async (message, args) => {
    if (message.guild === undefined){
      message.channel.send('Necesitas estar en un servidor para utilizar esta función');
      return;
    }

    let id = args[0];

    if (!pollsDB.has(id)){
        message.channel.send(error);
        return;
    }
    
    let poll = await pollsDB.get(id);
    if (poll.server !== message.guild.id){
        message.channel.send(error);
        return;
    }

    if (args.length == 1){
        // TODO: show error if visible disabled
        let results = [];
        for (let [o, nVotes] of new Map([...Object.entries(poll.options)].sort((a, b) => b[1] - a[1]))) {
            results.push(`¡"${o}" va con ${nVotes} votos!`);
        }
        message.channel.send(results.join('\n'));
        return;
    }
    
    let votes = new Set(poll.usersVoted);
    if (votes.has(message.author.id)){
        message.channel.send(`¿Intentas timarme con tu voto duplicado? Huye antes de que cambie de idea y te haga arrepentirte...`);
        return;
    }

    poll.usersVoted.push(message.author.id);
    poll.options[args[1]]++;

    pollsDB.set(id, poll);

    message.channel.send('Voto emitido con exito');

    // TODO: delete message if anonymous enabled
  }
}