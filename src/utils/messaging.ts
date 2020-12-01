import { Badger } from "@/models/badger.model";
import {
  BaseMessage,
  DeleteMessage,
  MessageType,
  PostMessage
} from "@/models/message.model";
import "chrome-extension-async";
import Runtime = chrome.runtime;

export async function fetchBadgers(): Promise<Badger[]> {
  const fetchMessage: BaseMessage = {
    type: MessageType.FETCH
  };
  return Runtime.sendMessage(fetchMessage);
}

export function setBadger(newBadger: Badger) {
  const fetchMessage: PostMessage = {
    type: MessageType.POST,
    badger: newBadger
  };
  Runtime.sendMessage(fetchMessage);
}

export function deleteBadger(badgerId: number) {
  const deleteMessage: DeleteMessage = {
    type: MessageType.DELETE,
    badgerId
  };
  Runtime.sendMessage(deleteMessage);
}
