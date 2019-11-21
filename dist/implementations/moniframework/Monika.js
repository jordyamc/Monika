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
//import * as botconfig from "../../../config/config.json";
class Monika {
    constructor() {
        if (MonikaCore.initialized)
            return;
        MonikaCore.initialized = true;
        MonikaCore.loadCommands();
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
}
exports.Monika = Monika;
class MonikaCore {
    static loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            let dir = '../commands';
            for (const command of this.readFolderRecursively(dir, '.js', '.ts')) {
                let module = yield Promise.resolve().then(() => __importStar(require(command)));
                module.init(this.discordClient);
                this.commands.set(module.name, module);
                for (const alias of module.alias) {
                    this.commands.set(alias, module);
                }
            }
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
                || message.author == this.discordClient.user)
                return;
            let prefix = '/';
            // TODOs:
            /*
            Configure prefix (Command)
            Parse commands
            Selftag behavior
            Configure blacklist channel (add, remove and filter) (Consider using a command (?))
            Invoke behaviors
            Invoke commands
            */
        }));
        this.discordClient.login(process.env.TOKEN);
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