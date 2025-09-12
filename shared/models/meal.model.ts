import type { MealType } from "../../backend/prisma/generated/prisma";
import type { IBaseFilter, IItemImage, TCrudOperation } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IFoodItemDto } from "./foodItem.model";
import type { IUserDTO } from "./user.model";

interface IMealBase extends IEntity {
  owner?: IUserDTO | null;
  name?: string | null;
  mealType: MealType;
  notes?: string | null;
}

export interface IMealDTO extends IMealBase {
  mealFoodItems: IMealFoodItemDTO[];
  images?: IItemImage[];
}

export interface IMealEditDTO extends IMealBase {
  mealFoodItems?: IMealFoodItemEditDTO[];
  ownerId?: string | null;
}

export interface IMealFoodItemDTO extends IEntity {
  foodItem?: IFoodItemDto | null;
  quantity?: number | null;
}
export interface IMealFoodItemEditDTO extends IMealFoodItemDTO {
  foodItemId?: string | null;
  crudOperation?: TCrudOperation;
}

export interface IMealFilter extends IBaseFilter {
  skip: number;
  take: number;
  name?: string;
  mealType?: MealType;
}
