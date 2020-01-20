const Discord = require('discord.js')
const db = require('megadb')
let bank = new db.crearDB('bank')
let tienda = new db.crearDB('tienda')

module.exports = {

    economy: async (message, args, prefix, rolIT) => {

        // if (message.member.roles.has(rolIT.id)) {
        //     console.log("true1")
        // }
        // else {
        //     console.log("false1")
        // }
        // if (message.member.hasPermission('ADMINISTRATOR')) {
        //     console.log("true2")
        // }
        // else {
        //     console.log("false2")
        // }


        // if (message.content.toLowerCase().includes("$$$") && (message.member.roles.has(rolIT.id) || message.member.hasPermission('ADMINISTRATOR'))) {
        //     /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
        //     /*
        //     ejemplos get data 
        //     */

        //     var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzU1MTA0MDAzNTcyNDk4NDM1IiwiaWF0IjoxNTYyMjYyMTg0fQ.k1ulwHnvf2vwnYy3LOJkijQkpkc7mBem_PkLDzpeWSc"; // token dialogflow
        //     var baseUrl = "https://unbelievable.pizza/api/guilds/545720855578279958/users";
        //     var Request = require("request");
        //     Request.get(
        //         {
        //             "headers":
        //             {
        //                 "content-type": "application/json",
        //                 "Authorization": accessToken
        //             },
        //             "url": baseUrl
        //         },
        //         (error, response, body) => {
        //             /* uso de la respuesta */

        //             /* armar array con el nuevo formato */

        //             var respuesta = body;

        //             var total = 0
        //             var users = 0
        //             var dinero10 = 0

        //             respuesta = JSON.parse(respuesta);



        //             for (var k in respuesta) {
        //                 var userID = respuesta[k].user_id
        //                 var dinero = respuesta[k].total
        //                 var inventario = Array()

        //                 total = total + dinero
        //                 users = users + 1

        //                 var porcentaje1 = 69 // banco
        //                 var porcentaje2 = 100 - porcentaje1 // usuario

        //                 var dinero90 = Math.floor(dinero * porcentaje2) / 100
        //                 var dinero10b = Math.floor(dinero * porcentaje1) / 100

        //                 var dinero90 = Math.round(dinero90)
        //                 var dinero10 = dinero10 + Math.round(dinero10b)

        //                 bank.establecer(`${message.guild.id}.${userID}`, { money: dinero90, inventory: inventario })

        //                 moneda = args.join(" ");

        //                 if (dinero == 0) {
        //                     var conv = (total) => String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        //                     var conv = (users) => String(users).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        //                     var conv = (dinero10) => String(dinero10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        //                     bank.establecer(`${message.guild.id}.bank`, { money: dinero10 })
        //                     return message.channel.send(`Número de usuarios: ${conv(users)}
        //       Dinero total en el server: ${conv(total)} ${moneda}
        //       Dinero en el banco ${porcentaje1}%: ${conv(dinero10)} ${moneda}`)

        //                 }

        //                 console.log('total: ' + total)
        //                 console.log(porcentaje1 + ' : ' + dinero90)
        //                 console.log(porcentaje2 + ' : ' + dinero10)
        //             }

        //             /* fin uso de la respuesta */
        //         }
        //     )

        //     // /* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */
        //     // bank.establecer(`${message.guild.id}.role.sinvoz`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325733937446912.png`, name: `los sin voz` })

        //     // bank.establecer(`${message.guild.id}.role.fate`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556332962799419392.png`, name: `fate` })

        //     // bank.establecer(`${message.guild.id}.role.oreo`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325702970900549.png`, name: `oreo` })

        //     // bank.establecer(`${message.guild.id}.role.henculto`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/564505823427166303.png`, name: `henculto` })

        //     // bank.establecer(`${message.guild.id}.role.artistas`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/601207869051764767.png`, name: `artistas` })

        //     // bank.establecer(`${message.guild.id}.role.monogatari`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325680133177344.png`, name: `monogatari` })

        //     // bank.establecer(`${message.guild.id}.role.uwo`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/557380883112525834.png`, name: `uwo` })

        //     // bank.establecer(`${message.guild.id}.role.battleroyal`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/566041148611756033.png`, name: `battleroyal` })

        //     // bank.establecer(`${message.guild.id}.role.scriptio`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556325719932928000.png`, name: `scriptio` })

        //     // bank.establecer(`${message.guild.id}.role.itcrowd`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/562075100116156418.png`, name: `it crowd` })

        //     // bank.establecer(`${message.guild.id}.role.nocturnos`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/571345022772051968.png`, name: `nocturnos` })

        //     // //bank.establecer(`${message.guild.id}.role.esperanzas`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/556332981279522837.png`, name: `esperanzas` })

        //     // bank.establecer(`${message.guild.id}.role.mods`, { admin: "", money: 0, icon: `https://cdn.discordapp.com/emojis/571557185251966986.gif`, name: `mods` })


        //     moneda = args.join(" ");

        //     if (args[0]) {
        //         bank.establecer(`${message.guild.id}.moneda`, moneda)
        //     } else {
        //         bank.establecer(`${message.guild.id}.moneda`, "<:foxIT:626526183542095882>")
        //     }
        //     console.log("A: " + await bank.obtener(`${message.guild.id}.moneda`))

        // }



        if (!bank.tiene(`${message.guild.id}.${message.author.id}`)) {
            bank.establecer(`${message.guild.id}.${message.author.id}`, { money: 0, inventory: Array() })
        }

    }
}