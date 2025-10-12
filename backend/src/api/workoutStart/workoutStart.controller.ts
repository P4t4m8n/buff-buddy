import { AppError } from "../../shared/services/Error.service";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { userWorkoutService } from "../userWorkouts/userWorkouts.service";
import { programsService } from "../programs/programs.service";

import { workoutPlannerService } from "./workoutStart.service";
import { validationUtil } from "../../../../shared/validations/util.validation";
import type { Request, Response } from "express";

export const workoutStart = async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const validatedWorkoutId = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(workoutId);

    if (!validatedWorkoutId) {
      throw new AppError("Workout ID is required", 400);
    }

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const [userWorkouts, programWorkout] = await Promise.all([
      userWorkoutService.getLastUserWorkouts(validatedWorkoutId, userId),
      programsService.getProgramWorkout(validatedWorkoutId),
    ]);

    if (!programWorkout) {
      return res.status(404).json({
        message: "No Program Workout found for the given ID",
      });
    }

    const plannedUserWorkout = workoutPlannerService.createUserWorkoutPlan({
      userWorkouts,
      programWorkout,
    });
    console.dir(plannedUserWorkout, { depth: 2, colors: true });
    res.status(200).json({
      message: "Workout start was successfully planed",
      data: plannedUserWorkout,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
