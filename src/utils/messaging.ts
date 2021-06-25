import { Badger } from "/@/models/badger.model";
import {
  DeleteMessage,
  FetchMessage,
  FetchType,
  MessageType,
  SaveMessage,
} from "/@/models/message.model";
import "chrome-extension-async";
import Runtime = chrome.runtime;

export async function fetchBadgers(): Promise<Badger[]> {
  const fetchMessage: FetchMessage = {
    type: MessageType.FETCH,
    fetchType: FetchType.BADGERS,
  };
  const badgerMap = await Runtime.sendMessage(fetchMessage);
  return badgerMap ? Object.values(badgerMap) : [];
}

export async function saveBadger(newBadger: Badger) {
  const postMessage: SaveMessage = {
    type: MessageType.SAVE,
    badger: newBadger,
  };
  await Runtime.sendMessage(postMessage);
}

export async function deleteBadger(badgerId: number) {
  const deleteMessage: DeleteMessage = {
    type: MessageType.DELETE,
    badgerId,
  };
  await Runtime.sendMessage(deleteMessage);
}
