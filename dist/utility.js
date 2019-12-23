"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const trash_1 = __importDefault(require("trash"));
const logger_1 = require("./logger");
function removeExtension(filename) {
    return filename.substr(0, filename.lastIndexOf('.'));
}
exports.removeExtension = removeExtension;
async function copyForce(dir, dest) {
    if (fs_extra_1.existsSync(dest)) {
        logger_1.warn(`Old ${dest} directory is being moved to trash...`);
        await trash_1.default(dest);
    }
    return fs_extra_1.copy(dir, dest);
}
exports.copyForce = copyForce;
