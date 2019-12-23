"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagemin_keep_folder_1 = __importDefault(require("imagemin-keep-folder"));
const imagemin_webp_1 = __importDefault(require("imagemin-webp"));
const imagemin_mozjpeg_1 = __importDefault(require("imagemin-mozjpeg"));
const imagemin_optipng_1 = __importDefault(require("imagemin-optipng"));
const path_1 = require("path");
const paths_1 = require("../paths");
const logger_1 = require("../logger");
async function images() {
    const webpPlugins = [imagemin_webp_1.default()];
    const jpgPngPlugins = [imagemin_mozjpeg_1.default(), imagemin_optipng_1.default()];
    const jpgPngInput = [`${paths_1.srcFolders.images}/**/*.{jpg,png}`];
    function replaceOutputDir(output) {
        return `${paths_1.distFolders.images}/${path_1.relative(paths_1.srcFolders.images, output)}`;
    }
    await Promise.all([
        // Convert to .webp
        imagemin_keep_folder_1.default(jpgPngInput, {
            use: webpPlugins,
            replaceOutputDir
        }),
        // Fallback for browsers that don't support .webp
        // NOTE: You need fallback code inside Sass (Modernizr etc.) or Pug (<picture> element)
        imagemin_keep_folder_1.default(jpgPngInput, {
            use: jpgPngPlugins,
            replaceOutputDir
        })
    ]);
    logger_1.log('Images built!');
}
exports.default = images;
