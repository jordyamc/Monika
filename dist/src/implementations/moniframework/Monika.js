"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const discord_js_1 = require("discord.js");
const Constants_1 = require("./Constants");
const IDbConnection_1 = require("../../interfaces/megadb/IDbConnection");
const BotConfig = __importStar(require("../../../config/config.json"));
class Monika {
    constructor() {
        if (MonikaCore.initialized)
            return;
        MonikaCore.initialized = true;
        MonikaCore.loadCommands();
        MonikaCore.loadBehaviors();
        MonikaCore.loadClient();
    }
    /**
     * Gets the DiscordJS client configured
     */
    get client() {
        return MonikaCore.discordClient;
    }
    /**
     * Reads the file paths under an entire folder, including its subdirectories
     * @param dir: The folder to read
     * @param filter: The filter to apply when reading a file path
     */
    readFolderRecursively(dir, filter = undefined) {
        return MonikaCore.readFolderRecursively(dir, filter);
    }
    /**
     * Gets a loaded command
     * @param cmd: The command name
     */
    getCommand(cmd) {
        return MonikaCore.commands.has(cmd)
            ? MonikaCore.commands.get(cmd)
            : undefined;
    }
    addTimer(timer) {
        // TODO
    }
}
exports.Monika = Monika;
class MonikaCore {
    //static timerDb: IDbConnection = MegaDB.crearDB('timers');
    //static timers: Timer[] = [];
    static loadModules(dir, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of this.readFolderRecursively(dir, '.js', '.ts')) {
                let module = yield Promise.resolve().then(() => __importStar(require(file)));
                module.init(this.discordClient);
                callback(module);
            }
        });
    }
    static loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadModules('../commands', (module) => {
                this.commands.set(module.name, module);
                for (const alias of module.alias) {
                    this.commands.set(alias, module);
                }
            });
        });
    }
    static loadBehaviors() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadModules('../behaviors', (module) => {
                this.behaviors.push(module);
            });
        });
    }
    static loadClient() {
        this.discordClient.on('ready', () => {
            this.discordClient.user.setActivity('criaturas tridimensionales', {
                type: 'WATCHING'
            });
        });
        this.discordClient.on('raw', (e) => __awaiter(this, void 0, void 0, function* () {
            if (!Constants_1.Constants.Events.hasOwnProperty(e.t))
                return;
            const { d: data } = e;
            const user = this.discordClient.users.get(data.user_id);
            const channel = (this.discordClient.channels.get(data.channel_id) || (yield user.createDM()));
            if (channel.messages.has(data.message_id))
                return;
            const message = yield channel.fetchMessage(data.message_id);
            const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
            let reaction = message.reactions.get(emojiKey);
            if (!reaction) {
                const emoji = new discord_js_1.Emoji(this.discordClient.guilds.get(data.guild_id), data.emoji);
                reaction = new discord_js_1.MessageReaction(message, emoji, 1, data.user_id === this.discordClient.user.id);
            }
        }));
        this.discordClient.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            if (message.guild === undefined
                || message.author.id === this.discordClient.user.id
                || message.author == this.discordClient.user
                || this.handleTag(message))
                return;
            for (const behavior of this.behaviors) {
                behavior.run(message, message.content);
            }
            let prefix = yield this.getPrefix(message);
            let args = message.content.slice(prefix.length).split(/ +/);
            let command = args.shift(); // Command should be case sensitive
            if (!message.content.startsWith(prefix))
                return;
            if (this.commands.has(command)) {
                let moniCommand = this.commands.get(command);
                if (moniCommand.enabled)
                    moniCommand.run(message, args.join(' '));
            }
            else
                message.channel.send('Ara ara... Ese comando no existe');
            // TODOs:
            /*
            Filter blacklisted channel (By command)
            Configure blacklist channel (add, remove) (Consider using a command (?))
            Configure prefix (Command)
            */
        }));
        this.discordClient.login(process.env.TOKEN);
    }
    static handleTag(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = message.content.includes(this.discordClient.user.id)
                && !message.content.startsWith(yield this.getPrefix(message));
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
        });
    }
    static getPrefix(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let prefix = BotConfig.prefix;
            if (this.prefixDb.has(message.guild.id.toString())) {
                prefix = yield this.prefixDb.get(message.guild.id.toString());
                console.log(`Prefix DB: ${prefix}`);
            }
            return prefix;
        });
    }
    static readFolderRecursively(dir, ...filters) {
        let files = [];
        fs.readdirSync(dir).forEach(f => {
            if (filters && filters.length > 0
                && !filters.some(filter => f.endsWith(filter)))
                return;
            let fullPath = path.join(dir, f);
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.readFolderRecursively(fullPath, ...filters);
            }
            else {
                files.push(fullPath);
            }
        });
        return files;
    }
}
MonikaCore.commands = new Map();
MonikaCore.discordClient = new discord_js_1.Client();
MonikaCore.initialized = false;
MonikaCore.prefixDb = IDbConnection_1.MegaDB.crearDB('prefix');
//# sourceMappingURL=Monika.js.map