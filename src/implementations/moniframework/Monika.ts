import * as fs from 'fs';
import * as path from 'path';
import { IMoniCommand } from '../../interfaces/moniframework/IMoniCommand'
import { IMoniBehavior } from "../../interfaces/moniframework/IMoniBehavior";
import { Client, TextChannel, User, Emoji, MessageReaction, Message } from 'discord.js'
import { Constants } from "./Constants";
import { Timer } from "../../models/moniframework/Timer";
import { IDbConnection, MegaDB } from "../../interfaces/megadb/IDbConnection";
import * as BotConfig from "../../../config/config.json";

export class Monika {
    constructor() {
        if (MonikaCore.initialized) return;
        MonikaCore.initialized = true;
        MonikaCore.loadCommands();
        MonikaCore.loadBehaviors();
        MonikaCore.loadClient();
    }

    /**
     * Gets the DiscordJS client configured
     */
    get client(): Client {
        return MonikaCore.discordClient;
    }

    /**
     * Reads the file paths under an entire folder, including its subdirectories
     * @param dir: The folder to read
     * @param filter: The filter to apply when reading a file path
     */
    readFolderRecursively(dir: string, filter: string = undefined): string[] {
        return MonikaCore.readFolderRecursively(dir, filter);
    }

    /**
     * Gets a loaded command
     * @param cmd: The command name
     */
    getCommand(cmd: string): IMoniCommand {
        return MonikaCore.commands.has(cmd)
         ? MonikaCore.commands.get(cmd)
         : undefined;
    }

    addTimer(timer: Timer): void {
        // TODO
    }
}

class MonikaCore {
    static commands: Map<string, IMoniCommand> = new Map();
    static behaviors: IMoniBehavior[];
    static discordClient: Client = new Client();
    static initialized: boolean = false;
    static prefixDb: IDbConnection = MegaDB.crearDB('prefix');
    //static timerDb: IDbConnection = MegaDB.crearDB('timers');
    //static timers: Timer[] = [];

    static async loadModules<T extends IMoniBehavior>(dir: string, callback: (mod: T) => void) {
        for (const file of this.readFolderRecursively(dir, '.js', '.ts')) {
            let module = await import(file) as T;
            module.init(this.discordClient);
            callback(module);
        }
    }

    static async loadCommands() {
        this.loadModules<IMoniCommand>('../commands', (module: IMoniCommand) => {
            this.commands.set(module.name, module);
            for (const alias of module.alias) {
                this.commands.set(alias, module);
            }
        });
    }

    static async loadBehaviors() {
        this.loadModules<IMoniBehavior>('../behaviors', (module: IMoniBehavior) => {
            this.behaviors.push(module);
        });
    }

    static loadClient() {
        this.discordClient.on('ready', () => {
            this.discordClient.user.setActivity('criaturas tridimensionales', {
                type: 'WATCHING'
            });
        });

        this.discordClient.on('raw', async e => {
            if (!Constants.Events.hasOwnProperty(e.t)) return;

            const { d: data } = e;
            const user: User = this.discordClient.users.get(data.user_id);
            const channel: TextChannel = (this.discordClient.channels.get(data.channel_id) || (await user.createDM())) as TextChannel;

            if (channel.messages.has(data.message_id)) return;

            const message = await channel.fetchMessage(data.message_id);
            const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
            let reaction: MessageReaction = message.reactions.get(emojiKey);

            if (!reaction) {
                const emoji = new Emoji(this.discordClient.guilds.get(data.guild_id), data.emoji);
                reaction = new MessageReaction(message, emoji, 1, data.user_id === this.discordClient.user.id);
            }
        });

        this.discordClient.on('message', async message => {
            if (message.guild === undefined
                || message.author.id === this.discordClient.user.id
                || message.author == this.discordClient.user
                || this.handleTag(message)) return;

            for (const behavior of this.behaviors) {
                behavior.run(message, message.content);
            }

            let prefix = await this.getPrefix(message);
            let args = message.content.slice(prefix.length).split(/ +/);
            let command = args.shift(); // Command should be case sensitive

            if (!message.content.startsWith(prefix)) return;
            if (this.commands.has(command)) {
                let moniCommand = this.commands.get(command);
                if (moniCommand.enabled) moniCommand.run(message, args.join(' '));
            }
            else message.channel.send('Ara ara... Ese comando no existe');
            
            // TODOs:
            /*
            Filter blacklisted channel (By command)
            Configure blacklist channel (add, remove) (Consider using a command (?))
            Configure prefix (Command)
            */
        });

        this.discordClient.login(process.env.TOKEN);
    }

    static async handleTag(message: Message): Promise<boolean> {
        let result = message.content.includes(this.discordClient.user.id)
            && !message.content.startsWith(await this.getPrefix(message));

        if (result) {
            let tag = [
                `**CALLATE** ${message.author} **NO ME IMPORTA!**`,
                `**NO ME TAGEES** ${message.author} **QUE ME LA SUDA!**`,
                `No quiero hablar ${message.author}, mal rollo ${message.author}, en serio crees que alguien tan inferior como tu puede hablarme?`,
                `${message.author} <:monikaPing:618889335915413525>`
            ];

            message.channel.send(tag[Math.floor(Math.random() * tag.length)]);
        }

        return result;
    }

    static async getPrefix(message: Message): Promise<string> {
        let prefix = BotConfig.prefix;
        if (this.prefixDb.has(message.guild.id.toString())) {
            prefix = await this.prefixDb.get(message.guild.id.toString());
            console.log(`Prefix DB: ${prefix}`);
        }

        return prefix;
    }

    static readFolderRecursively(dir: string, ...filters: string[]): string[] {
        let files: string[] = [];
        fs.readdirSync(dir).forEach(f => {
            if (filters && filters.length > 0
                && !filters.some(filter => f.endsWith(filter))) return;

            let fullPath = path.join(dir, f);
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.readFolderRecursively(fullPath, ...filters);
            } else {
                files.push(fullPath);
            }
        });

        return files;
    }
}