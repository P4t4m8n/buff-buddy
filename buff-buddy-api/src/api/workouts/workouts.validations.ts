import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { CreateUserSetSchema } from "../userSets/userSets.validations";



const BaseWorkoutSchema = z.object({
  programId: z.string().min(1, "Program ID is required"),
  userId: z.string().min(1, "User ID is required"),
  date: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), "Invalid workout date"),
  workoutSets: z
    .array(CreateUserSetSchema)
    .min(1, "At least one workout set is required")
    .max(50, "Maximum 50 workout sets allowed per workout"),
});

export const CreateWorkoutSchema = BaseWorkoutSchema;

export const UpdateWorkoutSchema = BaseWorkoutSchema.partial();

export const WorkoutParamsSchema = z.object({
  id: z.string().min(1, "Workout ID is required"),
});

export const WorkoutQuerySchema = z.object({
  programId: z.string().optional(),
  userId: z.string().optional(),
  exerciseId: z.string().optional(),
  date: z.string().optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
export type WorkoutParams = z.infer<typeof WorkoutParamsSchema>;
export type WorkoutQuery = z.infer<typeof WorkoutQuerySchema>;
