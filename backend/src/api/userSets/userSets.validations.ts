import { z } from "zod";
import {
  BooleanSchema,
  conditionalWeightRefinement,
  CrudOperationSchema,
} from "../../shared/validations/shared.validations";

const UserSetSchema = z.object({
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

  isBodyWeight: BooleanSchema,
  isCompleted: BooleanSchema,
  isJointPain: BooleanSchema,
  isMuscleFailure: BooleanSchema,
  isWarmup: BooleanSchema,
  order: z.number().optional(),

  crudOperation: CrudOperationSchema,
  id: z.optional(z.string()),
});

//TODO:Create and nested are the same, maybe join them later?
export const CreateUserSetSchema = UserSetSchema.superRefine(
  conditionalWeightRefinement
);

export const UpdateUserSetSchema = UserSetSchema.partial();

export const CreateNestedUserSetSchema = UserSetSchema.superRefine(
  conditionalWeightRefinement
);

export const UpdateNestedUserSetSchema = UserSetSchema.partial();

export const UserSetParamsSchema = z.object({
  id: z.string().min(1, "CoreSet ID is required"),
});
export const UserSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type CreateUserSetInput = z.infer<typeof CreateUserSetSchema>;
export type UpdateUserSetInput = z.infer<typeof UpdateUserSetSchema>;
export type UserSetParams = z.infer<typeof UserSetParamsSchema>;
export type UserSetQuery = z.infer<typeof UserSetQuerySchema>;
export type CreateNestedUserSetInput = z.infer<
  typeof CreateNestedUserSetSchema
>;
export type UpdateNestedUserSetInput = z.infer<
  typeof UpdateNestedUserSetSchema
>;
export type CreateUserSetInputWithOperation = z.infer<
  typeof CreateUserSetSchema
>;
