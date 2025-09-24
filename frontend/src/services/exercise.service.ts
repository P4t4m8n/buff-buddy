import { genericServiceFactory } from "./generic.service";

import { exerciseValidation } from "../../../shared/validations/exercise.validation";

import {
  type TCreateExerciseInput,
  type TUpdateExerciseInput,
} from "../../../shared/validations/exercise.validation";

import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";

const rootPath = "/exercises" as const;

export const exerciseService = genericServiceFactory<
  IExerciseDTO,
  IExerciseDTO,
  IExerciseFilter,
  TCreateExerciseInput,
  TUpdateExerciseInput,
  typeof exerciseValidation.QuerySchema
>({
  rootPath,
  validation: exerciseValidation,
});
