"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const pug_1 = __importDefault(require("./pug"));
const scripts_1 = __importDefault(require("./scripts"));
const images_1 = __importDefault(require("./images"));
const other_1 = __importDefault(require("./other"));
exports.buildPug = pug_1.default;
exports.buildScripts = scripts_1.default;
exports.buildImages = images_1.default;
exports.buildOther = other_1.default;
async function build() {
    logger_1.log('Starting build...');
    await Promise.all([
        pug_1.default(),
        scripts_1.default(),
        images_1.default(),
        other_1.default() // Other files like .htaccess or favicon.ico
    ]);
    logger_1.log('Build successful!');
}
exports.default = build;
