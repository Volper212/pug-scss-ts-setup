import betterLogging from 'better-logging';

const betterConsole = {} as {
  debug: LogFunction;
  info: LogFunction;
  log: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};

betterLogging(betterConsole);

interface LogFunction {
  (message: unknown): void;
}

export const { debug, info, log, warn } = betterConsole;

export function error(err: unknown): never {
  betterConsole.error('');
  throw err;
}
