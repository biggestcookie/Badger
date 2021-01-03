import { BackgroundApp } from "@/background";
import { Badger, Weekday, HourMinute } from "@/models/badger.model";
import { NotificationService } from "@/services/notification.service";
import "chrome-extension-async";
import Alarms = chrome.alarms;

const dayMilliseconds = 24 * 60 * 60 * 1000;

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
        console.log(`Alarm was deleted: ${x}`); // Remove
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
    if (!this.isDayValid(badger.days)) {
      return false;
    }

    let timeValid = false;
    for (const timeRange of badger.timeRanges) {
      if (this.isTimeValid(timeRange)) {
        timeValid = true;
        break;
      }
    }
    return timeValid;
  }

  findNextAlarmTime(badger: Badger): number {
    let newDate = new Date();
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    if (this.isDayValid(badger.days)) {
      const dateString = newDate.toDateString();
      badger.timeRanges.forEach((timeRange, index) => {
        if
      })
    }

    // If alarm not today, find nearest day and set to earliest start time
    const currentDay = newDate.getDay();
    const validDays = [...badger.days.values(), currentDay].sort();
    const currentDayIndex = validDays.indexOf(currentDay);
    const dayDifference =
      currentDayIndex === validDays.length - 1
        ? validDays[0] - (currentDay - 7)
        : validDays[currentDayIndex + 1] - currentDay;
    newDate = new Date(newDate.getTime() + dayDifference * dayMilliseconds);
    newDate.setHours(badger.timeRanges[0][0].hour);
    newDate.setMinutes(badger.timeRanges[0][0].minute);
    return newDate.getTime();
  }

  isDayValid(validDays: Set<Weekday>) {
    return validDays.has(new Date().getDay());
  }

  isTimeValid(timeRange: [HourMinute, HourMinute]): boolean {
    const currentDate = new Date();
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const startDate =
      // If start time after 12PM and end time before 12PM, start time was yesterday
      timeRange[0].hour >= 12 && timeRange[1].hour < 12
        ? new Date(currentDate.getTime() - dayMilliseconds)
        : new Date(currentDate);
    startDate.setHours(timeRange[0].hour);
    startDate.setMinutes(timeRange[0].minute);

    const endDate = new Date(currentDate);
    endDate.setHours(timeRange[1].hour);
    endDate.setMinutes(timeRange[1].minute);

    return (
      startDate.getTime() <= currentDate.getTime() &&
      currentDate.getTime() <= endDate.getTime()
    );
  }

  getDateFromHourMinute(hourMinute: HourMinute) {
    const dateString = new Date().toDateString();
    return new Date(`${dateString} ${hourMinute.hour}:${hourMinute.minute}`);
  }
}
