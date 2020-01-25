import { copy } from 'fs-extra';

import { srcFolders, distFolders } from '../paths';

export default function buildOther(): Promise<void> {
  return copy(srcFolders.other, distFolders.other);
}
