import { z } from "zod";

import { validationUtil } from "./util.validation";

import { MEAL_TYPES } from "../consts/meal.consts";

import type { IToSanitize } from "../models/app.model";

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
      id: validationUtil.IDSchemaFactory({ toSanitize }),
    });
};

const createMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize,
    }),
    mealType: z.enum(MEAL_TYPES),
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }),
    note: validationUtil
      .stringSchemaFactory({
        fieldName: "Meal note",
        minLength: 0,
        maxLength: 1000,
        toSanitize,
      })
      .optional(),
    mealFoodItems: z
      .array(createMealFoodItemFactorySchema({ toSanitize }))
      .min(1, "At least one food item is required"),
  });
};

const updateMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createMealFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
      mealFoodItems: z
        .array(updateMealFoodItemFactorySchema({ toSanitize }))
        .optional(),
    });
};

const MealQuerySchema = validationUtil.FilterSchema.extend({
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

const MealIdParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }),
});

export const mealValidation = {
  createMealFactorySchema,
  updateMealFactorySchema,
  MealQuerySchema,
  MealIdParamsSchema,
};

export type TCreateMealInput = z.infer<
  ReturnType<typeof createMealFactorySchema>
>;

export type TUpdateMealInput = z.infer<
  ReturnType<typeof updateMealFactorySchema>
>;

export type TMealQuery = z.infer<typeof MealQuerySchema>;
