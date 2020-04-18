import { copy, remove } from 'fs-extra';

import { buildPug, buildImages } from './build';
import { srcFolders, distFolders } from './paths';
import { removeExtension } from './utility';

async function webpOnRemove(file: string): Promise<void> {
  const distPath = file.replace(srcFolders.images, distFolders.images);

  await Promise.all([
    remove(distPath),
    remove(`${removeExtension(distPath)}.webp`),
  ]);
}

function makeFileMapper(srcFolder: string, distFolder: string): FileHandler {
  return [
    new RegExp(`^${srcFolder}`),
    (file): Promise<void> => copy(file, file.replace(srcFolder, distFolder)),
    (file): Promise<void> => remove(file.replace(srcFolder, distFolder)),
  ];
}

interface HandleFile {
  (file: string): Promise<void>;
}

type FileHandler = [RegExp, HandleFile, HandleFile?];

const handlers: FileHandler[] = [
  [new RegExp(`^${srcFolders.style}.*\\.scss$`), buildPug],
  [
    new RegExp(`^${srcFolders.images}.*\\.(jpg|png)$`),
    buildImages,
    webpOnRemove,
  ],
  [
    new RegExp(`^${srcFolders.pug}.*\\.pug$`),
    buildPug,
    (file: string): Promise<void> =>
      remove(
        `${removeExtension(
          file.replace(srcFolders.pug, distFolders.html)
        )}.html`
      ),
  ],
  makeFileMapper(srcFolders.images, distFolders.images),
  makeFileMapper(srcFolders.other, distFolders.other),
];

export default handlers;
