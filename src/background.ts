import { NotificationService } from "@/services/notification.service";
import { StorageService } from "./services/storage.service";

class BackgroundApp {
  private readonly notificationService = new NotificationService();
  private readonly storageService = new StorageService();

  init() {
    this.notificationService.init();
    this.storageService.init();
  }
}

const app = new BackgroundApp();
app.init();
