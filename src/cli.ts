#!/usr/bin/env node
import program from 'commander';

import build from './build';
import watch from './watch';
import setup from './setup';
import { warn, error } from './logger';

program
  .command('build')
  .description('Build the entire website')
  .action(() => build().catch(error));

program
  .command('watch')
  .description('Watch all the file types for changes')
  .action(async () => {
    await build().catch(error);
    watch();
  });

program
  .command('setup')
  .description('Set up the project')
  .option('-e, --example', 'Set up an example project instead of an empty one')
  .action(options => setup(options.example).catch(error));

program
  .command('instant')
  .description('Set up the project and start working instantly')
  .option('-e, --example', 'Set up an example project instead of an empty one')
  .action(async options => {
    try {
      await setup(options.example);
      await build();
      watch();
    } catch (err) {
      error(err);
    }
  });

program
  .command('example')
  .description('Deprecated - use "instant -e" instead')
  .action(async () => {
    try {
      warn('The example command is deprecated. Use "instant -e" instead');
      await setup(true);
      await build();
      watch();
    } catch (err) {
      error(err);
    }
  });

program.parse(process.argv);
