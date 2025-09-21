import { Router } from "express";
import {
  createExercise,
  getExercises,
  updateExercise,
  getExerciseById,
  deleteExercise,
} from "./exercises.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const exerciseRoutes = Router();

exerciseRoutes.get("/", requireAuth, getExercises);
exerciseRoutes.get("/:id", requireAuth, getExerciseById);

exerciseRoutes.post("/edit", requireAuth, createExercise);
exerciseRoutes.put("/edit/:id", requireAuth, updateExercise);

exerciseRoutes.delete("/:id", requireAuth, deleteExercise);
