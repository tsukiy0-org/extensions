import { Message } from "../models/Message";

export interface IProcessor<T, U> {
  run(message: Message<T>): Promise<U>;
}
