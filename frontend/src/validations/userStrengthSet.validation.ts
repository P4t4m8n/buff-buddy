import { z } from "zod";
import {
  BooleanSchema,
  conditionalWeightRefinement,
  CrudOperationSchema,
  IDSchema,
  numberValidation,
  stringValidation,
} from "./shared.validation";

const UserStrengthSetSchema = z.object({
  reps: numberValidation({ fieldName: "Reps" }),
  weight: numberValidation({ fieldName: "Weight", maxLength: 1000 }).transform(
    (val) => Math.round(val * 100) / 100
  ),
  order: z.number().optional(),

  isBodyWeight: BooleanSchema,
  isCompleted: BooleanSchema,
  isJointPain: BooleanSchema,
  isMuscleFailure: BooleanSchema,
  isWarmup: BooleanSchema,

  skippedReason: stringValidation({
    fieldName: "Skipped Reason",
  }).optional(),
  crudOperation: CrudOperationSchema,
});

export const CreateUserStrengthSetSchema = UserStrengthSetSchema.superRefine(
  conditionalWeightRefinement
);

export const UpdateUserStrengthSetSchema = UserStrengthSetSchema.partial()
  .extend({
    id: IDSchema,
  })
  .superRefine(conditionalWeightRefinement);

export const UserStrengthSetParamsSchema = z.object({
  id: IDSchema,
});

export const UserStrengthSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});


