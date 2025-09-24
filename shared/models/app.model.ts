import { DAY_OF_WEEK, CRUD_OPERATIONS } from "../consts/app.consts";
import type { IEntity, IEntityDates } from "./entity.model";

export interface IBaseFilter {
  skip?: number;
  take?: number;
}

export type TDayOfWeek = (typeof DAY_OF_WEEK)[number];

export type TCrudOperation = (typeof CRUD_OPERATIONS)[number];

export interface IValidationProps {
  minLength?: number;
  maxLength?: number;
  fieldName?: string;
  toSanitize?: boolean;
  toLowerCase?: boolean;
}

export interface IToSanitize {
  toSanitize: boolean;
}

export interface IItemImage extends IEntity, IEntityDates {
  url?: string | null;
  publicId?: string | null;
  description?: string | null;
  isPrimary?: boolean | null;
  altText?: string | null;
}
