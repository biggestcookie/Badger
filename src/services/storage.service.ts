import { BackgroundApp } from "@/background";
import { Badger } from "@/models/badger.model";
import "chrome-extension-async";
import Sync = chrome.storage.sync;

export class StorageService {
  // constructor() {
  //   this.init();
  // }

  // private async init() {
  //   const mockBadger = {
  //     id: 1,
  //     name: "mock badger"
  //   } as Badger;
  //   this.storeBadger(mockBadger);
  // }

  async fetchUserPrefs(): Promise<any> {
    return Sync.get("prefs");
  }

  async fetchBadgerMap(): Promise<any> {
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
