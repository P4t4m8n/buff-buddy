import { Router } from "express";
import { foodItemController } from "./foodItems.controller";

export const foodItemRoutes = Router();

foodItemRoutes.get("/", foodItemController.getAll);
foodItemRoutes.get("/:id", foodItemController.getById);
foodItemRoutes.get(
  "/barcode/:barcode",
  foodItemController.getFoodItemByBarcode
);

foodItemRoutes.get("/info/:type", foodItemController.getFoodItemsInfos);

foodItemRoutes.post("/edit", foodItemController.create);
foodItemRoutes.put("/edit/:id", foodItemController.update);

foodItemRoutes.delete("/:id", foodItemController.remove);
