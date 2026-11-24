"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programWorkoutValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const workout_validations_1 = require("./workout.validations");
const program_consts_1 = require("../consts/program.consts");
const BaseProgramWorkoutSchema = zod_1.z.object({
    daysOfWeek: util_validation_1.validationUtil.DaysOfWeekSchema.optional(),
    crudOperation: util_validation_1.validationUtil.CrudOperationSchema,
    workoutLevel: zod_1.z.enum(program_consts_1.WORKOUT_LEVELS).default("beginner"),
    workoutGoal: zod_1.z.enum(program_consts_1.WORKOUT_GOALS).default("hypertrophy"),
});
const createFactorySchema = ({ toSanitize }) => {
    return BaseProgramWorkoutSchema.extend({
        workout: zod_1.z.union([
            workout_validations_1.workoutValidation.updateFactorySchema({ toSanitize }),
            workout_validations_1.workoutValidation.createFactorySchema({ toSanitize }),
        ]),
    });
};
const updateFactorySchema = ({ toSanitize }) => {
    return BaseProgramWorkoutSchema.extend({
        workout: workout_validations_1.workoutValidation.updateFactorySchema({ toSanitize }),
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }).optional(),
    });
};
const QuerySchema = util_validation_1.validationUtil.FilterSchema;
exports.programWorkoutValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
