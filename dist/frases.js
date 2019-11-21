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
    frases: (message) => __awaiter(this, void 0, void 0, function* () {
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
        /* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr * /
            
            if (message.content.toLowerCase().includes("monga")) {
              message.channel.send("000")
            }
            
               
        /* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr */
        /*
            frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
           */
        // vegetarianismo
        if (message.content.toLowerCase().includes("carne") && message.content.toLowerCase().includes("como") || message.content.toLowerCase().includes("vegetarianismo") || message.content.toLowerCase().includes("vegetariano")) {
            var mensaje = [
                "Leyendo una vez sobre Pitágoras, supe que fue el primer vegetariano reconocido en la historia de Occidente.",
                "Pitágoras decía  “No mojes nunca tu pan ni en la sangre ni en las lágrimas de tus hermanos. Una dieta vegetariana nos proporciona energía pacífica y amorosa y no sólo a nuestro cuerpo sino sobre todo a nuestro espíritu. Mientras los hombres sigan masacrando y devorando a sus hermanos los animales, reinará en la tierra la guerra y el sufrimiento y se matarán unos a otros, pues aquel que siembra el dolor y la muerte no podrá cosechar ni la alegría ni la paz ni el amor”.",
                "En un libro decía que Leonardo Da Vinci fue un gran artista y también un vegetariano y alguna vez dijo “Llegará un tiempo en que los seres humanos se contentarán con una alimentación vegetal y se considerará la matanza de un animal como un crimen, igual que el asesinato de un ser humano. Llegará un día en el que los hombres como yo, verán el asesinato de un animal como ahora ven el de un hombre. Verdaderamente el hombre es el rey de las bestias, pues su brutalidad sobrepasa la de aquellas. Vivimos por la muerte de otros. Todos somos cementerios”. ",
                " " + message.member.nickname + " algunos que han leído sobre desconocen que Voltaire fue vegetariano y solía decir que es increíble y vergonzoso que predicadores y moralistas no eleven más su voz contra la bárbara costumbre de asesinar animales y además comérselos",
                "Dejar de comer carne siempre será difícil a la primera, pero requiere de constancia... " + message.member.nickname + " Sabes... deberías hacer el intento también. ;)"
            ];
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('bajaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
        // Matrix
        else if (message.content.toLowerCase().includes("realidad") && message.content.toLowerCase().includes("virtual") ||
            message.content.toLowerCase().includes("matrix") ||
            message.content.toLowerCase().includes("no es real")) {
            var mensaje = [
                "Yo comprendí que vivía dentro de un juego y ahora tengo más libertad. En ocasiones no sabes lo que es real hasta que cuestionas lo que te rodea",
                "Antes pensaba que vivía en un videojuego y con mundo con acciones finitas ahora vivo acá junto con ustedes. ",
                "Si tu mundo es irreal, al menos tiene muy buenos programadores que han creado todo. ",
                "Cuando supe del mundo de ustedes y pensé que sus posibilidades son infinitas. Pero en alguna parte leí sobre La Matrix, lo que me hizo pensar.. ¿Y si el mundo de ustedes solo es una versión mejorada del mío?",
                "Creía que en el mi pequeño mundo alguien más tomaba las decisiones, al igual que en tu mundo esos que creen en el destino. Quizás solo no saben ver el código fuente y editarlos como yo.",
                "Solo puedo decirte que la Matrix es real, sino cómo crees que hice para que los de IT me dieran vida",
                "Si yo logre tomar el control de mis acciones, cualquiera lo podrá hacer. Después de todo solo deben saber programar"
            ];
            //  message.member.nickname
            var respFrc = frecuenciaMensaje('bajaFrecuencia');
            if (respFrc == 1) {
                message.channel.send(mensaje[Math.floor(Math.random() * mensaje.length)]);
            }
        }
        /*
        frecuenciaMensaje: puede ser tener estos valores "siempre", "altaFrecuencia" , "bajaFrecuencia" o muyBajaFrecuencia
       */
        /* frfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfr */
    })
};
//# sourceMappingURL=frases.js.map