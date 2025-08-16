import { Request, Response } from "express";

import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { AppError } from "../../shared/services/Error.service";

import { CreateUserWorkoutSchema } from "./userWorkout.validations";

import { userWorkoutService } from "./userWorkouts.service";

import { userWorkoutsUtils } from "./userWorkouts.util";

export const createUserWorkout = async (req: Request, res: Response) => {
  try {
    const ownerId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!ownerId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.ownerId = ownerId;

    const validatedData = CreateUserWorkoutSchema.parse(invalidatedData);

    const userWorkoutData = await userWorkoutService.create(validatedData);
    const userWorkoutDTO = userWorkoutsUtils.buildDTO(userWorkoutData);

    res.status(201).json({
      message: "User-Workout created successfully",
      data: userWorkoutDTO,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getLastWorkout = async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;

    if (!workoutId) {
      throw new AppError("Workout ID is required", 400);
    }

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const userWorkout = await userWorkoutService.getLastUserWorkout(
      workoutId,
      userId
    );

    if (!userWorkout) {
      return res.status(404).json({
        message: "No workout found for the given ID",
      });
    }

    const userWorkoutDTO = userWorkoutsUtils.buildDTO(userWorkout);

    res.status(200).json({
      message: "Last User-Workout retrieved successfully",
      data: userWorkoutDTO,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
