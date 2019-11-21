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
module.exports = {
    name: 'quote',
    alias: ['responder', 'res'],
    description: '',
    run: (message, args, rolIT, client) => __awaiter(this, void 0, void 0, function* () {
        console.log(args);
        if (!args[1] && !message.mentions.channels.first()) {
            console.log(`https://discordapp.com/channels/${message.channel.id}/${args[0]})`);
            message.channel.fetchMessage(args[0]).then(m => {
                let quoteEmbed = new Discord.RichEmbed()
                    .setColor('#ff9626')
                    .setDescription(m.author)
                    .addField(m.content, `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
                    .setTimestamp()
                    .setFooter("IT Crowd | #" + m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png");
                message.delete();
                return message.channel.send(quoteEmbed);
            });
        }
        else if (args[2] && message.mentions.channels.first()) {
            message.mentions.channels.first().fetchMessage(args[0]).then(m => {
                let quoteEmbed = new Discord.RichEmbed()
                    .setColor('#ff9626')
                    .setDescription(m.author)
                    .addField(m.content, message.author)
                    .addField(args.slice(2).join(" "), `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
                    .setTimestamp()
                    .setFooter("IT Crowd | #" + m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png");
                message.delete();
                return message.channel.send(quoteEmbed);
            });
        }
        else if (args[1] && !message.mentions.channels.first()) {
            message.channel.fetchMessage(args[0]).then(m => {
                let quoteEmbed = new Discord.RichEmbed()
                    .setColor('#ff9626')
                    .setDescription(m.author)
                    .addField(m.content, message.author)
                    .addField(args.slice(1).join(" "), `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
                    .setTimestamp()
                    .setFooter("IT Crowd | #" + m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png");
                message.delete();
                return message.channel.send(quoteEmbed);
            });
        }
        else if (!args[2] && message.mentions.channels.first()) {
            message.mentions.channels.first().fetchMessage(args[0]).then(m => {
                let quoteEmbed = new Discord.RichEmbed()
                    .setColor('#ff9626')
                    .setDescription(m.author)
                    .addField(m.content, `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${args[0]})`)
                    .setTimestamp()
                    .setFooter("IT Crowd | #" + m.channel.name, "https://cdn.discordapp.com/emojis/562075100116156418.png");
                message.delete();
                return message.channel.send(quoteEmbed);
            });
        }
        else {
            return message.channel.send("Error");
        }
    })
};
//# sourceMappingURL=quote.js.map