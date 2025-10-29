import type {
  IUserMealDTO,
  IUserMealEditDTO,
  IUserMealFilter,
} from "../../../../shared/models/userMeal.model";
import type {
  TUserMealCreateValidatedInput,
  TUserMealUpdateValidatedInput,
  TUserMealQuery,
} from "../../../../shared/validations/userMeal.validation";
import { userMealValidation } from "../../../../shared/validations/userMeal.validation";
import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";
import type { IUserMeal } from "./userMeal.model";
import userMealService from "./userMeal.service";

export const userMealController = genericControllerFactory<
  IUserMealDTO,
  IUserMealEditDTO,
  IUserMealFilter,
  TUserMealCreateValidatedInput,
  TUserMealUpdateValidatedInput,
  TUserMealQuery,
  IUserMeal
>({
  service: userMealService,
  validation: userMealValidation,
  entityName: "UserMeal",
  isAuth: false,
});
