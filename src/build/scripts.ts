import { rollup, watch } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import { srcFolders, distFolders } from '../paths';
import { log } from '../logger';
import {
  scripts,
  typescriptOptions,
  minifyOptions,
  rollupPlugins,
} from '../config';
import { watchMode, dev } from '../cli';

export default async function buildScripts(): Promise<void> {
  if (dev) {
    Object.assign(typescriptOptions, { target: 'es2019' });
  }

  const plugins = [typescript(typescriptOptions), ...(rollupPlugins || [])];

  if (!dev) plugins.push(terser(minifyOptions));

  const watchOptions = scripts.map(
    (file) =>
      ({
        input: `${srcFolders.scripts}/${file}.ts`,
        plugins,
        output: {
          file: `${distFolders.scripts}/${file}.js`,
          format: 'iife',
        },
      } as const)
  );

  if (watchMode) {
    const watcher = watch(watchOptions);
    watcher.on('event', (event) => {
      if (event.code === 'END') log('Scripts built!');
    });
  } else {
    for (const options of watchOptions) {
      await (await rollup(options)).write(options.output);
    }

    log('Scripts built!');
  }
}
