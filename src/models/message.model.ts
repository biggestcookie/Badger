import { Badger } from "./badger.model";

export enum MessageType {
  FETCH,
  SAVE,
  DELETE
}

export enum FetchType {
  BADGERS,
  PREFS
}

export interface BaseMessage {
  type: MessageType;
}

export interface FetchMessage extends BaseMessage {
  fetchType: FetchType;
}

export interface SaveMessage extends BaseMessage {
  badger: Badger;
}

export interface DeleteMessage extends BaseMessage {
  badgerId: number;
}
