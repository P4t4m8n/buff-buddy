"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorkoutValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const userStrengthSet_validation_1 = require("./userStrengthSet.validation");
const userCardioSet_validation_1 = require("./userCardioSet.validation");
const userSetRefinement = (data, ctx) => {
    const hasStrengthSets = !!data.userStrengthSets?.length;
    const hasCardioSets = !!data.userCardioSets?.length;
    if (!hasStrengthSets && !hasCardioSets) {
        return ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "At least one user set (strength or cardio) must be provided",
        });
    }
    if (hasStrengthSets && hasCardioSets) {
        return ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Cannot provide both strength and cardio sets",
        });
    }
};
const createUserWorkoutExerciseFactorySchema = ({ toSanitize, }) => {
    return zod_1.z
        .object({
        workoutExerciseId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize: false }),
        userStrengthSets: zod_1.z
            .array(userStrengthSet_validation_1.userStrengthSetsValidation.createFactorySchema({
            toSanitize,
        }))
            .optional(),
        userCardioSets: zod_1.z
            .array(userCardioSet_validation_1.userCardioSetsValidation.createFactorySchema({
            toSanitize,
        }))
            .optional(),
    })
        .superRefine(userSetRefinement);
};
const createFactorySchema = ({ toSanitize }) => {
    return zod_1.z.object({
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).optional(),
        dateCompleted: util_validation_1.validationUtil.DateSchema.default(() => new Date()),
        programId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }),
        workoutId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }),
        ownerId: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).nullable(), //INFO: validation and sanitation done manually in the middleware and controller
        userWorkoutExercises: zod_1.z.array(createUserWorkoutExerciseFactorySchema({ toSanitize })),
    });
};
const updateFactorySchema = ({ toSanitize }) => {
    return createFactorySchema({ toSanitize }).partial();
};
const QuerySchema = util_validation_1.validationUtil.FilterSchema;
exports.userWorkoutValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
