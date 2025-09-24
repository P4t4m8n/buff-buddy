import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { mealsService } from "./meals.service";
import { AppError } from "../../shared/services/Error.service";

import { mealValidation } from "../../../../shared/validations/meal.validations";
import { validationUtil } from "../../../../shared/validations/util.validation";

import type { Request, Response } from "express";

export const getMeals = async (req: Request, res: Response) => {
  try {
    const filter = mealValidation.QuerySchema.parse(req.query);
    const meals = await mealsService.get({ filter });

    res
      .status(200)
      .json({ message: "Meals retrieved successfully", data: meals });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  try {
    const id = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(req.params);
    const meal = await mealsService.getById(id);

    if (!meal) {
      throw new AppError("Meal not found", 404);
    }

    res.status(200).json({
      message: "Meal retrieved successfully",
      data: meal,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const createMeal = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    const validatedData = mealValidation
      .createFactorySchema({ toSanitize: true })
      .parse(req.body);

    if (!userId || validatedData.ownerId !== userId) {
      throw AppError.create("Not Allowed", 401);
    }

    const meal = await mealsService.create(validatedData);

    res.status(201).json({
      message: "Meal created successfully",
      data: meal,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    const invalidatedData = { ...req.body, id };

    const validatedData = mealValidation
      .updateFactorySchema({ toSanitize: true })
      .parse(invalidatedData);

    if (!userId || validatedData.ownerId !== userId) {
      throw AppError.create("Not Allowed", 401);
    }

    const meal = await mealsService.update(validatedData);

    res.status(201).json({
      message: "Meal updated successfully",
      data: meal,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const deleteMeal = async (req: Request, res: Response) => {
  try {
    const validateId = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(req.params);

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    const mealToDelete = await mealsService.getById(validateId);
    if (!mealToDelete) {
      throw AppError.create("Meal not found", 404);
    }

    if (!userId || mealToDelete.ownerId !== userId) {
      throw AppError.create("Not Allowed", 401);
    }

    await mealsService.remove(validateId);
    res.status(200).json({
      message: "Meal deleted successfully",
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
