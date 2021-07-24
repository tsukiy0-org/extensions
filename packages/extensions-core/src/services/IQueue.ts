export interface IQueue<T> {
  send(message: T): Promise<void>;
}
