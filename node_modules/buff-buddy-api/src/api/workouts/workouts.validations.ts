import { z } from "zod";
import {
  CrudOperationSchema,
  DaysOfWeekSchema,
  IDSchema,
  NameSchema,
  NotesSchema,
} from "../../shared/validations/shared.validations";
import {
  CreateNestedWorkoutExerciseSchema,
  UpdateNestedWorkoutExerciseSchema,
} from "../workoutExercise/workoutExercise.validations";

const BaseWorkoutSchema = z.object({
  programId: z.string().nullish().optional(),
  userId: z.string().min(1, "User ID is required"),
  notes: NotesSchema,
  name: NameSchema,
  daysOfWeek: DaysOfWeekSchema.optional(),
  crudOperation: CrudOperationSchema,
  workoutExercises: z
    .array(CreateNestedWorkoutExerciseSchema)
    .min(1, "At least one workout set is required")
    .max(50, "Maximum 50 workout sets allowed per workout"),
});

export const CreateWorkoutSchema = BaseWorkoutSchema;

export const UpdateWorkoutSchema = BaseWorkoutSchema.partial().extend({
  id: IDSchema,
  workoutExercises: z
    .array(UpdateNestedWorkoutExerciseSchema)
    .min(1, "At least one workout set is required")
    .max(50, "Maximum 50 workout sets allowed per workout")
    .optional(),
});

export const WorkoutQuerySchema = z.object({
  programId: z.string().optional(),
  userId: z.string().optional(),
  exerciseId: z.string().optional(),
  date: z.string().optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
export type WorkoutQuery = z.infer<typeof WorkoutQuerySchema>;
