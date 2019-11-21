import { IMoniBehavior } from "./IMoniBehavior";
import { RichEmbed } from "discord.js";

export abstract class IMoniCommand extends IMoniBehavior {
    alias: string[];
    description: string;
    enabled: boolean;
    permission: number;
    abstract buildHelpMessage(template: RichEmbed): void;
    //abstract onTimer(): void;
}