import { Badger } from "./badger.model";

export enum MessageType {
  POST,
  FETCH,
  DELETE
}

export interface BaseMessage {
  type: MessageType;
}

export interface PostMessage extends BaseMessage {
  badger: Badger;
}

export interface DeleteMessage extends BaseMessage {
  badgerId: number;
}
