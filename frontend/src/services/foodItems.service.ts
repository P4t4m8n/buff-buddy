import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import { genericServiceFactory } from "./generic.service";

import type {
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
} from "../../../shared/models/foodItem.model";

import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
} from "../../../shared/validations/foodItem.validation";

const rootPath = "/food-items";

export const foodItemService = genericServiceFactory<
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery
>({
  rootPath,
  validation: foodItemValidation,
});
