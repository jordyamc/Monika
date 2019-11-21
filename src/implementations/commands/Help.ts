import { IMoniCommand } from "../../interfaces/moniframework/IMoniCommand";
import { RichEmbed, Message } from "discord.js";
import { Monika } from "../../implementations/moniframework/Monika";

class Help extends IMoniCommand {
    alias: string[] = [];
    description: string = "Muestra la ayuda";
    name: string = "help";
    enabled: boolean;
    permission: number;

    buildHelpMessage(template: RichEmbed): void {
        template.setTitle('Ayuda')
            
    }

    run(message: Message, content: string): void {
        let template = new RichEmbed()
            .setAuthor(super.client.user.username, super.client.user.avatarURL)
            .setColor(0xff9626)
            .setTimestamp();
            
        let command: IMoniCommand;
        let errorMsg: string = undefined;
        if (content !== undefined && content.length > 0){
            let mon = new Monika();
            command = mon.getCommand(content);
            if (command === undefined) {
                command = this;
                errorMsg = 'Ese comando no existe.';
            }
        } else {
            command = this;
        }

        command.buildHelpMessage(template);
        if (errorMsg !== undefined) message.channel.send(errorMsg);
        message.channel.send({template});
    }
}