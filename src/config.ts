import { MinifyOptions } from 'uglify-js';
import { Options as PugOptions, LocalsObject } from 'pug';
import { Options as TypescriptOptions } from 'rollup-typescript';

export default function getConfig(): Promise<{
  files: string[];
  scripts: string[];
  pugLocals: PugOptions & LocalsObject;
  uglifyOptions: MinifyOptions;
  typescriptOptions: TypescriptOptions;
}> {
  return import(`${process.cwd()}/psst-config.js`);
}
