let db = require('megadb');

export function crearDB(name, folder, subDir) {
    return new db.crearDB(name, folder, subDir)
}