import { z } from "zod";
import {
  CrudOperationSchema,
  DaysOfWeekSchema,
  IDSchema,
} from "../../shared/validations/shared.validations";
import { UpdateWorkoutSchema } from "../workouts/workouts.validations";

const BadeProgramWorkoutSchema = z.object({
  daysOfWeek: DaysOfWeekSchema.optional(),
  crudOperation: CrudOperationSchema,
});

export const CreateProgramWorkoutSchema = BadeProgramWorkoutSchema.extend({
  workout: UpdateWorkoutSchema,
});
export const UpdateProgramWorkoutSchema = BadeProgramWorkoutSchema.extend({
  workout: UpdateWorkoutSchema,
  id: IDSchema.optional(),
});

export type CreateProgramWorkoutInput = z.infer<
  typeof CreateProgramWorkoutSchema
>;

export type UpdateProgramWorkoutInput = z.infer<
  typeof UpdateProgramWorkoutSchema
>;
