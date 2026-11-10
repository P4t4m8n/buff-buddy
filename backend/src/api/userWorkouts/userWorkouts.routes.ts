import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import {
  createUserWorkout,
  deleteUserWorkout,
  getUserExercises,
  getUserWorkoutById,
} from "./userWorkout.controller";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.get("/user-exercises", requireAuth, getUserExercises);

userWorkoutsRoutes.get("/:userWorkoutId", requireAuth, getUserWorkoutById);

userWorkoutsRoutes.post("/edit", requireAuth, createUserWorkout);

userWorkoutsRoutes.delete("/:userWorkoutId", requireAuth, deleteUserWorkout);
