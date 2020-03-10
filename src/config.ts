import { existsSync } from 'fs-extra';

import type { MinifyOptions } from 'terser';
import type { Options as PugOptions, LocalsObject } from 'pug';
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import type { Plugin } from 'rollup';

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
