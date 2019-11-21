import * as megaDb from '../../implementations/megadb/MegaDbInterop.js'

export namespace MegaDB {
    export function crearDB(name: string, dir?: string): IDbConnection {
        return megaDb.crearDB(name, dir);
    }
}

export interface IDbConnection{
    establecer<T>(key: string, value: T, keySplit?: string): Promise<T>;
    set<T>(key: string, value: T, keySplit?: string): Promise<T>;

    size() : number;

    obtener<T>(key: string, keySplit?: string): Promise<T>;
    get<T>(key: string, keySplit?: string): Promise<T>;

    tiene(key: string, keySplit?: string): Promise<boolean>;
    has(key: string, keySplit?: string): Promise<boolean>;

    eliminar(key: string, keySplit?: string): boolean;
    delete(key: string, keySplit?: string): boolean;

    datos<T>(): Promise<T>;

    push<T>(key: string, value: T, keySplit?: string): Promise<T[]>;
    extract<T>(key: string, value: T, keySplit?: string): Promise<T[]>;

    sumar(key: string, value: number, keySplit?: string): Promise<number>;
    add(key: string, value: number, keySplit?: string): Promise<number>;

    restar(key: string, value: number, keySplit?: string): Promise<number>;
    subtract(key: string, value: number, keySplit?: string): Promise<number>;

    keys(key?: string, keySplit?: string): Promise<string[]>;
    values<T>(key?: string, keySplit?: string): Promise<T[]>;

    purgeall(): boolean;

    ordenar(key: any, value: any, keySplit?: string): Promise<any[]>;
    sort(key: any, value: any, keySplit?: string): Promise<any[]>;

    random(key: any, quantity: number, keySplit?: string): Promise<any[]>;

    existeDB(dbName: string): boolean;
    
    find<T>(key: any,
        callback: (currentValue: any, currentKey: string) => boolean,
        keySplit?: string): Promise<T>;
    filter(key: any,
        callback: (currentValue: any, currentKey: string) => boolean,
        keySplit?: string): Promise<any>;
    map<T>(key: any,
        callback: (currentValue: any, currentKey: string) => T,
        keySplit?: string): Promise<T[]>;
    some(key: any,
        callback: (currentValue: any, currentKey: string) => boolean,
        keySplit?: string): boolean;
    setIndex<T>(key: string, index: number, value: T, keySplit?: string): Promise<T[]>;
    delIndex<T>(key: string, index: number, keySplit?: string): Promise<T[]>;
}