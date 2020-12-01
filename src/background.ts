import { Badger } from "@/models/badger.model";
import { MessageType } from "@/models/message.model";
import { NotificationService } from "@/services/notification.service";
import { StorageService } from "@/services/storage.service";
import Runtime = chrome.runtime;

export class BackgroundApp {
  private readonly notificationService: NotificationService;
  private readonly storageService: StorageService;

  static userPrefs = {};
  static badgers: Map<number, Badger> = new Map();

  constructor() {
    this.notificationService = new NotificationService();
    this.storageService = new StorageService();
  }

  async init() {
    // BackgroundApp.badgers = await this.storageService.fetchBadgerMap();
    BackgroundApp.userPrefs = await this.storageService.fetchUserPrefs();

    this.registerBackgroundListeners();

    // console.log(BackgroundApp.badgers);
  }

  registerBackgroundListeners() {
    Runtime.onMessage.addListener((msg, _, sendResponse) => {
      switch (msg.type) {
        case MessageType.FETCH: {
          sendResponse(BackgroundApp.badgers.values());
          break;
        }
        case MessageType.POST: {
          this.storageService.storeBadger(msg.badger);
          break;
        }
        case MessageType.DELETE: {
          this.storageService.removeBadger(msg.badgerId);
          break;
        }
      }
      return true;
    });
  }
}

const app = new BackgroundApp();
app.init();
