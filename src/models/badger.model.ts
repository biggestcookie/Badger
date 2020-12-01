type HourMinute = [number, number];

export interface Badger {
  id: number;
  name: string;
  days: number[];
  startTimes: HourMinute[];
  endTimes: HourMinute[];
}
