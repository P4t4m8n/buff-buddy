import { IBaseFilter } from "./app.model";
import { IEntity } from "./entity.model";

interface IFoddItemVase extends IEntity {
  carbohydrates?: string;
  fats?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  cholesterol?: string;
  imgUrl?: string;
}

export interface IFoodItemDto extends IFoddItemVase {
  name: string;
  barcode: string;
  calories: string;
  protein: string;
}
export interface IFoodItemEditDto extends IFoddItemVase {
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
