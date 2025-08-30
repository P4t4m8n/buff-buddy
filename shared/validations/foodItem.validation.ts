import { z } from "zod";

import { validationUtil } from "./util.validation";
import type { IToSanitize } from "../models/app.model";

const createFoodItemFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Food  name",
      minLength: 1,
      maxLength: 255,
      toSanitize,
    }),
    barcode: validationUtil.stringSchemaFactory({
      fieldName: "Food barcode",
      toSanitize,
    }),
    servingSize: validationUtil
      .numberValidation({
        fieldName: "Food serving size",
        minLength: 0,
        maxLength: 100000000000,
      })
      .optional(),
    calories: validationUtil
      .numberValidation({
        fieldName: "Food calories",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    proteins: validationUtil
      .numberValidation({
        fieldName: "Food protein",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    carbohydrates: validationUtil
      .numberValidation({
        fieldName: "Food carbohydrates",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    sugars: validationUtil
      .numberValidation({
        fieldName: "Food sugars",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    fat: validationUtil
      .numberValidation({
        fieldName: "Food fat",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    saturatedFat: validationUtil
      .numberValidation({
        fieldName: "Food saturated fat",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    fiber: validationUtil
      .numberValidation({
        fieldName: "Food fiber",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    sugar: validationUtil
      .numberValidation({
        fieldName: "Food sugar",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    salt: validationUtil
      .numberValidation({
        fieldName: "Food salt",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    cholesterol: validationUtil
      .numberValidation({
        fieldName: "Food cholesterol",
        minLength: 0,
        maxLength: 1000000,
      })
      .optional(),
    brand: validationUtil
      .stringSchemaFactory({
        fieldName: "Food brand",
        minLength: 0,
        maxLength: 1000000,
        toSanitize,
      })
      .optional()
      .default("Unknown"),
    categories: z.array(z.string()).min(0).optional(),
    labels: z.array(z.string()).min(0).optional(),
    images: z.array(z.string().url()).min(0).optional(),
  });
};

const updateFoodItemSchema = ({ toSanitize }: IToSanitize) => {
  return createFoodItemFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
    });
};

const FoodItemQuerySchema = validationUtil.FilterSchema.extend({
  name: z.string().optional(),
  barcode: z.string().min(2).max(100).optional(),
  calories: z.number().min(0).optional(),
  protein: z.number().min(0).optional(),
});

const FoodItemIdParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }),
});
const FoodItemIdBarcodeSchema = z.object({
  barcode: validationUtil.stringSchemaFactory({ toSanitize: false }),
});

export const foodItemValidation = {
  createFoodItemFactorySchema,
  updateFoodItemSchema,
  FoodItemQuerySchema,
  FoodItemIdBarcodeSchema,
  FoodItemIdParamsSchema,
};

export type TCreateFoodItemInput = z.infer<
  ReturnType<typeof createFoodItemFactorySchema>
>;

export type TUpdateFoodItemInput = z.infer<
  ReturnType<typeof updateFoodItemSchema>
>;

export type TFoodItemQuery = z.infer<typeof FoodItemQuerySchema>;
