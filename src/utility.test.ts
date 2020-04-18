import {
  mkdir,
  existsSync,
  readFile,
  outputFile,
  remove,
  readdir,
} from 'fs-extra';

import { removeExtension, copyForce } from './utility';

describe('removeExtension()', () => {
  it('removes extension from files that have one', () => {
    expect(removeExtension('folder/file.txt')).toBe('folder/file');
  });
});

describe('copyForce()', () => {
  beforeAll(async () => {
    await mkdir('fs-tests');
    process.chdir('fs-tests');

    await Promise.all([
      outputFile('src/foo.txt', 'Test'),
      outputFile('existing/foo.txt', 'Should be deleted'),
      outputFile('existing/bar.txt', 'Should be deleted'),
    ]);

    await Promise.all([copyForce('src', 'existing'), copyForce('src', 'new')]);
  });

  afterAll(async () => {
    process.chdir('..');
    await remove('fs-tests');
  });

  it('copies files to an existing destination folder', async () => {
    expect(await readFile('existing/foo.txt', 'utf8')).toBe('Test');
  });

  it('removes existing files in the destination folder', () => {
    expect(existsSync('existing/bar.txt')).toBe(false);
  });

  it('makes sure the destination folder is the same as the source one', async () => {
    const dirContents = await Promise.all(
      ['src', 'existing', 'new'].map((dir) => readdir(dir))
    );
    for (const dirContent of dirContents) {
      expect(dirContent).toStrictEqual(dirContents[0]);
    }
  });
});
