import { z } from "zod";
import {
  DateSchema,
  IDSchema,
} from "../../shared/validations/shared.validations";
import { CreateUserSetSchema } from "../userSets/userSets.validations";

const CreateUserWorkoutExercises = z.object({
  workoutExerciseId: IDSchema,
  userSets: z.array(CreateUserSetSchema),
});

export const CreateUserWorkoutSchema = z.object({
  id: IDSchema.optional(),
  dateCompleted: DateSchema,
  programId: IDSchema,
  workoutId: IDSchema,
  ownerId: IDSchema,
  workoutExercises: z.array(CreateUserWorkoutExercises),
});

export const UpdateUserWorkoutSchema = CreateUserWorkoutSchema.partial();

export type TCreateUserWorkoutInput = z.infer<typeof CreateUserWorkoutSchema>;
export type TUpdateUserWorkoutInput = z.infer<typeof UpdateUserWorkoutSchema>;
