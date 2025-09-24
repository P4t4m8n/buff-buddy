import { AppError } from "../../shared/services/Error.service";
import { foodItemService } from "./foodItem.service";

import { foodItemValidation } from "../../../../shared/validations/foodItem.validation";
import { validationUtil } from "../../../../shared/validations/util.validation";

import type { Request, Response } from "express";

export const getFoodItems = async (req: Request, res: Response) => {
  try {
    const filter = foodItemValidation.QuerySchema.parse(req.query);
    const foodItems = await foodItemService.get(filter);

    res
      .status(200)
      .json({ message: "Food items retrieved successfully", data: foodItems });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const getFoodItemById = async (req: Request, res: Response) => {
  try {
    const id = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(req.params);
    const foodItem = await foodItemService.getById(id);

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

export const getFoodItemByBarcode = async (req: Request, res: Response) => {
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

export const createFoodItem = async (req: Request, res: Response) => {
  try {
    const validatedData = foodItemValidation
      .createFactorySchema({
        toSanitize: true,
      })
      .parse(req.body);

    const foodItem = await foodItemService.create(validatedData);

    res.status(201).json({
      message: "Food item created successfully",
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

export const updateFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invalidatedData = { ...req.body, id };

    const validatedData = foodItemValidation
      .updateFactorySchema({
        toSanitize: true,
      })
      .parse(invalidatedData);

    const foodItem = await foodItemService.update(validatedData);

    res.status(200).json({
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

export const deleteFoodItem = async (req: Request, res: Response) => {
  try {
    const id = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(req.params);

    await foodItemService.remove(id);

    res.status(200).json({
      message: "Food item deleted successfully",
      data: null,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
