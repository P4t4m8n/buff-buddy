//Service
import { mealService } from "./meals.service";
import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";
//Validation
import { mealValidation } from "../../../../shared/validations/meal.validations";
//Types
import type {
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery,
} from "../../../../shared/validations/meal.validations";
import {
  IMealDTO,
  IMealEditDTO,
  IMealFilter,
} from "../../../../shared/models/meal.model";
import type { IMeal } from "./meals.model";

export const mealController = genericControllerFactory<
  IMealDTO,
  IMealEditDTO,
  IMealFilter,
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery,
  IMeal
>({
  service: mealService,
  validation: mealValidation,
  entityName: "Meal",
  isAuth: false,
});
