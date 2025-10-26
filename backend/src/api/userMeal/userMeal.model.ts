import { IModel } from "../../shared/models/db.model";
import { IFoodItem } from "../foodItems/foodItems.model";
import { IMeal } from "../meals/meals.model";
import { IUser } from "../users/users.model";

export interface IUserMeal extends IModel {
  dateConsumed: Date;
  notes?: string | null;
  meal?: IMeal;
  userMealItems?: IUserMealItem[];
}

interface IUserMealItem extends IModel {
  foodItem: IFoodItem;
  quantity: number;
}
