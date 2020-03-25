import chokidar from 'chokidar';

import { src } from './paths';
import { log, error } from './logger';

import handlers from './file-handlers';

export default async function watch(): Promise<void> {
  log('Watching!');

  chokidar.watch(src, { ignoreInitial: true }).on('all', (event, path) => {
    if (event.endsWith('Dir')) return;
    for (const [regex, onChange, onRemove] of handlers) {
      if (regex.test(path)) {
        (event === 'unlink' ? onRemove || onChange : onChange)(path).catch(error);
      }
    }
  });
}
