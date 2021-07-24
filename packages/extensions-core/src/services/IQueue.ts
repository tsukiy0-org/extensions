export interface IQueue<T> {
  push(message: T): Promise<void>;
  push(messages: T[]): Promise<void>;
}
