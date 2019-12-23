import nodeWatch from 'node-watch';

import { src } from './paths';
import { log, error } from './logger';

import handlers, { FileEvent } from './file-handlers';

export default function watch(): void {
  nodeWatch(src, { recursive: true }, async (event, filename) => {
    try {
      for (const handler of handlers) {
        if (handler.checkPath(filename)) {
          return await handler.onEvent(event as FileEvent, filename);
        }
      }
    } catch (err) {
      error(err);
    }
  });

  log('Watching!');
}
