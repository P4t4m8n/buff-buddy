import { AppError } from "../../shared/services/Error.service";

import { exerciseService } from "./exercises.service";
import { exerciseValidation } from "../../../../shared/validations/exercise.validation";

import type { Request, Response } from "express";

export const getExercises = async (req: Request, res: Response) => {
  try {
    const filter = exerciseValidation.ExerciseQuerySchema.parse(req.query);
    const exercises = await exerciseService.get(filter);

    res.status(200).json(exercises);
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = exerciseValidation.ExerciseParamsSchema.parse(req.params);

    const exercise = await exerciseService.getById(id);

    if (!exercise) {
      throw new AppError("Exercise not found", 404);
    }

    res.status(200).json({
      data: exercise,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const validatedData = exerciseValidation
      .createExerciseFactorySchema({
        toSanitize: true,
      })
      .parse(req.body);

    const exercise = await exerciseService.create(validatedData);

    res.status(201).json({
      message: "Exercise created successfully",
      data: exercise,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = exerciseValidation.ExerciseParamsSchema.parse(req.params);

    const validatedData = exerciseValidation
      .updateExerciseFactorySchema({
        toSanitize: true,
      })
      .parse(req.body);

    const exercise = await exerciseService.update(id, validatedData);

    res.status(200).json({
      message: "Exercise updated successfully",
      data: exercise,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);

    res.status(status).json({
      message,
      errors,
    });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = exerciseValidation.ExerciseParamsSchema.parse(req.params);

    await exerciseService.remove(id);

    res.status(200).json({
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
