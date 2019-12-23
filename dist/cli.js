#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const build_1 = __importDefault(require("./build"));
const watch_1 = __importDefault(require("./watch"));
const setup_1 = __importDefault(require("./setup"));
const logger_1 = require("./logger");
yargs_1.default
    .command('build', 'Build the entire website', () => void 0, async () => {
    try {
        await build_1.default();
    }
    catch (err) {
        logger_1.error(err);
    }
})
    .command('watch', 'Watch all the file types for changes', () => void 0, async () => {
    try {
        await build_1.default();
        watch_1.default();
    }
    catch (err) {
        logger_1.error(err);
    }
})
    .command('setup', 'Set up the project', () => void 0, async () => {
    try {
        await setup_1.default(false);
    }
    catch (err) {
        logger_1.error(err);
    }
})
    .command('example', 'Set up a project with example files and start working instantly', () => void 0, async () => {
    try {
        await setup_1.default(true);
        await build_1.default();
        watch_1.default();
    }
    catch (err) {
        logger_1.error(err);
    }
})
    .command('instant', 'Set up the project and start working instantly', () => void 0, async () => {
    try {
        await setup_1.default(false);
        await build_1.default();
        watch_1.default();
    }
    catch (err) {
        logger_1.error(err);
    }
})
    .help().argv;
