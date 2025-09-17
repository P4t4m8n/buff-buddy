import { AppError } from "../../shared/services/Error.service";
import { workoutsService } from "./workouts.service";

import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { workoutValidation } from "../../../../shared/validations/workout.validations";
import { workoutUtil } from "./workout.util";

import type { Request, Response } from "express";

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const filter = workoutValidation.WorkoutQuerySchema.parse(req.query);

    const workoutsData = await workoutsService.get(filter, userId);
    const workouts = workoutUtil.buildDTOArr(workoutsData);

    res.status(200).json(workouts);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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
    const workout = workoutUtil.buildDTO(workoutData);

    if (!workout) {
      throw new AppError("Workout not found", 404);
    }

    res.status(200).json(workout);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    const validatedData = workoutValidation
      .createWorkoutFactorySchema({ toSanitize: true })
      .parse(invalidatedData);

    const workoutData = await workoutsService.create(validatedData);
    const workout = workoutUtil.buildDTO(workoutData);

    res.status(201).json({
      message: "Workout created successfully",
      data: workout,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    invalidatedData.userId = userId;
    invalidatedData.id = id;

    const validatedData = workoutValidation
      .updateWorkoutFactorySchema({ toSanitize: true })
      .parse(invalidatedData);

    const workoutData = await workoutsService.update(id, validatedData);
    const workout = workoutUtil.buildDTO(workoutData);

    res.status(200).json({
      message: "Workout updated successfully",
      data: workout,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    const deleted = await workoutsService.remove(id);

    if (!deleted) {
      throw new AppError("Workout not found", 404);
    }

    res.status(200).json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
