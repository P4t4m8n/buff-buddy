import { useEffect, useState } from "react";
import type { IMealFoodItemEditDTO } from "../../../../shared/models/meal.model";

import { useErrors } from "../../hooks/shared/useErrors";

import FoodItemsList from "../FoodItem/FoodItemsList";
import NumberInputWIthError from "../UI/Form/NumberInputWIthError";
import { formUtils } from "../../utils/form.util";
import { mealFoodItemUtil } from "../../utils/mealFoodItem.util";
import Loader from "../UI/loader/Loader";
import type { IModelProps } from "../../models/UI.model";
import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";

interface IMealFoodItemsEditProps extends IModelProps<HTMLDivElement> {
  mealFoodItem?: IMealFoodItemEditDTO;
  handleMealFoodItem: (mealFoodItem: IMealFoodItemEditDTO) => void;
}

export default function MealFoodItemEditModel({
  mealFoodItem,
  ...props
}: IMealFoodItemsEditProps) {
  const [foodItemToEdit, setFoodIItemToEdit] =
    useState<IMealFoodItemEditDTO | null>(null);

  const {} = props;

  useEffect(() => {
    const _mealFoodItem = mealFoodItem
      ? mealFoodItem
      : mealFoodItemUtil.getEmpty();
    setFoodIItemToEdit(_mealFoodItem);
  }, [mealFoodItem]);

  const { handleError, errors } = useErrors<IMealFoodItemEditDTO>();
  console.log("🚀 ~ MealFoodItemEditModel ~ handleError:", handleError);
  console.log("🚀 ~ MealFoodItemEditModel ~ errors:", errors);

  if (!foodItemToEdit) {
    return <Loader />;
  }

  const onSelectFoodItem = (e: React.MouseEvent, foodItem: IFoodItemDto) => {
    e.preventDefault();
    setFoodIItemToEdit((prev) => ({
      ...prev,
      foodItem,
      foodItemId: foodItem.id,
    }));
    console.log("🚀 ~ onSelectFoodItem ~ e:", e);
    console.log("🚀 ~ handleFoodItem ~ foodItem:", foodItem);
  };

  const { id: foodItemToEditId, foodItem } = foodItemToEdit;

  return (
    <div
      className="bg-black-500 p-4 rounded h-main
                    fixed inset-0 z-40 border text-main-orange"
    >
      {foodItem ? (
        <div>
          <NumberInputWIthError
            label="quantity"
            name="quantity"
            inputId={foodItemToEditId}
            onChange={(e) => formUtils.handleInputChange(e, setFoodIItemToEdit)}
          />
        </div>
      ) : null}
      <FoodItemsList onSelectFoodItem={onSelectFoodItem} />
    </div>
  );
}
