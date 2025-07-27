import { Router } from "express";
import { createUserWorkout } from "./userWorkout.controller";

export const userWorkoutsRoutes = Router();

userWorkoutsRoutes.post("/", createUserWorkout);
