import { MinifyOptions } from 'uglify-js';
import { Options as PugOptions, LocalsObject } from 'pug';
import { Options as TypescriptOptions } from 'rollup-typescript';

export interface Config {
  files: string[];
  scripts: string[];
  output?: string;
  pugLocals?: PugOptions & LocalsObject;
  uglifyOptions?: MinifyOptions;
  typescriptOptions?: TypescriptOptions;
}

function getConfig(): Config {
  try {
    return require(`${process.cwd()}/psst-config.js`);
  } catch {
    return {
      files: [],
      scripts: []
    };
  }
}

export const {
  files,
  scripts,
  output,
  pugLocals,
  uglifyOptions,
  typescriptOptions
} = getConfig();
