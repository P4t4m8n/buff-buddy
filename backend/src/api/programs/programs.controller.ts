import { AppError } from "../../shared/services/Error.service";
import { programsService } from "./programs.service";

import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { programsUtil } from "./programs.util";
import { programValidation } from "../../../../shared/validations/program.validations";

import type { Request, Response } from "express";

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const filter = programValidation.ProgramQuerySchema.parse(req.query);

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const programsData = await programsService.get(filter, userId!);

    const programs = programsUtil.buildDTOArr(programsData);

    res.status(200).json(programs);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    const program = programsUtil.buildDTO(programData);

    res.status(200).json(program);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    const validatedData = programValidation
      .createProgramFactorySchema({ toSanitize: true })
      .parse(invalidatedData);

    const programData = await programsService.create(validatedData, userId);

    const program = programsUtil.buildDTO(programData);

    res.status(201).json({
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
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

    const validatedData = programValidation
      .updateProgramFactorySchema({ toSanitize: true })
      .parse(req.body);

    const programData = await programsService.update(id, validatedData, userId);

    const program = programsUtil.buildDTO(programData);

    res.status(200).json({
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const program = await programsService.remove(id);

    res.status(200).json({
      message: "Program deleted successfully",
      data: program,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
