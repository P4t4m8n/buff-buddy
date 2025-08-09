import { z } from "zod";
import {
  numberValidation,
  CrudOperationSchema,
  IDSchema,
} from "../../../shared/validations/shared.validations";

const coreStrengthSetWeightRefinement = (
  data: { weight?: number; isBodyWeight?: boolean },
  ctx: z.RefinementCtx
) => {
  if (data.isBodyWeight && data.weight && data.weight > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cannot have both weight and body weight set.",
      path: ["weight"],
    });
  }
  if (!data.isBodyWeight && (!data.weight || data.weight === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either weight must be set or isBodyWeight must be true.",
      path: ["weight"],
    });
  }
};

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
  coreStrengthSetWeightRefinement
);

export const UpdateCoreStrengthSetSchema =
  CoreStrengthSetSchema.partial().superRefine(coreStrengthSetWeightRefinement);

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

export type TCreateCoreStrengthSetInput = z.infer<
  typeof CreateCoreStrengthSetSchema
>;
export type TUpdateCoreStrengthSetInput = z.infer<
  typeof UpdateCoreStrengthSetSchema
>;
export type TCoreStrengthSetParams = z.infer<
  typeof CoreStrengthSetParamsSchema
>;
export type TCoreStrengthSetQuery = z.infer<typeof CoreStrengthSetQuerySchema>;
