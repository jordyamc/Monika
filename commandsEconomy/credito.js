const Discord = require('discord.js')
const db = require('megadb')
let creditos = new db.crearDB('creditos')

module.exports = {
    name:'credito',
    alias:['prestamo'],
    description: '',

    run: async (message, args, rolIT, client) => {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Tu no controlas el banco, largo de aqui")

        if(!args[0]){
            return message.channel.send("Que prestamo intentas hacer?\n<usuario>$<dinero>$<tiempo>$<porcentaje impuesto>")
        }

        let text = args.join(" ").split("$")

        let user = message.mentions.users.first().id;
        let dinero = text[1].trim();
        let tiempo = text[2].trim();
        let impuesto = text[3].trim();

        let pago = dinero*(impuesto/100);

        message.channel.send(`<@${user}> aceptas el prestamo?`).then(async reactMessage =>{
            const collector = reactMessage.createReactionCollector((reaction,user) =>{
                return (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")&& user.id===user;
            });
            collector.on("collect" , async (reaction , reactionCollector) => {
                if(reaction.emoji.name === "✅"){
                    await creditos.set(user,{
                        dinero:dinero,
                        tiempo:tiempo,
                        impuesto:impuesto,
                        pago:pago
                    })
                }if(reaction.emoji.name === "❌"){
                    message.channel.send(`Prestamo rechazado`)
                }
            })
            await reactMessage.react("✅")
            await reactMessage.react("❌")
        })
    }}