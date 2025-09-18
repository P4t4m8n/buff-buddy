import { Router } from "express";
import { workoutStart } from "./workoutStart.controller";

export const workoutPlannerRoutes = Router();

workoutPlannerRoutes.get("/:workoutId", workoutStart);
