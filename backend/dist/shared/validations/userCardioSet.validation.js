"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCardioSetsValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const createFactorySchema = ({ toSanitize }) => {
    return zod_1.z.object({
        workTime: util_validation_1.validationUtil.numberValidation({
            fieldName: "Work Time",
            maxLength: 10000000,
        }),
        avgHeartRate: util_validation_1.validationUtil.numberValidation({
            fieldName: "Average Heart Rate",
            maxLength: 200,
        }),
        avgSpeed: util_validation_1.validationUtil.numberValidation({
            fieldName: "Average Speed",
            maxLength: 10000000,
        }),
        distance: util_validation_1.validationUtil.numberValidation({
            fieldName: "Distance",
            maxLength: 10000000,
        }),
        caloriesBurned: util_validation_1.validationUtil.numberValidation({
            fieldName: "Calories Burned",
            maxLength: 10000000,
        }),
        isCompleted: util_validation_1.validationUtil.BooleanSchema,
        order: zod_1.z.number().optional(),
        skippedReason: util_validation_1.validationUtil
            .stringSchemaFactory({
            fieldName: "Skipped Reason",
            toSanitize,
        })
            .nullable()
            .optional(),
        crudOperation: util_validation_1.validationUtil.CrudOperationSchema,
    });
};
const updateFactorySSchema = ({ toSanitize }) => {
    return createFactorySchema({ toSanitize })
        .partial()
        .extend({
        id: util_validation_1.validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
    });
};
const QuerySchema = zod_1.z.object({
    skip: zod_1.z.coerce.number().min(0).optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
});
exports.userCardioSetsValidation = {
    createFactorySchema,
    updateFactorySSchema,
    QuerySchema,
};
