import z from "zod";
import { dateValidation, stringValidation } from "./shared.validation";
import {
  CreateProgramWorkoutSchema,
  UpdateProgramWorkoutSchema,
} from "./programWorkout.validation";

export const BaseProgramSchema = z.object({
  name: stringValidation({
    fieldName: "Program name",
    minLength: 1,
    maxLength: 100,
  }),
  notes: stringValidation({
    fieldName: "Program notes",
  })
    .optional()
    .nullish(),

  startDate: dateValidation("Program start date"),
  endDate: dateValidation("Program end date"),

  isActive: z.boolean().optional(),

  programWorkouts: z
    .array(CreateProgramWorkoutSchema)
    .min(1, "At least one exercise is required")
    .max(50, "Maximum 50 exercises allowed per program"),
});

export const CreateProgramSchema = BaseProgramSchema.refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export const UpdateProgramSchema = BaseProgramSchema.extend({
  programWorkouts: z
    .array(UpdateProgramWorkoutSchema)
    .min(1, "At least one exercise is required")
    .max(50, "Maximum 50 exercises allowed per program"),
}).partial();

export const ProgramQuerySchema = z.object({
  name: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});
