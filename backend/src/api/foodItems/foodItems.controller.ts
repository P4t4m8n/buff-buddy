import { AppError } from "../../shared/services/Error.service";
import { foodItemService } from "./foodItems.service";

import { foodItemValidation } from "../../../../shared/validations/foodItem.validation";
import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";

import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
} from "../../../../shared/validations/foodItem.validation";
import type { Request, Response } from "express";
import {
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
} from "../../../../shared/models/foodItem.model";
import type { IFoodItem } from "./foodItems.model";

const getFoodItemByBarcode = async (req: Request, res: Response) => {
  try {
    const { barcode } = foodItemValidation.FoodItemIdBarcodeSchema.parse(
      req.params
    );

    const foodItem = await foodItemService.getByBarCode(barcode);

    if (!foodItem) {
      throw new AppError("Food item not found", 404);
    }

    res.status(200).json({
      message: "Food item retrieved successfully",
      data: foodItem,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

const foodItemGenericController = genericControllerFactory<
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
  IFoodItem
>({
  service: foodItemService,
  validation: foodItemValidation,
  entityName: "FoodItem",
  isAuth: false,
});

export const foodItemController = {
  ...foodItemGenericController,
  getFoodItemByBarcode,
};
