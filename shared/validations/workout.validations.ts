import { z } from "zod";

import { validationUtil } from "./util.validation";
import { workoutExerciseValidation } from "./workoutExercise.validations";

import type { IValidation } from "../models/validation.model";
import type { IWorkoutEditDTO, IWorkoutFilter } from "../models/workout.model";
import type { IToSanitize } from "../models/app.model";

const createFactorySchema = ({ toSanitize }: IToSanitize) => {
  return z.object({
    programId: z.string().nullish(),

    ownerId: validationUtil.IDSchemaFactory({ toSanitize: true }).nullable(),

    isTemplate: z.coerce.boolean(),

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

const updateFactorySchema = ({ toSanitize }: IToSanitize) => {
  return createFactorySchema({ toSanitize })
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
    })
    .partial();
};

const QuerySchema = validationUtil.FilterSchema.extend({
  programId: z.string().optional(),
  programName: z.string().optional(),
  exerciseName: z.string().optional(),
  ownerName: z.string().optional(),
  workoutName: z.string().optional(),
  userId: z.string().optional(),
  exerciseId: z.string().optional(),
  isTemplate: z
    .string()
    .transform((val) => val === "true")
    .optional(),
});

export const workoutValidation: IValidation<
  IWorkoutEditDTO,
  IWorkoutFilter,
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery
> = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TWorkoutCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;
export type TWorkoutUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;
export type TWorkoutQuery = z.infer<typeof QuerySchema>;
