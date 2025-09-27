import { workoutsService } from "./workouts.service";

import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";
import { workoutValidation } from "../../../../shared/validations/workout.validations";

import type {
  TWorkoutCreateValidatedInput,
  TWorkoutQuery,
  TWorkoutUpdateValidatedInput,
} from "../../../../shared/validations/workout.validations";
import {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutFilter,
} from "../../../../shared/models/workout.model";
import type { IWorkout } from "./workouts.models";

export const workoutsController = genericControllerFactory<
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutFilter,
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery,
  IWorkout
>({
  service: workoutsService,
  validation: workoutValidation,
  entityName: "Workout",
  isAuth: false,
});
