import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import { exerciseController } from "./exercises.controller";

export const exerciseRoutes = Router();

exerciseRoutes.get("/", requireAuth, exerciseController.getAll);
exerciseRoutes.get("/:id", requireAuth, exerciseController.getById);

exerciseRoutes.post("/edit", requireAuth, exerciseController.create);
exerciseRoutes.put("/edit/:id", requireAuth, exerciseController.update);

exerciseRoutes.delete("/:id", requireAuth, exerciseController.remove);

exerciseRoutes.get("/muscles/list", requireAuth, exerciseController.getMuscles);
exerciseRoutes.get("/equipment/list", requireAuth, exerciseController.getEquipment);
