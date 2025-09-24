import { z } from "zod";

import { validationUtil } from "./util.validation";
import { workoutExerciseValidation } from "./workoutExercise.validations";

const createFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return z.object({
    programId: z.string().nullish(),

    ownerId: z.string().nullish(),

    isTemplate: validationUtil.BooleanSchema,

    notes: validationUtil
      .stringSchemaFactory({
        fieldName: "Workout notes",
        minLength: 0,
        maxLength: 500,
        toSanitize,
      })
      .nullish()
      .optional(),

    name: validationUtil.stringSchemaFactory({
      fieldName: "Workout name",
      minLength: 1,
      maxLength: 100,
      toSanitize,
    }),

    crudOperation: validationUtil.CrudOperationSchema,

    workoutExercises: z
      .array(
        workoutExerciseValidation.createFactorySchema({
          toSanitize,
        }),
        {
          invalid_type_error: "",
          required_error: "Workout need at least one exercise.",
        }
      )
      .min(1, "At least one workout set is required")
      .max(50, "Maximum 50 workout sets allowed per workout"),

    id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
  });
};

const updateFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return createFactorySchema({ toSanitize })
    .partial()
    .extend({
      workoutExercises: z
        .array(
          workoutExerciseValidation.updateFactorySchema({
            toSanitize,
          })
        )
        .min(1, "At least one workout set is required")
        .max(50, "Maximum 50 workout sets allowed per workout")
        .optional(),
      id: validationUtil.IDSchemaFactory({ toSanitize }),
    });
};

const QuerySchema = z.object({
  programId: z.string().optional(),
  programName: z.string().optional(),
  exerciseName: z.string().optional(),
  ownerName: z.string().optional(),
  userId: z.string().optional(),
  exerciseId: z.string().optional(),
  date: z.string().optional(),
  isTemplate: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  skip: z.coerce.number().min(0).optional(),
  take: z.coerce.number().min(1).optional(),
});

export const workoutValidation = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TCreateWorkoutInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;
export type TUpdateWorkoutInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;
export type TWorkoutQuery = z.infer<typeof QuerySchema>;
