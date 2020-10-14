import "chrome-extension-async";
import notifications = chrome.notifications;
import NotificationOptions = chrome.notifications.NotificationOptions;

export class NotificationService {
  init() {
    this.registerButtonListeners();
  }

  registerButtonListeners() {
    notifications.onButtonClicked.addListener((notif, button) =>
      console.log(`Notif: ${notif} button: ${button}`)
    );
  }

  testNotif() {
    const c: NotificationOptions = {
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
    };
    notifications.create("test", c);
  }
}
