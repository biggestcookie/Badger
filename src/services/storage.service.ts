import { BackgroundApp } from "@/background";
import { Badger } from "@/models/badger.model";
import { UserPrefs } from "@/models/prefs.model";
import "chrome-extension-async";
import Local = chrome.storage.local;

export class StorageService {
  constructor() {
    this.init();
  }

  async init() {
    const [badgerRecord, prefsRecord] = await Promise.all([
      this.fetchBadgerMap(),
      this.fetchUserPrefs()
    ]);
    if (!badgerRecord.badgers || prefsRecord.prefs) {
      await this.createUserData();
      BackgroundApp.badgers = {};
      BackgroundApp.userPrefs = {} as UserPrefs;
    } else {
      BackgroundApp.badgers = badgerRecord.badgers;
      BackgroundApp.userPrefs = prefsRecord.prefs;
    }
  }

  async createUserData(): Promise<void> {
    console.log("Initializing storage");
    return Local.set({ badgers: {}, prefs: {} });
  }

  async fetchUserPrefs(): Promise<any> {
    return Local.get("prefs");
  }

  async fetchBadgerMap(): Promise<any> {
    return Local.get("badgers");
  }

  async storeBadger(newBadger: Badger): Promise<void> {
    BackgroundApp.badgers[newBadger.id] = newBadger;
    return Local.set({ badgers: BackgroundApp.badgers });
  }

  async removeBadger(badgerId: number): Promise<void> {
    delete BackgroundApp.badgers[badgerId];
    return Local.set({ badgers: BackgroundApp.badgers });
  }
}
