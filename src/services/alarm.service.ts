import { BackgroundApp } from "@/background";
import { Badger, HourMinute, Weekday } from "@/models/badger.model";
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
    console.log(`Next alarm: ${new Date(nextAlarmTime)}`);
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
    let currentDate = new Date();
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const dateString = currentDate.toDateString();
    const currentTime = currentDate.getTime();

    if (this.isDayValid(badger.days)) {
      // If alarm is today, check if current date is between time ranges
      badger.timeRanges.forEach((timeRange, index) => {
        if (index !== badger.timeRanges.length - 1) {
          const endTime = this.getDateFromHourMinute(
            badger.timeRanges[index][0]
          ).getTime();
          const nextStartTime = this.getDateFromHourMinute(
            badger.timeRanges[index + 1][0]
          ).getTime();
          if (currentTime >= endTime) {
            return nextStartTime;
          } else if (currentTime >= nextStartTime) {
            return (
              Math.ceil(
                (currentTime + badger.interval * 60 * 1000) / badger.interval
              ) * badger.interval
            );
          }
        }
      });
    }

    // If alarm not today, find nearest day and set to earliest start time
    const currentDay = currentDate.getDay();
    const validDays = [...badger.days.values(), currentDay].sort();
    const currentDayIndex = validDays.indexOf(currentDay);
    const dayDifference =
      currentDayIndex === validDays.length - 1
        ? validDays[0] - (currentDay - 7)
        : validDays[currentDayIndex + 1] - currentDay;
    currentDate = new Date(
      currentDate.getTime() + dayDifference * dayMilliseconds
    );
    currentDate.setHours(badger.timeRanges[0][0].hour);
    currentDate.setMinutes(badger.timeRanges[0][0].minute);
    return currentDate.getTime();
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
