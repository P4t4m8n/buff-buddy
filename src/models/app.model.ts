import type { IEntity } from "./entity.model";

export interface IAppNav {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface IBaseFilter {
  skip?: number;
  page?: number;
}

export interface IBaseNameAndId extends IEntity {
  name?: string;
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
