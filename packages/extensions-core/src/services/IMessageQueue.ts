import { Message } from "../models/Message";

export interface IMessageQueue<T> {
  send(message: Message<T>): Promise<void>;
}
