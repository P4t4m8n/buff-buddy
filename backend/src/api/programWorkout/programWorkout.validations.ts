import { z } from "zod";
import {
  CrudOperationSchema,
  DaysOfWeekSchema,
  IDSchema,
} from "../../shared/validations/shared.validations";
import {
  UpdateWorkoutSchema,
  CreateWorkoutSchema,
} from "../workouts/workouts.validations";

const BadeProgramWorkoutSchema = z.object({
  daysOfWeek: DaysOfWeekSchema.optional(),
  crudOperation: CrudOperationSchema,
});

export const CreateProgramWorkoutSchema = BadeProgramWorkoutSchema.extend({
  workout: CreateWorkoutSchema,
});
export const UpdateProgramWorkoutSchema = BadeProgramWorkoutSchema.extend({
  workout: UpdateWorkoutSchema,
  id: IDSchema.optional(),
});

export type TCreateProgramWorkoutInput = z.infer<
  typeof CreateProgramWorkoutSchema
>;

export type TUpdateProgramWorkoutInput = z.infer<
  typeof UpdateProgramWorkoutSchema
>;
