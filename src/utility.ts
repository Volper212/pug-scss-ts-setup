import { existsSync, copy } from 'fs-extra';
import trash from 'trash';

import { warn } from './logger';

export function removeExtension(filename: string): string {
  return filename.substr(0, filename.lastIndexOf('.'));
}

export async function copyForce(dir: string, dest: string): Promise<void> {
  if (existsSync(dest)) {
    warn(`Old ${dest} directory is being moved to trash...`);
    await trash(dest);
  }
  return copy(dir, dest);
}
