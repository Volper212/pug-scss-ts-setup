#!/usr/bin/env node
import program from 'commander';

import build from './build';
import watch from './watch';
import setup from './setup';
import { error } from './logger';

program.option('-d, --dev', 'Development mode');

program
  .command('build')
  .description('Build the entire website')
  .action(async () => {
    await build().catch(error);
    process.exit();
  });

export let watchMode = false;

program
  .command('watch')
  .description('Watch all the file types for changes')
  .action(async () => {
    watchMode = true;
    await build().catch(error);
    await watch();
  });

program
  .command('setup')
  .description('Set up the project')
  .option('-e, --example', 'Set up an example project instead of an empty one')
  .action((options) => setup(options.example).catch(error));

program
  .command('instant')
  .description('Set up the project and start working instantly')
  .option('-e, --example', 'Set up an example project instead of an empty one')
  .action(async (options) => {
    try {
      watchMode = true;
      await setup(options.example);
      await build();
      await watch();
    } catch (err) {
      error(err);
    }
  });

program.parse(process.argv);

export const dev = program.dev;
