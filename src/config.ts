import { existsSync } from 'fs-extra';

import { MinifyOptions } from 'uglify-js';
import { Options as PugOptions, LocalsObject } from 'pug';
import { Options as TypescriptOptions } from 'rollup-typescript';
import { Plugin } from 'rollup';

import { premade } from './premade';

export const configFile = 'psst-config.js';

export interface Config {
  files: string[];
  scripts: string[];
  output?: string;
  pugLocals?: PugOptions & LocalsObject;
  uglifyOptions?: MinifyOptions;
  typescriptOptions?: TypescriptOptions;
  rollupPlugins?: Plugin[];
}

function getConfig(): Config {
  return require(existsSync(configFile)
    ? `${process.cwd()}/${configFile}`
    : premade.configFile);
}

export const {
  files,
  scripts,
  output,
  pugLocals,
  uglifyOptions,
  typescriptOptions,
  rollupPlugins
} = getConfig();
