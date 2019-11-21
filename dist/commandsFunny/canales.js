const Discord = require('discord.js');
module.exports = {
    name: 'canales_totales',
    alias: [],
    description: '',
    run: (message) => {
        if (message.guild.channels.size <= 0)
            return message.channel.send("No hay canales."); //no es necesario pero por prevencion
        let no_categorias = new Array(); //Aqui se almacenaran los canales que no estan en categorias
        let categorias = new Array(); //Aqui se almacenaran las categorias con sus respectivos canales
        /*
        Con esta funcion(Ordenar) ordenaremos el orden de los canales mediante su posicion, tambien usaremos
        un poco de logica ya que tanto canales de texto como canales de voz no estan ordenados de forma ascendente o descendente
        ya que ambos toman como punto principal la posicion 0 ignorando las posiciones de los otros canales.
        Ejemplo:
     
        1) cana1_texto_1 = posicion 0
        2) canal_voz_1 = posicion 0
        3) canal_texto_2 = posicion 1
        4) canal_voz_2 = posicion 1
        5) canal_texto_3 = posicion 2
        -etc
       
        Lo que haremos es simple, tan solo ordenaremos las posiciones de los canales de texto y voz por segmentos en el mismo array.
        Resultado:
     
        1) cana1_texto_1 = posicion 0
        2) canal_texto_2 = posicion 1
        3) canal_texto_3 = posicion 2
        4) canal_voz_1 = posicion 0
        5) canal_voz_2 = posicion 1
     
        Esto se aplicara tanto en el array de "no_categorias" y "categorias"
        /*/
        function Ordenar(canal1, canal2) {
            if (canal2.tipo == "voice" && canal1.tipo != "voice")
                return -1;
            return (canal1.tipo != "voice" || canal2.tipo == "voice") ? canal1.posicion - canal2.posicion : 1;
        }
        //Aqui obtenemos unicamente los canales de categorias y lo convertimos a un Objeto con propiedades la cual sera añadida al array "categorias"
        message.guild.channels.filter(f => f.type == "category").array().map(c => categorias.push({ nombre: c.name, parseID: c.id, posicion: c.position, canales: [] }));
        //Aqui obtenemos unicamente los canales que no son categorias
        message.guild.channels.filter(f => f.type != "category").array().map(c => {
            if (c.parent) { //Si el canal iterado le pertenece a una categoria
                let index = categorias.findIndex(h => h.parseID == c.parent.id); //Buscamos el indice en el array "categorias"
                if (index != -1)
                    categorias[index].canales.push({ nombre: c.name, posicion: c.position, tipo: c.type }); //Si lo encuentra, agregamos el canal en su propiedad "canales"
                return;
            }
            no_categorias.push({ nombre: c.name, posicion: c.position, tipo: c.type }); //En el caso de que el canal iterado no pertenezca a ninguna categoria, lo agregamos al array "no_categorias"
        });
        let img_texto = "[💬]"; //Emoji para que se vea bonito (canal_texto)
        let img_categoria = "[🗂]"; //Emoji para que se vea bonito (canal_categorias)
        let img_voz = "[🔊]"; //Emoji para que se vea bonito (canal_voz)
        let texto = ""; //Aqui construiremos la estructura con los datos recaudados
        no_categorias.sort(Ordenar); //Ordenamos primero los canales del array "no_categorias"
        for (var canal of no_categorias)
            texto += canal.tipo == "text" ? `${img_texto} ${canal.nombre}\n` : `${img_voz} ${canal.nombre}\n`;
        if (categorias.length > 0) {
            categorias.sort(Ordenar); //Ordenamos las categorias en caso de que "categorias" contenga elementos
            for (var categoria of categorias) { //Ahora iteramos categoria por categoria del array "categorias"
                texto += `${img_categoria} ${categoria.nombre}\n`;
                categoria.canales.sort(Ordenar); //Ahora ordenamos los canales de la categoria iterada
                for (var canal of categoria.canales)
                    texto += canal.tipo == "text" ? `    ${img_texto} ${canal.nombre}\n` : `    ${img_voz} ${canal.nombre}\n`;
            }
        }
        let embed = new Discord.RichEmbed();
        embed.setColor("#9C9C9C");
        embed.setDescription(texto.length > 0 ? "```" + texto + "```" : "No datos.");
        embed.setFooter(`Estructura del servidor ${message.guild.name}`, message.guild.iconURL);
        embed.setThumbnail(message.guild.iconURL);
        return message.member.send(embed); //Enviamos el embed con la estructura que construimos en la variable "texto"
    }
};
//# sourceMappingURL=canales.js.map