import { Record, Runtype } from "runtypes";
import { MessageHeader } from "./MessageHeader";

export const Message = <T extends Runtype>(body: T): Runtype => {
  return Record({
    header: MessageHeader,
    body: body,
  });
};

export type Message<T> = {
  header: MessageHeader;
  body: T;
};
