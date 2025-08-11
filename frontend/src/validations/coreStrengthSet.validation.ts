import { z } from "zod";
import { conditionalWeightRefinement, CrudOperationSchema, IDSchema, numberValidation } from "./shared.validation";



const CoreStrengthSetSchema = z.object({
  numberOfSets: numberValidation({
    fieldName: "Number of sets",
    minLength: 1,
    maxLength: 100,
  }),

  reps: numberValidation({
    fieldName: "Reps",
    minLength: 1,
    maxLength: 1000,
  }),

  weight: numberValidation({
    fieldName: "Weight",
    minLength: 0,
    maxLength: 1000,
  }).transform((val) => Math.round(val * 100) / 100),

  isBodyWeight: z.coerce.boolean().default(false),

  restTime: numberValidation({
    fieldName: "Rest time",
    minLength: 0,
    maxLength: 3600,
  }),

  hasWarmup: z.coerce.boolean().default(false),

  crudOperation: CrudOperationSchema,
  id: IDSchema.optional(),
  programExerciseId: z.string().optional(),
});

export const CreateCoreStrengthSetSchema = CoreStrengthSetSchema.superRefine(
  conditionalWeightRefinement
);

export const UpdateCoreStrengthSetSchema =
  CoreStrengthSetSchema.partial().superRefine(conditionalWeightRefinement);

export const CoreStrengthSetParamsSchema = z.object({
  id: IDSchema,
});

export const CoreStrengthSetQuerySchema = z.object({
  programExerciseId: z.string().optional(),
  hasWarmup: z.coerce.boolean().optional(),
  minWeight: z.coerce.number().min(0).optional(),
  maxWeight: z.coerce.number().min(0).optional(),
  minReps: z.coerce.number().min(1).optional(),
  maxReps: z.coerce.number().min(1).optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});


