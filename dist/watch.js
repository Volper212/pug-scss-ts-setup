"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_watch_1 = __importDefault(require("node-watch"));
const paths_1 = require("./paths");
const logger_1 = require("./logger");
const file_handlers_1 = __importDefault(require("./file-handlers"));
function watch() {
    node_watch_1.default(paths_1.src, { recursive: true }, async (event, filename) => {
        try {
            for (const handler of file_handlers_1.default) {
                if (handler.checkPath(filename)) {
                    return await handler.onEvent(event, filename);
                }
            }
        }
        catch (err) {
            logger_1.error(err);
        }
    });
    logger_1.log('Watching!');
}
exports.default = watch;
