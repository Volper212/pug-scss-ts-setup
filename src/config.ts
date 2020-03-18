import { existsSync } from 'fs-extra';

import { MinifyOptions } from 'terser';
import { Options as PugOptions, LocalsObject } from 'pug';
import { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import { Plugin } from 'rollup';

import { premade } from './premade';

export const configFile = 'psst-config.js';

export interface Config {
  files: string[];
  scripts: string[];
  output?: string;
  pugLocals?: PugOptions & LocalsObject;
  minifyOptions?: MinifyOptions;
  typescriptOptions?: RollupTypescriptOptions;
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
  minifyOptions,
  typescriptOptions,
  rollupPlugins
} = getConfig();
