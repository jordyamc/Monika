const Discord = require('discord.js');
module.exports = {
    name: 'present',
    alias: [],
    description: 'Envia un regalo sorpresa al usuario',
    run: (message, args) => {
        const present = [
            {
                frase: 'una mierda kawaii!',
                img: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fmierda_kawaii.png?v=1561055347968"
            },
            {
                frase: "la cara de Makoto!",
                img: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fmakoto.png?v=1561055348230"
            },
            {
                frase: "una Monika en forma chibi!",
                img: "https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fmonika%20chibi.png?v=1567631292789"
            },
            {
                frase: "",
                img: ""
            }
        ];
        var presentA = present[Math.floor(Math.random() * present.length)];
        if (message.mentions.users.first()) {
            let presentembed = new Discord.RichEmbed()
                .setDescription(message.author + ' le regaló ' + presentA.frase + ' a ' + message.mentions.users.first() + args.slice(1).join(" "))
                .setColor('RANDOM')
                .setImage(presentA.img)
                .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
            return message.channel.send(presentembed);
        }
        else {
            let presentembed = new Discord.RichEmbed()
                .setDescription('Omedeto' + message.author + '! Has ganado ' + presentA.frase)
                .setColor('RANDOM')
                .setImage(presentA.img)
                .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
            return message.channel.send(presentembed);
        }
    }
};
//# sourceMappingURL=present.js.map