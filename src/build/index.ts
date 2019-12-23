import { log } from '../logger';
import pug from './pug';
import scripts from './scripts';
import images from './images';
import other from './other';

export const buildPug = pug;
export const buildScripts = scripts;
export const buildImages = images;
export const buildOther = other;

export default async function build(): Promise<void> {
  log('Starting build...');

  await Promise.all([
    pug(), // Pug & Sass (SCSS) => minified HTML with internal minified and prefixed CSS
    scripts(), // Typescript => minified and bundled Javascript
    images(), // .jpg, .png => .webp + compressed .jpg, .png
    other() // Other files like .htaccess or favicon.ico
  ]);

  log('Build successful!');
}
