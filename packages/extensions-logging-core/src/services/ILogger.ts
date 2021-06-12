export interface ILogger {
  info(message: string, context?: any): void;
  error(e: Error, message?: string, context?: any): void;
}
