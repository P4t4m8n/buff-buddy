import { Router } from "express";
import { authRoutes } from "../api/auth/auth.routes";
import { exerciseRoutes } from "../api/exercises/exercises.routes";
import { programsRoutes } from "../api/programs/programs.routes";
import { workoutRoutes } from "../api/workouts/workouts.routes";
import { userWorkoutsRoutes } from "../api/userWorkouts/userWorkouts.routes";
import { foodItemRoutes } from "../api/foodItem/foodItem.route";

const ROUTES = [
  "auth",
  "exercises",
  "programs",
  "workouts",
  "user-workouts",
  "food-items",
] as const;

export type RouteName = (typeof ROUTES)[number];

export const routesMap = new Map<RouteName, Router>([
  ["auth", authRoutes],
  ["exercises", exerciseRoutes],
  ["programs", programsRoutes],
  ["workouts", workoutRoutes],
  ["user-workouts", userWorkoutsRoutes],
  ["food-items", foodItemRoutes],
]);

export function setupRoutes(app: any, apiVersion: string = "1") {
  const baseUrl = `/api/v${apiVersion}`;

  routesMap.forEach((router, path) => {
    app.use(`${baseUrl}/${path}`, router);
  });
}
