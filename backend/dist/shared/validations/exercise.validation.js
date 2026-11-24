"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const exercise_consts_1 = require("../consts/exercise.consts");
/*
 * INFO: In case the enums arr is not long return
 * the allowed type otherwise just return invalid
 * to prevent error UI to be to big and confusing
 */
const getExerciseEnumError = (enumArr, type) => {
    return enumArr.length <= 4
        ? `Invalid ${type} type only ${enumArr.join(", ")} are allowed`
        : `Invalid ${type} type`;
};
const ExerciseTypeSchema = zod_1.z.enum(exercise_consts_1.EXERCISE_TYPES, {
    message: getExerciseEnumError(exercise_consts_1.EXERCISE_TYPES, "type"),
});
const exerciseInfoFactorySchema = ({ toSanitize = false, name, }) => {
    return zod_1.z.object({
        name: util_validation_1.validationUtil.stringSchemaFactory({
            fieldName: name,
            minLength: 1,
            toSanitize,
        }),
        crudOperation: zod_1.z
            .optional(util_validation_1.validationUtil.CrudOperationEnumSchema)
            .default("read"),
    });
};
const YoutubeURLSchema = (toSanitize) => {
    return util_validation_1.validationUtil
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
        }
        catch {
            return false;
        }
    }, "Must be a valid URL")
        .refine((url) => {
        const youtubeRegex = /^https:\/\/www\.youtube\.com\/(watch\?v=|shorts\/)[\w-]{8,20}/;
        return youtubeRegex.test(url);
    }, "Must be a valid YouTube URL");
};
const createFactorySchema = ({ toSanitize = false }) => {
    return zod_1.z.object({
        youtubeUrl: YoutubeURLSchema(toSanitize),
        name: util_validation_1.validationUtil.stringSchemaFactory({
            fieldName: "Exercise name",
            minLength: 1,
            toSanitize,
        }),
        ownerId: util_validation_1.validationUtil
            .IDSchemaFactory({ toSanitize })
            .optional()
            .nullable(),
        notes: util_validation_1.validationUtil
            .stringSchemaFactory({
            fieldName: "Exercise notes",
            toSanitize,
        })
            .optional(),
        type: ExerciseTypeSchema,
        isCompounded: util_validation_1.validationUtil.BooleanSchema.optional(),
        isSeparateHands: util_validation_1.validationUtil.BooleanSchema.optional(),
        equipment: zod_1.z
            .array(exerciseInfoFactorySchema({ toSanitize, name: "Equipment name" }), { error: util_validation_1.validationUtil.createFieldErrorHandler("Equipment") })
            .min(1, "At least one equipment type is required")
            .max(8, "Maximum 8 equipment types allowed")
            .transform((equipment) => [...new Set(equipment)]), // Remove duplicates
        muscles: zod_1.z
            .array(exerciseInfoFactorySchema({ toSanitize, name: "Muscle  name" }), {
            error: "Muscles are required.",
        })
            .min(1, "At least one muscle group is required")
            .max(21, "Maximum 21 muscle groups allowed")
            .transform((muscles) => [...new Set(muscles)]), // Remove duplicates
    });
};
const updateFactorySchema = ({ toSanitize = false }) => {
    return createFactorySchema({ toSanitize }).partial();
};
const QuerySchema = util_validation_1.validationUtil.FilterSchema.extend({
    name: zod_1.z.string().optional(),
    types: zod_1.z
        .string()
        .transform((val) => val.split(","))
        .pipe(zod_1.z.array(ExerciseTypeSchema))
        .optional(),
    equipment: zod_1.z
        .string()
        .transform((val) => val.split(","))
        .pipe(zod_1.z.array(zod_1.z.string()))
        .optional(),
    muscles: zod_1.z
        .string()
        .transform((val) => val.split(","))
        .pipe(zod_1.z.array(zod_1.z.string()))
        .optional(),
});
exports.exerciseValidation = {
    createFactorySchema,
    updateFactorySchema,
    exerciseInfoFactorySchema,
    QuerySchema,
    ExerciseTypeSchema,
};
