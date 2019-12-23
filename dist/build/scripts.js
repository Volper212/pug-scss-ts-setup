"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
const rollup_typescript_1 = __importDefault(require("rollup-typescript"));
const rollup_plugin_uglify_1 = require("rollup-plugin-uglify");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const paths_1 = require("../paths");
const logger_1 = require("../logger");
const config_1 = __importDefault(require("../config"));
async function scripts() {
    const { scripts, uglifyOptions, typescriptOptions } = await config_1.default();
    const plugins = [rollup_typescript_1.default(typescriptOptions), rollup_plugin_uglify_1.uglify(uglifyOptions)];
    await Promise.all(scripts.map(async (file) => {
        await fs_extra_1.ensureDir(`${paths_1.distFolders.scripts}/${path_1.relative(paths_1.srcFolders.images, path_1.dirname(file))}`);
        const bundle = await rollup_1.rollup({
            input: `${paths_1.srcFolders.scripts}/${file}.ts`,
            plugins
        });
        return bundle.write({
            file: `${paths_1.distFolders.scripts}/${file}.js`,
            format: 'iife'
        });
    }));
    logger_1.log('Scripts built!');
}
exports.default = scripts;
