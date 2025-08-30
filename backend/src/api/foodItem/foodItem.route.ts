import { Router } from "express";
import {
  createFoodItem,
  updateFoodItem,
  getFoodItems,
  getFoodItemByBarcode,
  getFoodItemById,
  deleteFoodItem,
} from "./foodItem.controller";

export const foodItemRoutes = Router();

foodItemRoutes.get("/", getFoodItems);
foodItemRoutes.get("/:id", getFoodItemById);
foodItemRoutes.get("/barcode/:barcode", getFoodItemByBarcode);

foodItemRoutes.post("/edit", createFoodItem);
foodItemRoutes.put("/edit/:id", updateFoodItem);

foodItemRoutes.delete("/:id", deleteFoodItem);
