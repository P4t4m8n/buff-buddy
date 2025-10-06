import { exerciseService } from "./exercises.service";
import { AppError } from "../../shared/services/Error.service";

import { dbUtil } from "../../shared/utils/db.util";

import { exerciseValidation } from "../../../../shared/validations/exercise.validation";

import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";

import type {
  IExerciseDTO,
  IExerciseEditDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
} from "../../../../shared/validations/exercise.validation";
import type { IExercise } from "./exercises.models";
import type { IGetMetaData } from "../../../../shared/models/metaData.model";
import type { Response, Request } from "express";

const exerciseGenericController = genericControllerFactory<
  IExerciseDTO,
  IExerciseEditDTO,
  IExerciseFilter,
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
  IExercise
>({
  service: exerciseService,
  validation: exerciseValidation,
  entityName: "Exercise",
  isAuth: false,
});

const getMuscles = async (req: Request, res: Response) => {
  try {
    const [muscles, count] = await exerciseService.getMuscles();

    const meta: IGetMetaData = dbUtil.buildMetaData({
      count,
    });

    res.setHeader("X-Total-Count", meta.total.toString());

    res.status(200).json({
      message: `muscles retrieved successfully`,
      data: muscles,
      meta,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({ message, errors });
  }
};

const getEquipment = async (_: Request, res: Response) => {
  try {
    const [equipment, count] = await exerciseService.getEquipment();

    const meta: IGetMetaData = dbUtil.buildMetaData({
      count,
    });

    res.setHeader("X-Total-Count", meta.total.toString());

    res.status(200).json({
      message: `equipment retrieved successfully`,
      data: equipment,
      meta,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({ message, errors });
  }
};

export const exerciseController = {
  ...exerciseGenericController,
  getMuscles,
  getEquipment,
};
