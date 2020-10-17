import { NotificationService } from "@/services/notification.service";
import { StorageService } from "./services/storage.service";
import runtime = chrome.runtime;

class BackgroundApp {
  private readonly notificationService = new NotificationService();
  private readonly storageService = new StorageService();
  static userPrefs: object;
  init() {
    this.registerMessagingListeners();
  }

  registerMessagingListeners() {
    runtime.onMessage.addListener((message: any) => {
      alert(message);
    });
  }
}

const app = new BackgroundApp();
app.init();
