const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
    name: 'feed',
    alias: ['suggest', 'feedback'],
    description: 'Sugerencias y/o feedback para ayudar con el bot',
    run: (message, args) => {
        client.guilds.get("606076389422268416").channels.get("606078194000461824").send("Test");
        console.log(args);
    }
};
//# sourceMappingURL=feed.js.map