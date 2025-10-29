import type {
  IMealEditDTO,
  IMealDTO,
  IMealFoodItemDTO,
} from "../../../shared/models/meal.model";
import  getTempId  from "../../../shared/utils/getTempId";
import type { TNutritionKey } from "../models/meal.model";
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

const calcNutrition = (
  quantity?: number | string | null,
  valuePer100g?: number | string | null
) => {
  return (Number(quantity ?? 1) / 100) * Number(valuePer100g ?? 0);
};

const calcTotalNutrition = (mealFoodItems?: IMealFoodItemDTO[]) => {
  const totals: Partial<Record<TNutritionKey, number>> = {
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    sugars: 0,
    fat: 0,
    saturatedFat: 0,
    fiber: 0,
    salt: 0,
    cholesterol: 0,
  };

  const keys = Object.keys(totals) as Array<TNutritionKey>;
  mealFoodItems?.forEach((item) => {
    keys.forEach((key) => {
      const itemValue = calcNutrition(item?.quantity, item?.foodItem?.[key]);
      totals[key] = Math.round(((totals[key] ?? 0) + itemValue) * 100) / 100;
    });
  });

  return totals;
};

export const mealUtil = {
  getEmpty,
  dtoToEditDto,
  calcTotalNutrition,
};
