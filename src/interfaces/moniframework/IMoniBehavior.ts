import { Client, Message } from 'discord.js'

export abstract class IMoniBehavior {
    protected client: Client;
    name: string;

    init(client: Client) : void{
        this.client = client;
    }

    abstract run(message: Message, content: string) : void;
}