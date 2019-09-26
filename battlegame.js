const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const botConfig = require('./config.json');
const Timeout = require('smart-timeout');

let dbBattle = new db.crearDB('battle');
let dbPrefix = new db.crearDB('prefix');

/* Model
{
    "nextTurn":"<1-2 next turn player>",
    "game" : {
                "<user id 1>" : {
                            "animal": "<animal name>",
                            "hp":"<hp remaining number>",
                            "bait":"<0-3 turns number>",
                            "accepted": true/false
                        },
                "<user id 2>" : {
                            "animal": "<animal name>",
                            "hp":"<hp remaining number>",
                            "bait":"<0-3 turns number>",
                            "accepted": true/false
                        }
            }
}
 */

module.exports = {
    battlegame: async (message) => {
        const ACTION_CHALLENGE = "retar";
        const ACTION_ACCEPT = "aceptar";
        const ACTION_REJECT = "rechazar";
        let animals = [":dog:", ":cat:", ":mouse:", ":hamster:", ":rabbit:", ":bear:", ":panda_face:", ":koala:", ":tiger:", ":lion:", ":cow:", ":pig:", ":frog:", ":octopus:", ":monkey:", ":chicken:", ":penguin:", ":bird:", ":wolf:", ":boar:", ":horse:", ":unicorn:", ":bee:", ":bug:", ":snail:", ":scorpion:", ":crab:", ":snake:", ":turtle:", ":fish:", ":dolphin:", ":whale:", ":crocodile:", ":leopard:"];
        const attackProportion = [0, 3, 1, 2, 1, 1, 1, 0, 2];
        const lureProportions = [2, 1, 0, 1, 0, 0, 0];
        const distractedProportions = [true, false];
        let attackMessages = [
            "golpea con fuerza con una roca",
            "golpea y sale corriendo",
            "rueda como un balon golpeando efectivamente",
            "golpea con una rama que se encontraba en el piso",
            "te usa como arma y golpea al enemigo arrojandote"
        ];
        let lureMessages = [
            "se distrae viendo su sombra y te ignora",
            "se distrae viendo anime y no te presta atencion",
            "se distrae con un telefono celular y se le olvida que era su turno",
            "se distrae en contar entre todos viendo los numeros",
            "se distrae con sus pensamientos y no llega a ninguna conclucion"
        ];
        let failedMessages = [
            "te mira fijamente y no hace absolutamente nada",
            "juega con hormigas en la tierra",
            "se rasca la cabeza y voltea a otro lado",
            "se pone a ver la forma de las nubes",
            "va a toda velocidad y se queda sin energia a mitad del camino",
            "corre en circulos y cae al piso"
        ];
        if (message.author.bot) return;
        Array.prototype.randomItem = function () {
            return this[Math.floor(Math.random() * this.length)]
        };

        async function getPrefix() {
            if (dbPrefix.has(`${message.guild.id}`)) {
                return await dbPrefix.get(`${message.guild.id}`)
            } else {
                return botConfig.prefix
            }
        }

        function count(obj) {
            return Object.keys(obj).length;
        }

        function clearTimeOut(channel) {
            Timeout.clear(`battlegame.${channel.id}`);
        }

        function setTimeOut(channel) {
            clearTimeOut(channel);
            Timeout.set(`battlegame.${channel.id}`, () => {
                dbBattle.delete(channel.id.toString());
                channel.send("Duelo cancelado por inactividad!")
            }, 30000);
        }

        function isCommand(text) {
            return message.content.toLowerCase().startsWith(prefix + text);
        }

        async function getGame(id) {
            return await dbBattle.get(id);
        }

        function getPlayers(gameGeneral) {
            let gameState = gameGeneral.game;
            let players = [];
            for (let player in gameState) {
                players.push(gameState[player])
            }
            let currentPlayer;
            let otherPlayer;
            if (gameGeneral.nextTurn === 0) {
                currentPlayer = players[0];
                otherPlayer = players[1];
            } else {
                currentPlayer = players[1];
                otherPlayer = players[0];
            }
            return {currentPlayer: currentPlayer, otherPlayer: otherPlayer};
        }

        function doTurnChange(gameGeneral) {
            if (gameGeneral.nextTurn === 0) {
                gameGeneral.nextTurn = 1;
            } else {
                gameGeneral.nextTurn = 0;
            }
        }

        async function doLure(channel) {
            let gameGeneral = await getGame(channel.id);
            let players = getPlayers(gameGeneral);
            doTurnChange(gameGeneral);
            let lureTurns = lureProportions.randomItem();
            let isDistracted = players.currentPlayer.bait > 0;
            let isDistractionEffective = distractedProportions.randomItem();
            if (isDistracted && isDistractionEffective){
                players.currentPlayer.bait = players.currentPlayer.bait - 1;
                channel.send(`<@${players.currentPlayer.id}> tu ${players.currentPlayer.animal}[HP:${players.currentPlayer.hp}] ${lureMessages.randomItem()}`);
            }else {
                if (isDistracted && !isDistractionEffective)
                    players.currentPlayer.bait = players.currentPlayer.bait - 1;
                if (lureTurns === 0) {
                    channel.send(`El ${players.otherPlayer.animal}[HP:${players.otherPlayer.hp}] de tu oponente te ha ignorado`)
                } else {
                    players.otherPlayer.bait = lureTurns;
                    channel.send(`El ${players.otherPlayer.animal}[HP:${players.otherPlayer.hp}] de tu oponente fue distraido por ${lureTurns} turnos`);
                }
            }
            dbBattle.set(channel.id, gameGeneral);
            sendNextTurn(channel, players.otherPlayer.id);
        }

        async function doSurrender(channel) {
            let players = getPlayers(await getGame(channel.id));
            channel.send(`<@${players.currentPlayer.id}> se ha rendido, el ganador es <@${players.otherPlayer.id}> con su ${players.otherPlayer.animal}[HP:${players.otherPlayer.hp}]!`);
            dbBattle.delete(channel.id);
            clearTimeOut(channel);
        }

        async function doAttack(channel) {
            let gameGeneral = await getGame(channel.id);
            let players = getPlayers(gameGeneral);
            doTurnChange(gameGeneral);
            let isDistracted = players.currentPlayer.bait > 0;
            let isDistractionEffective = distractedProportions.randomItem();
            if (isDistracted && isDistractionEffective) {// Player is distracted, skip action and decrease by one
                players.currentPlayer.bait = players.currentPlayer.bait - 1;
                channel.send(`<@${players.currentPlayer.id}> tu ${players.currentPlayer.animal}[HP:${players.currentPlayer.hp}] ${lureMessages.randomItem()}`);
                dbBattle.set(channel.id, gameGeneral);
                sendNextTurn(channel, players.otherPlayer.id);
            } else {
                if (isDistracted && !isDistractionEffective)
                    players.currentPlayer.bait = players.currentPlayer.bait - 1;
                let power = attackProportion.randomItem();
                if (power === 0) { // Attack no effective
                    channel.send(`<@${players.currentPlayer.id}> tu ${players.currentPlayer.animal}[HP:${players.currentPlayer.hp}] ${failedMessages.randomItem()}`);
                    dbBattle.set(channel.id, gameGeneral);
                    sendNextTurn(channel, players.otherPlayer.id);
                } else {
                    let remainingHp = players.otherPlayer.hp - power;
                    players.otherPlayer.hp = remainingHp;
                    if (remainingHp > 0) { // Opponent still with hp
                        channel.send(`<@${players.currentPlayer.id}> tu ${players.currentPlayer.animal}[HP:${players.currentPlayer.hp}] ${attackMessages.randomItem()}, hizo ${power} de daño!`);
                        dbBattle.set(channel.id, gameGeneral);
                        sendNextTurn(channel, players.otherPlayer.id)
                    } else { // Winner
                        channel.send(`<@${players.currentPlayer.id}> tu ${players.currentPlayer.animal}[HP:${players.currentPlayer.hp}] ${attackMessages.randomItem()}, hizo ${power} de daño!`);
                        channel.send(`Has derrotado al ${players.otherPlayer.animal} de <@${players.otherPlayer.id}>, <@${players.currentPlayer.id}> es tu victoria!!!`);
                        dbBattle.delete(channel.id);
                        clearTimeOut(channel)
                    }
                }
            }
        }

        function sendNextTurn(channel, playerId) {
            channel.send(`<@${playerId}> es tu turno!`).then(async reactMessage => {
                const collector = reactMessage.createReactionCollector((reaction, user) => {
                    return (reaction.emoji.name === "⚔" || reaction.emoji.name === "🤡" || reaction.emoji.name === "🏳") && user.id === playerId;
                });
                collector.on("collect", (reaction, reactionCollector) => {
                    setTimeOut(channel);
                    reactMessage.delete();
                    if (reaction.emoji.name === "⚔") {
                        doAttack(channel);
                    } else if (reaction.emoji.name === "🤡") {
                        doLure(channel);
                    } else if (reaction.emoji.name === "🏳") {
                        doSurrender(channel);
                    }
                });
                await reactMessage.react("⚔");
                await reactMessage.react("🤡");
                await reactMessage.react("🏳");
                reactMessage.delete(30000);
                setTimeOut(channel);
            });
        }

        async function doAction(channel) {
            let players = getPlayers(await getGame(channel.id));
            sendNextTurn(channel,players.currentPlayer.id)
        }

        let prefix = await getPrefix();
        if (isCommand("test_battle_phase")) {
            dbBattle.set(message.channel.id, {
                "nextTurn": 0,
                "game": {
                    [message.author.id]: {
                        "id": message.author.id,
                        "animal": animals.randomItem(),
                        "hp": 10,
                        "bait": 0,
                        "accepted": true
                    },
                    [message.author.id + "2"]: {
                        "id": message.author.id,
                        "animal": animals.randomItem(),
                        "hp": 10,
                        "bait": 0,
                        "accepted": true
                    }
                }
            });
            await doAction(message.channel);
            return;
        }
        if (dbBattle.has(message.channel.id)) { // Continue game
            let gameGeneral = await dbBattle.get(message.channel.id);
            let gameState = gameGeneral.game;
            setTimeOut(message.channel);
            if (count(gameState) < 2) { // Game need another player
                if (isCommand("aceptar")) {
                    let challenger = null;
                    for (let player in gameState) {
                        if (gameState[player].accepted) {
                            challenger = player
                        }
                    }
                    if (challenger !== message.author.id) {
                        let animal = animals.randomItem();
                        gameState[message.author.id.toString()] = {
                            "id": message.author.id.toString(),
                            "animal": animal,
                            "hp": 10,
                            "bait": 0,
                            "accepted": true
                        };
                        dbBattle.set(message.channel.id, gameGeneral);
                        await doAction(message.channel);
                    } else {
                        message.channel.send(`<@${challenger}> no puedes aceptar tu propio reto!`)
                    }
                }
            } else { // Game has 2 players, check for game commands
                let pending = null;
                let challenger = null;
                for (let player in gameState) {
                    if (!gameState[player].accepted) {
                        pending = player
                    } else {
                        challenger = player
                    }
                }
                if (pending != null) { //Check for user accept battle
                    if (isCommand(ACTION_ACCEPT)) {
                        if (message.author.id === pending) { // Game accepted
                            gameState[pending].accepted = true;
                            dbBattle.set(message.channel.id, gameGeneral);
                            message.channel.send(`<@${pending}> ha aceptado el duelo!`);
                            await doAction(message.channel);
                        } else {
                            message.channel.send(`<@${message.author.id}> este duelo esta dirigido a <@${pending}>, tu no puedes aceptarlo!`)
                        }
                    } else if (isCommand(ACTION_REJECT)) {
                        dbBattle.delete(message.channel.id);
                        message.channel.send(`<@${challenger}> tu duelo fue rechazado!`);
                        clearTimeOut(message.channel)
                    }
                }
            }
        } else { // New possible game
            if (isCommand(ACTION_CHALLENGE)) {
                setTimeOut(message.channel);
                if (message.mentions.members === 0) { // General battle, wait for other player
                    let player1Id = message.author.id.toString();
                    let animal = animals.randomItem();
                    let json = {
                        "nextTurn": 0,
                        "game": {
                            [player1Id]: {
                                "id": player1Id,
                                "animal": animal,
                                "hp": 10,
                                "bait": 0,
                                "accepted": true
                            }
                        }
                    };
                    dbBattle.set(message.channel.id, json);
                    message.channel.send(`Batalla iniciada, tu animal será un ${animal}! Esperando un oponente! (${prefix}aceptar)`)
                } else {
                    let player1Id = message.author.id.toString();
                    let player2Id = message.mentions.members.first().id.toString();
                    let animal1 = animals.randomItem();
                    let animal2 = animals.randomItem();
                    let json = {
                        "nextTurn": 0,
                        "game": {
                            [player1Id]: {
                                "id": player1Id,
                                "animal": animal1,
                                "hp": 10,
                                "bait": 0,
                                "accepted": true
                            },
                            [player2Id]: {
                                "id": player2Id,
                                "animal": animal2,
                                "hp": 10,
                                "bait": 0,
                                "accepted": false
                            }
                        }
                    };
                    dbBattle.set(message.channel.id, json);
                    message.channel.send(`Batalla iniciada, tu animal será un ${animal1}! Esperando a <@${message.mentions.users.first().id}> (${prefix}aceptar)`)
                }
            }
        }
    }
};

