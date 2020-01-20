const Discord = require('discord.js');
const db = require('megadb');
let bank = new db.crearDB("bank");
let fees = new Map();
let client;

module.exports = {
    name: 'impuestos',
    alias: [],
    description: 'Cobrar impuestos',

    init: async indexClient => {
        //initClient(indexClient);
    },

    run: async (message, args, rolIT, client) => {
        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id !== "355104003572498435") {
            message.channel.send('Quieres provocar el caos? La próxima vez, warn que te cae.');
            return;
        }

        let clubes;
        let role;

        if (message.guild.id === '545720855578279958'){
            role = [
                "552699845459181598",
                "552699727246917650",
                "553453412826611742",
                "555402664301690883",
                "552699809811922944",
                "552699907618635776",
                "553451609107988480",
                "555607531645435906",
                "568989794877833391",
                "632072834256076801",
                "553451557493145611",
            ];

            clubes = [
                [message.guild.roles.get('552699845459181598').members.map(m => m.user.id)], // Sin Voz
                [message.guild.roles.get('552699727246917650').members.map(m => m.user.id)], // Fate
                [message.guild.roles.get('553453412826611742').members.map(m => m.user.id)], // Oreo
                [message.guild.roles.get('555402664301690883').members.map(m => m.user.id)], // Henculto
                [message.guild.roles.get('552699809811922944').members.map(m => m.user.id)], // Monogatari
                [message.guild.roles.get('552699907618635776').members.map(m => m.user.id)], // Toldboden
                [message.guild.roles.get('553451609107988480').members.map(m => m.user.id)], // Battleroyale
                [message.guild.roles.get('555607531645435906').members.map(m => m.user.id)], // IT Crowd
                [message.guild.roles.get('568989794877833391').members.map(m => m.user.id)], // Nocturnos
                [message.guild.roles.get('632072834256076801').members.map(m => m.user.id)], // UwO
                [message.guild.roles.get('553451557493145611').members.map(m => m.user.id)] // Esperanzas
                // [message.guild.roles.get('641716726236577792').members.map(m => m.user.id)] // Errores
            ]

        } else if (message.guild.id === '606076389422268416'){
            clubes = [
                message.guild.roles.get('621022534527352832').members.map(m => m.user.id), // IT Dev
                message.guild.roles.get('606076887650795532').members.map(m => m.user.id), // IT Crowd
                message.guild.roles.get('623920633302220820').members.map(m => m.user.id)  // Junko
            ]
        }

        let dev = message.guild.roles.get('641716726236577792').members.map(m => m.user.id)
        //console.log(dev)
        for (let i = 0; i < dev.length; i++) {
            let usuario = dev[i];
            //console.log(usuario)
            await bank.sumar(`${message.guild.id}.${usuario}.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos IT ***sumar*** => " + error +" => "+usuario))
            await bank.restar(`${message.guild.id}.bank.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos IT ***restar*** => " + error + " => " + usuario))
        }

        let muertos = 0;
        let vivos = 0;

        if (!bank.tiene(`${message.guild.id}.impuestos`)) await bank.establecer(`${message.guild.id}.impuestos`, ["0"]);
        for (let i = 0; i < clubes.length; i++) {
            let miembros = clubes[i];
            //console.log("tramo 3 "+ miembros[0].length)
            for (let j = 0; j < miembros[0].length; j++) {
                let usuario = clubes[i][0][j];

                if (bank.tiene(`${message.guild.id}.${usuario}`)){

                    // Si se queda en negativo
                    if (await bank.obtener(`${message.guild.id}.${usuario}.money`) < 50000) {
                        client.guilds.get(message.guild.id).fetchMember(usuario).then( gMember => {
                            if (gMember.roles.has("650818172101853234")) {
                                gMember.removeRole(role[i])
                            }
                        });
                        if (!bank.tiene(`${message.guild.id}.deudas.${usuario}`)) {
                            bank.establecer(`${message.guild.id}.deudas.${usuario}`, { money: 50000});
                            muertos++
                        } else {
                            bank.sumar(`${message.guild.id}.deudas.${usuario}.money`, 50000)
                        }
                    } else {
                        await bank.restar(`${message.guild.id}.${usuario}.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***restar*** => " + error + " => " + usuario));
                        await bank.sumar(`${message.guild.id}.bank.money`, 50000).catch(error => message.channel.send("Error al hacer impuestos ***sumar*** => " + error +" => "+usuario));
                        vivos++
                    }

                    }
                }
            }

        let impEmbed = new Discord.RichEmbed()
            .setColor('#a100f1')
            .setTitle('Total de impuestos no pagados')
            .setDescription("Usuarios salvados: " + vivos);

        let top = await bank.ordenar(`${message.guild.id}.deudas`, "money").catch(err => console.log("Top: "+err));
        let topA = top.map(i => `<@!${i.clave}>`).join("\n");

        impEmbed.addField("Usuarios endeudados: "+ muertos,topA);
        return client.guilds.get(message.guild.id).channels.get("548863469265354753").send(impEmbed);
    }
};
