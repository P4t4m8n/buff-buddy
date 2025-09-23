import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import {
  createUserWorkout,
  deleteUserWorkout,
  getUserWorkoutById,
} from "./userWorkout.controller";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.get("/:userWorkoutId", requireAuth, getUserWorkoutById);

userWorkoutsRoutes.post("/", requireAuth, createUserWorkout);

userWorkoutsRoutes.delete("/:userWorkoutId", requireAuth, deleteUserWorkout);
