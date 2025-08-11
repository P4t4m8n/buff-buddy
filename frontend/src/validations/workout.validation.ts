import { z } from "zod";
import { CrudOperationSchema, IDSchema, stringValidation } from "./shared.validation";
import { CreateNestedWorkoutExerciseSchema,UpdateNestedWorkoutExerciseSchema } from "./workoutExercise.validation";


const BaseWorkoutSchema = z.object({
  programId: IDSchema.nullish().optional(),
  ownerId:IDSchema.nullish().optional(),

  notes: stringValidation({
    fieldName: "Workout notes",
    minLength: 0,
    maxLength: 500,
  }).nullish().optional(),

  name: stringValidation({
    fieldName: "Workout name",
    minLength: 1,
    maxLength: 100,
  }),
  crudOperation: CrudOperationSchema,
  workoutExercises: z
    .array(CreateNestedWorkoutExerciseSchema)
    .min(1, "At least one workout set is required")
    .max(50, "Maximum 50 workout sets allowed per workout"),
  id: IDSchema.optional(),
});

export const CreateWorkoutSchema = BaseWorkoutSchema;

export const UpdateWorkoutSchema = BaseWorkoutSchema.extend({
  workoutExercises: z
    .array(UpdateNestedWorkoutExerciseSchema)
    .min(1, "At least one workout set is required")
    .max(50, "Maximum 50 workout sets allowed per workout")
    .optional(),
}).partial();

export const WorkoutQuerySchema = z.object({
  programId: z.string().optional(),
  userId: z.string().optional(),
  exerciseId: z.string().optional(),
  date: z.string().optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});


