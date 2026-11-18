import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { AppError } from "../../shared/services/Error.service";
import { dashboardService } from "./dashboard.service";

import type { Request, Response } from "express";

const getDashboard = async (_: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw AppError.create("User not authenticated", 401);
    }

    const dashboard = await dashboardService.getDashboard(userId);

    res.status(200).json({
      message: "Dashboard retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const dashboardController = {
  getDashboard,
};
