const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const Timeout = require('smart-timeout');
const botConfig = require('./config.json');
let dbPrefix = new db.crearDB('prefix');
let dbCards = new db.crearDB('user_cards');

/*
{
editPosition: -1,
health: 0,
attack: 0,
defence: 0,
evasion: 0,
points: 0,
}
 */

module.exports = {
    cardGame: async (message) => {

        let prefix = await getPrefix();

        async function getPrefix() {
            if (dbPrefix.has(`${message.guild.id}`)) {
                return await dbPrefix.get(`${message.guild.id}`)
            } else {
                return botConfig.prefix
            }
        }

        function isCommand(text) {
            return message.content.toLowerCase().startsWith(prefix + text);
        }

        function getMenuSelector(index, selected) {
            if (selected === -1)
                return "";
            if (index === selected) {
                return ":arrow_forward: ";
            } else {
                return "       ";
            }
        }

        function createEmbed(name, card) {
            return new Discord.RichEmbed()
                .setTitle(name)
                .setColor("#1B8D2C")
                .addField(getMenuSelector(0, card.editPosition) + ":heartpulse: Vida: " + card.health, "_ _", false)
                .addField(getMenuSelector(1, card.editPosition) + ":crossed_swords: Ataque: " + card.attack, "_ _", false)
                .addField(getMenuSelector(2, card.editPosition) + ":shield: Defensa: " + card.defence, "_ _", false)
                .addField(getMenuSelector(3, card.editPosition) + ":runner: Evasion: " + card.evasion, "_ _", false)
                .addField(getMenuSelector(4, card.editPosition) + ":gem: Puntos sobrantes: " + card.points, "_ _", false)
                .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
        }

        function changeMenu(card, isUp) {
            switch (card.editPosition) {
                case 0:
                    if (!isUp) card.editPosition += 1;
                    break;
                case 1:
                case 2:
                    if (isUp) card.editPosition -= 1; else card.editPosition += 1;
                    break;
                case 3:
                    if (isUp) card.editPosition -= 1;

            }
        }

        function editCard(card, isPlus) {
            let index = card.editPosition;
            if (index === -1) return;
            if (card.points === 0 && isPlus) return;
            switch (index) {
                case 0:
                    if (isPlus && card.health < 7) {
                        card.health += 1;
                        card.points -= 1;
                    } else if (!isPlus && card.health > 3) {
                        card.health -= 1;
                        card.points += 1;
                    }
                    break;
                case 1:
                    if (isPlus && card.attack < 2) {
                        card.attack += 1;
                        card.points -= 1;
                    } else if (!isPlus && card.attack > -2) {
                        card.attack -= 1;
                        card.points += 1;
                    }
                    break;
                case 2:
                    if (isPlus && card.defence < 2) {
                        card.defence += 1;
                        card.points -= 1;
                    } else if (!isPlus && card.defence > -2) {
                        card.defence -= 1;
                        card.points += 1;
                    }
                    break;
                case 3:
                    if (isPlus && card.evasion < 2) {
                        card.evasion += 1;
                        card.points -= 1;
                    } else if (!isPlus && card.evasion > -2) {
                        card.evasion -= 1;
                        card.points += 1;
                    }
                    break;
            }
        }

        async function showUserCard(userId,message) {
            let tmpCard = JSON.parse(JSON.stringify(await dbCards.get(userId)));
            let cardMessage = await message.channel.send(createEmbed(message.author.tag, tmpCard));
            const cardCollector = cardMessage.createReactionCollector((reaction, user) => {
                return reaction.emoji.name === "✏" && user.id === userId && !user.bot
            });
            cardCollector.on("collect", async () => {
                cardMessage.delete();
                tmpCard.editPosition = 0;
                let editionMessage = await message.channel.send(createEmbed(message.author.tag, tmpCard));
                const editionCollector = editionMessage.createReactionCollector((reaction, user) => {
                    return (reaction.emoji.name === "➕" || reaction.emoji.name === "➖" || reaction.emoji.name === "🔼" || reaction.emoji.name === "🔽" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌"
                    ) && user.id === userId && !user.bot
                });
                editionCollector.on("collect", async (reaction, collector) => {
                    switch (reaction.emoji.name) {
                        case "➕":
                            editCard(tmpCard, true);
                            await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                            break;
                        case "➖":
                            editCard(tmpCard, false);
                            await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                            break;
                        case "🔼":
                            changeMenu(tmpCard,true);
                            await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                            break;
                        case "🔽":
                            changeMenu(tmpCard,false);
                            await editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                            break;
                        case "✅":
                            tmpCard.editPosition = -1;
                            dbCards.set(userId,tmpCard);
                            editionMessage.delete();
                            editionMessage.channel.send(`Cambios guardados <@${userId}>`);
                            await showUserCard(userId,message);
                            break;
                        case "❌":
                            tmpCard.editPosition = -1;
                            editionMessage.delete();
                            await showUserCard(userId,message);
                            break;
                    }
                });
                await editionMessage.react("➕");
                await editionMessage.react("➖");
                await editionMessage.react("🔼");
                await editionMessage.react("🔽");
                await editionMessage.react("✅");
                await editionMessage.react("❌");
            });
            await cardMessage.react("✏");
        }

        if (isCommand("ver_carta")) {
            if (!dbCards.has(message.author.id))
                await dbCards.set(message.author.id, {
                    editPosition: -1,
                    health: 5,
                    attack: 0,
                    defence: 0,
                    evasion: 0,
                    points: 1
                });
            await showUserCard(message.author.id,message)
        }
    }
};