import { z } from "zod";
import { validationUtil } from "./util.validation";
import { DAY_IN_SECONDES } from "../consts/app.consts";

const CreateCoreCardioSetSchema = z.object({
  warmupTime: validationUtil
    .numberValidation({
      fieldName: "Warmup Time",
      maxLength: DAY_IN_SECONDES,
    })
    .optional()
    .default(1),

  workTime: validationUtil.numberValidation({
    fieldName: "Work Time",
    maxLength: DAY_IN_SECONDES,
  }),

  avgHeartRate: validationUtil.numberValidation({
    fieldName: "Average Heart Rate",
    maxLength: 300,
  }),

  avgSpeed: validationUtil.numberValidation({
    fieldName: "Average Speed",
    maxLength: 100,
  }),

  distance: validationUtil.numberValidation({
    fieldName: "Distance",
    maxLength: 1000000,
  }),

  calorieTarget: validationUtil.numberValidation({
    fieldName: "Calorie Target",
    maxLength: 10000,
  }),

  crudOperation: validationUtil.CrudOperationSchema,
  id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
});

const UpdateCoreCardioSetSchema = CreateCoreCardioSetSchema.partial().extend({
  workoutExerciseId: validationUtil
    .IDSchemaFactory({ toSanitize: false })
    .optional(),
});

const CoreCardioSetParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }),
});

const CoreCardioSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const coreCardioSetsValidation = {
  CreateCoreCardioSetSchema,
  UpdateCoreCardioSetSchema,
  CoreCardioSetParamsSchema,
  CoreCardioSetQuerySchema,
};

export type TCreateCoreCardioSetInput = z.infer<
  typeof CreateCoreCardioSetSchema
>;
export type TUpdateCoreCardioSetInput = z.infer<
  typeof UpdateCoreCardioSetSchema
>;
export type TCoreCardioSetParams = z.infer<typeof CoreCardioSetParamsSchema>;
export type TCoreCardioSetQuery = z.infer<typeof CoreCardioSetQuerySchema>;
