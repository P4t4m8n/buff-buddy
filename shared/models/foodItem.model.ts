import type { IBaseFilter } from "./app.model";
import type { IEntity, IEntityDates } from "./entity.model";

interface IFoddItemBase extends IEntity {
  carbohydrates?: string;
  fats?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  cholesterol?: string;
  images?: IFoodItemImgDto[];
  labels?: IFoodItemLabelDto[];
  brand?: IFoodItemBrandDto;
}

export interface IFoodItemDto extends IFoddItemBase {
  name: string;
  barcode: string;
  calories: string;
  protein: string;
}
export interface IFoodItemEditDto extends Partial<IFoodItemDto> {}

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
