import { z } from "zod";

import {
  numberValidation,
  BooleanSchema,
  conditionalWeightRefinement,
  CrudOperationSchema,
  IDSchema,
  stringValidationAndSanitization,
} from "../../../shared/validations/shared.validations";

const UserStrengthSkippedSetSchema = z
  .object({
    skippedReason: stringValidationAndSanitization({
      fieldName: "Skipped Reason",
      minLength: 1,
      maxLength: 500,
    }),
    isCompleted: z.literal(false, {
      message: "A skipped set cannot be marked as completed.",
    }),
    reps: z.any().optional(),
    weight: z.any().optional(),
    isBodyWeight: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if ("reps" in data && !!data.reps) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reps"],
        message: "Reps must not be provided when skippedReason is present.",
      });
    }
    if ("weight" in data && !!data.weight) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["weight"],
        message: "Weight must not be provided when skippedReason is present.",
      });
    }
    if ("isBodyWeight" in data && !!data.isBodyWeight) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isBodyWeight"],
        message:
          "isBodyWeight must not be provided when skippedReason is present.",
      });
    }
  });

const UserStrengthNonSkippedSetSchema = z
  .object({
    skippedReason: z.union([z.literal(""), z.null(), z.undefined()]),
    reps: numberValidation({ fieldName: "Reps", minLength: 1 }),
    weight: numberValidation({
      fieldName: "Weight",
      maxLength: 1000,
    }).transform((val) => Math.round(val * 100) / 100),
    isBodyWeight: BooleanSchema,
  })
  .superRefine(conditionalWeightRefinement);

const UserStrengthUnionSchema = z.union([
  UserStrengthSkippedSetSchema,
  UserStrengthNonSkippedSetSchema,
]);

const UserStrengthSetSchema = z.object({
  order: z.number().optional(),

  isCompleted: BooleanSchema,
  isJointPain: BooleanSchema,
  isMuscleFailure: BooleanSchema,
  isWarmup: BooleanSchema,

  crudOperation: CrudOperationSchema,
});

export const CreateUserStrengthSetSchema = z.intersection(
  UserStrengthSetSchema,
  UserStrengthUnionSchema
);

export const UpdateUserStrengthSetSchema =
  UserStrengthSetSchema.partial().extend({
    id: IDSchema,
  });

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
