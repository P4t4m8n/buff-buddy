import { z } from "zod";
import {
  CrudOperationSchema,
  IDSchema,
  numberValidation,
} from "../../../shared/validations/shared.validations";

const DAY_IN_SECONDES = 60 * 60 * 24;

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
  id: IDSchema,
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

export type TCreateCoreCardioSetInput = z.infer<
  typeof CreateCoreCardioSetSchema
>;
export type TUpdateCoreCardioSetInput = z.infer<
  typeof UpdateCoreCardioSetSchema
>;
export type TCoreCardioSetParams = z.infer<typeof CoreCardioSetParamsSchema>;
export type TCoreCardioSetQuery = z.infer<typeof CoreCardioSetQuerySchema>;
