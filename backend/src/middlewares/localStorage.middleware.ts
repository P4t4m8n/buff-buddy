import { Request, Response, NextFunction } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { User } from "../../prisma/generated/prisma";
import { authService } from "../api/auth/auth.service";
import { COOKIE } from "../api/auth/auth.consts";
import { AppError } from "../shared/services/Error.service";

export interface IAsyncStorageData {
  sessionUser?: Partial<User> | null;
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
      const alsStore = asyncLocalStorage.getStore();

      if (!alsStore) {
        throw AppError.create("No async local storage found");
      }

      alsStore.sessionUser = null;

      if (!req.cookies) {
        return;
      }

      const { token } = req.cookies;
      if (typeof token !== "string") {
        throw AppError.create("Invalid token");
      }

      const user = await authService.validateToken(token);

      if (user) {
        alsStore.sessionUser = user;
      }
    } catch (error) {
      res.clearCookie("token", COOKIE);
    } finally {
      next();
    }
  });
}
