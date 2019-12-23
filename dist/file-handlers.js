"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const build_1 = require("./build");
const paths_1 = require("./paths");
const utility_1 = require("./utility");
class StyleHandler {
    onEvent() {
        return build_1.buildPug();
    }
    checkPath(path) {
        return path.startsWith(paths_1.srcFolders.style) && path_1.extname(path) === '.scss';
    }
}
exports.StyleHandler = StyleHandler;
/** File handler that has an output in dist */
class FileMapper {
    constructor(srcFolder, distFolder) {
        this.srcFolder = srcFolder;
        this.distFolder = distFolder;
    }
    async onEvent(event, filename) {
        await (event === "update" /* Update */
            ? this.onUpdate(filename)
            : this.onRemove(filename));
        const directory = path_1.dirname(this.getDistPath(filename));
        if (!(await fs_extra_1.readdir(directory)).length) {
            await fs_extra_1.emptyDir(directory);
        }
    }
    checkPath(path) {
        return path.startsWith(this.srcFolder);
    }
    onUpdate(filename) {
        return fs_extra_1.copy(filename, this.getDistPath(filename));
    }
    onRemove(filename) {
        return fs_extra_1.remove(this.getDistPath(filename));
    }
    getDistPath(path) {
        return `${this.distFolder}/${path_1.relative(this.srcFolder, path)}`;
    }
}
exports.FileMapper = FileMapper;
class WebpMapper extends FileMapper {
    constructor() {
        super(paths_1.srcFolders.images, paths_1.distFolders.images);
        this.extensions = ['.jpg', '.png'];
    }
    checkPath(path) {
        return super.checkPath(path) && this.extensions.includes(path_1.extname(path));
    }
    onUpdate() {
        return build_1.buildImages();
    }
    async onRemove(filename) {
        const distPath = this.getDistPath(filename);
        await Promise.all([
            fs_extra_1.remove(distPath),
            fs_extra_1.remove(`${utility_1.removeExtension(distPath)}.webp`)
        ]);
    }
}
exports.WebpMapper = WebpMapper;
/** File mapper that changes its extension */
class ExtensionMapper extends FileMapper {
    constructor(srcFolder, distFolder, srcExtension, distExtension, onUpdate) {
        super(srcFolder, distFolder);
        this.srcExtension = srcExtension;
        this.distExtension = distExtension;
        this.onUpdate = onUpdate;
    }
    checkPath(path) {
        return super.checkPath(path) && path_1.extname(path) === this.srcExtension;
    }
    onRemove(filename) {
        return fs_extra_1.remove(`${this.distFolder}/${utility_1.removeExtension(path_1.relative(this.srcFolder, filename))}${this.distExtension}`);
    }
}
exports.ExtensionMapper = ExtensionMapper;
// The handlers used when watching
// NOTE: Order is important, it means which handlers are checked first
exports.default = [
    new StyleHandler(),
    new WebpMapper(),
    new ExtensionMapper(paths_1.srcFolders.pug, paths_1.distFolders.html, '.pug', '.html', build_1.buildPug),
    new ExtensionMapper(paths_1.srcFolders.scripts, paths_1.distFolders.scripts, '.ts', '.js', build_1.buildScripts),
    new FileMapper(paths_1.srcFolders.images, paths_1.distFolders.images),
    new FileMapper(paths_1.srcFolders.other, paths_1.distFolders.other)
];
