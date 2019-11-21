"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let db = require('megadb');
function crearDB(name, folder, subDir) {
    return new db.crearDB(name, folder, subDir);
}
exports.crearDB = crearDB;
function memoDB(name) {
    return new db.memoDB(name);
}
exports.memoDB = memoDB;
//# sourceMappingURL=MegaDbInterop.js.map