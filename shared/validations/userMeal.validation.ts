import { z } from "zod";

import { validationUtil } from "./util.validation";

import { MEAL_TYPES } from "../consts/meal.consts";

import type { IToSanitize } from "../models/app.model";

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    userId: validationUtil.IDSchemaFactory({ toSanitize }),
    mealId: validationUtil.IDSchemaFactory({ toSanitize }),
    dateConsumed: validationUtil.DateSchema,
  });
};

const updateFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
    });
};

const QuerySchema = validationUtil.FilterSchema.extend({
  userId: validationUtil.IDSchemaFactory({ toSanitize: true }).optional(),
  mealTypes: z.array(z.enum(MEAL_TYPES)).optional(),
  mealName: validationUtil
    .stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize: true,
    })
    .optional(),
});

export const userMealValidation = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TUserMealCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;

export type TUserMealUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;

export type TUserMealQuery = z.infer<typeof QuerySchema>;
