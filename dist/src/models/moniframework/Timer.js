"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(expiration, cmd, callback, ...args) {
        this._expiration = expiration;
        this._name = cmd.name;
        this._type = callback.name;
        this._args = args;
    }
    get expiration() {
        return this._expiration;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get args() {
        return this._args;
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map