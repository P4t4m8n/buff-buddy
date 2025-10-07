//Services
import { genericServiceFactory } from "./generic.service";
//Validations
import { exerciseValidation } from "../../../shared/validations/exercise.validation";
//Types
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
} from "../../../shared/validations/exercise.validation";
import type {
  IExerciseDTO,
  IExerciseEditDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";

const rootPath = "/exercises" as const;

export const exerciseService = genericServiceFactory<
  IExerciseDTO,
  IExerciseEditDTO,
  IExerciseFilter,
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery
>({
  rootPath,
  validation: exerciseValidation,
});


