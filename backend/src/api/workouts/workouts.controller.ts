import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { workoutsService } from "./workouts.service";
import {
  CreateWorkoutSchema,
  UpdateWorkoutSchema,
  WorkoutQuerySchema,
} from "./workouts.validations";
import { workoutUtils } from "./workout.utils";

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const filter = WorkoutQuerySchema.parse(req.query);

    const workoutsData = await workoutsService.get(filter, userId);
    const workouts = workoutUtils.buildDTOArr(workoutsData);

    res.status(200).json(workouts);
  } catch (error) {
    const err = AppError.handleResponse(error);

    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const { id } = req.params;

    const workoutData = await workoutsService.getById(id, userId);
    if (!workoutData) {
      throw new AppError("Workout not found", 404);
    }
    const workout = workoutUtils.buildDTO(workoutData);

    if (!workout) {
      throw new AppError("Workout not found", 404);
    }

    res.status(200).json(workout);
  } catch (error) {
    const err = AppError.handleResponse(error);

    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const ownerId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!ownerId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.ownerId = ownerId;

    const validatedData = CreateWorkoutSchema.parse(invalidatedData);

    const workoutData = await workoutsService.create(validatedData);
    const workout = workoutUtils.buildDTO(workoutData);

    res.status(201).json({
      message: "Workout created successfully",
      data: workout,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.userId = id;
    invalidatedData.id = id;

    const validatedData = UpdateWorkoutSchema.parse(invalidatedData);

    const workoutData = await workoutsService.update(id, validatedData);
    const workout = workoutUtils.buildDTO(workoutData);

    res.status(200).json({
      message: "Workout updated successfully",
      data: workout,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);

    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const deleted = await workoutsService.delete(id);

    if (!deleted) {
      throw new AppError("Workout not found", 404);
    }

    res.status(200).json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    const err = AppError.handleResponse(error);

    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
