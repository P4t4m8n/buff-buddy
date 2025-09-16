import type { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { userWorkoutService } from "../userWorkouts/userWorkouts.service";
import { programsService } from "../programs/programs.service";

export const workoutStart = async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;

    if (!workoutId) {
      throw new AppError("Workout ID is required", 400);
    }

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const [userWorkouts, programWorkout] = await Promise.all([
      userWorkoutService.getLastUserWorkouts(workoutId, userId),
      programsService.getProgramWorkout(workoutId),
    ]);
    if (!userWorkouts) {
      return res.status(404).json({
        message: "No workout found for the given ID",
      });
    }
    if (!programWorkout) {
      return res.status(404).json({
        message: "No Program Workout found for the given ID",
      });
    }
    console.log("🚀 ~ workoutStart ~ programWorkout:", programWorkout);
    console.log("🚀 ~ workoutStart ~ userWorkouts:", userWorkouts);
    res.status(200);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
