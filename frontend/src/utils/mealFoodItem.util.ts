import type {
  IMealFoodItemDTO,
  IMealFoodItemEditDTO,
} from "../../../shared/models/meal.model";

const getEmpty = (): IMealFoodItemEditDTO => {
  return {
    id: "",
    foodItemId: null,
    quantity: null,
  };
};
const dtoToEditDto = (dto: IMealFoodItemDTO): IMealFoodItemEditDTO => ({
  id: dto.id,
  foodItemId: dto.foodItem?.id || null,
  quantity: dto.quantity || null,
});

export const MealFoodItemUtil = {
  getEmpty,
  dtoToEditDto,
};
