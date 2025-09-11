import { useEffect, useState } from "react";

import FoodItemsIndex from "../FoodItem/FoodItemsIndex";

import NumberInputWIthError from "../UI/Form/NumberInputWIthError";
import Loader from "../UI/loader/Loader";

import { formUtil } from "../../utils/form.util";
import { mealFoodItemUtil } from "../../utils/mealFoodItem.util";

import type { IMealFoodItemEditDTO } from "../../../../shared/models/meal.model";
import type { IModelProps } from "../../models/UI.model";
import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";
import FoodItemPreview from "../FoodItem/FoodItemPreview";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";

interface IMealFoodItemsEditProps extends IModelProps<HTMLDivElement> {
  mealFoodItem?: IMealFoodItemEditDTO;
  handleMealFoodItem: (mealFoodItem: IMealFoodItemEditDTO) => void;
}

export default function MealFoodItemEditModel({
  mealFoodItem,
  handleMealFoodItem,
  ...props
}: IMealFoodItemsEditProps) {
  const [foodItemToEdit, setFoodIItemToEdit] =
    useState<IMealFoodItemEditDTO | null>(null);

  const { setIsOpen, handleModel } = props;

  useEffect(() => {
    const _mealFoodItem = mealFoodItem
      ? mealFoodItemUtil.dtoToEditDto(mealFoodItem)
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

  const onDeselectFoodItem = (e: React.MouseEvent, _: IFoodItemDto) => {
    e.preventDefault();

    setFoodIItemToEdit((prev) => ({
      ...prev,
      foodItem: null,
      foodItemId: null,
    }));
  };

  const OnSaveToMeal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!foodItemToEdit) return;
    handleMealFoodItem(foodItemToEdit);
    if (setIsOpen) setIsOpen(false);
  };

  const { id: foodItemToEditId, foodItem } = foodItemToEdit;

  return (
    <div
      className="bg-black-500 p-4 rounded h-main
                    fixed inset-0 z-40 border text-main-orange"
    >
      <Button
        className="border-main-orange border rounded-full w-10 aspect-auto -rotate-90"
        onClick={handleModel}
      >
        <IconArrow className="w-full aspect-square fill-main-orange" />
      </Button>
      {foodItem ? (
        <div className="flex flex-col gap-4">
          <NumberInputWIthError
            label="quantity"
            name="quantity"
            inputId={foodItemToEditId}
            onChange={(e) => formUtil.handleInputChange(e, setFoodIItemToEdit)}
          />
          <FoodItemPreview
            item={foodItem}
            onSelectFoodItem={onDeselectFoodItem}
            isSelect={false}
          />
          <Button
            buttonStyle="save"
            type="button"
            className="w-full"
            onClick={OnSaveToMeal}
          >
            Save to Meal
          </Button>
        </div>
      ) : (
        <FoodItemsIndex onSelectFoodItem={onSelectFoodItem} />
      )}
    </div>
  );
}
