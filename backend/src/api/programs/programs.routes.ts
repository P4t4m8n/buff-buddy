import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware";

import {
  createProgram,
  deleteProgram,
  getProgramById,
  getPrograms,
  updateProgram,
} from "./programs.controller";


export const programsRoutes = Router();

programsRoutes.get("/", requireAuth, getPrograms);
programsRoutes.get("/:id", requireAuth, getProgramById);

programsRoutes.post("/edit", requireAuth, createProgram);
programsRoutes.put("/edit/:id", requireAuth, updateProgram);

programsRoutes.delete("/:id", requireAuth, deleteProgram);
