import { emptyDir, copy } from 'fs-extra';

import { log } from './logger';
import { src, dist } from './paths';
import { copyForce } from './utility';

export default async function setup(isExample = false): Promise<void> {
  log('Starting setup...');

  await Promise.all([
    copyForce(`${__dirname}/../${isExample ? 'example' : 'default'}-src`, src), // Copy default src
    emptyDir(dist), // In case dist already existed; we don't want old files to take space on the server
    copy(`${__dirname}/../default-config.js`, 'psst-config.js') // Copy default config file
  ]);

  log('Setup successful!');
}
