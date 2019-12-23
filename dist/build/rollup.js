"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
const rollup_typescript_1 = __importDefault(require("rollup-typescript"));
const rollup_plugin_uglify_1 = require("rollup-plugin-uglify");
const paths_1 = require("../paths");
const logger_1 = require("../logger");
const config_1 = __importDefault(require("../config"));
async function build() {
    const { scripts, uglifyOptions } = await config_1.default;
    const plugins = [rollup_typescript_1.default(), rollup_plugin_uglify_1.uglify(uglifyOptions)];
    await Promise.all(scripts.map(async (file) => {
        const bundle = await rollup_1.rollup({
            input: `${paths_1.srcPaths.scripts}/${file}.ts`,
            plugins
        });
        return bundle.write({
            file: `${paths_1.distPaths.scripts}/${file}.js`,
            format: 'iife'
        });
    }));
    logger_1.log('Scripts built!');
}
exports.default = build;
