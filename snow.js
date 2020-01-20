const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
let game = new db.crearDB('games');

const {logs} = require('./logs.js');

class Player {
    newPlayer() {
        this.life = 5;
        this.action = "❄️";
        this.accion = "❄️";
        this.taunt = 0;
    }

    getVida() {
        return this.life;
    }

    getAction() {
        return this.action;
    }

    getAccion() {
        return this.accion;
    }

    setAction(act) {
        this.action = act;
    }

    setAccion(acc) {
        this.accion = acc;
    }

    damage(dmg) {
        this.life -= dmg;
    }

    setTaunt() {
        this.taunt++;
    }

    getTaunt() {
        return this.taunt;
    }
}

module.exports = {
    snowFight: async (message) => {

        const args = message.content.slice(message.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        let msg;
        if (command === "snow-start") {
            if (game.tiene(`${message.channel.id}`)) return message.channel.send("Ya hay una pelea en juego");
            if (message.mentions.users.first() && message.mentions.users.first() !== message.author.id) {
                msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`;
                game.establecer(`${message.channel.id}.retado`, message.mentions.users.first().id)
            } else
                msg = message.author + ' quiere hacer una pelea de nieve. Quien acepta? ``' + message.prefix + 'snow-accept``';

            game.establecer(`${message.channel.id}.player1.id`, message.author.id);
            game.establecer(`${message.channel.id}.player1.name`, message.member.displayName);
            message.channel.send(msg)
        }

        if (command === "snow-accept") {
            if (!game.tiene(`${message.channel.id}`))
                return message.channel.send("Debes de iniciar una pelea antes");
            if (game.tiene(`${message.channel.id}.retado`) && await game.obtener(`${message.channel.id}.retado`) !== message.author.id)
                return message.channel.send("Tu no eres el usuario retado");
            if (await game.obtener(`${message.channel.id}.player1.id`) === message.author.id)
                return message.channel.send("No puedes pelear contra ti mismo");

            game.establecer(`${message.channel.id}.player2.id`, message.author.id).catch(err => console.log(err));
            game.establecer(`${message.channel.id}.player2.name`, message.member.displayName).catch(err => console.log(err));

            await startGame(message)
        }

        if (command === "snow-help") {
            let fightEmbed = new Discord.RichEmbed()
                .setTitle("❄️ Pelea de bolas de nieve ❄️")
                .setColor("#d0d0ff")
                .setDescription(`☄ **Atacar** \t=> ***A*** \n⛄ **Defender** \t=> ***D*** \n💨 **Esquivar** \t=> ***E***`)
                .addField("Comandos", "``"+message.prefix+"snow-start [usuario]`` Empezar partida (el usuario opcional para retar)\n"+
                         "``"+message.prefix+"snow-accept`` Aceptar partida\n"+ 
                         "``"+message.prefix+"snow-help`` Ver ayuda\n"+ 
                         "``"+message.prefix+"snow-clear`` Limpiar una batalla empezada")
                .addField('❄️ Acción ❄️', 'Deberás poner la letra corresponiente a la opción de arriba que deseas ejecutar (_puedes ponerla en mayusculas o minusculas_).')
                .addField('☄️ Atacar ☄️', 'Hace 2 ptos de daño al enemigo.\nTiene 15% de fallar.')
                .addField('⛄ Defender ⛄', 'Evitas la mitad del daño enemigo (1 pto).')
                .addField('💨 Esquivar 💨', 'Evitas el daño enemigo.\nTiene 30% de fallar.')
                .addField('🌨️ Tips 🌨️', 'Si no seleccionas ninguna acción 3 veces seguidas, pierdes.');
            await message.channel.send(fightEmbed)
        }

        if (command === "snow-clear") {
          if (message.author.id !== "355104003572498435" && !message.member.hasPermission("ADMINISTRATOR") && message.author.id !== await game.obtener(`${message.channel.id}.player1.id`)) return
            if (!game.tiene(`${message.channel.id}`))
                return message.channel.send("No hay ninguna pelea iniciada!");
          
            await game.eliminar(`${message.channel.id}`)
            return message.channel.send("Pelea eliminada correctamente!")
            
        }
    }
};

async function startGame(message) {

    let player1 = new Player();
    let player2 = new Player();
    player1.newPlayer();
    player2.newPlayer();

    player1.name = await game.obtener(`${message.channel.id}.player1.name`).catch(err => console.log(err));
    player1.id = await game.obtener(`${message.channel.id}.player1.id`).catch(err => console.log(err));
    player2.name = await game.obtener(`${message.channel.id}.player2.name`).catch(err => console.log(err));
    player2.id = await game.obtener(`${message.channel.id}.player2.id`).catch(err => console.log(err));


    const filter = m => m.author.id === player1.id || m.author.id === player2.id;

    message.channel.send(`❄️ <@${player1.id}> ❄️ vs ❄️ <@${player2.id}> ❄️\nPreparense, la pelea está a punto de empezar`).then(() => {
        let ronda = setInterval(async () => {
            if (player1.getVida() <= 0 || player2.getVida() <= 0) {
                let finEmbed = new Discord.RichEmbed()
                    .setTitle("Pelea de bolas de nieve")
                    .setColor("#d0d0ff")
                    .addField(player1.name, `Anterior acción: ${player1.getAccion()}\n♥ Vida: ${player1.getVida()}\nTurnos perdidos: ${player1.getTaunt()}`, true)
                    .addField(player2.name, `Anterior acción: ${player2.getAccion()}\n♥ Vida: ${player2.getVida()}\nTurnos perdidos: ${player2.getTaunt()}`, true);
                if (player1.getVida() <= 0 && player2.getVida() <= 0) {
                    finEmbed.setDescription(`❄️ ***EMPATE*** ❄️`);
                    await message.channel.send(finEmbed);
                    clearInterval(ronda);
                    return
                } else if (player1.getVida() <= 0) {
                    finEmbed.setDescription(`❄️ ***VICTIORA de ${player2.name}*** ❄️`);
                    await message.channel.send(finEmbed);
                    clearInterval(ronda);
                    return
                } else if (player2.getVida() <= 0) {
                    finEmbed.setDescription(`❄️ ***VICTIORA de ${player1.name}*** ❄️`);
                    await message.channel.send(finEmbed);
                    clearInterval(ronda);
                    return
                }
            }

            let time = 3;

            let finRonda = false;
            // console.log(player1);
            await message.channel.send(`❄ Siguiente ataque en... **${time}** ❄`).then(msg => {
                let ataque = setInterval(() => {
                    time--;
                    if (time > 0)
                        msg.edit(`❄ Siguiente ataque en... **${time}** ❄`);
                    else {
                        time = 3;
                        message.channel.send("❄️**ATACAD!** ❄️").then(() => {
                            const collector = message.channel.createMessageCollector(filter, {time: 2000});
                            collector.on('end', col => {
                                message.channel.send("❄️**TIEMPO!** ❄️");
                                col.forEach(msg => {
                                    let player;
                                    msg.author.id === player1.id ? player = player1 : player = player2;
                                    let act = msg.content.toLowerCase();
                                    if (act.includes("a")) {
                                        player.setAction("a");
                                    } else if (act.includes("d")) {
                                        player.setAction("d");
                                    } else if (act.includes("e")) {
                                        player.setAction("e");
                                    }

                                });

                                doAction(player1, player2, message);

                                // console.log("Vida 1 == " + player1.getVida() + "\nVida 2 == " + player2.getVida())
                            })
                        });

                        clearInterval(ataque)
                    }

                }, 1000)

            });
            // console.log(finRonda);
            if (finRonda === true) {
                clearInterval(ronda)
            }
        }, 10000);

    });

    await game.eliminar(`${message.channel.id}`)
}


function doAction(player1, player2, message) {
    const act1 = player1.getAction();
    const act2 = player2.getAction();
    // console.log("act1");
    if (act1 === "❄️") {
        player1.setTaunt();
        player1.setAccion("❄️\nInactividad")
    } else
        player1.taunt = 0;

    if (act2 === "❄️") {
        player2.setTaunt();
        player2.setAccion("❄️\nInactividad")
    } else
        player2.taunt = 0;

    if (act1 === "a") {
        if (act2 === "a") {
            atacar(player1, player2);
            atacar(player2, player1)
        } else if (act2 === "d")
            defenderAtacar(player2, player1);
        else if (act2 === "e")
            esquivarAtacar(player2, player1)
    } else if (act1 === "d") {
        if (act2 === "a")
            defenderAtacar(player1, player2);
        else if (act2 === "d")
            defender(player1, player2);
        else if (act2 === "e")
            esquivarDefender(player2, player1)
    } else if (act1 === "e") {
        if (act2 === "a")
            esquivarAtacar(player1, player2);
        else if (act2 === "d")
            esquivarDefender(player1, player2);
        else if (act2 === "e")
            esquivar(player1, player2)
    }

    if (player1.getTaunt() === 3) {
        player1.life = 0;
    }

    if (player2.getTaunt() === 3) {
        player2.life = 0;
    }

    setTimeout(() => {
        if (player1.getVida() > 0 && player2.getVida() > 0)
            sendEmbed(player1, player2, message)
    }, 1000)
}

function esquivarAtacar(player1, player2) {
    const posiblidades = Math.floor(Math.random() * 100);
    const esquivar = posiblidades > 30;
    const atacar = posiblidades > 15;

    if (esquivar) {
        player1.setAccion("💨 \nEsquivo realizado");
        if (atacar) {
            player2.setAccion("☄️\nAtaque esquivado")
        } else {
            player2.setAccion("☄️\nAtaque esquivado")
        }
    } else {
        player1.setAccion("💨 \nEsquivo fallido");
        if (atacar) {
            player1.damage(2);
            player2.setAccion("☄️\nAtaque realizado")
        } else {
            player2.setAccion("☄️\nAtaque fallido")
        }
    }
}

function defenderAtacar(player1, player2) {
    const posiblidades = Math.floor(Math.random() * 100);
    const atacar = posiblidades > 15;
    player1.setAccion("⛄️\nDefensa realizada");
    if (atacar) {
        player1.damage(1);
        player2.setAccion("☄️\nAtaque defendido")
    } else {
        player2.setAccion("☄️\nAtaque defendido")
    }
}

function esquivarDefender(player1, player2) {
    player1.setAccion("💨 \nEsquivo");
    player2.setAccion("⛄️\nDefensa")
}

function atacar(player1, player2) {
    const posiblidades = Math.floor(Math.random() * 100);
    const atacar = posiblidades > 15;
    if (atacar) {
        player2.damage(2);
        player1.setAccion("☄️\nAtaque realizado")
    } else {
        player1.setAccion("☄️\nAtaque fallido")
    }
}

function defender(player1, player2) {
    player1.setAccion("⛄️\nDefensa");
    player2.setAccion("⛄️\nDefensa")
}

function esquivar(player1, player2) {
    player1.setAccion("💨 \nEsquivo");
    player2.setAccion("💨 \nEsquivo")
}


async function sendEmbed(player1, player2, message) {
    console.log(player1);
    console.log(player2);
    let fightEmbed = new Discord.RichEmbed()
        .setTitle("Pelea de bolas de nieve")
        .setColor("#d0d0ff")
        .setDescription(`☄️ **Atacar** \t=> ***a*** \n⛄ **Defender** \t=> ***d*** \n💨 **Esquivar** \t=> ***e***`)
        .addField(player1.name, `Anterior acción: ${player1.getAccion()}\n♥ Vida: ${player1.getVida()}\nTurnos perdidos: ${player1.getTaunt()}`, true)
        .addField(player2.name, `Anterior acción: ${player2.getAccion()}\n♥ Vida: ${player2.getVida()}\nTurnos perdidos: ${player2.getTaunt()}`, true);
    await message.channel.send(fightEmbed).then(() => {
        player1.setAction("❄️");
        player2.setAction("❄️");
    });
}