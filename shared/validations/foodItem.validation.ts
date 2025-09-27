import { util, z } from "zod";

import { validationUtil } from "./util.validation";
import type { IToSanitize } from "../models/app.model";
import type {
  IFoodItemBrandEditDto,
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
  TFoodItemInfo,
} from "../models/foodItem.model";
import type { IValidation } from "../models/validation.model";

const createFoodItemInfoFactorySchema = ({
  toSanitize,
  foodInfo,
}: IToSanitize & { foodInfo: TFoodItemInfo }) => {
  return z.object({
    name: validationUtil
      .stringSchemaFactory({
        fieldName: `${foodInfo}  name`,
        maxLength: 255,
        toSanitize,
      })
      .default("Unknown"),
    crudOperation: validationUtil.CrudOperationSchema,
  });
};

const updateFoodItemInfoFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil
      .stringSchemaFactory({
        fieldName: "Food  name",
        minLength: 1,
        maxLength: 255,
        toSanitize,
      })
      .optional(),
    crudOperation: validationUtil.CrudOperationSchema,
  });
};

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Food name",
      minLength: 1,
      maxLength: 255,
      toSanitize,
    }),
    barcode: validationUtil.stringSchemaFactory({
      fieldName: "Food barcode",
      minLength: 1,
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
    brand: z
      .array(
        createFoodItemInfoFactorySchema({
          toSanitize,
          foodInfo: "brand",
        })
      )
      .optional()
      .default([{ name: "Unknown", crudOperation: "create" }]),
    categories: z
      .array(
        createFoodItemInfoFactorySchema({ toSanitize, foodInfo: "categories" })
      )
      .optional(),
    labels: z
      .array(
        createFoodItemInfoFactorySchema({ toSanitize, foodInfo: "labels" })
      )
      .optional(),
    images: z.array(z.string().url()).min(0).optional(),
  });
};

const updateFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
      brand: z
        .array(updateFoodItemInfoFactorySchema({ toSanitize }))
        .optional()
        .default([{ name: "Unknown", crudOperation: "create" }]),
      categories: z
        .array(updateFoodItemInfoFactorySchema({ toSanitize }))
        .optional(),
      labels: z
        .array(updateFoodItemInfoFactorySchema({ toSanitize }))
        .optional(),
    });
};

const QuerySchema = validationUtil.FilterSchema.extend({
  name: z.string().optional(),
  barcode: z.string().min(0).max(100).optional(),
  calories: validationUtil
    .numberValidation({ fieldName: "calories", minLength: 0 })
    .optional(),
  protein: validationUtil
    .numberValidation({ fieldName: "protein", minLength: 0 })
    .optional(),
});

const FoodItemIdBarcodeSchema = z.object({
  barcode: validationUtil.stringSchemaFactory({ toSanitize: false }),
});

export const foodItemValidation: IValidation<
  IFoodItemEditDTO,
  IFoodItemFilter,
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery
> & { FoodItemIdBarcodeSchema: typeof FoodItemIdBarcodeSchema } = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
  FoodItemIdBarcodeSchema,
};

export type TFoodItemCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;

export type TFoodItemUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;

export type TFoodItemQuery = z.infer<typeof QuerySchema>;
