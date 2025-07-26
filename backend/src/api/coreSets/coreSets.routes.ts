import { Router } from "express";
import {
  getCoreSets,
  getCoreSetById,
  createCoreSet,
  updateCoreSet,
  deleteCoreSet,
} from "./coreSets.controller";

export const coreSetsRoutes = Router();

coreSetsRoutes.get("/", getCoreSets);
coreSetsRoutes.get("/:id", getCoreSetById);
coreSetsRoutes.post("/edit", createCoreSet);
coreSetsRoutes.put("/edit/:id", updateCoreSet);
coreSetsRoutes.delete("/:id", deleteCoreSet);
