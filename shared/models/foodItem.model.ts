import { FOOD_ITEMS_INFOS } from "../consts/foodItem.consts";
import type { IBaseFilter, TCrudOperation } from "./app.model";
import type { IEntity, IEntityDates } from "./entity.model";

interface IFoddItemBase extends IEntity, IEntityDates {
  carbohydrates?: string | number | null;
  fats?: string | number | null;
  fiber?: string | number | null;
  sugar?: string | number | null;
  sodium?: string | number | null;
  cholesterol?: string | number | null;
  saturatedFat?: string | number | null;
  calories?: string | number | null;
  protein?: string | number | null;
  barcode?: string | number | null;
  name?: string;
}

export interface IFoodItemDTO extends IFoddItemBase {
  images?:  string[];
  labels?: IFoodItemLabelDto[];
  brand?: IFoodItemBrandDto | null;
  categories: IFoodItemCategoryDto[];
}
/*
 * Brand is an array on edit, to handle crud operation on it.
 */
export interface IFoodItemEditDTO extends Partial<IFoddItemBase> {
  brand?: IFoodItemBrandEditDto[];
  labels?: IFoodItemLabelEditDto[];
  images?: string[];
  categories?: IFoodItemCategoryEditDto[];
  allergens?: IFoodItemAllergensEditDto[];
  ingredients?: IFoodItemIngredientsEditDto[];
}

export interface IFoodItemFilter extends IBaseFilter {
  name?: string | null;
  calories?: string | number | null;
  protein?: string | number | null;
  barcode?: string | null;
}

export interface IFoodItemImgDto extends IEntity, IEntityDates {
  foodItemId: string;
  url: string;
}

/*
 * Future me, this part can be simplified, but keeping this
 * structure to match the rest of the app using the crudOperation
 * for junction tables and nested relations
 */
interface IFoodItemInfoBase extends IEntity, IEntityDates {
  name?: string;
}
export interface IFoodItemInfoEditBase extends IEntity, IEntityDates {
  name?: string;
  crudOperation?: TCrudOperation;
}

export interface IFoodItemBrandDto extends IFoodItemInfoBase {}
export interface IFoodItemLabelDto extends IFoodItemInfoBase {}
export interface IFoodItemCategoryDto extends IFoodItemInfoBase {}

export interface IFoodItemBrandEditDto extends IFoodItemInfoEditBase {}
export interface IFoodItemLabelEditDto extends IFoodItemInfoEditBase {}
export interface IFoodItemCategoryEditDto extends IFoodItemInfoEditBase {}
export interface IFoodItemAllergensEditDto extends IFoodItemInfoEditBase {}
export interface IFoodItemIngredientsEditDto extends IFoodItemInfoEditBase {}

export type TFoodItemInfo = (typeof FOOD_ITEMS_INFOS)[number];
