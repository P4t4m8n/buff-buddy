"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const workoutExercise_validations_1 = require("./workoutExercise.validations");
const createFactorySchema = ({ toSanitize }) => {
    return zod_1.z.object({
        programId: zod_1.z.string().nullish(),
        ownerId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).nullable(),
        isTemplate: util_validation_1.validationUtil.BooleanSchema,
        notes: util_validation_1.validationUtil
            .stringSchemaFactory({
            fieldName: "Workout notes",
            minLength: 0,
            maxLength: 500,
            toSanitize,
        })
            .nullish()
            .optional(),
        name: util_validation_1.validationUtil.stringSchemaFactory({
            fieldName: "Workout name",
            minLength: 1,
            maxLength: 100,
            toSanitize,
        }),
        crudOperation: util_validation_1.validationUtil.CrudOperationSchema,
        workoutExercises: zod_1.z
            .array(workoutExercise_validations_1.workoutExerciseValidation.createFactorySchema({
            toSanitize,
        }), {
            error: (issue) => issue.input === undefined || issue.input === null
                ? { message: "Workout need at least one exercise." }
                : { message: "Workout exercises is invalid." },
        })
            .min(1, "At least one workout set is required")
            .max(50, "Maximum 50 workout sets allowed per workout"),
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    });
};
const updateFactorySchema = ({ toSanitize }) => {
    return createFactorySchema({ toSanitize })
        .extend({
        workoutExercises: zod_1.z
            .array(workoutExercise_validations_1.workoutExerciseValidation.updateFactorySchema({
            toSanitize,
        }))
            .min(1, "At least one workout set is required")
            .max(50, "Maximum 50 workout sets allowed per workout")
            .optional(),
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }),
    })
        .partial();
};
const QuerySchema = util_validation_1.validationUtil.FilterSchema.extend({
    programId: zod_1.z.string().optional(),
    programName: zod_1.z.string().optional(),
    exerciseName: zod_1.z.string().optional(),
    ownerName: zod_1.z.string().optional(),
    workoutName: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    exerciseId: zod_1.z.string().optional(),
    isTemplate: zod_1.z
        .string()
        .transform((val) => {
        return val === "true" ? true : val === "false" ? false : undefined;
    })
        .optional(),
});
exports.workoutValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
