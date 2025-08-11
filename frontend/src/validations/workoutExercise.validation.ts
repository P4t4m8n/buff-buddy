import { z } from "zod";
import {
  BooleanSchema,
  conditionalOrderRefinement,
  CrudOperationSchema,
  IDSchema,
  OrderSchema,
  stringValidation,
} from "./shared.validation";
import { ExerciseTypeSchema } from "./exercise.validation";
import {
  CreateCoreStrengthSetSchema,
  UpdateCoreStrengthSetSchema,
} from "./coreStrengthSet.validation";
import {
  CreateCoreCardioSetSchema,
  UpdateCoreCardioSetSchema,
} from "./coreCardioSet.validation";

const exerciseTypeSetRefinement = (
  data: {
    exerciseData?: { type?: string };
    coreStrengthSet?: any;
    coreCardioSet?: any;
  },
  ctx: z.RefinementCtx
) => {
  const exerciseType = data.exerciseData?.type;
  const hasStrengthSet = !!data.coreStrengthSet;
  const hasCardioSet = !!data.coreCardioSet;

  if (!hasCardioSet && !hasStrengthSet) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one core set (strength or cardio) must be provided",
    });
  }
  if (exerciseType === "strength" && !hasStrengthSet) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Core strength set is required for strength exercises",
      path: ["coreStrengthSet"],
    });
  }
  if (exerciseType === "strength" && hasCardioSet) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cardio set not allowed for strength exercises",
      path: ["coreCardioSet"],
    });
  }
  if (exerciseType === "cardio" && !hasCardioSet) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Core cardio set is required for cardio exercises",
      path: ["coreCardioSet"],
    });
  }
  if (exerciseType === "cardio" && hasStrengthSet) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Strength set not allowed for cardio exercises",
      path: ["coreStrengthSet"],
    });
  }
};

const WorkoutExerciseSchema = z.object({
  order: OrderSchema.optional().nullable(),
  notes: stringValidation({
    minLength: 0,
    maxLength: 500,
    fieldName: "notes",
  }).optional(),
  exerciseData: z.object({
    id: IDSchema,
    type: ExerciseTypeSchema,
  }),
  isActive: BooleanSchema,
  coreStrengthSet: CreateCoreStrengthSetSchema.optional(),
  coreCardioSet: CreateCoreCardioSetSchema.optional(),
  crudOperation: CrudOperationSchema,
  id: z.string().optional(),
});

export const CreateWorkoutExerciseSchema = WorkoutExerciseSchema.superRefine(
  exerciseTypeSetRefinement
);

export const UpdateWorkoutExerciseSchema = WorkoutExerciseSchema.partial()
  .extend({
    coreStrengthSet: UpdateCoreStrengthSetSchema.optional(),
    coreCardioSet: UpdateCoreCardioSetSchema.optional(),
  })
  .superRefine(exerciseTypeSetRefinement);

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
