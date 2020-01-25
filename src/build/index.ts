import { log } from '../logger';
import buildPug from './pug';
import buildScripts from './scripts';
import buildImages from './images';
import buildOther from './other';

export { buildPug, buildScripts, buildImages, buildOther };

export default async function build(): Promise<void> {
  log('Starting build...');

  await Promise.all([
    buildPug(), // Pug & Sass (SCSS) => minified HTML with internal minified and prefixed CSS
    buildScripts(), // Typescript => minified and bundled Javascript
    buildImages(), // .jpg, .png => .webp + compressed .jpg, .png
    buildOther() // Other files like .htaccess or favicon.ico
  ]);

  log('Build successful!');
}
