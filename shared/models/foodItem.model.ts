import { IBaseFilter } from "./app.model";
import { IEntity } from "./entity.model";

interface IFoddItemBase extends IEntity {
  carbohydrates?: string;
  fats?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  cholesterol?: string;
  imgUrl?: string;
}

export interface IFoodItemDto extends IFoddItemBase {
  name: string;
  barcode: string;
  calories: string;
  protein: string;
}
export interface IFoodItemEditDto extends IFoddItemBase {
  name?: string;
  barcode?: string;
  calories?: string;
  protein?: string;
}

export interface IFoodItemFilter extends IBaseFilter {
  name?: string | null;
  calories?: string | null;
  protein?: string | null;
}
