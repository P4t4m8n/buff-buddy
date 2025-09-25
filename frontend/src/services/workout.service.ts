import { genericServiceFactory } from "./generic.service";
import { workoutValidation } from "../../../shared/validations/workout.validations";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import type {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
} from "../../../shared/validations/workout.validations";

const rootPath = "/workouts" as const;

export const workoutService = genericServiceFactory<
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutFilter,
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
  typeof workoutValidation.QuerySchema
>({
  rootPath,
  validation: workoutValidation,
});
