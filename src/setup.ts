import { emptyDir, copy, ensureDir } from 'fs-extra';

import { log } from './logger';
import { src, dist, configFile, premade, srcFolders } from './paths';
import { copyForce } from './utility';

export default async function setup(isExample = false): Promise<void> {
  log('Starting setup...');

  async function setupSrc(): Promise<void> {
    await copyForce(
      `${__dirname}/${isExample ? premade.exampleSrc : premade.defaultSrc}`,
      src
    );
    await Promise.all(
      Object.values(srcFolders).map((folder) => ensureDir(folder))
    );
  }

  await Promise.all([
    setupSrc(),
    emptyDir(dist), // In case dist already existed; we don't want old files to take space on the server
    copy(`${__dirname}/${premade.configFile}`, configFile), // Copy default config file
  ]);

  log('Setup successful!');
}
