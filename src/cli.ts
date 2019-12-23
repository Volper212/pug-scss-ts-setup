#!/usr/bin/env node
import yargs from 'yargs';

import build from './build';
import watch from './watch';
import setup from './setup';
import { error } from './logger';

yargs
  .command(
    'build',
    'Build the entire website',
    () => void 0,
    async () => {
      try {
        await build();
      } catch (err) {
        error(err);
      }
    }
  )
  .command(
    'watch',
    'Watch all the file types for changes',
    () => void 0,
    async () => {
      try {
        await build();
        watch();
      } catch (err) {
        error(err);
      }
    }
  )
  .command(
    'setup',
    'Set up the project',
    () => void 0,
    async () => {
      try {
        await setup(false);
      } catch (err) {
        error(err);
      }
    }
  )
  .command(
    'example',
    'Set up a project with example files and start working instantly',
    () => void 0,
    async () => {
      try {
        await setup(true);
        await build();
        watch();
      } catch (err) {
        error(err);
      }
    }
  )
  .command(
    'instant',
    'Set up the project and start working instantly',
    () => void 0,
    async () => {
      try {
        await setup(false);
        await build();
        watch();
      } catch (err) {
        error(err);
      }
    }
  )
  .help().argv;
