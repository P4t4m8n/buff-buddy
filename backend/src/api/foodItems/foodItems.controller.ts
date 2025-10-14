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
import { dbUtil } from "../../shared/utils/db.util";

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

const getFoodItemsInfos = async (req: Request, res: Response) => {
  try {
    const foodItemInfoType = req.params.type;

    const validateType =
      foodItemValidation.FoodItemInfoTypeValidation.parse(foodItemInfoType);

    const [itemsData, count] = await foodItemService.getFoodItemInfo(
      validateType,
      {}
    );

    const meta = dbUtil.buildMetaData({
      count,
      take: 100000,
      skip: 0,
    });

    res.setHeader("X-Total-Count", meta.total.toString());
    res.setHeader("X-Total-Pages", meta.totalPages.toString());
    res.setHeader("X-Current-Page", meta.currentPage.toString());
    res.setHeader("X-Per-Page", meta.perPage.toString());

    res.status(200).json({
      message: `${validateType}s retrieved successfully`,
      data: itemsData,
      meta,
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
  getFoodItemsInfos,
};
