import { z } from "zod";

import { validationUtil } from "./util.validation";

import { MEAL_TYPES } from "../consts/meal.consts";

import type { IToSanitize } from "../models/app.model";
import type { IValidation } from "../models/validation.model";
import type { IMealEditDTO, IMealFilter } from "../models/meal.model";

const createMealFoodItemFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    crudOperation: z
      .optional(validationUtil.CrudOperationEnumSchema)
      .default("read"),
    quantity: validationUtil.numberValidation({
      fieldName: "quantity",
      minLength: 0.1,
      maxLength: 10000,
    }),
    foodItemId: validationUtil.IDSchemaFactory({ toSanitize }),
  });
};

const updateMealFoodItemFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createMealFoodItemFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    });
};

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize,
    }),
    mealType: z.enum(MEAL_TYPES, {
      error: () => ({ message: "mealType is invalid." }),
    }),
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }),
    notes: validationUtil
      .stringSchemaFactory({
        fieldName: "Meal note",
        minLength: 0,
        maxLength: 1000,
        toSanitize,
      })
      .optional(),
    mealFoodItems: z
      .array(createMealFoodItemFactorySchema({ toSanitize }), {
        error: () => ({ message: "At least one food item is required" }),
      })
      .min(1, "At least one food item is required"),
  });
};

const updateFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
      mealFoodItems: z
        .array(updateMealFoodItemFactorySchema({ toSanitize }))
        .optional(),
    });
};

const QuerySchema = validationUtil.FilterSchema.extend({
  mealType: z.enum(MEAL_TYPES).optional(),
  ownerId: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
  name: validationUtil
    .stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize: false,
    })
    .optional(),
});

export const mealValidation: IValidation<
  IMealEditDTO,
  IMealFilter,
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery
> = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TMealCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;

export type TMealUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;

export type TMealQuery = z.infer<typeof QuerySchema>;
