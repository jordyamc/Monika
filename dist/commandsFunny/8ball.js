const Discord = require('discord.js');
module.exports = {
    name: '8ball',
    alias: [],
    description: 'Responde a la pregunta que le haces con un si, no y variables',
    run: (message, args) => {
        /*function frecuenciaTipoMensaje(Action) {
            switch(Action) {
          case 'frecuencia':
                    var Probabilidad = ["1","0","2","0", "2", "1", "2","0","1","0"]
                    var  resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
                break;
         
                default:
            }
          console.log('Respuesta Shu: ' +resp)
          return resp;
        }*/
        if (!args[0]) {
            return message.channel.send("Preguntame algo para que te pueda responder " + message.author);
        }
        var varNickname = message.member.nickname;
        if (varNickname == null) {
            varNickname = "";
        }
        var x = [
            " Claro que sí " + varNickname + ", hasta Kala lo dijo en un directo ",
            " Claro que no " + varNickname + ", hasta Kala lo dijo en un directo ",
            " Con el dinero todo es posible, pero yo sé que eres pobre... Sorry " + varNickname + " ",
            "  " + varNickname + ", con el dinero todo es posible ",
            " Sí ",
            " No ",
            " No entiendo la necesidad de algunas personas de querer vivir una mentira ",
            " Algunas personas siempre necesitan que les reafirmen algo aún cuando ya saben la respuesta. Tu eres un ejemplo " + varNickname + " ",
            " " + varNickname + ", los juanetes de tus pies así lo creen también ",
            " Tan cierto como que krilin morirá de nuevo ",
            " Nadie mejor que tu para saberlo ",
            " No no no no! Bueno... Si ",
            "  " + varNickname + " fijate que sí y si yo me muriera, reencarnaría en mariposa. Nadie sospecharía de una mariposa. ",
            " Claro que si, claro que si, claro que si... ¿O quizás no? ",
            "  " + varNickname + ", el FBI y la ONU dicen que estas libre de cargos ",
            " Tu tranquilo y yo nerviosa ",
            " A mi no me preguntes " + varNickname + ", Junko dice que si y yo no le cuestiono ",
            " Deja de preguntar tanto " + varNickname + ", creo haberte dicho que si ",
            " Si " + varNickname + "... Si... ",
            " No " + varNickname + "... No... ",
            " Que no " + varNickname + "! Y no me jodas más ",
            " Si mal no recuerdo, sí… aunque creo que sufro de amnesia  ",
            " Alguien más debe de saberlo, a mí no me preguntes ",
            " Ves eso de allá, pues yo no, estoy encerrada en esta pinche computadora, que voy a saber! ",
            "  " + varNickname + " otra persona me ha preguntado por lo mismo, pregúntale a ver ",
            " Si me dieran permiso te lo diría " + varNickname + " ",
            " Mejor lanza una moneda a ver que te sale ",
            " Sí ",
            " No ",
            "  " + varNickname + ", aumenta tu cosmos y vuelve a preguntar  ",
            " Aumenta tu Ki y pregunta de nuevo pequeño gusano ",
            " No lo se " + varNickname + ", yo creía que buscarse en Google significaba otra cosa ",
            " Te daría la respuesta, pero es por eso que no tienes amigos ",
            " Estaría de acuerdo contigo, pero luego estaríamos los dos equivocados ",
            " Así le dijeron a mi hermana y ahora estoy llena de sobrinos ",
            " No " + varNickname + "! Por cosas asi te mandaron a la friendzone ",
            " Los de IT Crowd tienen la respuesta",
            " Alguien-sama siempre es la respuesta",
            " No lo se. Pero alguien es pervert",
            "  " + varNickname + ", Kala me dijo que sí, aunque esa vez él estaba borracho",
            "  " + varNickname + ", Kala me dijo que no, aunque esa vez él estaba borracho",
            " Sí. ¿Por qué no?",
            " Junkitochan es muy buena preguntale a ella... Pero no le hagas un tag...",
            " No.. Malo... Malo " + varNickname + ", malo... Muy malo",
            " 1 ",
            " 0 "
        ];
        var respuesta8ball = x[Math.floor(Math.random() * x.length)];
        return message.channel.send(respuesta8ball);
    }
};
//# sourceMappingURL=8ball.js.map