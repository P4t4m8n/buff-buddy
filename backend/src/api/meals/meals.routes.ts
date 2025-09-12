import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} from "./meals.controller";

export const mealsRoutes = Router();

mealsRoutes.get("/", requireAuth, getMeals);
mealsRoutes.get("/:id", requireAuth, getMealById);

mealsRoutes.post("/edit", requireAuth, createMeal);
mealsRoutes.put("/edit/:id", requireAuth, updateMeal);

mealsRoutes.delete("/:id", requireAuth, deleteMeal);
