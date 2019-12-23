"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default function getConfig(): Promise<{
//   files: string[];
//   scripts: string[];
//   pugOptions: {
//     [key: string]: unknown;
//   };
//   uglifyOptions: MinifyOptions;
// }> => {
//   return import(`${process.cwd()}/psst-config.js`);
// };
exports.default = Promise.resolve().then(() => __importStar(require(`${process.cwd()}/psst-config.js`)));
