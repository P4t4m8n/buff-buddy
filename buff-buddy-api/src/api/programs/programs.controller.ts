import { Request, Response } from "express";
import { AppError } from "../../shared/services/Error.service";
import { programsService } from "./programs.service";
import {
  CreateProgramSchema,
  UpdateProgramSchema,
} from "./programs.validations";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";
import { IProgramWithRelations } from "./programs.models";
import { programsUtils } from "./programs.utils";

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const filter = req.query as Record<string, string>;

    const rawPrograms: IProgramWithRelations[] = await programsService.getAll(
      filter
    );

    const programs = rawPrograms.map((program) =>
      programsUtils.buildDTO(program)
    );

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

    const rawProgram = await programsService.getById(id);

    if (!rawProgram) {
      throw new AppError("Program not found", 404);
    }

    const program = programsUtils.buildDTO(rawProgram);

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
    const validatedData = CreateProgramSchema.parse(req.body);
    console.log(JSON.stringify(validatedData, null, 2));

    const id = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!id) {
      throw new AppError("User not authenticated", 401);
    }

    const rawProgram: IProgramWithRelations = await programsService.create(
      validatedData,
      id
    );

    const programDTO = programsUtils.buildDTO(rawProgram);

    res.status(201).json({
      message: "Program created successfully",
      data: programDTO,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    console.log("🚀 ~ createProgram ~ err:", err);
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

    // console.dir(req.body);
    // console.log(JSON.stringify(req.body, null, 2));

    const validatedData = UpdateProgramSchema.parse(req.body);
    console.log(JSON.stringify(validatedData, null, 2));
    // const rawProgram = await programsService.update(id, validatedData, userId);

    // const programDTO = programsUtils.buildDTO(rawProgram);

    res.status(200).json({
      message: "Program updated successfully",
      data: null,
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
