import { z } from "zod";
import { validationUtil } from "./util.validation";
import { exerciseValidation } from "./exercise.validation";

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

const workoutExerciseFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return z.object({
    order: validationUtil.OrderSchema.optional().nullable(),
    notes: validationUtil
      .stringSchemaFactory({
        minLength: 0,
        maxLength: 500,
        fieldName: "notes",
        toSanitize,
      })
      .optional(),
    exerciseData: z.object({
      id: validationUtil.IDSchemaFactory({ toSanitize }),
      type: exerciseValidation.ExerciseTypeSchema,
    }),
    isActive: z.coerce.boolean().default(true),
    hasWarmup: validationUtil.BooleanSchema,
    isBodyWeight:validationUtil.BooleanSchema,
    crudOperation: z
      .optional(validationUtil.CrudOperationEnumSchema)
      .default("read"),
    id: z.string().optional(),
  });
};

const createWorkoutExerciseFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return workoutExerciseFactorySchema({ toSanitize });
};

const updateWorkoutExerciseFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return workoutExerciseFactorySchema({ toSanitize }).partial();
};

const WorkoutExerciseParamsSchema = z.object({
  id: validationUtil.IDSchemaFactory({ toSanitize: false }),
});

const WorkoutExerciseQuerySchema = z.object({
  workoutId: z.string().optional(),
  exerciseId: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  daysOfWeek: z.string().optional(),
  minOrder: z.coerce.number().min(1).optional(),
  maxOrder: z.coerce.number().min(1).optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const workoutExerciseValidation = {
  createWorkoutExerciseFactorySchema,
  updateWorkoutExerciseFactorySchema,
  WorkoutExerciseParamsSchema,
  WorkoutExerciseQuerySchema,
};

export type TCreateWorkoutExerciseInput = z.infer<
  ReturnType<typeof createWorkoutExerciseFactorySchema>
>;
export type TUpdateWorkoutExerciseInput = z.infer<
  ReturnType<typeof updateWorkoutExerciseFactorySchema>
>;
export type TWorkoutExerciseParams = z.infer<
  typeof WorkoutExerciseParamsSchema
>;
export type TWorkoutExerciseQuery = z.infer<typeof WorkoutExerciseQuerySchema>;
