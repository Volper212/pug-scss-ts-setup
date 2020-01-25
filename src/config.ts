import { MinifyOptions } from 'uglify-js';
import { Options as PugOptions, LocalsObject } from 'pug';
import { Options as TypescriptOptions } from 'rollup-typescript';

export const {
  files,
  scripts,
  output,
  pugLocals,
  uglifyOptions,
  typescriptOptions
} = require(`${process.cwd()}/psst-config.js`) as {
  files: string[];
  scripts: string[];
  output?: string;
  pugLocals?: PugOptions & LocalsObject;
  uglifyOptions?: MinifyOptions;
  typescriptOptions?: TypescriptOptions;
};
