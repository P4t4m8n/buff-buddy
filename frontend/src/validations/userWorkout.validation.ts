import { z } from "zod";
import { CreateUserStrengthSetSchema } from "./userStrengthSet.validation";
import { dateValidation, IDSchema } from "./shared.validation";
import { CreateUserCardioSetSchema } from "./userCardioSet.validation";

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
  dateCompleted: dateValidation("Workout date"),
  programId: IDSchema,
  workoutId: IDSchema,
  ownerId: IDSchema.optional(),
  userWorkoutExercises: z.array(CreateUserWorkoutExercisesSchema),
});

export const UpdateUserWorkoutSchema = CreateUserWorkoutSchema.partial();
