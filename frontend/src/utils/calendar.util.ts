//Consts
import { DAY_OF_WEEK } from "../../../shared/consts/app.consts";
//Utils
import toTitle  from "./toTitle";
//Types
import type { TDayOfWeek } from "../../../shared/models/app.model";
import type { IDateRange } from "../models/calendar.model";

const getShortWeekDays = (isTitle: boolean = true): string[] => {
  return isTitle
    ? DAY_OF_WEEK.map((day) => toTitle(day.substring(0, 3)))
    : DAY_OF_WEEK.map((day) => day.substring(0, 3));
};
const shortWeekdayToFull = (shortDay: string): TDayOfWeek => {
  const newDay = DAY_OF_WEEK.find(
    (day) => day.substring(0, 3).toLowerCase() === shortDay.toLowerCase()
  );
  if (!newDay) {
    console.error(`Invalid short day: ${shortDay}`);
    return "sunday";
  }
  return newDay;
};
const fullWeekdayToShort = (
  fullDay: TDayOfWeek,
  isTitle: boolean = true
): string => {
  const shortDay = fullDay.substring(0, 3).toLowerCase();
  return isTitle ? toTitle(shortDay) : shortDay;
};
const fullWeekdaysToShort = (
  fullDays?: TDayOfWeek[],
  isTitle: boolean = true
): string[] => {
  return fullDays?.map((day) => fullWeekdayToShort(day, isTitle)) || [];
};
const formatDate = (
  date?: Date | string | null,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  });
};
const getFormatDateRange = (
  startDate?: Date | string | null,
  endDate?: Date | string | null
): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
const convertDate = (date?: Date | string | null): Date | null => {
  if (!date) return null;
  if (typeof date === "string") {
    return new Date(date);
  }
  return date instanceof Date ? date : new Date(date);
};
const getDay = (date?: Date | string | null): TDayOfWeek => {
  if (!date) return "sunday";
  const dateObj = convertDate(date);
  if (!dateObj) return "sunday";

  const jsDay = dateObj.getDay();
  return DAY_OF_WEEK[jsDay] as TDayOfWeek;
};
const getNextDay = (day: TDayOfWeek, dir: number): TDayOfWeek => {
  const index = DAY_OF_WEEK.indexOf(day);
  if (index === -1) return "sunday";
  const newIndex = (index + dir + DAY_OF_WEEK.length) % DAY_OF_WEEK.length;
  return DAY_OF_WEEK[newIndex] as TDayOfWeek;
};
const getDateRange = (
  startDate?: Date | string | null,
  endDate?: Date | string | null
): IDateRange => {
  return {
    start: convertDate(startDate),
    end: convertDate(endDate),
  };
};
export const calendarUtil = {
  getFormatDateRange,
  getDateRange,
  getShortWeekDays,
  fullWeekdaysToShort,
  formatDate,
  shortWeekdayToFull,
  getDay,
  getNextDay,
};
