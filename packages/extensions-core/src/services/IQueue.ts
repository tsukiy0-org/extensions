import { Message } from "../models/Message";

export interface IQueue<T> {
  send(message: Message<T>): Promise<void>;
}
