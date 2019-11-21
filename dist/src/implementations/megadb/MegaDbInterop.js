"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let db = require('megadb');
function crearDB(name, folder, subDir) {
    return new db.crearDB(name, folder, subDir);
}
exports.crearDB = crearDB;
//# sourceMappingURL=MegaDbInterop.js.map