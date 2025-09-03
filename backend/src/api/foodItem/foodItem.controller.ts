import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { foodItemValidation } from "../../../../shared/validations/foodItem.validation";
import { foodItemService } from "./foodItem.service";

export const getFoodItems = async (req: Request, res: Response) => {
  try {
    const filter = foodItemValidation.FoodItemQuerySchema.parse(req.query);
    const foodItems = await foodItemService.getAll(filter);

    res.status(200).json(foodItems);
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getFoodItemById = async (req: Request, res: Response) => {
  try {
    const { id } = foodItemValidation.FoodItemIdParamsSchema.parse(req.params);

    const foodItem = await foodItemService.getById(id);

    if (!foodItem) {
      throw new AppError("Food item not found", 404);
    }

    res.status(200).json({
      data: foodItem,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getFoodItemByBarcode = async (req: Request, res: Response) => {
  try {
    console.log("********************************")
    const { barcode } = foodItemValidation.FoodItemIdBarcodeSchema.parse(
      req.params
    );
    console.log("🚀 ~ getFoodItemByBarcode ~ barcode:", barcode)

    const foodItem = await foodItemService.getByBarCode(barcode);
    console.log("🚀 ~ getFoodItemByBarcode ~ foodItem:", foodItem)

    if (!foodItem) {
      throw new AppError("Food item not found", 404);
    }

    res.status(200).json({
      data: foodItem,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const createFoodItem = async (req: Request, res: Response) => {
  try {
    const validatedData = foodItemValidation
      .createFoodItemFactorySchema({
        toSanitize: true,
      })
      .parse(req.body);

    const foodItem = await foodItemService.create(validatedData);

    res.status(201).json({
      message: "Food item created successfully",
      data: foodItem,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const updateFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = foodItemValidation.FoodItemIdParamsSchema.parse(req.params);
    req.body.id = id;

    const validatedData = foodItemValidation
      .updateFoodItemSchema({
        toSanitize: true,
      })
      .parse(req.body);

    const foodItem = await foodItemService.update(validatedData);

    res.status(200).json({
      data: foodItem,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const deleteFoodItem = async (req: Request, res: Response) => {
  try {
    const { id } = foodItemValidation.FoodItemIdParamsSchema.parse(req.params);

    await foodItemService.delete(id);

    res.status(200).json({
      message: "Food item deleted successfully",
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
