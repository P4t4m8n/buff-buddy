import z from "zod";
import { validationUtil } from "./util.validation";
import { IToSanitize } from "../models/app.model";
import { mealValidation } from "./meal.validations";

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }),
    mealId: validationUtil.IDSchemaFactory({ toSanitize }),
    notes: validationUtil
      .stringSchemaFactory({
        fieldName: "Meal note",
        minLength: 0,
        maxLength: 1000,
        toSanitize,
      })
      .optional()
      .nullable()
      .nullish(),
    userMealItems: z
      .array(mealValidation.createMealFoodItemFactorySchema({ toSanitize }), {
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
      userMealItems: z
        .array(mealValidation.updateMealFoodItemFactorySchema({ toSanitize }))
        .optional(),
    });
};

const QuerySchema = validationUtil.FilterSchema.extend({
  ownerId: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
  mealName: validationUtil
    .stringSchemaFactory({
      fieldName: "Meal name",
      minLength: 1,
      maxLength: 255,
      toSanitize: false,
    })
    .optional(),
  dateConsumed: validationUtil.DateSchema,
});

export const userMealValidation = {
  QuerySchema,
  createFactorySchema,
  updateFactorySchema,
};
export type TUserMealCreateValidatedInput = z.infer<ReturnType<typeof createFactorySchema>>;

export type TUserMealUpdateValidatedInput = z.infer<ReturnType<typeof updateFactorySchema>>;

export type TUserMealQuery = z.infer<typeof QuerySchema>;
