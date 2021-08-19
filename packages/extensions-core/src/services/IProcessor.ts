import { Message } from "../models/Message";

export interface IProcessor<T, U = void> {
  run(message: Message<T>): Promise<U>;
}
