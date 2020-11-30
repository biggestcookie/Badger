import { BackgroundApp } from "@/background";
import "chrome-extension-async";
import Sync = chrome.storage.sync;

export class StorageService {
  constructor() {
    this.init();
  }

  private async init() {
    const mockBadger = {
      id: 1,
      name: "mock badger"
    } as Badger;
    this.storeBadger(mockBadger);

    BackgroundApp.badgers = await this.fetchAllBadgers();
  }

  async fetchAllBadgers(): Promise<any> {
    return Sync.get("badgers");
  }

  storeBadger(newBadger: Badger) {
    BackgroundApp.badgers.set(newBadger.id, newBadger);
    Sync.set({ badgers: BackgroundApp.badgers });
  }

  removeBadger(badgerId: number) {
    BackgroundApp.badgers.delete(badgerId);
    Sync.set({ badgers: BackgroundApp.badgers });
  }
}
