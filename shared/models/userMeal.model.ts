import type { MealType } from "../../backend/prisma/generated/prisma";
import type { IBaseFilter, IImageEditDTO, ICrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IFoodItemDTO } from "./foodItem.model";
import type { IMealDTO } from "./meal.model";
import type { IUserDTO } from "./user.model";

interface IUserMealBase extends IEntity {
  user?: IUserDTO | null;
  meal?: IMealDTO | null;
  notes?: string | null;
  dateConsumed?: Date | string;
}

export interface IUserMealDTO extends IUserMealBase {
  userMealItems: IUserMealFoodItemDTO[];
}

export interface IUserMealEditDTO extends IUserMealBase {
  userMealItems?: IUserMealFoodItemEditDTO[];
  userId?: string | null;
}

export interface IUserMealFoodItemDTO extends IEntity {
  foodItem?: IFoodItemDTO | null;
  quantity?: number | null;
}

export interface IUserMealFoodItemEditDTO
  extends IUserMealFoodItemDTO,
    ICrudOperation {
  foodItemId?: string | null;
}

export interface IUserMealFilter extends IBaseFilter {
  name?: string;
  mealType?: MealType;
}
