import path, { relative } from 'path';
import { renderFile as renderPug } from 'pug';
import { outputFile } from 'fs-extra';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { renderSync as renderSass } from 'sass';
import readdir from 'recursive-readdir';

import { srcFolders, distFolders } from '../paths';
import { log } from '../logger';
import { pugLocals } from '../config';
import { removeExtension } from '../utility';

export default async function buildPug(): Promise<void> {
  const plugins = [autoprefixer];
  const sassProcessor = postcss(plugins);

  /** Use this when importing Sass (SCSS) inside Pug.
   * @example
   * ```pug
   * //- _template.pug
   * mixin scss(name)
   *   !{compileSass(name)}
   * ```
   */
  function compileSass(file: string): string {
    return sassProcessor.process(
      renderSass({
        data: `@use '${srcFolders.style}/${file}'`,
        outputStyle: 'compressed'
      }).css
    ).css;
  }

  await Promise.all(
    (await readdir(srcFolders.pug, ['_*.pug'])).map(file =>
      outputFile(
        `${distFolders.html}/${removeExtension(
          relative(srcFolders.pug, file)
        )}.html`,
        renderPug(file, {
          basedir: srcFolders.pug,
          path,
          compileSass,
          ...pugLocals // Other options from the config file
        })
      )
    )
  );

  log('Pug and Sass built!');
}
