var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
const Timeout = require('smart-timeout');
const botConfig = require('./config.json');
let dbPrefix = new db.crearDB('prefix');
let dbCards = new db.crearDB('user_cards');
let dbCardGames = new db.crearDB('card_games');
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
    cardGame: (message) => __awaiter(this, void 0, void 0, function* () {
        let prefix = yield getPrefix();
        function getPrefix() {
            return __awaiter(this, void 0, void 0, function* () {
                if (dbPrefix.has(`${message.guild.id}`)) {
                    return yield dbPrefix.get(`${message.guild.id}`);
                }
                else {
                    return botConfig.prefix;
                }
            });
        }
        function isCommand(text) {
            return message.content.toLowerCase().startsWith(prefix + text);
        }
        function getMenuSelector(index, selected) {
            if (selected === -1)
                return "";
            if (index === selected) {
                return ":arrow_forward: ";
            }
            else {
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
                    if (!isUp)
                        card.editPosition += 1;
                    break;
                case 1:
                case 2:
                    if (isUp)
                        card.editPosition -= 1;
                    else
                        card.editPosition += 1;
                    break;
                case 3:
                    if (isUp)
                        card.editPosition -= 1;
            }
        }
        function editCard(card, isPlus) {
            let index = card.editPosition;
            if (index === -1)
                return;
            if (card.points === 0 && isPlus)
                return;
            switch (index) {
                case 0:
                    if (isPlus && card.health < 7) {
                        card.health += 1;
                        card.points -= 1;
                    }
                    else if (!isPlus && card.health > 3) {
                        card.health -= 1;
                        card.points += 1;
                    }
                    break;
                case 1:
                    if (isPlus && card.attack < 2) {
                        card.attack += 1;
                        card.points -= 1;
                    }
                    else if (!isPlus && card.attack > -2) {
                        card.attack -= 1;
                        card.points += 1;
                    }
                    break;
                case 2:
                    if (isPlus && card.defence < 2) {
                        card.defence += 1;
                        card.points -= 1;
                    }
                    else if (!isPlus && card.defence > -2) {
                        card.defence -= 1;
                        card.points += 1;
                    }
                    break;
                case 3:
                    if (isPlus && card.evasion < 2) {
                        card.evasion += 1;
                        card.points -= 1;
                    }
                    else if (!isPlus && card.evasion > -2) {
                        card.evasion -= 1;
                        card.points += 1;
                    }
                    break;
            }
        }
        function showUserCard(userId, message) {
            return __awaiter(this, void 0, void 0, function* () {
                let tmpCard = JSON.parse(JSON.stringify(yield dbCards.get(userId)));
                let cardMessage = yield message.channel.send(createEmbed(message.author.tag, tmpCard));
                const cardCollector = cardMessage.createReactionCollector((reaction, user) => {
                    return reaction.emoji.name === "✏" && user.id === userId && !user.bot;
                });
                cardCollector.on("collect", () => __awaiter(this, void 0, void 0, function* () {
                    cardMessage.delete();
                    tmpCard.editPosition = 0;
                    let editionMessage = yield message.channel.send(createEmbed(message.author.tag, tmpCard));
                    const editionCollector = editionMessage.createReactionCollector((reaction, user) => {
                        return (reaction.emoji.name === "➕" || reaction.emoji.name === "➖" || reaction.emoji.name === "🔼" || reaction.emoji.name === "🔽" || reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === userId && !user.bot;
                    });
                    editionCollector.on("collect", (reaction, collector) => __awaiter(this, void 0, void 0, function* () {
                        switch (reaction.emoji.name) {
                            case "➕":
                                editCard(tmpCard, true);
                                yield editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                                break;
                            case "➖":
                                editCard(tmpCard, false);
                                yield editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                                break;
                            case "🔼":
                                changeMenu(tmpCard, true);
                                yield editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                                break;
                            case "🔽":
                                changeMenu(tmpCard, false);
                                yield editionMessage.edit(createEmbed(message.author.tag, tmpCard));
                                break;
                            case "✅":
                                tmpCard.editPosition = -1;
                                dbCards.set(userId, tmpCard);
                                editionMessage.delete();
                                editionMessage.channel.send(`Cambios guardados <@${userId}>`);
                                yield showUserCard(userId, message);
                                break;
                            case "❌":
                                tmpCard.editPosition = -1;
                                editionMessage.delete();
                                yield showUserCard(userId, message);
                                break;
                        }
                    }));
                    yield editionMessage.react("➕");
                    yield editionMessage.react("➖");
                    yield editionMessage.react("🔼");
                    yield editionMessage.react("🔽");
                    yield editionMessage.react("✅");
                    yield editionMessage.react("❌");
                }));
                yield cardMessage.react("✏");
            });
        }
        if (isCommand("ver_carta")) {
            if (!dbCards.has(message.author.id))
                yield dbCards.set(message.author.id, {
                    editPosition: -1,
                    health: 5,
                    attack: 0,
                    defence: 0,
                    evasion: 0,
                    points: 1
                });
            yield showUserCard(message.author.id, message);
        }
    })
};
//# sourceMappingURL=cardsgame.js.map