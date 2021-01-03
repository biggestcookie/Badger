export enum Weekday {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export interface HourMinute {
  hour: number;
  minute: number;
}

export interface Badger {
  id: number;
  name: string;
  description?: string;
  days: Set<Weekday>;
  interval: number;
  timeRanges: Array<[HourMinute, HourMinute]>;
}
