export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
}
export class LogService implements ILogService {
  constructor(private logLevel: LogLevel) {}

  debug(message: string): void {
    if (this.logLevel > LogLevel.Debug) return;

    console.debug('\n[DEBUG]\n', message);
  }

  error(message: string): void {
    if (this.logLevel > LogLevel.Error) return;
    console.error(`\n[ERROR]\n${message}\n`);
  }

  warn(message: string): void {
    if (this.logLevel > LogLevel.Warn) return;

    console.warn('\n[WARN]\n', message);
  }

  info(message: string): void {
    if (this.logLevel > LogLevel.Info) return;
    console.info('\n[INFO]\n', message);
  }

  trace(message: string): void {
    if (this.logLevel > LogLevel.Trace) return;
    console.info('\n[TRACE]\n', message);
  }
}

export function makeLogService(): LogService {
  return new LogService(LogLevel.Trace);
}

export interface ILogService {
  debug(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  info(message: string): void;
  trace(message: string): void;
}
