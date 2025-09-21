import { z } from "zod";
import { validationUtil } from "./util.validation";
import { workoutValidation } from "./workout.validations";
import { WORKOUT_LEVELS, WORKOUT_GOALS } from "../consts/program.consts";

const BaseProgramWorkoutSchema = z.object({
  daysOfWeek: validationUtil.DaysOfWeekSchema.optional(),
  crudOperation: validationUtil.CrudOperationSchema,
  level: z.enum(WORKOUT_LEVELS).default("beginner"),
  workoutGoal: z.enum(WORKOUT_GOALS).default("hypertrophy"),
});

const createProgramWorkoutFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return BaseProgramWorkoutSchema.extend({
    workout: z.union([
      workoutValidation.updateWorkoutFactorySchema({ toSanitize }),
      workoutValidation.createWorkoutFactorySchema({ toSanitize }),
    ]),
  });
};

const updateProgramWorkoutFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return BaseProgramWorkoutSchema.extend({
    workout: workoutValidation.updateWorkoutFactorySchema({ toSanitize }),
    id: validationUtil.IDSchemaFactory({ toSanitize }).optional(),
  }).optional();
};

export const programWorkoutValidation = {
  createProgramWorkoutFactorySchema,
  updateProgramWorkoutFactorySchema,
};

export type TCreateProgramWorkoutInput = z.infer<
  ReturnType<typeof createProgramWorkoutFactorySchema>
>;

export type TUpdateProgramWorkoutInput = z.infer<
  ReturnType<typeof updateProgramWorkoutFactorySchema>
>;
