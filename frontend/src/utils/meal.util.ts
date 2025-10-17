import type { IMealEditDTO, IMealDTO } from "../../../shared/models/meal.model";
import { getTempId } from "../../../shared/utils/getTempId";
import { mealFoodItemUtil } from "./mealFoodItem.util";

const getEmpty = (): IMealEditDTO => ({
  id: getTempId(),
  name: "",
  ownerId: null,
  mealType: "breakfast",
  mealFoodItems: [],
});

const dtoToEditDto = ({ dto }: { dto: IMealDTO }): IMealEditDTO => ({
  ...dto,
  ownerId: dto.owner?.id || null,
  mealFoodItems:
    dto.mealFoodItems?.map((mfi) => mealFoodItemUtil.dtoToEditDto(mfi)) || [],
});

export const mealUtil = {
  getEmpty,
  dtoToEditDto,
};
