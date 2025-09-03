import type { IToSanitize } from "../models/app.model";
import { z } from "zod";
import { validationUtil } from "./util.validation";
import { MEAL_TYPES } from "../consts/meal.consts";

const createMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize,
    }),
    mealType: z.enum(MEAL_TYPES),
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    note: validationUtil
      .stringSchemaFactory({
        fieldName: "Meal note",
        minLength: 0,
        maxLength: 1000,
        toSanitize,
      })
      .optional(),
  });
};

const updateMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createMealFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
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
