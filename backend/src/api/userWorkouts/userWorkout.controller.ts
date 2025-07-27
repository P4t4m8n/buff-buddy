import { Request, Response } from "express";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { AppError } from "../../shared/services/Error.service";
import { CreateUserWorkoutSchema } from "./userWorkout.validations";
import { userWorkoutService } from "./userWorkouts.service";

export const createUserWorkout = async (req: Request, res: Response) => {
  try {
    const ownerId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!ownerId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.ownerId = ownerId;

    const validatedData = CreateUserWorkoutSchema.parse(invalidatedData);

    const workoutData = await userWorkoutService.create(validatedData);
    // const workout = workoutUtils.buildDTO(workoutData);

    res.status(201).json({
      message: "User-Workout created successfully",
      data: workoutData,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
