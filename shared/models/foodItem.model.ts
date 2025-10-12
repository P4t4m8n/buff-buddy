import { FOOD_ITEMS_INFOS } from "../consts/foodItem.consts";
import type { IBaseFilter, ICrudOperation, TCrudOperation } from "./app.model";
import type { IEntity, IEntityDates } from "./entity.model";

interface IFoodItemBase extends IEntity, IEntityDates {
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
  labels?: IFoodItemLabelDto[];
  brand?: IFoodItemBrandDto | null;
  categories: IFoodItemCategoryDto[];
}
/*
 * Brand is an array on edit, to handle crud operation on it.
 */
export interface IFoodItemEditDTO extends Partial<IFoodItemBase> {
  brand?: IFoodItemBrandEditDto[];
  labels?: IFoodItemLabelEditDto[];
  images?: IFoodItemImgEditDto[];
  categories?: IFoodItemCategoryEditDto[];
  allergens?: IFoodItemAllergensEditDto[];
  ingredients?: IFoodItemIngredientsEditDto[];
  ownerId?: string | null;
}

export interface IFoodItemFilter extends IBaseFilter {
  name?: string | null;
  calories?: string | number | null;
  protein?: string | number | null;
  barcode?: string | null;
}

export interface IFoodItemImgDto extends IEntity, IEntityDates {
  foodItemId?: string;
  url?: string;
  altText?: string | null;
}
export interface IFoodItemImgEditDto
  extends IEntity,
    IEntityDates,
    ICrudOperation {
  foodItemId?: string | null;
  url?: string;
  altText?: string | null;
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
