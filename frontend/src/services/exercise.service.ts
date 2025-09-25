//-Services
import { genericServiceFactory } from "./generic.service";
//-Validations
import { exerciseValidation } from "../../../shared/validations/exercise.validation";
//-Types
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
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
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery
>({
  rootPath,
  validation: exerciseValidation,
});
