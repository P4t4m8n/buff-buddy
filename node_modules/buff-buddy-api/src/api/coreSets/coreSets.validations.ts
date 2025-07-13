import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { conditionalOrderRefinement } from "../../shared/validations/shared.validations";

export const crudOperationSchema = z.enum([
  "create",
  "update",
  "edit",
  "delete",
  "read",
]);

const coreSetWeightRefinement = (
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

const coreSetProgramExerciseIdRefinement = (
  data: { programExerciseId?: string },
  ctx: z.RefinementCtx
) => {
  if (!data.programExerciseId || data.programExerciseId.trim() === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Program Exercise ID is required.",
    });
  }
};

const CoreSetSchema = z.object({
  order: z.coerce.number(),
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
  isWarmup: z.coerce.boolean().default(false),

  repsInReserve: z.coerce
    .number()
    .int("Reps in reserve must be a whole number")
    .min(0, "Reps in reserve cannot be negative")
    .max(20, "Reps in reserve cannot exceed 20")
    .nullable()
    .default(0),
  crudOperation: z.optional(crudOperationSchema).default("read"),
  id: z.optional(z.string()),
  programExerciseId: z.string().optional(),
});

//TODO:Create and nested are the same, maybe join them later?
export const CreateCoreSetSchema = CoreSetSchema.superRefine(
  conditionalOrderRefinement
)
  .superRefine(coreSetWeightRefinement)
  .superRefine(coreSetProgramExerciseIdRefinement);

export const UpdateCoreSetSchema = CoreSetSchema.partial()
  .superRefine(conditionalOrderRefinement)
  .superRefine(coreSetWeightRefinement);

export const CreateNestedCoreSetSchema = CoreSetSchema.superRefine(
  conditionalOrderRefinement
).superRefine(coreSetWeightRefinement);

export const UpdateNestedCoreSetSchema = CoreSetSchema.partial().superRefine(
  conditionalOrderRefinement
);

export const CoreSetParamsSchema = z.object({
  id: z.string().min(1, "CoreSet ID is required"),
});

export const CoreSetQuerySchema = z.object({
  programExerciseId: z.string().optional(),
  isWarmup: z.coerce.boolean().optional(),
  minWeight: z.coerce.number().min(0).optional(),
  maxWeight: z.coerce.number().min(0).optional(),
  minReps: z.coerce.number().min(1).optional(),
  maxReps: z.coerce.number().min(1).optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type CreateCoreSetInput = z.infer<typeof CreateCoreSetSchema>;
export type UpdateCoreSetInput = z.infer<typeof UpdateCoreSetSchema>;
export type CoreSetParams = z.infer<typeof CoreSetParamsSchema>;
export type CoreSetQuery = z.infer<typeof CoreSetQuerySchema>;
export type CreateNestedCoreSetInput = z.infer<
  typeof CreateNestedCoreSetSchema
>;
export type UpdateNestedCoreSetInput = z.infer<
  typeof UpdateNestedCoreSetSchema
>;
export type CreateCoreSetInputWithOperation = z.infer<
  typeof CreateCoreSetSchema
>;
