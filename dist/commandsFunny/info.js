const Discord = require('discord.js');
const botconfig = require('../config.json');
module.exports = {
    name: 'info',
    alias: [],
    description: 'Información sobre el bot',
    run: (message, args, rolIT, client) => {
        let infoembed = new Discord.RichEmbed()
            .setTitle("Información del Bot")
            .setColor("#cf2958")
            .setThumbnail(client.user.displayAvatarURL)
            //.setThumbnail("https://cdn.glitch.com/2faabd6a-5ca0-433c-aaf2-a94a9de84311%2Fmonika%20binario.png?v=1568160646108")
            .addField("Nombre", client.user.username)
            .addField("Prefijo", botconfig.prefix)
            .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png");
        return message.channel.send(infoembed);
    }
};
//# sourceMappingURL=info.js.map