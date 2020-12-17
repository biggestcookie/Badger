export enum Weekday {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export type HourMinute = [number, number];

export interface Badger {
  id: number;
  name: string;
  description?: string;
  days: Weekday[];
  interval: number;
  startTimes: HourMinute[];
  endTimes: HourMinute[];
}
