import config from "@/assets/config.json";
import { BackgroundApp } from "@/background";
import { Badger } from "@/models/badger.model";
import { NotificationService } from "@/services/notification.service";
import "chrome-extension-async";
import Alarms = chrome.alarms;

export class AlarmService {
  private readonly notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
    this.init();
  }

  init() {
    // clear previous alarms if necessary?
    Alarms.onAlarm((name: string) => {
      const currentBadger = BackgroundApp.badgers[Number(name)];
      this.notificationService.fireNotif(currentBadger);
      if (!this.isBadgerActive(currentBadger)) {
        // delete alarm
        this.createAlarm(currentBadger);
      }
    });
  }

  registerCurrentAlarms() {
    Object.values(BackgroundApp.badgers).forEach(badger =>
      this.createAlarm(badger)
    );
  }

  createAlarm(badger: Badger) {
    const nextAlarmTime = this.findNextAlarmTime(badger);
    // register alarm
  }

  createSnoozedAlarm(badger: Badger) {
    const nextAlarmTime = this.findSnoozedAlarmTime();
  }

  isBadgerActive(badger: Badger): boolean {
    const currentDate = new Date();
  }

  findSnoozedAlarmTime(): number {
    const snoozeMinutes =
      BackgroundApp.userPrefs.snoozeTime || config.defaultPrefs.snoozeTime;
  }

  findNextAlarmTime(badger: Badger): number {
    // find next alarm, taking interval into account
  }
}
