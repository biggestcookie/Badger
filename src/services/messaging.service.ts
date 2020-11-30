import "chrome-extension-async";
import Runtime = chrome.runtime;

export class MessagingService {
  registerBackgroundListeners() {
    // Runtime.onMessage()
  }

  setBadger(newBadger: Badger) {
    // Runtime.sendMessage()
  }

  fetchBadgers(): Badger[] {
    // Runtime.sendMessage()
  }

  deleteBadger(newBadger: Badger) {
    // Runtime.sendMessage()
  }
}
