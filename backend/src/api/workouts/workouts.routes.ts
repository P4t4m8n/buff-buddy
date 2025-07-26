import { Router } from "express";

import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "./workouts.controller";

export const workoutRoutes = Router();

workoutRoutes.get("/", getWorkouts);
workoutRoutes.get("/:id", getWorkoutById);

workoutRoutes.post("/edit", createWorkout);
workoutRoutes.put("/edit/:id", updateWorkout);

workoutRoutes.delete("/:id", deleteWorkout);
