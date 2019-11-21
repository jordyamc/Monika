"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Monika {
    static loadCommands() {
        let dir = '../commands';
    }
    static readFolderRecursively(dir) {
        fs.readdirSync(dir).forEach(f => {
            let fullPath = path.join(dir, f);
            if (fs.lstatSync(fullPath).isDirectory()) {
            }
        });
        return undefined;
    }
}
exports.Monika = Monika;
//# sourceMappingURL=monika.js.map