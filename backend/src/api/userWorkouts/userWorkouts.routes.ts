import { Router } from "express";
import { createUserWorkout, getLastWorkouts } from "./userWorkout.controller";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.post("/", createUserWorkout);
userWorkoutsRoutes.get("/:workoutId/last", getLastWorkouts);
