import { BackgroundApp } from "@/background";
import "chrome-extension-async";
import Sync = chrome.storage.sync;

export class BadgerService {
  constructor() {
    this.init();
  }

  private async init() {
    const mockBadger = {
      id: 1,
      name: "mock badger"
    } as Badger;
    this.setBadger(mockBadger);

    BackgroundApp.badgers = await this.fetchAllBadgers();
  }

  async fetchAllBadgers(): Promise<any> {
    return Sync.get("badgers");
  }

  setBadger(newBadger: Badger) {
    BackgroundApp.badgers.set(newBadger.id, newBadger);
    Sync.set({ badgers: BackgroundApp.badgers });
  }

  deleteBadger(badgerId: number) {
    BackgroundApp.badgers.delete(badgerId);
    Sync.set({ badgers: BackgroundApp.badgers });
  }
}
