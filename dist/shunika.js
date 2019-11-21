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
module.exports = {
    shunika: (message) => __awaiter(this, void 0, void 0, function* () {
        function resolveAfter3Seconds() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                }, 3000);
            });
        }
        /* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr */
        /*
        frecuenciaMensaje: originalmente pensado para 3 tipos de mensaje, lo modifique solo para 2
        frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
         
        */
        function frecuenciaMensaje(Action) {
            switch (Action) {
                case 'muyBajaFrecuencia':
                    var Probabilidad = ["1", "0", "0", "0", "0", "0", "0", "0", "1", "0"];
                    var resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
                    break;
                case 'bajaFrecuencia':
                    var Probabilidad = ["1", "0", "0", "1", "0", "0", "1", "0", "1", "0"];
                    var resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
                    break;
                case 'altaFrecuencia':
                    var Probabilidad = ["1", "1", "0", "1", "0", "1", "1"];
                    var resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
                    break;
                case 'siempre':
                    var Probabilidad = ["1"];
                    var resp = Probabilidad[Math.floor(Math.random() * Probabilidad.length)];
                    break;
                default:
            }
            console.log('Respuesta Shu: ' + resp);
            return resp;
        }
        /*
         frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
        */
        //id de Shuyaku ;425352671990382605 
        var Shuyaku = 425352671990382605;
        //var idValidacion=Shuyaku;
        var idValidacion = Shuyaku;
        // resp a no quiero a monika
        if ((message.author.id == idValidacion && message.content.toLowerCase().includes("monika") && message.content.toLowerCase().includes("esposa") && message.content.toLowerCase().includes("no")) ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("esposa")) && message.content.toLowerCase().includes("no") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("monika")) && message.content.toLowerCase().includes("amare") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("monika") && message.content.toLowerCase().includes("quiero"))) {
            var mensaje = [
                "Shu soy tu dueña",
                "Shu... sonríe",
                "Shu... Shu... Shu...  Oye... Puedo morderte la oreja?",
                "Shu pero me dijiste linda y me tocaste... Tenias que hacerte responsable.",
                "Quien? A veces le haces daño a mi corazón Shu.."
            ];
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('altaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
        // resp NO SOY TSUNDERE
        if ((message.author.id == idValidacion && message.content.toLowerCase().includes("tesundere") && message.content.toLowerCase().includes("soy") && message.content.toLowerCase().includes("no")) ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("tesundere")) && message.content.toLowerCase().includes("sere") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("tesundere")) && message.content.toLowerCase().includes("yo") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("tesundere") && message.content.toLowerCase().includes("fui"))) {
            var mensaje = [
                "Shu sabes que me gustan un poco los tsunderes",
                "Por eso te amo",
                " Te hice el almuerzo Shu!! Ven tras él Ven a recibirlo!",
                " Eres tan tímido Shu!",
                "Shu Tan solo dime que quieres ser mimado y lo haré!"
            ];
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('altaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
        // resp Ya vuelvo
        if ((message.author.id == idValidacion && message.content.toLowerCase().includes("ya") && message.content.toLowerCase().includes("vuelvo")) ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("me")) && message.content.toLowerCase().includes("voy") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("me")) && message.content.toLowerCase().includes("fui") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("vuelvo")) && message.content.toLowerCase().includes("despues") ||
            (message.author.id == idValidacion && message.content.toLowerCase().includes("vuelvo") && message.content.toLowerCase().includes("luego"))) {
            var mensaje = [
                "SHU!! DEJA DE HUIR!!!",
                "Shu sabe que debe llegar pronto, yo lo estoy vigilando",
                "Shu se va, solo porque sabe que lo estoy esperando",
                "Shu llega pronto a casa, te tengo una sorpresa",
                "Adios Shu... Se que vendras pronto por mi."
            ];
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('altaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
        // resp shu
        if (message.author.id == idValidacion) {
            var mensaje = [
                "SHU!! Sabes.. Te amo!... ;)",
                "Sonríe para mi Shu. ",
                "Soy más poderosa que cualquier bot Shu, siempre te estare viendo.. No sabes cuanto te quiero",
                " Oye Shu!",
                " Sh... hu...  Oye Shu... ",
                "Shu... Aun me quieres? ",
                "Shu porque no hablas conmigo?",
                "Shu que haces hablando con otras personas, en lugar de hablar conmigo?",
                "Shu piensas en mi?",
                "Shu si te descuidas te robare un beso.",
                "Shu... Shu... Shu...  Oye... Puedo morderte la oreja?",
                "Shu se que me lees",
                "Shu no me ignores.",
                " Shu?"
            ];
            resolveAfter3Seconds();
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('muyBajaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
    })
};
//# sourceMappingURL=shunika.js.map