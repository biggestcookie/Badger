import "chrome-extension-async";
import Runtime = chrome.runtime;

export class MessagingService {
  registerBackgroundListeners() {}

  postBadger(newBadger: Badger) {
    // Runtime.sendMessage()
  }

  fetchBadgers(): Badger[] {
    // Runtime.sendMessage()
  }

  removeBadger(newBadger: Badger) {
    // Runtime.sendMessage()
  }
}
