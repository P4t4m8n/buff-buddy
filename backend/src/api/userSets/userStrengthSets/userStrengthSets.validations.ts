import { z } from "zod";
import {
  BooleanSchema,
  conditionalWeightRefinement,
  CrudOperationSchema,
  IDSchema,
  numberValidation,
  stringValidationAndSanitization,
} from "../../../shared/validations/shared.validations";

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

  skippedReason: stringValidationAndSanitization({
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

export type TCreateUserStrengthSetInput = z.infer<
  typeof CreateUserStrengthSetSchema
>;
export type TUpdateUserStrengthSetInput = z.infer<
  typeof UpdateUserStrengthSetSchema
>;
export type TUserStrengthSetParams = z.infer<
  typeof UserStrengthSetParamsSchema
>;
export type TUserStrengthSetQuery = z.infer<typeof UserStrengthSetQuerySchema>;
