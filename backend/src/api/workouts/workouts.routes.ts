import { Router } from "express";

import { workoutsController } from "./workouts.controller";

import { requireAuth } from "../../middlewares/auth.middleware";

export const workoutRoutes = Router();

workoutRoutes.get("/", requireAuth, workoutsController.getAll);
workoutRoutes.get("/:id", requireAuth, workoutsController.getById);

workoutRoutes.post("/edit", requireAuth, workoutsController.create);
workoutRoutes.put("/edit/:id", requireAuth, workoutsController.update);

workoutRoutes.delete("/:id", requireAuth, workoutsController.remove);
