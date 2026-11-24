"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const programWorkout_validations_1 = require("./programWorkout.validations");
const programFactorySchema = ({ toSanitize }) => {
    return zod_1.z.object({
        name: util_validation_1.validationUtil.stringSchemaFactory({
            fieldName: "Program name",
            minLength: 1,
            maxLength: 100,
            toSanitize,
        }),
        ownerId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).nullable(),
        notes: util_validation_1.validationUtil
            .stringSchemaFactory({
            fieldName: "Program notes",
            minLength: 0,
            maxLength: 500,
            toSanitize,
        })
            .optional()
            .nullish(),
        startDate: util_validation_1.validationUtil.DateSchema,
        endDate: util_validation_1.validationUtil.DateSchema,
        isActive: util_validation_1.validationUtil.BooleanSchema.default(true),
        programWorkouts: zod_1.z
            .array(programWorkout_validations_1.programWorkoutValidation.createFactorySchema({
            toSanitize,
        }))
            .min(1, "At least one exercise is required")
            .max(50, "Maximum 50 exercises allowed per program"),
    });
};
const createFactorySchema = ({ toSanitize }) => {
    return programFactorySchema({ toSanitize }).refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });
};
const updateFactorySchema = ({ toSanitize }) => {
    return programFactorySchema({ toSanitize })
        .extend({
        programWorkouts: zod_1.z
            .array(programWorkout_validations_1.programWorkoutValidation.updateFactorySchema({
            toSanitize,
        }))
            .min(1, "At least one exercise is required")
            .max(50, "Maximum 50 exercises allowed per program"),
    })
        .partial()
        .refine((data) => !data?.endDate || !data?.startDate || data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });
};
const QuerySchema = util_validation_1.validationUtil.FilterSchema.extend({
    name: zod_1.z.string().optional(),
    isActive: util_validation_1.validationUtil.BooleanSchema.optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
});
exports.programValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
