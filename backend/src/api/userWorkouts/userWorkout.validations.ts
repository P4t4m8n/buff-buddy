import { z } from "zod";
import {
  DateSchema,
  IDSchema,
} from "../../shared/validations/shared.validations";
import { CreateUserStrengthSetSchema } from "../userSets/userStrengthSets/userStrengthSets.validations";
import { CreateUserCardioSetSchema } from "../userSets/userCardioSets/userCardioSets.validations";

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
const CreateUserWorkoutExercisesSchema = z
  .object({
    workoutExerciseId: IDSchema,
    userStrengthSets: z.array(CreateUserStrengthSetSchema).optional(),
    userCardioSets: z.array(CreateUserCardioSetSchema).optional(),
  })
  .superRefine(userSetRefinement);

export const CreateUserWorkoutSchema = z.object({
  id: IDSchema.optional(),
  dateCompleted: DateSchema,
  programId: IDSchema,
  workoutId: IDSchema,
  ownerId: IDSchema,
  userWorkoutExercises: z.array(CreateUserWorkoutExercisesSchema),
});

export const UpdateUserWorkoutSchema = CreateUserWorkoutSchema.partial();

export type TCreateUserWorkoutInput = z.infer<typeof CreateUserWorkoutSchema>;
export type TUpdateUserWorkoutInput = z.infer<typeof UpdateUserWorkoutSchema>;
