import z from "zod";
import { stringValidation } from "./shared.validation";
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../shared/consts/exercise.consts";

const createEnumSchema = <T extends string>(
  data: readonly [T, ...T[]],
  fieldName: string
) => {
  return z.enum(data, {
    invalid_type_error: `Invalid ${fieldName} selected. Please choose from the list.`,
    required_error: `${fieldName} is required.`,
  });
};

const YoutubeURLSchema = stringValidation({
  fieldName: "Youtube url",
  minLength: 1,
  maxLength: 255,
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

export const ExerciseMuscleSchema = createEnumSchema(
  EXERCISE_MUSCLES,
  "muscle"
);

export const ExerciseEquipmentSchema = createEnumSchema(
  EXERCISE_EQUIPMENT,
  "equipment"
);

export const ExerciseTypeSchema = createEnumSchema(
  EXERCISE_TYPES,
  "exercise type"
);

export const CreateExerciseSchema = z.object({
  name: stringValidation({
    fieldName: "Exercise name",
    minLength: 1,
  }),

  youtubeUrl: YoutubeURLSchema,

  notes: stringValidation({
    fieldName: "Exercise notes",
  }).optional(),
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
