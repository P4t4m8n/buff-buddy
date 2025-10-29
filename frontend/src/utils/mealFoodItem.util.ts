import type {
  IMealFoodItemDTO,
  IMealFoodItemEditDTO,
} from "../../../shared/models/meal.model";
import  getTempId  from "../../../shared/utils/getTempId";

const getEmpty = (): IMealFoodItemEditDTO => {
  return {
    id: getTempId(),
    foodItemId: null,
    quantity: null,
    crudOperation: "create",
  };
};
const dtoToEditDto = (dto: IMealFoodItemDTO): IMealFoodItemEditDTO => ({
  id: dto.id,
  foodItemId: dto.foodItem?.id || null,
  quantity: dto.quantity || null,
  crudOperation: "read",
  foodItem: dto.foodItem,
});

export const mealFoodItemUtil = {
  getEmpty,
  dtoToEditDto,
};
