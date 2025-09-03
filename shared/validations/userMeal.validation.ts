import type { IToSanitize } from "../models/app.model";
import { z } from "zod";
import { validationUtil } from "./util.validation";
import { MEAL_TYPE } from "../consts/app.consts";

const createUserMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    userId: validationUtil.IDSchemaFactory({ toSanitize }),
    mealId: validationUtil.IDSchemaFactory({ toSanitize }),
    dateConsumed: validationUtil.DateSchema,
  });
};

const updateUserMealFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createUserMealFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
    });
};

const UserMealQuerySchema = validationUtil.FilterSchema.extend({
  userId: validationUtil.IDSchemaFactory({ toSanitize: true }).optional(),
  mealTypes: z.array(z.enum(MEAL_TYPE)).optional(),
  mealName: validationUtil
    .stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize: true,
    })
    .optional(),
});

const UserMealIdParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }),
});

export const userMealValidation = {
  createUserMealFactorySchema,
  updateUserMealFactorySchema,
  UserMealQuerySchema,
  UserMealIdParamsSchema,
};

export type TCreateUserMealInput = z.infer<
  ReturnType<typeof createUserMealFactorySchema>
>;

export type TUpdateUserMealInput = z.infer<
  ReturnType<typeof updateUserMealFactorySchema>
>;

export type TUserMealQuery = z.infer<typeof UserMealQuerySchema>;
