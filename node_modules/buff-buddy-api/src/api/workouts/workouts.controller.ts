import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { workoutsService } from "./workouts.service";
import {
  CreateWorkoutSchema,
  UpdateWorkoutSchema,
} from "./workouts.validations";
import { workoutUtils } from "./workout.utils";

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const filter = req.query as Record<string, string>;

    const rawWorkouts = await workoutsService.get(filter);

    const workouts = rawWorkouts.map((workout) =>
      workoutUtils.buildDTO(workout)
    );

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
    const { id } = req.params;

    const rawWorkout = await workoutsService.getById(id);

    if (!rawWorkout) {
      throw new AppError("Workout not found", 404);
    }

    const workout = workoutUtils.buildDTO(rawWorkout);

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
    const id = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!id) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.userId = id;

    const validatedData = CreateWorkoutSchema.parse(invalidatedData);

    const rawWorkout = await workoutsService.create(validatedData, id);

    const workout = workoutUtils.buildDTO(rawWorkout);

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

    const rawWorkout = await workoutsService.update(id, validatedData);

    if (!rawWorkout) {
      throw new AppError("Workout not found", 404);
    }

    const updatedWorkout = workoutUtils.buildDTO(rawWorkout);

    res.status(200).json({
      message: "Workout updated successfully",
      data: updatedWorkout,
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
