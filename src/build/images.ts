import imagemin from 'imagemin-keep-folder';
import webp from 'imagemin-webp';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import { relative } from 'path';

import { srcFolders, distFolders } from '../paths';
import { log } from '../logger';

export default async function images(): Promise<void> {
  const webpPlugins = [webp()];
  const jpgPngPlugins = [mozjpeg(), optipng()];
  const jpgPngInput = [`${srcFolders.images}/**/*.{jpg,png}`];

  function replaceOutputDir(output: string): string {
    return `${distFolders.images}/${relative(srcFolders.images, output)}`;
  }

  await Promise.all([
    // Convert to .webp
    imagemin(jpgPngInput, {
      use: webpPlugins,
      replaceOutputDir
    }),
    // Fallback for browsers that don't support .webp
    // NOTE: You need fallback code inside Sass (Modernizr etc.) or Pug (<picture> element)
    imagemin(jpgPngInput, {
      use: jpgPngPlugins,
      replaceOutputDir
    })
  ]);

  log('Images built!');
}
