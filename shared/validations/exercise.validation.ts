import { z } from "zod";

import { validationUtil } from "./util.validation";

import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../consts/exercise.consts";
import type {
  IExerciseDTO,
  IExerciseFilter,
  TExerciseInfo,
} from "../models/exercise.model";
import type { IValidation } from "../models/validation.model";

/*
 * INFO: In case the enums arr is not long return
 * the allowed type otherwise just return invalid
 * to prevent error UI to be to big and confusing
 */
const getExerciseEnumError = (
  enumArr: readonly string[],
  type: TExerciseInfo
): string => {
  return enumArr.length <= 4
    ? `Invalid ${type} type only ${enumArr.join(", ")} are allowed`
    : `Invalid ${type} type`;
};

const ExerciseMuscleSchema = z.enum(EXERCISE_MUSCLES, {
  message: getExerciseEnumError(EXERCISE_MUSCLES, "muscles"),
});

const ExerciseEquipmentSchema = z.enum(EXERCISE_EQUIPMENT, {
  message: getExerciseEnumError(EXERCISE_EQUIPMENT, "equipment"),
});

const ExerciseTypeSchema = z.enum(EXERCISE_TYPES, {
  message: getExerciseEnumError(EXERCISE_TYPES, "type"),
});

const YoutubeURLSchema = (toSanitize?: boolean) => {
  return validationUtil
    .stringSchemaFactory({
      fieldName: "Youtube url",
      minLength: 1,
      maxLength: 255,
      toSanitize,
      toLowerCase: false,
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
};
const createFactorySchema = ({
  toSanitize = false,
}: {
  toSanitize?: boolean;
}) => {
  return z.object({
    youtubeUrl: YoutubeURLSchema(toSanitize),

    name: validationUtil.stringSchemaFactory({
      fieldName: "Exercise name",
      minLength: 1,
      toSanitize,
    }),

    // notes: validationUtil
    //   .stringSchemaFactory({
    //     fieldName: "Exercise notes",
    //     toSanitize,
    //   })
    //   .optional()
    //   .nullable(),
    type: ExerciseTypeSchema,

    equipment: z
      .array(ExerciseEquipmentSchema, {
        required_error: "Equipment is required.",
      })
      .min(1, "At least one equipment type is required")
      .max(8, "Maximum 8 equipment types allowed")
      .transform((equipment) => [...new Set(equipment)]), // Remove duplicates

    muscles: z
      .array(ExerciseMuscleSchema, {
        required_error: "Muscles are required.",
      })
      .min(1, "At least one muscle group is required")
      .max(21, "Maximum 21 muscle groups allowed")
      .transform((muscles) => [...new Set(muscles)]), // Remove duplicates
  });
};

const updateFactorySchema = ({
  toSanitize = false,
}: {
  toSanitize?: boolean;
}) => {
  return createFactorySchema({ toSanitize }).partial();
};

const QuerySchema = validationUtil.FilterSchema.extend({
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
});

//INFO: Explicit type due to extension of the IValidation interface
export const exerciseValidation: IValidation<
  IExerciseDTO,
  IExerciseFilter,
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery
> & {
  ExerciseTypeSchema: z.ZodEnum<
    ["strength", "cardio", "flexibility", "miscellaneous"]
  >;
} = {
  createFactorySchema,
  updateFactorySchema,
  QuerySchema,
  ExerciseTypeSchema,
};

export type TExerciseCreateValidatedInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;
export type TExerciseUpdateValidatedInput = z.infer<
  ReturnType<typeof updateFactorySchema>
>;
export type TExerciseQuery = z.infer<typeof QuerySchema>;
