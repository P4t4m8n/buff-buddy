import { z } from "zod";

import { validationUtil } from "./util.validation";

import { userStrengthSetsValidation } from "./userStrengthSet.validation";
import { userCardioSetsValidation } from "./userCardioSet.validation";

import type { IToSanitize } from "../models/app.model";
import type { IValidation } from "../models/validation.model";
import type {
  IUserWorkoutEditDTO,
  IUserWorkoutFilter,
} from "../models/userWorkout";

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
          userStrengthSetsValidation.createFactorySchema({
            toSanitize,
          })
        )
        .optional(),
      userCardioSets: z
        .array(
          userCardioSetsValidation.createFactorySchema({
            toSanitize,
          })
        )
        .optional(),
    })
    .superRefine(userSetRefinement);
};

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    dateCompleted: validationUtil.DateSchema.default(new Date()),
    programId: validationUtil.IDSchemaFactory({ toSanitize }),
    workoutId: validationUtil.IDSchemaFactory({ toSanitize }),
    ownerId: validationUtil.IDSchemaFactory({ toSanitize }).nullable(), //INFO: validation and sanitation done manually in the middleware and controller
    userWorkoutExercises: z.array(
      createUserWorkoutExerciseFactorySchema({ toSanitize })
    ),
  });
};

const updateFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createFactorySchema({ toSanitize }).partial();
};

const QuerySchema = validationUtil.FilterSchema;

export const userWorkoutValidation: IValidation<
  IUserWorkoutEditDTO,
  IUserWorkoutFilter,
  TUserWorkoutCreateValidatedInput,
  TUserWorkoutUpdateValidatedInput,
  TUserWorkoutQuery
> = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TUserWorkoutCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;
export type TUserWorkoutUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;
export type TUserWorkoutQuery = z.infer<typeof QuerySchema>;
