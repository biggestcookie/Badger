import { NotificationService } from "@/services/notification.service";
import { BadgerService } from "./services/badger.service";
import Runtime = chrome.runtime;

export class BackgroundApp {
  static userPrefs: object;
  static badgers: Badger[] = [];
  private readonly notificationService = new NotificationService();
  private readonly storageService = new BadgerService();

  init() {
    console.log(BackgroundApp.badgers);
    this.registerMessagingListeners();
  }

  registerMessagingListeners() {
    Runtime.onMessage.addListener((message: any) => {
      alert(message);
    });
  }
}

const app = new BackgroundApp();
app.init();
