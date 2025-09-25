import { AppError } from "../../shared/services/Error.service";

import { exerciseService } from "./exercises.service";

import { exerciseValidation } from "../../../../shared/validations/exercise.validation";
import { validationUtil } from "../../../../shared/validations/util.validation";

import type { Request, Response } from "express";

export const getExercises = async (req: Request, res: Response) => {
  try {
    const filter = exerciseValidation.QuerySchema.parse(req.query);
    const exercises = await exerciseService.get(filter);

    res
      .status(200)
      .json({ message: "Exercises retrieved successfully", data: exercises });
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
    const { id } = req.params;
    const validatedId = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(id);

    const exercise = await exerciseService.getById(validatedId);

    if (!exercise) {
      throw new AppError("Exercise not found", 404);
    }

    res.status(200).json({
      message: "Exercise retrieved successfully",
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
    const exerciseDTO = req.body;
    const validatedData = exerciseValidation
      .createFactorySchema({
        toSanitize: true,
      })
      .parse(exerciseDTO);

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
    const id = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(req.params.id);
    console.log("🚀 ~ updateExercise ~ id:", id);

    const validatedData = exerciseValidation
      .updateFactorySchema({
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
    const { id } = req.params;
    const validatedId = validationUtil
      .IDSchemaFactory({ toSanitize: true })
      .parse(id);

    await exerciseService.remove(validatedId);

    res.status(200).json({
      message: "Exercise deleted successfully",
      data: null,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};
