import { Request, Response } from "express";

import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { mealsService } from "./meals.service";

import { mealValidation } from "../../../../shared/validations/meal.validations";
import { AppError } from "../../shared/services/Error.service";

export const getMeals = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const filter = mealValidation.MealQuerySchema.parse(req.query);
    const exercises = await mealsService.getAll({ filter });

    res.status(200).json(exercises);
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  try {
    const { id } = mealValidation.MealIdParamsSchema.parse(req.params);

    const meal = await mealsService.getById(id);

    if (!meal) {
      throw new AppError("Meal not found", 404);
    }

    res.status(200).json({
      data: meal,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
