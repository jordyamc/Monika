"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const megaDb = __importStar(require("../../implementations/megadb/MegaDbInterop.js"));
var MegaDB;
(function (MegaDB) {
    function crearDB(name, dir) {
        return megaDb.crearDB(name, dir);
    }
    MegaDB.crearDB = crearDB;
})(MegaDB = exports.MegaDB || (exports.MegaDB = {}));
//# sourceMappingURL=IDbConnection.js.map