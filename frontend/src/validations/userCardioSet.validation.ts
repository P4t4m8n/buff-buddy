import { z } from "zod";

import {
  numberValidation,
  BooleanSchema,
  CrudOperationSchema,
  IDSchema,
  stringValidation,
} from "./shared.validation";

export const CreateUserCardioSetSchema = z.object({
  workTime: numberValidation({ fieldName: "Work Time", maxLength: 10000000 }),
  avgHeartRate: numberValidation({
    fieldName: "Average Heart Rate",
    maxLength: 200,
  }),
  avgSpeed: numberValidation({
    fieldName: "Average Speed",
    maxLength: 10000000,
  }),
  distance: numberValidation({ fieldName: "Distance", maxLength: 10000000 }),
  caloriesBurned: numberValidation({
    fieldName: "Calories Burned",
    maxLength: 10000000,
  }),
  isCompleted: BooleanSchema,
  order: z.number().optional(),
  skippedReason: stringValidation({
    fieldName: "Skipped Reason",
  })
    .nullable()
    .optional(),
  crudOperation: CrudOperationSchema,
});

export const UpdateUserCardioSetSchema =
  CreateUserCardioSetSchema.partial().extend({
    id: IDSchema,
  });

export const UserCardioSetParamsSchema = z.object({
  id: IDSchema,
});

export const UserCardioSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});


