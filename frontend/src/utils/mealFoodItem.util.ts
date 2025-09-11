import type {
  IMealFoodItemDTO,
  IMealFoodItemEditDTO,
} from "../../../shared/models/meal.model";
import { appUtil } from "./app.util";

const getEmpty = (): IMealFoodItemEditDTO => {
  return {
    id: appUtil.getTempId(),
    foodItemId: null,
    quantity: null,
    crudOperation: "create",
  };
};
const dtoToEditDto = (dto: IMealFoodItemDTO): IMealFoodItemEditDTO => ({
  id: dto.id,
  foodItemId: dto.foodItem?.id || null,
  quantity: dto.quantity || null,
  crudOperation: "update",
});

export const mealFoodItemUtil = {
  getEmpty,
  dtoToEditDto,
};
