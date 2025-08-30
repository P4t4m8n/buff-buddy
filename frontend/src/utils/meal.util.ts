import type { IMealEditDTO } from "../../../shared/models/meal.model";
import { appUtil } from "./app.util";
import { MealFoodItemUtil } from "./mealFoodItem.util";

const getEmpty = (): IMealEditDTO => ({
  id: appUtil.getTempId(),
  name: "",
  ownerId: null,
  mealType: "breakfast",
  mealFoodItems: [],
});

const dtoToEditDto = (dto: IMealEditDTO): IMealEditDTO => ({
  ...dto,
  ownerId: dto.owner?.id || null,
  mealFoodItems:
    dto.mealFoodItems?.map((mfi) => MealFoodItemUtil.dtoToEditDto(mfi)) || [],
});

export const MealUtils = {
  getEmpty,
  dtoToEditDto,
};
