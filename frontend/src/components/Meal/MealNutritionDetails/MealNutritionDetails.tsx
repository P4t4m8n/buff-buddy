import { memo } from "react";
import type { IMealFoodItemDTO } from "../../../../../shared/models/meal.model";
import GenericModel from "../../UI/GenericModel";
import MealNutritionExtraDetailsModel from "./MealNutritionExtraDetailsModel";
import type { TNutritionKey } from "../../../models/meal.model";

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

interface IMealsDetailsHeroProps {
  mealFoodItems: IMealFoodItemDTO[];
}

function MealNutritionDetailsMemo({ mealFoodItems }: IMealsDetailsHeroProps) {
  const totalNutrition = calcTotalNutrition(mealFoodItems);

  return (
    <div className="flex flex-col gap-6 h-full">
      <span className="border-l-4 border-l-amber-400 px-2 flex items-end gap-2">
        <p className="text-2xl">{totalNutrition.calories} </p>
        <p className="text-amber-400/75">Calories</p>
      </span>
      <span className="border-l-4  border-l-green-500 px-2 flex items-end ">
        <p className="text-2xl">{totalNutrition.proteins} </p>
        <p className="text-main-orange/65">gr</p>
        <p className="pl-2 text-green-500/75">Protein</p>
      </span>
      <span className="border-l-4 border-l-pink-500 px-2 flex items-end gap-2">
        <p className="text-2xl">{totalNutrition.carbohydrates} </p>
        <p className="text-pink-500/75 text-ba">Carbs</p>
      </span>

      <GenericModel
        Model={MealNutritionExtraDetailsModel}
        modelProps={{totalNutrition}}
        isOverlay={true}
        buttonProps={{
          children: "More Details",
          className:
            "text-lg border rounded bg-gradient-to-b from-black-800 to-black-500 w-full mt-auto",
        }}
      />
      
    </div>
  );
}

export default memo(MealNutritionDetailsMemo);
