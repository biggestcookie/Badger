type HourMinute = [number, number];

interface Badger {
  id: number;
  name: string;
  days: number[];
  startTimes: HourMinute[];
  endTimes: HourMinute[];
}
