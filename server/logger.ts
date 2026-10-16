/**
 * Minimal structured logger. Callers must never pass personal data
 * (names, emails, phone numbers, message bodies) in `data`.
 */
export interface Logger {
  info(event: string, data?: Record<string, unknown>): void;
  warn(event: string, data?: Record<string, unknown>): void;
  error(event: string, data?: Record<string, unknown>): void;
}

function line(level: 'info' | 'warn' | 'error', event: string, data?: Record<string, unknown>): string {
  return JSON.stringify({ level, event, time: new Date().toISOString(), ...data });
}

export const consoleLogger: Logger = {
  info: (event, data) => console.log(line('info', event, data)),
  warn: (event, data) => console.warn(line('warn', event, data)),
  error: (event, data) => console.error(line('error', event, data)),
};

export const silentLogger: Logger = { info: () => {}, warn: () => {}, error: () => {} };
