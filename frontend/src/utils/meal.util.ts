import type { IMealEditDTO } from "../../../shared/models/meal.model";
import { getTempId } from "../../../shared/utils/getTempId";
import { mealFoodItemUtil } from "./mealFoodItem.util";

const getEmpty = (ownerId?: string): IMealEditDTO => ({
  id: getTempId(),
  name: "",
  ownerId: ownerId ?? null,
  mealType: "breakfast",
  mealFoodItems: [],
});

const dtoToEditDto = (dto: IMealEditDTO): IMealEditDTO => ({
  ...dto,
  ownerId: dto.owner?.id || null,
  mealFoodItems:
    dto.mealFoodItems?.map((mfi) => mealFoodItemUtil.dtoToEditDto(mfi)) || [],
});

export const mealUtil = {
  getEmpty,
  dtoToEditDto,
};
