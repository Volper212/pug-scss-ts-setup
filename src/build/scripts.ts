import { rollup } from 'rollup';
import typescript from 'rollup-typescript';
import { uglify } from 'rollup-plugin-uglify';
import { ensureDir } from 'fs-extra';
import { dirname, relative } from 'path';

import { srcFolders, distFolders } from '../paths';
import { log } from '../logger';
import {
  scripts,
  typescriptOptions,
  uglifyOptions,
  rollupPlugins
} from '../config';

export default async function buildScripts(): Promise<void> {
  const plugins = [typescript(typescriptOptions), uglify(uglifyOptions)].concat(
    rollupPlugins
  );

  await Promise.all(
    scripts.map(async file => {
      await ensureDir(
        `${distFolders.scripts}/${relative(srcFolders.images, dirname(file))}`
      );
      const bundle = await rollup({
        input: `${srcFolders.scripts}/${file}.ts`,
        plugins
      });

      return bundle.write({
        file: `${distFolders.scripts}/${file}.js`,
        format: 'iife'
      });
    })
  );

  log('Scripts built!');
}
