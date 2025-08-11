import { z } from "zod";
import {
  CrudOperationSchema,
  numberValidation,
  IDSchema,
} from "./shared.validation";
import { DAY_IN_SECONDES } from "../../../shared/consts/app.consts";

export const CreateCoreCardioSetSchema = z.object({
  warmupTime: numberValidation({
    fieldName: "Warmup Time",
    maxLength: DAY_IN_SECONDES,
  })
    .optional()
    .default(1),

  workTime: numberValidation({
    fieldName: "Work Time",
    maxLength: DAY_IN_SECONDES,
  }),

  avgHeartRate: numberValidation({
    fieldName: "Average Heart Rate",
    maxLength: 300,
  }),

  avgSpeed: numberValidation({
    fieldName: "Average Speed",
    maxLength: 100,
  }),

  distance: numberValidation({
    fieldName: "Distance",
    maxLength: 1000000,
  }),

  calorieTarget: numberValidation({
    fieldName: "Calorie Target",
    maxLength: 10000,
  }),

  crudOperation: CrudOperationSchema,
  id: IDSchema.optional(),
});

export const UpdateCoreCardioSetSchema =
  CreateCoreCardioSetSchema.partial().extend({
    workoutExerciseId: IDSchema.optional(),
  });

export const CoreCardioSetParamsSchema = z.object({
  id: IDSchema,
});

export const CoreCardioSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});


