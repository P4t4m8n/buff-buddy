import { DAY_OF_WEEK, type TDayOfWeek } from "../models/app.model";
import { toTitle } from "./toTitle";

export const calendarUtil = {
  getShortWeekDays: (isTitle: boolean = true): string[] => {
    return isTitle
      ? DAY_OF_WEEK.map((day) => toTitle(day.substring(0, 3)))
      : DAY_OF_WEEK.map((day) => day.substring(0, 3));
  },

  shortWeekdayToFull: (shortDay: string): TDayOfWeek => {
    const newDay = DAY_OF_WEEK.find(
      (day) => day.substring(0, 3).toLowerCase() === shortDay.toLowerCase()
    );
    if (!newDay) {
      console.error(`Invalid short day: ${shortDay}`);
      return "sunday";
    }
    return newDay;
  },
  shortWeekdaysToFull: (shortDays: string[]): TDayOfWeek[] => {
    return shortDays.map((day) => calendarUtil.shortWeekdayToFull(day));
  },
  fullWeekdayToShort: (
    fullDay: TDayOfWeek,
    isTitle: boolean = true
  ): string => {
    const shortDay = fullDay.substring(0, 3).toLowerCase();
    return isTitle ? toTitle(shortDay) : shortDay;
  },

  fullWeekdaysToShort: (
    fullDays: TDayOfWeek[],
    isTitle: boolean = true
  ): string[] => {
    return fullDays.map((day) => calendarUtil.fullWeekdayToShort(day, isTitle));
  },
};
