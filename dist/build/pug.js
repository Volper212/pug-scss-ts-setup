"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importStar(require("path"));
const pug_1 = require("pug");
const fs_extra_1 = require("fs-extra");
const postcss_1 = __importDefault(require("postcss"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const sass_1 = require("sass");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const paths_1 = require("../paths");
const logger_1 = require("../logger");
const config_1 = __importDefault(require("../config"));
const utility_1 = require("../utility");
async function pug() {
    const plugins = [autoprefixer_1.default];
    const sassProcessor = postcss_1.default(plugins);
    /** Use this when importing Sass (SCSS) inside Pug.
     * @example
     * ```pug
     * //- _template.pug
     * mixin scss(name)
     *   !{compileSass(name)}
     * ```
     */
    function compileSass(file) {
        return sassProcessor.process(sass_1.renderSync({
            data: `@use '${paths_1.srcFolders.style}/${file}'`,
            outputStyle: 'compressed'
        }).css).css;
    }
    const { pugLocals } = await config_1.default();
    await Promise.all((await recursive_readdir_1.default(paths_1.srcFolders.pug, ['_*.pug'])).map(file => fs_extra_1.outputFile(`${paths_1.distFolders.html}/${utility_1.removeExtension(path_1.relative(paths_1.srcFolders.pug, file))}.html`, pug_1.renderFile(file, {
        basedir: paths_1.srcFolders.pug,
        path: path_1.default,
        compileSass,
        ...pugLocals // Other options from the config file
    }))));
    logger_1.log('Pug and Sass built!');
}
exports.default = pug;
