import { DAY_OF_WEEK, MONTHS, CRUD_OPERATIONS } from "../consts/app.consts";

export interface IBaseFilter {
  skip?: number;
  take?: number;
}

export type TDayOfWeek = (typeof DAY_OF_WEEK)[number];

export type TMonth = (typeof MONTHS)[number];

export type TCrudOperation = (typeof CRUD_OPERATIONS)[number];

export interface IValidationProps {
  minLength?: number;
  maxLength?: number;
  fieldName?: string;
  toSanitize?: boolean;
}

export interface IDateValidationProps {
  startDate: string;
  endDate: string;
  fieldName: string;
}
