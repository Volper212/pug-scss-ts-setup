import nsfw, { ActionType } from 'nsfw';
import { resolve, relative } from 'path';

import { src } from './paths';
import { log, error } from './logger';

import handlers from './file-handlers';

export default async function watch(): Promise<void> {
  log('Watching!');

  const watcher = await nsfw(resolve(src), events => {
    events.forEach(event => {
      for (const [regex, handle, onRemove] of handlers) {
        const promises: Promise<void>[] = [];
        if (event.action === ActionType.RENAMED) {
          const oldFile = relative(process.cwd(), `${event['directory']}/${event.oldFile}`);
          if (regex.test(oldFile)) {
            promises.push((onRemove || handle)(oldFile));
          }
          const newFile = relative(process.cwd(), `${event['directory']}/${event.newFile}`);
          if (regex.test(newFile)) {
            promises.push(handle(newFile));
          }
        } else {
          const file = relative(process.cwd(), `${event.directory}/${event.file}`);
          if (regex.test(file)) {
            promises.push(
              event.action === ActionType.DELETED
                ? (onRemove || handle)(file)
                : handle(file)
            );
          }
        }
        if (promises.length) {
          return Promise.all(promises).catch(error);
        }
      }
    });
  });

  return watcher.start();
}
