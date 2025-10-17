import { useEffect, useState } from "react";
import type { IMealFoodItemEditDTO } from "../../../../../shared/models/meal.model";
import { mealFoodItemUtil } from "../../../utils/mealFoodItem.util";
import type { IUseMealFoodItemEditProps } from "../../../models/meal.model";
import type { IFoodItemDTO } from "../../../../../shared/models/foodItem.model";

const useMealFoodItemEdit = ({
  mealFoodItem,
  handleMealFoodItem,
  removeMealFoodItem,
}: IUseMealFoodItemEditProps) => {
  const [foodItemToEdit, setFoodItemToEdit] =
    useState<IMealFoodItemEditDTO | null>(null);

  useEffect(() => {
    const _mealFoodItem = mealFoodItem
      ? mealFoodItemUtil.dtoToEditDto(mealFoodItem)
      : mealFoodItemUtil.getEmpty();
    setFoodItemToEdit(_mealFoodItem);
  }, [mealFoodItem]);

  const selectFoodItem = (foodItem: IFoodItemDTO) => {
    setFoodItemToEdit((prev) => ({
      ...prev,
      foodItem,
      foodItemId: foodItem.id,
    }));
    return;
  };

  const deselectFoodItem = (foodItem: IFoodItemDTO) => {
    if (!foodItem.id?.startsWith("temp")) {
      removeMealFoodItem!(foodItemToEdit?.id);
    }
    setFoodItemToEdit((prev) => ({
      ...prev,
      foodItem: null,
      foodItemId: null,
    }));
    return;
  };

  const saveToMeal = () => {
    if (!foodItemToEdit) return;
    const crudOperation =
      foodItemToEdit.crudOperation === "read"
        ? "update"
        : foodItemToEdit.crudOperation;

    foodItemToEdit.crudOperation = crudOperation;

    handleMealFoodItem(foodItemToEdit);

    return;
  };

  return {
    foodItemToEdit,
    selectFoodItem,
    deselectFoodItem,
    saveToMeal,
    setFoodItemToEdit,
  };
};

export default useMealFoodItemEdit;
