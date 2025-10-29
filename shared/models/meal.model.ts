import type { MealType } from "../../backend/prisma/generated/prisma";
import type {
  IBaseFilter,
  IImageDTO,
  TCrudOperation,
  IImageEditDTO,
} from "./app.model";
import type { IID } from "./entity.model";
import type { IFoodItemDTO } from "./foodItem.model";
import type { IUserDTO } from "./user.model";

interface IMealBase extends IID {
  owner?: IUserDTO | null;
  name?: string | null;
  mealType?: MealType;
  notes?: string | null;
}

export interface IMealDTO extends IMealBase {
  mealFoodItems: IMealFoodItemDTO[];
  images: IImageDTO[];
}

export interface IMealEditDTO extends IMealBase {
  mealFoodItems?: IMealFoodItemEditDTO[];
  ownerId?: string | null;
  images?: IImageEditDTO[];
}

export interface IMealFoodItemDTO extends IID {
  foodItem?: IFoodItemDTO | null;
  quantity?: number | null;
}
export interface IMealFoodItemEditDTO extends IMealFoodItemDTO {
  foodItemId?: string | null;
  crudOperation?: TCrudOperation;
}

export interface IMealFilter extends IBaseFilter {
  name?: string;
  mealType?: MealType;
}
