//Lib
import { memo } from "react";
//Utils
import { mealUtil } from "../../../utils/meal.util";
//Components
import MealNutritionExtraDetailsModel from "./MealNutritionExtraDetailsModel";
//UI
import GenericModel from "../../UI/GenericModel";
//Types
import type { IMealFoodItemDTO } from "../../../../../shared/models/meal.model";
import type { IUserDTO } from "../../../../../shared/models/user.model";

interface IMealsDetailsHeroProps {
  mealFoodItems: IMealFoodItemDTO[];
  notes?: string | null;
  owner?: IUserDTO | null;
  route?: "edit" | "details";
}

function MealNutritionDetailsMemo({
  mealFoodItems,
  notes,
  owner,
  route = "details",
}: IMealsDetailsHeroProps) {
  const totalNutrition = mealUtil.calcTotalNutrition(mealFoodItems);

  const editStyle = "grid grid-cols-3 gap-4";
  const detailsStyle = "flex flex-col gap-6 h-full";

  return (
    <div className={route === "edit" ? editStyle : detailsStyle}>
      <span className="border-l-4 border-l-amber-400 px-2 flex items-end gap-2 ">
        <p className="text-2xl">{totalNutrition.calories} </p>
        <p className="text-amber-400/75">Calories</p>
      </span>
      <span className="border-l-4  border-l-green-500 px-2 flex items-end ">
        <p className="text-2xl">{totalNutrition.proteins} </p>
        <p className="text-main-orange/65">gr</p>
        <p className="pl-2 text-green-500/75">Protein</p>
      </span>
      <span className="border-l-4 border-l-pink-500 px-2 flex items-end gap-2 ">
        <p className="text-2xl">{totalNutrition.carbohydrates} </p>
        <p className="text-pink-500/75 text-ba">Carbs</p>
      </span>

      <GenericModel
        Model={MealNutritionExtraDetailsModel}
        modelProps={{ totalNutrition, notes, owner }}
        isOverlay={true}
        buttonProps={{
          children: "More Details",
          className:
            "text-lg border rounded bg-gradient-to-b from-black-800 to-black-500 w-full md:max-w-40 mt-auto col-span-full",
        }}
      />
    </div>
  );
}

const arePropsEqual = (
  prevProps: IMealsDetailsHeroProps,
  nextProps: IMealsDetailsHeroProps
) => {
  if (prevProps.mealFoodItems !== nextProps.mealFoodItems) {
    return false;
  }
  return true;
};

export default memo(MealNutritionDetailsMemo, arePropsEqual);
