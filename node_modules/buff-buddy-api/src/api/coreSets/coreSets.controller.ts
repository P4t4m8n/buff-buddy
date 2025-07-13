import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";

export const getCoreSets = async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
export const getCoreSetById = async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
export const createCoreSet = async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
export const updateCoreSet = async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
export const deleteCoreSet = async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
