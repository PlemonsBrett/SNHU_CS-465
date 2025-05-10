/**
 * Logger utility for consistent logging throughout the application
 */
import { config } from '@config';

/**
 * Log levels
 */
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

/**
 * Logger class for consistent logging
 */
export class Logger {
  private context: string;

  /**
   * Create a new logger with a specific context
   * @param context The context for this logger (usually the class or file name)
   */
  constructor(context: string) {
    this.context = context;
  }

  /**
   * Format a log message
   * @param level Log level
   * @param message Message to log
   * @param optionalParams Optional parameters to include
   * @returns Formatted log message
   */
  private formatMessage(level: LogLevel, message: string, ...optionalParams: unknown[]): string {
    const timestamp = new Date().toISOString();
    let formattedMessage = `[${timestamp}] [${level}] [${this.context}]: ${message}`;

    if (optionalParams.length > 0) {
      formattedMessage += ` ${optionalParams
        .map((param) => (typeof param === 'object' ? JSON.stringify(param) : param))
        .join(' ')}`;
    }

    return formattedMessage;
  }

  /**
   * Log an info message
   * @param message Message to log
   * @param optionalParams Optional parameters
   */
  public info(message: string, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage(LogLevel.INFO, message, ...optionalParams));
  }

  /**
   * Log a warning message
   * @param message Message to log
   * @param optionalParams Optional parameters
   */
  public warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, ...optionalParams));
  }

  /**
   * Log an error message
   * @param message Message to log
   * @param optionalParams Optional parameters
   */
  public error(message: string, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, ...optionalParams));
  }

  /**
   * Log a debug message (only in development)
   * @param message Message to log
   * @param optionalParams Optional parameters
   */
  public debug(message: string, ...optionalParams: unknown[]): void {
    if (config.isDevelopment) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, ...optionalParams));
    }
  }
}
