import type {
  IMealDTO,
  IMealFoodItemEditDTO,
} from "../../../shared/models/meal.model";
import type { NUTRITION_KEYS } from "../consts/meal.consts";
import type { IItemPreviewProps } from "./UI.model";

export type TMealActionRoute = "dietEdit" | "mealList";

export interface IMealPreviewProps
  extends IItemPreviewProps<IMealDTO, TMealActionRoute> {}

export interface IUseMealFoodItemEditProps {
  mealFoodItem?: IMealFoodItemEditDTO;
  handleMealFoodItem: (mealFoodItem: IMealFoodItemEditDTO) => void;
  removeMealFoodItem?: (mealFoodItemId?: string) => void;
}

export type TNutritionKey = (typeof NUTRITION_KEYS)[number];
