"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMoniCommand_1 = require("../../interfaces/moniframework/IMoniCommand");
const discord_js_1 = require("discord.js");
const Monika_1 = require("../../implementations/moniframework/Monika");
class Help extends IMoniCommand_1.IMoniCommand {
    constructor() {
        super(...arguments);
        this.alias = [];
        this.description = "Muestra la ayuda";
        this.name = "help";
    }
    buildHelpMessage(template) {
        template.setTitle('Ayuda');
    }
    run(message, content) {
        let template = new discord_js_1.RichEmbed()
            .setAuthor(super.client.user.username, super.client.user.avatarURL)
            .setColor(0xff9626)
            .setTimestamp();
        let command;
        let errorMsg = undefined;
        if (content !== undefined && content.length > 0) {
            let mon = new Monika_1.Monika();
            command = mon.getCommand(content);
            if (command === undefined) {
                command = this;
                errorMsg = 'Ese comando no existe.';
            }
        }
        else {
            command = this;
        }
        command.buildHelpMessage(template);
        if (errorMsg !== undefined)
            message.channel.send(errorMsg);
        message.channel.send({ template });
    }
}
//# sourceMappingURL=Help.js.map