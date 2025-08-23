import { z } from "zod";
import { validationUtil } from "./util.validation";
import { workoutValidation } from "./workout.validations";

const BaseProgramWorkoutSchema = z.object({
  daysOfWeek: validationUtil.DaysOfWeekSchema.optional(),
  crudOperation: validationUtil.CrudOperationSchema,
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
  });
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
