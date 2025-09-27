import { genericServiceFactory } from "./generic.service";
import { workoutValidation } from "../../../shared/validations/workout.validations";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import type {
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery,
} from "../../../shared/validations/workout.validations";

const rootPath = "/workouts" as const;

export const workoutService = genericServiceFactory<
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutFilter,
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery
>({
  rootPath,
  validation: workoutValidation,
});
