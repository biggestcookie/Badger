
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
    Alarms.clearAll(); // Remove if unnecessary
    this.registerAlarmListener();
  }

  registerAlarmListener() {
    Alarms.onAlarm.addListener(async alarm => {
      const currentBadger = BackgroundApp.badgers[Number(alarm.name)];
      this.notificationService.fireNotif(currentBadger);
      if (!this.isBadgerActive(currentBadger)) {
        const x = await Alarms.clear(alarm.name);
        console.log(`Alarm was deleted: ${x}`);
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
    const newAlarm: Alarms.AlarmCreateInfo = {
      when: nextAlarmTime,
      periodInMinutes: badger.interval
    };
    Alarms.create(badger.name, newAlarm);
  }

  /*   
  createSnoozedAlarm(badger: Badger) {
    // Need way to reference existing alarm info with alarm name
    const nextAlarmTime = this.findSnoozedAlarmTime();
    Alarms.create({
      when: nextAlarmTime
    });
  } 
  
  findSnoozedAlarmTime(): number {
    const snoozeMinutes =
      BackgroundApp.userPrefs.snoozeTime || config.defaultPrefs.snoozeTime;
  } 
  */

  isBadgerActive(badger: Badger): boolean {
    const currentDate = new Date();
  }

  findNextAlarmTime(badger: Badger): number {
    // find next alarm, taking interval into account
  }
}
