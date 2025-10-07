import { Router } from "express";

import { authController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/sign-in", authController.signIn);
authRoutes.post("/sign-up", authController.signUp);

authRoutes.post("/sign-out", authController.signOut);

authRoutes.get("/google/callback", authController.googleCallback);
authRoutes.get("/session-user", authController.getSessionUser);

authRoutes.delete("/delete-user/:id", authController.deleteUser);
