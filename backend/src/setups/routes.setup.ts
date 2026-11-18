//Lib
import path from "path";
import { Router } from "express";
//Routes
import { authRoutes } from "../api/auth/auth.routes";
import { exerciseRoutes } from "../api/exercises/exercises.routes";
import { programsRoutes } from "../api/programs/programs.routes";
import { workoutRoutes } from "../api/workouts/workouts.routes";
import { userWorkoutsRoutes } from "../api/userWorkouts/userWorkouts.routes";
import { workoutPlannerRoutes } from "../api/workoutStart/workoutStart.routes";
import { dashboardRoutes } from "../api/dashboard/dashboard.routes";
//Types
import type { Express, Response } from "express";

const ROUTES = [
  "auth",
  "exercises",
  "programs",
  "workouts",
  "user-workouts",
  "workout-start",
  "dashboard",
] as const;
type RouteName = (typeof ROUTES)[number];

export function setupRoutes(app: Express) {
  const routesMap = new Map<RouteName, Router>([
    ["auth", authRoutes],
    ["exercises", exerciseRoutes],
    ["programs", programsRoutes],
    ["workouts", workoutRoutes],
    ["user-workouts", userWorkoutsRoutes],
    ["workout-start", workoutPlannerRoutes],
    ["dashboard", dashboardRoutes],
  ]);
  const apiVersion = process.env.CURRENT_API_VERSION || "1";
  const baseUrl = `/api/v${apiVersion}`;

  routesMap.forEach((router, path) => {
    app.use(`${baseUrl}/${path}`, router);
  });

  app.all("/{*any}", (_, res: Response) => {
    res.sendFile(path.resolve("public/index.html"));
  });
}
