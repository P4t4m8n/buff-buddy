import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../../shared/consts/exercise.consts";
import {
  NotesSchema,
  stringValidationAndSanitization,
} from "../../shared/validations/shared.validations";

export const ExerciseMuscleSchema = z.enum(EXERCISE_MUSCLES);

export const ExerciseEquipmentSchema = z.enum(EXERCISE_EQUIPMENT);

export const ExerciseTypeSchema = z.enum(EXERCISE_TYPES);

const YoutubeURLSchema = stringValidationAndSanitization({
  fieldName: "Youtube url",
  minLength: 1,
  MaxLength: 255,
})
  .transform((url) => {
    // Normalize YouTube URL format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    if (url.includes("youtube.com/shorts/")) {
      const videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    if (url.includes("youtube.com/watch")) {
      // Ensure https and www
      if (!url.startsWith("http")) {
        url = "https://" + url;
      }
      if (!url.includes("www.")) {
        url = url.replace("youtube.com", "www.youtube.com");
      }
      return url;
    }
    return url;
  })
  .refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Must be a valid URL")
  .refine((url) => {
    const youtubeRegex =
      /^https:\/\/www\.youtube\.com\/(watch\?v=|shorts\/)[\w-]{8,20}/;
    return youtubeRegex.test(url);
  }, "Must be a valid YouTube URL");

export const CreateExerciseSchema = z.object({
  name: stringValidationAndSanitization({
    fieldName: "Exercise name",
  }),

  youtubeUrl: YoutubeURLSchema,
  notes: NotesSchema,
  type: ExerciseTypeSchema,

  equipment: z
    .array(ExerciseEquipmentSchema)
    .min(1, "At least one equipment type is required")
    .max(8, "Maximum 8 equipment types allowed")
    .transform((equipment) => [...new Set(equipment)]), // Remove duplicates

  muscles: z
    .array(ExerciseMuscleSchema)
    .min(1, "At least one muscle group is required")
    .max(21, "Maximum 21 muscle groups allowed")
    .transform((muscles) => [...new Set(muscles)]), // Remove duplicates
});

export const UpdateExerciseSchema = CreateExerciseSchema.partial();

export const ExerciseParamsSchema = z.object({
  id: z.string().min(1, "Exercise ID is required"),
});

export const ExerciseQuerySchema = z.object({
  name: z.string().optional(),
  types: z
    .string()
    .transform((val) => val.split(","))
    .pipe(z.array(ExerciseTypeSchema))
    .optional(),

  equipment: z
    .string()
    .transform((val) => val.split(","))
    .pipe(z.array(ExerciseEquipmentSchema))
    .optional(),

  muscles: z
    .string()
    .transform((val) => val.split(","))
    .pipe(z.array(ExerciseMuscleSchema))
    .optional(),

  skip: z.coerce.number().min(0).optional(),
  take: z.coerce.number().min(1).optional(),
});

export type CreateExerciseInput = z.infer<typeof CreateExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof UpdateExerciseSchema>;
export type ExerciseParams = z.infer<typeof ExerciseParamsSchema>;
export type ExerciseQuery = z.infer<typeof ExerciseQuerySchema>;
