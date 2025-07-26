import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { conditionalWeightRefinement } from "../../shared/validations/shared.validations";
import { crudOperationSchema } from "../coreSets/coreSets.validations";

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

  restTime: z.coerce
    .number()
    .int("Rest time must be a whole number")
    .min(0, "Rest time cannot be negative")
    .max(3600, "Rest time cannot exceed 1 hour (3600 seconds)"),
  isBodyWeight: z.coerce.boolean().default(false),
  isCompleted: z.coerce.boolean().default(false),
  isJointPain: z.coerce.boolean().default(false),
  isMuscleFailure: z.coerce.boolean().default(false),

  crudOperation: z.optional(crudOperationSchema).default("read"),
  id: z.optional(z.string()),
  coreSetId: z
    .string()
    .min(1, "CoreSet ID is required")
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    )
    .transform((val) => val.trim())
    .refine(
      (val) => val.length >= 1,
      "CoreSet ID is required after sanitization"
    ),
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
