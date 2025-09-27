import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
  IUserWorkoutFilter,
} from "../../../shared/models/userWorkout";
import { userWorkoutValidation } from "../../../shared/validations/userWorkout.validations";
import type {
  TUserWorkoutCreateValidatedInput,
  TUserWorkoutUpdateValidatedInput,
  TUserWorkoutQuery,
} from "../../../shared/validations/userWorkout.validations";
import { genericServiceFactory } from "./generic.service";

const rootPath = "/user-workouts" as const;

export const userWorkoutService = genericServiceFactory<
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
  IUserWorkoutFilter,
  TUserWorkoutCreateValidatedInput,
  TUserWorkoutUpdateValidatedInput,
  TUserWorkoutQuery
>({
  rootPath,
  validation: userWorkoutValidation,
});
