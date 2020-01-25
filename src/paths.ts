import { output } from './config';

export const src = 'src';
export const dist = output || 'dist';

export const srcFolders = {
  scripts: `${src}/ts`,
  images: `${src}/img`,
  style: `${src}/style`,
  pug: `${src}/pug`,
  other: `${src}/other`
};
export const distFolders = {
  scripts: `${dist}/js`,
  images: `${dist}/img`,
  html: dist,
  other: dist
};
