import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import {
  CreateNestedCoreSetSchema,
} from "../coreSets/coreSets.validations";
import {
  conditionalOrderRefinement,
  NotesSchema,
  OrderSchema,
  idSchema,
  CrudOperationEnumSchema,
} from "../../shared/validations/shared.validations";

export const CreateWorkoutExerciseSchema = z.object({
  order: OrderSchema,
  notes: NotesSchema,
  exerciseId: idSchema({ errorMsg: "Exercise ID is required" }),
  // workoutId: idSchema({ errorMsg: "Workout ID is required" }),
  isActive: z.coerce.boolean().default(true),
  coreSets: z
    .array(CreateNestedCoreSetSchema)
    .min(1, "At least one set is required"),

  crudOperation: z.optional(CrudOperationEnumSchema).default("read"),
  id: z.string().optional(),
});

export const UpdateWorkoutExerciseSchema =
  CreateWorkoutExerciseSchema.partial();

export const CreateNestedWorkoutExerciseSchema =
  CreateWorkoutExerciseSchema.superRefine(conditionalOrderRefinement);

export const UpdateNestedWorkoutExerciseSchema =
  UpdateWorkoutExerciseSchema.superRefine(conditionalOrderRefinement);

export const WorkoutExerciseParamsSchema = z.object({
  id: z.string().min(1, "WorkoutExercise ID is required"),
});

export const WorkoutExerciseQuerySchema = z.object({
  workoutId: z.string().optional(),
  exerciseId: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  daysOfWeek: z.string().optional(),
  minOrder: z.coerce.number().min(1).optional(),
  maxOrder: z.coerce.number().min(1).optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type CreateWorkoutExerciseInput = z.infer<
  typeof CreateWorkoutExerciseSchema
>;
export type UpdateWorkoutExerciseInput = z.infer<
  typeof UpdateWorkoutExerciseSchema
>;
export type WorkoutExerciseParams = z.infer<typeof WorkoutExerciseParamsSchema>;
export type WorkoutExerciseQuery = z.infer<typeof WorkoutExerciseQuerySchema>;
export type CreateNestedWorkoutExerciseInput = z.infer<
  typeof CreateWorkoutExerciseSchema
>;
export type UpdateNestedWorkoutExerciseInput = z.infer<
  typeof UpdateNestedWorkoutExerciseSchema
>;
