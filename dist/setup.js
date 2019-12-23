"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const logger_1 = require("./logger");
const paths_1 = require("./paths");
const utility_1 = require("./utility");
async function setup(isExample = false) {
    logger_1.log('Starting setup...');
    await Promise.all([
        utility_1.copyForce(`${__dirname}/../${isExample ? 'example' : 'default'}-src`, paths_1.src),
        fs_extra_1.emptyDir(paths_1.dist),
        fs_extra_1.copy(`${__dirname}/../default-config.js`, 'psst-config.js') // Copy default config file
    ]);
    logger_1.log('Setup successful!');
}
exports.default = setup;
