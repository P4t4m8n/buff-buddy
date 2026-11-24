"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStrengthSetsValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const userStrengthSkippedSetFactorySchema = ({ toSanitize, }) => {
    return zod_1.z
        .object({
        skippedReason: util_validation_1.validationUtil.stringSchemaFactory({
            fieldName: "Skipped Reason",
            minLength: 1,
            maxLength: 500,
            toSanitize,
        }),
        isCompleted: zod_1.z.literal(false, {
            message: "A skipped set cannot be marked as completed.",
        }),
        reps: zod_1.z.any().optional(),
        weight: zod_1.z.any().optional(),
    })
        .superRefine((data, ctx) => {
        if ("reps" in data && !!data.reps) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["reps"],
                message: "Reps must not be provided when skippedReason is present.",
            });
        }
        if ("weight" in data && !!data.weight) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["weight"],
                message: "Weight must not be provided when skippedReason is present.",
            });
        }
    });
};
const userStrengthNonSkippedSetSchema = () => {
    return zod_1.z
        .object({
        skippedReason: zod_1.z.union([zod_1.z.literal(""), zod_1.z.null(), zod_1.z.undefined()]),
        reps: util_validation_1.validationUtil.numberValidation({
            fieldName: "Reps",
            minLength: 1,
        }),
        weight: util_validation_1.validationUtil
            .numberValidation({
            fieldName: "Weight",
            maxLength: 1000,
        })
            .transform((val) => Math.round(val * 100) / 100),
    });
};
const userStrengthUnionFactorySchema = ({ toSanitize, }) => {
    return zod_1.z.union([
        userStrengthSkippedSetFactorySchema({ toSanitize }),
        userStrengthNonSkippedSetSchema(),
    ]);
};
const UserStrengthSetSchema = zod_1.z.object({
    order: zod_1.z.number().optional(),
    isCompleted: util_validation_1.validationUtil.BooleanSchema,
    isJointPain: util_validation_1.validationUtil.BooleanSchema,
    isMuscleFailure: util_validation_1.validationUtil.BooleanSchema,
    isWarmup: util_validation_1.validationUtil.BooleanSchema,
    crudOperation: util_validation_1.validationUtil.CrudOperationSchema,
});
const createFactorySchema = ({ toSanitize }) => {
    return zod_1.z.intersection(UserStrengthSetSchema, userStrengthUnionFactorySchema({ toSanitize }));
};
const updateFactorySchema = ({ toSanitize }) => {
    return zod_1.z.intersection(UserStrengthSetSchema.partial().extend({
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
    }), userStrengthUnionFactorySchema({ toSanitize }).optional());
};
const QuerySchema = zod_1.z.object({
    skip: zod_1.z.coerce.number().min(0).optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
});
exports.userStrengthSetsValidation = {
    createFactorySchema,
    updateFactorySchema,
    QuerySchema,
};
