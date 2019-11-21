export class Timer {
    type: string;
    private _expiration: number;
    private _id: number;
    
    public get expirationLeft() : number {
        return this._expiration;
    }

    
    public get id() : number {
        return this._id;
    }
    
    constructor(id: number, expiration: number) {
        this._id = id;
        this._expiration = expiration;
        
    }

    /**
     * test
     */
    public test(id: number, str : string) {
        
    }
}