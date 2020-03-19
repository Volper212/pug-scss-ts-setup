import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { ensureDir } from 'fs-extra';
import { dirname, relative } from 'path';

import { srcFolders, distFolders } from '../paths';
import { log } from '../logger';
import {
  scripts,
  typescriptOptions,
  minifyOptions,
  rollupPlugins
} from '../config';
import { dev } from '../cli';

export default async function buildScripts(): Promise<void> {
  const plugins = [typescript(typescriptOptions), ...rollupPlugins || []];
  if (!dev) {
    plugins.push(terser(minifyOptions));
  }

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
