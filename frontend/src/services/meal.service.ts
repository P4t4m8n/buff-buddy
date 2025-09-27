import { mealValidation } from "../../../shared/validations//meal.validations";
import { genericServiceFactory } from "./generic.service";

import type {
  IMealDTO,
  IMealEditDTO,
  IMealFilter,
} from "../../../shared/models/meal.model";
import type {
  TMealCreateValidatedInput,
  TMealQuery,
  TMealUpdateValidatedInput,
} from "../../../shared/validations//meal.validations";

const rootPath = "/meals";

export const mealService = genericServiceFactory<
  IMealDTO,
  IMealEditDTO,
  IMealFilter,
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery
>({
  rootPath,
  validation: mealValidation,
});
