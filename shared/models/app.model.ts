import { DAY_OF_WEEK, CRUD_OPERATIONS } from "../consts/app.consts";

export interface IBaseFilter {
  skip?: number;
  take?: number;
  order?: "desc" | "asc";
}

export type TDayOfWeek = (typeof DAY_OF_WEEK)[number];

export type TCrudOperation = (typeof CRUD_OPERATIONS)[number];
export interface ICrudOperation {
  crudOperation?: TCrudOperation;
}

export interface IValidationProps {
  minLength?: number;
  maxLength?: number;
  fieldName?: string;
  toSanitize?: boolean;
  toLowerCase?: boolean;
}

export interface IToSanitize {
  toSanitize?: boolean;
}
