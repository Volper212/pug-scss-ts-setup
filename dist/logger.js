"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_logging_1 = __importDefault(require("better-logging"));
const betterConsole = { ...console };
better_logging_1.default(betterConsole);
exports.debug = betterConsole.debug, exports.info = betterConsole.info, exports.log = betterConsole.log, exports.warn = betterConsole.warn;
function error(err) {
    betterConsole.error('');
    throw err;
}
exports.error = error;
