import betterLogging, { BetterLogging } from 'better-logging';

const betterConsole: BetterLogging = { ...console };
betterLogging(betterConsole);

export const { debug, info, log, warn } = betterConsole;
export function error(err: unknown): never {
  betterConsole.error('');
  throw err;
}
