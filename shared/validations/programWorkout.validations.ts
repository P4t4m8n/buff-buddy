import { z } from "zod";
import { validationUtil } from "./util.validation";
import { workoutValidation } from "./workout.validations";
import { WORKOUT_LEVELS, WORKOUT_GOALS } from "../consts/program.consts";

const BaseProgramWorkoutSchema = z.object({
  daysOfWeek: validationUtil.DaysOfWeekSchema.optional(),
  crudOperation: validationUtil.CrudOperationSchema,
  workoutLevel: z.enum(WORKOUT_LEVELS).default("beginner"),
  workoutGoal: z.enum(WORKOUT_GOALS).default("hypertrophy"),
});

const createFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return BaseProgramWorkoutSchema.extend({
    workout: z.union([
      workoutValidation.updateFactorySchema({ toSanitize }),
      workoutValidation.createFactorySchema({ toSanitize }),
    ]),
  });
};

const updateFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return BaseProgramWorkoutSchema.extend({
    workout: workoutValidation.updateFactorySchema({ toSanitize }),
    id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
  }).optional();
};

const QuerySchema = validationUtil.FilterSchema;

export const programWorkoutValidation = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
};

export type TCreateProgramWorkoutInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;

export type TUpdateProgramWorkoutInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;
