import { Router } from "express";
import {
  createUserWorkout,
  getLastWorkouts,
  deleteUserWorkout,
} from "./userWorkout.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.post("/", requireAuth, createUserWorkout);

userWorkoutsRoutes.get("/:workoutId/last", requireAuth, getLastWorkouts);

userWorkoutsRoutes.delete("/:userWorkoutId", requireAuth, deleteUserWorkout);
