import { Router } from "express";
import { createUserWorkout,getLastWorkout } from "./userWorkout.controller";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.post("/", createUserWorkout);
userWorkoutsRoutes.get("/:workoutId/last", getLastWorkout);
