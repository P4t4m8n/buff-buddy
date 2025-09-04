import type { IFoodItemEditDto } from "../../../shared/models/foodItem.model";

const getEmpty = (): IFoodItemEditDto => {
  return {
    carbohydrates: "",
    fats: "",
    fiber: "",
    sugar: "",
    sodium: "",
    cholesterol: "",
    images: [],
    name: "",
    barcode: "",
    calories: "",
    protein: "",
  };
};

export const foodItemUtil = {
  getEmpty,
};
