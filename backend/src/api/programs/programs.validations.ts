import { z } from "zod";
import { stringValidationAndSanitization } from "../../shared/validations/shared.validations";
import { CreateProgramWorkoutSchema, UpdateProgramWorkoutSchema } from "./programWorkout.validations";


const BaseProgramSchema = z.object({
  name: stringValidationAndSanitization({
    fieldName: "Program name",
    minLength: 1,
    maxLength: 100,
  }),

  notes: stringValidationAndSanitization({
    fieldName: "Program notes",
    minLength: 0,
    maxLength: 500,
  }).optional().nullish(),

  startDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), "Invalid start date"),

  endDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), "Invalid end date"),

  isActive: z.coerce.boolean().default(true),

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

export type TCreateProgramInput = z.infer<typeof CreateProgramSchema>;
export type TUpdateProgramInput = z.infer<typeof UpdateProgramSchema>;
export type TProgramQuery = z.infer<typeof ProgramQuerySchema>;
