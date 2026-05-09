import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: unknown,
    optionalParams?: unknown[],
  ): string {
    const logObject: Record<string, string> = {
      level,
      message: String(message),
      timestamp: new Date().toISOString(),
    };

    if (optionalParams?.length) {
      logObject.optionalParams = JSON.stringify(optionalParams);
    }

    return Object.entries(logObject)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }
}
