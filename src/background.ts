import { NotificationService } from "@/services/notification.service";
import { MessagingService } from "@/services/messaging.service";
import { StorageService } from "@/services/storage.service";
import Runtime = chrome.runtime;

export class BackgroundApp {
  static userPrefs: object;
  static badgers: Map<number, Badger> = new Map();

  private readonly notificationService = new NotificationService();
  private readonly messagingService = new MessagingService();
  private readonly storageService = new StorageService();

  init() {
    this.messagingService.registerBackgroundListeners();

    console.log(BackgroundApp.badgers);
  }
}

const app = new BackgroundApp();
app.init();
