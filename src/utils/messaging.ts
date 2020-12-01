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
  const badgerMap = await Runtime.sendMessage(fetchMessage);
  return Object.values(badgerMap);
}

export async function setBadger(newBadger: Badger) {
  const postMessage: PostMessage = {
    type: MessageType.POST,
    badger: newBadger
  };
  await Runtime.sendMessage(postMessage);
}

export async function deleteBadger(badgerId: number) {
  const deleteMessage: DeleteMessage = {
    type: MessageType.DELETE,
    badgerId
  };
  await Runtime.sendMessage(deleteMessage);
}
