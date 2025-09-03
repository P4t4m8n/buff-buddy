import type {
  IFoodItemDto,
  IFoodItemFilter,
} from "../../../shared/models/foodItem.model";

import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import { apiService } from "./api.service";

const BASE_URL = "/food-items";

const get = async (filter: IFoodItemFilter) => {
  const validateFilter = foodItemValidation.FoodItemQuerySchema.parse(filter);
  return await apiService.get<IFoodItemDto[]>(`${BASE_URL}`, validateFilter);
};

export const foodItemService = {
  get,
};
