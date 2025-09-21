import { z } from "zod";
import { validationUtil } from "./util.validation";
import { userStrengthSetsValidation } from "./userStrengthSet.validation";
import { userCardioSetsValidation } from "./userCardioSet.validation";

const userSetRefinement = (
  data: {
    userStrengthSets?: any[];
    userCardioSets?: any[];
  },
  ctx: z.RefinementCtx
) => {
  const hasStrengthSets = !!data.userStrengthSets?.length;
  const hasCardioSets = !!data.userCardioSets?.length;

  if (!hasStrengthSets && !hasCardioSets) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one user set (strength or cardio) must be provided",
    });
  }
  if (hasStrengthSets && hasCardioSets) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cannot provide both strength and cardio sets",
    });
  }
};

const createUserWorkoutExerciseFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z
    .object({
      workoutExerciseId: validationUtil.IDSchemaFactory({ toSanitize: false }),
      userStrengthSets: z
        .array(
          userStrengthSetsValidation.createUserStrengthSetFactorySchema({
            toSanitize,
          })
        )
        .optional(),
      userCardioSets: z
        .array(
          userCardioSetsValidation.createUserCardioSetFactorySchema({
            toSanitize,
          })
        )
        .optional(),
    })
    .superRefine(userSetRefinement);
};

const createUserWorkoutFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z.object({
    id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    dateCompleted: validationUtil.DateSchema.default(new Date()),
    programId: validationUtil.IDSchemaFactory({ toSanitize }),
    workoutId: validationUtil.IDSchemaFactory({ toSanitize }),
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }).optional(), //INFO: validation and sanitation done manually in the middleware and controller
    userWorkoutExercises: z.array(
      createUserWorkoutExerciseFactorySchema({ toSanitize })
    ),
  });
};

const updateUserWorkoutFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return createUserWorkoutFactorySchema({ toSanitize }).partial();
};

export const userWorkoutValidation = {
  createUserWorkoutFactorySchema,
  updateUserWorkoutFactorySchema,
};

export type TCreateUserWorkoutInput = z.infer<
  ReturnType<typeof createUserWorkoutFactorySchema>
>;
export type TUpdateUserWorkoutInput = z.infer<
  ReturnType<typeof updateUserWorkoutFactorySchema>
>;
