import { useState } from "react";
import type { IMealFoodItemEditDTO } from "../../../../shared/models/meal.model";
import { apiService } from "../../services/api.service";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";
import type { IModelProps } from "../UI/GenericModel";
import {
  type IFoodItemDto,
  type IFoodItemEditDto,
  type IFoodItemFilter,
} from "../../../../shared/models/foodItem.model";
import { useErrors } from "../../hooks/shared/useErrors";
import { ClientError } from "../../services/ClientError.service";
import { foodItemUtil } from "../../utils/foodItem.util";
import { foodItemService } from "../../services/foodItems.service";
import BarcodeScannerButton from "../BarcodeScanner/BarcodeScannerButton";
import useFoodItemsQuery from "../../hooks/queryHooks/useFoodItemsQuery";
import FoodItemsList from "../FoodItem/FoodItemsList";

interface IMealFoodItemsEditProps extends IModelProps<HTMLDivElement> {
  mealFoodItem?: IMealFoodItemEditDTO;
}

const INITIAL_FILTER = {
  skip: 0,
  take: 10,
  barcode: "",
  name: "",
};

export default function MealFoodItemEditModel({
  mealFoodItem,
  ...props
}: IMealFoodItemsEditProps) {
  const [foodItemToEdit, setFoodIItemToEdit] =
    useState<IFoodItemEditDto | null>(null);

  const { handleError, errors } = useErrors<IFoodItemDto>();

  return (
    <div
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
                   max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border"
    >
      <FoodItemsList />
    </div>
  );
}
