import { Badger } from "./badger.model";

export enum MessageType {
  FETCH,
  SAVE,
  TOGGLE,
  DELETE
}

export enum FetchType {
  BADGERS,
  PREFS
}

export interface BaseMessage {
  type: MessageType;
}

export interface FetchMessage {
  fetchType: FetchType;
}

export interface SaveMessage extends BaseMessage {
  badger: Badger;
}

export interface ToggleMessage extends BaseMessage {
  badgerId: number;
  enabled: boolean;
}

export interface DeleteMessage extends BaseMessage {
  badgerId: number;
}
