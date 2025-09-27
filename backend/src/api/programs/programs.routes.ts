import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import { programsController } from "./programs.controller";

export const programsRoutes = Router();

programsRoutes.get("/", requireAuth, programsController.getAll);
programsRoutes.get("/:id", requireAuth, programsController.getById);

programsRoutes.post("/edit", requireAuth, programsController.create);
programsRoutes.put("/edit/:id", requireAuth, programsController.update);

programsRoutes.delete("/:id", requireAuth, programsController.remove);
