import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import { mealController } from "./meals.controller";

export const mealsRoutes = Router();

mealsRoutes.get("/", requireAuth, mealController.getAll);
mealsRoutes.get("/:id", requireAuth, mealController.getById);

mealsRoutes.post("/edit", requireAuth, mealController.create);
mealsRoutes.put("/edit/:id", requireAuth, mealController.update);

mealsRoutes.delete("/:id", requireAuth, mealController.remove);
