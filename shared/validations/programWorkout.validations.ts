import { z } from "zod";
import {
  CrudOperationSchema,
  DaysOfWeekSchema,
  IDSchema,
} from "./shared.validations";
import {
  UpdateWorkoutSchema,
  CreateWorkoutSchema,
} from "./workouts.validations";

const BadeProgramWorkoutSchema = z.object({
  daysOfWeek: DaysOfWeekSchema.optional(),
  crudOperation: CrudOperationSchema,
});

//TODO?? optional for now improve validation later as a user can send a new workout to create or send an only the id to connect
export const CreateProgramWorkoutSchema = BadeProgramWorkoutSchema.extend({
  workout: z.union([UpdateWorkoutSchema, CreateWorkoutSchema]),
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
