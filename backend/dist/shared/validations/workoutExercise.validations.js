"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutExerciseValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const exercise_validation_1 = require("./exercise.validation");
// const exerciseTypeSetRefinement = (
//   data: {
//     exerciseData?: { type?: string };
//     coreStrengthSet?: any;
//     coreCardioSet?: any;
//   },
//   ctx: z.RefinementCtx
// ) => {
//   const exerciseType = data.exerciseData?.type;
//   const hasStrengthSet = !!data.coreStrengthSet;
//   const hasCardioSet = !!data.coreCardioSet;
//   if (!hasCardioSet && !hasStrengthSet) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "At least one core set (strength or cardio) must be provided",
//     });
//   }
//   if (exerciseType === "strength" && !hasStrengthSet) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Core strength set is required for strength exercises",
//       path: ["coreStrengthSet"],
//     });
//   }
//   if (exerciseType === "strength" && hasCardioSet) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Cardio set not allowed for strength exercises",
//       path: ["coreCardioSet"],
//     });
//   }
//   if (exerciseType === "cardio" && !hasCardioSet) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Core cardio set is required for cardio exercises",
//       path: ["coreCardioSet"],
//     });
//   }
//   if (exerciseType === "cardio" && hasStrengthSet) {
//     return ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Strength set not allowed for cardio exercises",
//       path: ["coreStrengthSet"],
//     });
//   }
// };
const workoutExerciseFactorySchema = ({ toSanitize, }) => {
    return zod_1.z.object({
        order: util_validation_1.validationUtil.OrderSchema.optional().nullable(),
        notes: util_validation_1.validationUtil
            .stringSchemaFactory({
            minLength: 0,
            maxLength: 500,
            fieldName: "notes",
            toSanitize,
        })
            .optional(),
        exerciseData: zod_1.z.object({
            id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize }),
            type: exercise_validation_1.exerciseValidation.ExerciseTypeSchema,
        }),
        isActive: zod_1.z.coerce.boolean().default(true),
        hasWarmup: util_validation_1.validationUtil.BooleanSchema,
        numberOfSets: util_validation_1.validationUtil.numberValidation({}).optional(),
        maxNumberOfReps: util_validation_1.validationUtil.numberValidation({}).optional(),
        isDropSet: util_validation_1.validationUtil.BooleanSchema.optional(),
        isMyoReps: util_validation_1.validationUtil.BooleanSchema.optional(),
        crudOperation: zod_1.z
            .optional(util_validation_1.validationUtil.CrudOperationEnumSchema)
            .default("read"),
        id: zod_1.z.string().optional(),
    });
};
const createFactorySchema = ({ toSanitize }) => {
    return workoutExerciseFactorySchema({ toSanitize });
};
const updateFactorySchema = ({ toSanitize }) => {
    return workoutExerciseFactorySchema({ toSanitize }).partial();
};
const QuerySchema = zod_1.z.object({
    workoutId: zod_1.z.string().optional(),
    exerciseId: zod_1.z.string().optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    daysOfWeek: zod_1.z.string().optional(),
    minOrder: zod_1.z.coerce.number().min(1).optional(),
    maxOrder: zod_1.z.coerce.number().min(1).optional(),
    skip: zod_1.z.coerce.number().min(0).optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
});
exports.workoutExerciseValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
