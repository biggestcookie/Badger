import config from "@/assets/config.json";
import { BackgroundApp } from "@/background";
import { Badger } from "@/models/badger.model";
import "chrome-extension-async";
import Notifications = chrome.notifications;
import NotificationOptions = chrome.notifications.NotificationOptions;

export class NotificationService {
  constructor() {
    this.init();
  }

  private init() {
    this.registerButtonListeners();
  }

  registerButtonListeners() {
    Notifications.onButtonClicked.addListener((notif, button) =>
      console.log(`Notif: ${notif} button: ${button}`)
    );
  }

  fireNotif(badger: Badger) {
    // display different buttons for mac and pc
    const notifOptions = {
      iconUrl: "icons/16.png",
      type: "basic",
      title: badger.name,
      message: badger.description,
      contextMessage: "context",
      priority: 2,
      eventTime: Date.now(),
      requireInteraction: true,
      isClickable: false,
      buttons: [
        {
          title: "Dismiss"
        },
        {
          title: `Snooze ${BackgroundApp.userPrefs.snoozeTime ||
            config.defaultPrefs.snoozeTime} minutes`
        }
      ]
    } as NotificationOptions;
    Notifications.create("test", notifOptions);
  }

  fireTestNotif() {
    const notifOptions = {
      iconUrl: "icons/16.png",
      type: "basic",
      title: "Notif title",
      message: "message",
      contextMessage: "context",
      priority: 2,
      eventTime: Date.now(),
      requireInteraction: true,
      isClickable: false,
      buttons: [
        {
          title: "button1"
        },
        {
          title: "button2"
        }
      ]
    } as NotificationOptions;
    Notifications.create("test", notifOptions);
  }
}
