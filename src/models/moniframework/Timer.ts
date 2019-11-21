import { IMoniCommand } from "../../interfaces/moniframework/IMoniCommand";

export class Timer {
    private _expiration: number;
    private _name: string;
    private _type: string;
    private _args: any[];

    
    public get expiration() : number {
        return this._expiration;
    }
    
    
    public get name() : string {
        return this._name;
    }
    
    
    public get type() : string {
        return this._type;
    }
    
    public get args() : any[] {
        return this._args;
    }
    

    constructor(expiration: number, cmd: IMoniCommand, callback: Function, ...args: any[]) {
        this._expiration = expiration;
        this._name = cmd.name;
        this._type = callback.name;
        this._args = args;
    }
}