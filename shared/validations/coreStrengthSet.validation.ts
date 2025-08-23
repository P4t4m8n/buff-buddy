import { z } from "zod";
import { validationUtil } from "./util.validation";

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
  numberOfSets: validationUtil.numberValidation({
    fieldName: "Number of sets",
    minLength: 1,
    maxLength: 100,
  }),

  reps: validationUtil.numberValidation({
    fieldName: "Reps",
    minLength: 1,
    maxLength: 1000,
  }),

  weight: validationUtil
    .numberValidation({
      fieldName: "Weight",
      minLength: 0,
      maxLength: 1000,
    })
    .transform((val) => Math.round(val * 100) / 100),

  isBodyWeight: z.coerce.boolean().default(false),

  restTime: validationUtil.numberValidation({
    fieldName: "Rest time",
    minLength: 0,
    maxLength: 3600,
  }),

  hasWarmup: z.coerce.boolean().default(false),

  crudOperation: validationUtil.CrudOperationSchema,
  id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
  programExerciseId: validationUtil
    .IDSchemaFactory({ toSanitize: false })
    .optional(),
});

const CreateCoreStrengthSetSchema = CoreStrengthSetSchema.superRefine(
  coreStrengthSetWeightRefinement
);

const UpdateCoreStrengthSetSchema = CoreStrengthSetSchema.partial().superRefine(
  coreStrengthSetWeightRefinement
);

const CoreStrengthSetParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
});

const CoreStrengthSetQuerySchema = z.object({
  programExerciseId: z.string().optional(),
  hasWarmup: z.coerce.boolean().optional(),
  minWeight: z.coerce.number().min(0).optional(),
  maxWeight: z.coerce.number().min(0).optional(),
  minReps: z.coerce.number().min(1).optional(),
  maxReps: z.coerce.number().min(1).optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const coreStrengthSetsValidation = {
  CreateCoreStrengthSetSchema,
  UpdateCoreStrengthSetSchema,
  CoreStrengthSetParamsSchema,
  CoreStrengthSetQuerySchema,
};
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
