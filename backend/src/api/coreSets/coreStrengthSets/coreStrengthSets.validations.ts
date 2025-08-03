import { z } from "zod";
import {
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
  numberOfSets: z.coerce
    .number()
    .int("Number of sets must be a whole number")
    .min(1, "Number of sets must be at least 1")
    .max(100, "Number of sets cannot exceed 100")
    .optional()
    .default(1),

  reps: z.coerce
    .number()
    .int("Reps must be a whole number")
    .min(1, "Reps must be at least 1")
    .max(1000, "Reps cannot exceed 1000"),

  weight: z.coerce
    .number()
    .min(0, "Weight cannot be negative")
    .max(10000, "Weight cannot exceed 10000")
    .transform((val) => Math.round(val * 100) / 100),

  isBodyWeight: z.coerce.boolean().default(false),

  restTime: z.coerce
    .number()
    .int("Rest time must be a whole number")
    .min(0, "Rest time cannot be negative")
    .max(3600, "Rest time cannot exceed 1 hour (3600 seconds)"),

  hasWarmup: z.coerce.boolean().default(false),

  crudOperation: CrudOperationSchema,
  id: z.optional(z.string()),
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
