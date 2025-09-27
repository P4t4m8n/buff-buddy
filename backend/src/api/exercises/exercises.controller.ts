import { exerciseService } from "./exercises.service";

import { exerciseValidation } from "../../../../shared/validations/exercise.validation";

import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";

import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
} from "../../../../shared/validations/exercise.validation";
import { IExercise } from "./exercises.models";

export const exerciseController = genericControllerFactory<
  IExerciseDTO,
  IExerciseDTO,
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
