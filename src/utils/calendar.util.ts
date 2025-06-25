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
};
