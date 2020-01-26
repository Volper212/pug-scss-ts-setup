import { extname, dirname, relative } from 'path';
import { copy, remove, readdir, emptyDir } from 'fs-extra';

import { buildPug, buildImages, buildScripts } from './build';
import { srcFolders, distFolders } from './paths';
import { removeExtension } from './utility';

export const enum FileEvent {
  Update = 'update',
  Remove = 'remove'
}

/** Used to handle file updates and removals. */
export interface FileHandler {
  onEvent(event: FileEvent, filename: string): Promise<void>;
  /** Checks if a path should be handled with this handler */
  checkPath(path: string): boolean;
}

export class StyleHandler implements FileHandler {
  public onEvent(): Promise<void> {
    return buildPug();
  }

  public checkPath(path: string): boolean {
    return path.startsWith(srcFolders.style) && extname(path) === '.scss';
  }
}

/** File handler that has an output in dist */
export class FileMapper implements FileHandler {
  public constructor(
    protected readonly srcFolder: string,
    protected readonly distFolder: string
  ) {}

  public async onEvent(event: FileEvent, filename: string): Promise<void> {
    await (event === FileEvent.Update
      ? this.onUpdate(filename)
      : this.onRemove(filename));
    const directory = dirname(this.getDistPath(filename));
    if (!(await readdir(directory)).length) {
      await emptyDir(directory);
    }
  }

  public checkPath(path: string): boolean {
    return path.startsWith(this.srcFolder);
  }

  protected onUpdate(filename: string): Promise<void> {
    return copy(filename, this.getDistPath(filename));
  }

  protected onRemove(filename: string): Promise<void> {
    return remove(this.getDistPath(filename));
  }

  protected getDistPath(path: string): string {
    return `${this.distFolder}/${relative(this.srcFolder, path)}`;
  }
}

export class WebpMapper extends FileMapper {
  private readonly extensions = ['.jpg', '.png'];

  public constructor() {
    super(srcFolders.images, distFolders.images);
  }

  public checkPath(path: string): boolean {
    return super.checkPath(path) && this.extensions.includes(extname(path));
  }

  protected onUpdate(): Promise<void> {
    return buildImages();
  }

  protected async onRemove(filename: string): Promise<void> {
    const distPath = this.getDistPath(filename);
    await Promise.all([
      remove(distPath),
      remove(`${removeExtension(distPath)}.webp`)
    ]);
  }
}

/** File mapper that changes its extension */
export class ExtensionMapper extends FileMapper {
  public constructor(
    srcFolder: string,
    distFolder: string,
    private readonly srcExtension: string,
    private readonly distExtension: string,
    protected readonly onUpdate: (filename: string) => Promise<void>
  ) {
    super(srcFolder, distFolder);
  }

  public checkPath(path: string): boolean {
    return super.checkPath(path) && extname(path) === this.srcExtension;
  }

  protected onRemove(filename: string): Promise<void> {
    return remove(
      `${this.distFolder}/${removeExtension(
        relative(this.srcFolder, filename)
      )}${this.distExtension}`
    );
  }
}

// The handlers used when watching
// NOTE: Order is important, it means which handlers are checked first
export default [
  new StyleHandler(),
  new WebpMapper(),
  new ExtensionMapper(
    srcFolders.pug,
    distFolders.html,
    '.pug',
    '.html',
    buildPug
  ),
  new ExtensionMapper(
    srcFolders.scripts,
    distFolders.scripts,
    '.ts',
    '.js',
    buildScripts
  ),
  new FileMapper(srcFolders.images, distFolders.images),
  new FileMapper(srcFolders.other, distFolders.other)
] as FileHandler[];
