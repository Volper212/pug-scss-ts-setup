import { emptyDir, copy, mkdirp } from 'fs-extra';

import { log } from './logger';
import { src, dist, srcFolders } from './paths';
import { copyForce } from './utility';

export default async function setup(isExample = false): Promise<void> {
  log('Starting setup...');

  await Promise.all([
    copyForce(`${__dirname}/../${isExample ? 'example' : 'default'}-src`, src), // Copy default src
    emptyDir(dist), // In case dist already existed; we don't want old files to take space on the server
    Object.values(srcFolders).map(folder => mkdirp(folder)), // Create directories inside src
    copy(`${__dirname}/../default-config.js`, 'psst-config.js') // Copy default config file
  ]);

  log('Setup successful!');
}
