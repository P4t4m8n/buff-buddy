import { z } from "zod";
import {
  conditionalOrderRefinement,
  NotesSchema,
  OrderSchema,
  CrudOperationEnumSchema,
  IDSchema,
} from "../../shared/validations/shared.validations";
import { CreateCoreStrengthSetSchema } from "../coreSets/coreStrengthSets/coreStrengthSets.validations";
import { CreateCoreCardioSetSchema } from "../coreSets/coreCardioSets/coreCardioSets.validations";

export const CreateWorkoutExerciseSchema = z.object({
  order: OrderSchema.optional().nullable(),
  notes: NotesSchema,
  exerciseId: IDSchema,
  isActive: z.coerce.boolean().default(true),
  coreStrengthSet: CreateCoreStrengthSetSchema.optional(),
  coreCardioSet: CreateCoreCardioSetSchema.optional(),
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

export type TCreateWorkoutExerciseInput = z.infer<
  typeof CreateWorkoutExerciseSchema
>;
export type TUpdateWorkoutExerciseInput = z.infer<
  typeof UpdateWorkoutExerciseSchema
>;
export type TWorkoutExerciseParams = z.infer<typeof WorkoutExerciseParamsSchema>;
export type TWorkoutExerciseQuery = z.infer<typeof WorkoutExerciseQuerySchema>;
export type TCreateNestedWorkoutExerciseInput = z.infer<
  typeof CreateWorkoutExerciseSchema
>;
