import { Request, Response, NextFunction } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { User } from "../../prisma/generated/prisma";
import { authService } from "../api/auth/auth.service";
import { COOKIE } from "../api/auth/auth.consts";

export interface IAsyncStorageData {
  sessionUser?: Partial<User>;
}

export const asyncLocalStorage = new AsyncLocalStorage<IAsyncStorageData>();

export async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const storage: IAsyncStorageData = {};

  asyncLocalStorage.run(storage, async () => {
    try {
      if (!req.cookies) {
        return;
      }
      
      const { token } = req.cookies;
      if (typeof token !== "string") {
        return;
      }

      const user = await authService.validateToken(token);

      if (user) {
        const alsStore = asyncLocalStorage.getStore();
        if (alsStore) {
          alsStore.sessionUser = user;
        }
      }
    } catch (error) {
      console.error("Error setting up async local storage:", error);
      res.clearCookie("token", COOKIE);
    } finally {
      next();
    }
  });
}
