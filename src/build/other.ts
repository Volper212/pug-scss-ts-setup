import { copy } from 'fs-extra';

import { srcFolders, distFolders } from '../paths';

export default function other(): Promise<void> {
  return copy(srcFolders.other, distFolders.other);
}
