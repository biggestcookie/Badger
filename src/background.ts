import { Badger } from "@/models/badger.model";
import { MessageType } from "@/models/message.model";
import { NotificationService } from "@/services/notification.service";
import { StorageService } from "@/services/storage.service";
import Runtime = chrome.runtime;

export class BackgroundApp {
  private readonly notificationService: NotificationService;
  private readonly storageService: StorageService;

  static userPrefs: Record<string, any>;
  static badgers: Record<number, Badger>;

  constructor() {
    this.notificationService = new NotificationService();
    this.storageService = new StorageService();
  }

  async init() {
    this.registerBackgroundListeners();
  }

  registerBackgroundListeners() {
    Runtime.onMessage.addListener(async (msg, _, sendResponse) => {
      switch (msg.type) {
        case MessageType.FETCH: {
          sendResponse(BackgroundApp.badgers);
          break;
        }
        case MessageType.POST: {
          await this.storageService.storeBadger(msg.badger);
          sendResponse(null);
          break;
        }
        case MessageType.DELETE: {
          await this.storageService.removeBadger(msg.badgerId);
          sendResponse(null);
          break;
        }
      }
      return true;
    });
  }
}

const app = new BackgroundApp();
app.init();
