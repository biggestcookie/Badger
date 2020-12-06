import { Badger } from "@/models/badger.model";
import {
  DeleteMessage,
  MessageType,
  PostMessage
} from "@/models/message.model";
import { AlarmService } from "@/services/alarm.service";
import { StorageService } from "@/services/storage.service";
import { UserPrefs } from "./models/prefs.model";
import Runtime = chrome.runtime;

export class BackgroundApp {
  private readonly alarmService: AlarmService;
  private readonly storageService: StorageService;

  static userPrefs: UserPrefs;
  static badgers: Record<number, Badger>;

  constructor() {
    this.alarmService = new AlarmService();
    this.storageService = new StorageService();
    this.init();
  }

  async init() {
    this.registerBackgroundListeners();
    this.alarmService.registerCurrentAlarms();
  }

  registerBackgroundListeners() {
    Runtime.onMessage.addListener((msg, _, sendResponse) => {
      switch (msg.type) {
        case MessageType.FETCH:
          sendResponse(BackgroundApp.badgers);
          break;
        case MessageType.POST:
          this.onPost(msg, sendResponse);
          break;
        case MessageType.DELETE:
          this.onDelete(msg, sendResponse);
          break;
      }
      return true;
    });
  }

  async onPost(msg: PostMessage, sendResponse: (response: any) => void) {
    // TODO: Register alarm
    await this.storageService.storeBadger(msg.badger);
    this.alarmService.createAlarm(msg.badger);
    sendResponse(true);
  }

  async onDelete(msg: DeleteMessage, sendResponse: (response: any) => void) {
    await this.storageService.removeBadger(msg.badgerId);
    sendResponse(true);
  }
}

const app = new BackgroundApp();
