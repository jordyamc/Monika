"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(id, expiration) {
        this._id = id;
        this._expiration = expiration;
    }
    get expirationLeft() {
        return this._expiration;
    }
    get id() {
        return this._id;
    }
    /**
     * test
     */
    test(id, str) {
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timers.js.map