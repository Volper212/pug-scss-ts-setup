"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const paths_1 = require("../paths");
function other() {
    return fs_extra_1.copy(paths_1.srcFolders.other, paths_1.distFolders.other);
}
exports.default = other;
