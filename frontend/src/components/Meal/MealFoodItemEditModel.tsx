import { useEffect, useState } from "react";

import FoodItemsIndex from "../FoodItem/FoodItemsIndex";

import NumberInputWIthError from "../UI/Form/NumberInputWIthError";
import Loader from "../UI/loader/Loader";

import { formUtil } from "../../utils/form.util";
import { mealFoodItemUtil } from "../../utils/mealFoodItem.util";

import type { IMealFoodItemEditDTO } from "../../../../shared/models/meal.model";
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
            onChange={(e) => formUtil.handleInputChange(e, setFoodIItemToEdit)}
          />
        </div>
      ) : null}
      <FoodItemsIndex onSelectFoodItem={onSelectFoodItem} />
    </div>
  );
}
