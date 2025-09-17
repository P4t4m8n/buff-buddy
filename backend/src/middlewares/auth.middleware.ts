import { asyncLocalStorage } from "./localStorage.middleware";
import { AppError } from "../shared/services/Error.service";

import type { Request, Response, NextFunction } from "express";

export const requireAuth = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const store = asyncLocalStorage.getStore();
  if (!store?.sessionUser) {
    const err = AppError.create("Not Authenticated", 401);

    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
    });
    return;
  }

  next();
};

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const store = asyncLocalStorage.getStore();
  const sessionUser = store?.sessionUser;

  if (!sessionUser) {
    res.status(401).send("Not Authenticated");
    return;
  }

  if (!sessionUser.isAdmin) {
    res.status(403).send("Not Authorized");
    return;
  }

  next();
}
