import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { programsService } from "./programs.service";
import {
  CreateProgramSchema,
  UpdateProgramSchema,
} from "../../../../shared/validations/programs.validations";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { programsUtils } from "./programs.utils";

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const filter = req.query as Record<string, string>;
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const programsData = await programsService.getAll(filter, userId);

    const programs = programsUtils.buildDTOArr(programsData);

    res.status(200).json(programs);
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const programData = await programsService.getById(id, userId);

    if (!programData) {
      throw new AppError("Program not found", 404);
    }

    const program = programsUtils.buildDTO(programData);

    res.status(200).json(program);
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const createProgram = async (req: Request, res: Response) => {
  try {
    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;
    invalidatedData.userId = userId;
    const validatedData = CreateProgramSchema.parse(invalidatedData);

    const id = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!id) {
      throw new AppError("User not authenticated", 401);
    }

    const programData = await programsService.create(validatedData, id);

    const program = programsUtils.buildDTO(programData);

    res.status(201).json({
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const validatedData = UpdateProgramSchema.parse(req.body);
    const programData = await programsService.update(id, validatedData, userId);

    const program = programsUtils.buildDTO(programData);

    res.status(200).json({
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const program = await programsService.delete(id);

    res.status(200).json({
      message: "Program deleted successfully",
      data: program,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
