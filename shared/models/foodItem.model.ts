import type { IBaseFilter } from "./app.model";
import type { IEntity, IEntityDates } from "./entity.model";

interface IFoddItemBase extends IEntity, IEntityDates {
  carbohydrates?: string;
  fats?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  cholesterol?: string;
  name?: string;
  barcode?: string;
  calories?: string;
  protein?: string;
}

export interface IFoodItemDto extends IFoddItemBase {
  images?: IFoodItemImgDto[];
  labels?: IFoodItemLabelDto[];
  brand?: IFoodItemBrandDto;
}
export interface IFoodItemEditDto extends Partial<IFoddItemBase> {
  brand?: string;
  labels?: string[];
  images?: string[];
}

export interface IFoodItemFilter extends IBaseFilter {
  name?: string | null;
  calories?: string | null;
  protein?: string | null;
  barcode?: string | null;
}

export interface IFoodItemImgDto extends IEntity, IEntityDates {
  foodItemId: string;
  url: string;
}

export interface IFoodItemBrandDto extends IEntity, IEntityDates {
  name: string;
}
export interface IFoodItemLabelDto extends IEntity, IEntityDates {
  name: string;
}
