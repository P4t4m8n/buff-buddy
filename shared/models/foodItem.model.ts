import { FOOD_ITEMS_INFOS } from "../consts/foodItem.consts";
import type { IBaseFilter, ICrudOperation } from "./app.model";
import type { IEntity, IName } from "./entity.model";

interface IFoodItemBase extends IEntity, IName {
  barcode?: string | number | null;
  name?: string;
  servingSize?: number | null;
  calories?: string | number | null;
  proteins?: string | number | null;
  carbohydrates?: string | number | null;
  sugars?: string | number | null;
  fat?: string | number | null;
  saturatedFat?: string | number | null;
  fiber?: string | number | null;
  salt?: string | number | null;
  cholesterol?: string | number | null;
}

export interface IFoodItemDTO extends IFoodItemBase {
  images?: IFoodItemImgDto[];
  labels?: IFoodItemInfoDTO[];
  brand?: IFoodItemInfoDTO | null;
  categories?: IFoodItemInfoDTO[];
}
/*
 * Brand is an array on edit, to handle crud operation on it.
 * Maybe remove it as it one to one relation?
 */
export interface IFoodItemEditDTO
  extends Partial<IFoodItemBase>,
    ICrudOperation {
  brand?: IFoodItemInfoEditDTO[];
  labels?: IFoodItemInfoEditDTO[];
  images?: IFoodItemImgEditDto[];
  categories?: IFoodItemInfoEditDTO[];
  allergens?: IFoodItemInfoEditDTO[];
  ingredients?: IFoodItemInfoEditDTO[];
  ownerId?: string | null;
}

export interface IFoodItemFilter extends IBaseFilter {
  name?: string | null;
  calories?: string | number | null;
  protein?: string | number | null;
  barcode?: string | null;
}

export interface IFoodItemImgDto extends IEntity {
  foodItemId?: string;
  url?: string;
  altText?: string | null;
}
export interface IFoodItemImgEditDto extends IEntity, ICrudOperation {
  foodItemId?: string | null;
  url?: string;
  altText?: string | null;
}

export interface IFoodItemInfoDTO extends IEntity, IName {
  name?: string;
}
export interface IFoodItemInfoEditDTO
  extends IFoodItemInfoDTO,
    ICrudOperation {}

export type TFoodItemInfo = (typeof FOOD_ITEMS_INFOS)[number];

export interface IFoodItemInfoFilter extends IBaseFilter {
  name?: string | null;
}
