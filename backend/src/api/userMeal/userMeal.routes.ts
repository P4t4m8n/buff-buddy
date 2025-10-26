import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import { userMealController } from "./userMeal.controller";

export const userMealsRoutes = Router();

userMealsRoutes.get("/", requireAuth, userMealController.getAll);
userMealsRoutes.get("/:id", requireAuth, userMealController.getById);

userMealsRoutes.post("/edit", requireAuth, userMealController.create);
userMealsRoutes.put("/edit/:id", requireAuth, userMealController.update);

userMealsRoutes.delete("/:id", requireAuth, userMealController.remove);
