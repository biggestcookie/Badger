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
    this.createBadger(mockBadger);

    BackgroundApp.badgers = await this.fetchAllBadgers();
  }

  async fetchAllBadgers(): Promise<Badger[]> {
    return Sync.get("badgers") as Promise<Badger[]>;
  }

  createBadger(newBadger: Badger) {
    BackgroundApp.badgers.push(newBadger);
    Sync.set({ badgers: BackgroundApp.badgers });
  }
}
