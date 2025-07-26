export interface IBaseFilter {
  skip?: number;
  page?: number;
  take?: number;
}
export const DAY_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
export type TDayOfWeek = (typeof DAY_OF_WEEK)[number];

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;
export type TMonth = (typeof MONTHS)[number];

export const CRUD_OPERATIONS = [
  "create",
  "update",
  "edit",
  "delete",
  "read",
] as const;
export type TCrudOperation = (typeof CRUD_OPERATIONS)[number];

export type TIconMode = "create" | "edit" | "details" | "delete";
