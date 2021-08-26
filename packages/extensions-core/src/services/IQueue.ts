export interface IQueue<T> {
  send(body: T): Promise<void>;
}
