import { z } from "zod";
import { validationUtil } from "./util.validation";

const userStrengthSkippedSetFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z
    .object({
      skippedReason: validationUtil.stringSchemaFactory({
        fieldName: "Skipped Reason",
        minLength: 1,
        maxLength: 500,
        toSanitize,
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
};

const userStrengthNonSkippedSetSchema = () => {
  return z
    .object({
      skippedReason: z.union([z.literal(""), z.null(), z.undefined()]),
      reps: validationUtil.numberValidation({
        fieldName: "Reps",
        minLength: 1,
      }),
      weight: validationUtil
        .numberValidation({
          fieldName: "Weight",
          maxLength: 1000,
        })
        .transform((val) => Math.round(val * 100) / 100),
      isBodyWeight: validationUtil.BooleanSchema,
    })
    .superRefine(validationUtil.conditionalWeightRefinement);
};

const userStrengthUnionFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z.union([
    userStrengthSkippedSetFactorySchema({ toSanitize }),
    userStrengthNonSkippedSetSchema(),
  ]);
};

const UserStrengthSetSchema = z.object({
  order: z.number().optional(),

  isCompleted: validationUtil.BooleanSchema,
  isJointPain: validationUtil.BooleanSchema,
  isMuscleFailure: validationUtil.BooleanSchema,
  isWarmup: validationUtil.BooleanSchema,

  crudOperation: validationUtil.CrudOperationSchema,
});

const createUserStrengthSetFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z.intersection(
    UserStrengthSetSchema,
    userStrengthUnionFactorySchema({ toSanitize })
  );
};

const updateUserStrengthSetFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z.intersection(
    UserStrengthSetSchema.partial().extend({
      id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
    }),
    userStrengthUnionFactorySchema({ toSanitize }).optional()
  );
};

const UserStrengthSetParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
});

const UserStrengthSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const userStrengthSetsValidation = {
  createUserStrengthSetFactorySchema,
  updateUserStrengthSetFactorySchema,
  UserStrengthSetParamsSchema,
  UserStrengthSetQuerySchema,
};

export type TCreateUserStrengthSetInput = z.infer<
  ReturnType<typeof createUserStrengthSetFactorySchema>
>;
export type TUpdateUserStrengthSetInput = z.infer<
  ReturnType<typeof updateUserStrengthSetFactorySchema>
>;
export type TUserStrengthSetParams = z.infer<
  typeof UserStrengthSetParamsSchema
>;
export type TUserStrengthSetQuery = z.infer<typeof UserStrengthSetQuerySchema>;
