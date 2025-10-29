import { IModel } from "../../shared/models/db.model";

export interface IFoodItem extends IModel {
  barcode: string;
  name: string;
  servingSize?: number | null;
  calories?: number | null;
  proteins?: number | null;
  carbohydrates?: number | null;
  sugars?: number | null;
  fat?: number | null;
  saturatedFat?: number | null;
  fiber?: number | null;
  salt?: number | null;
  cholesterol?: number | null;
  brand?: IFoodItemInfo | null;
  categories?: IFoodItemInfo[] | null;
  labels?: IFoodItemInfo[] | null;
  images?: IFoodItemImg[] | null;
}

export interface IFoodItemInfo extends IModel {
  name: string;
}

export interface IFoodItemImg extends IModel {
  url: string;
  altText?: string | null;
  foodItemId: string;
}
