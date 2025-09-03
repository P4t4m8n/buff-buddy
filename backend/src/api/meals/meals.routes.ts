import { Router } from "express";
import { getMeals, getMealById } from "./meals.controller";

export const mealsRoutes = Router();

mealsRoutes.get("/", getMeals);
mealsRoutes.get("/:id", getMealById);
