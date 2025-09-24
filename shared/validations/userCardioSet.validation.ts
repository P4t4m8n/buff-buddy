import { z } from "zod";
import { validationUtil } from "./util.validation";

const createFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return z.object({
    workTime: validationUtil.numberValidation({
      fieldName: "Work Time",
      maxLength: 10000000,
    }),
    avgHeartRate: validationUtil.numberValidation({
      fieldName: "Average Heart Rate",
      maxLength: 200,
    }),
    avgSpeed: validationUtil.numberValidation({
      fieldName: "Average Speed",
      maxLength: 10000000,
    }),
    distance: validationUtil.numberValidation({
      fieldName: "Distance",
      maxLength: 10000000,
    }),
    caloriesBurned: validationUtil.numberValidation({
      fieldName: "Calories Burned",
      maxLength: 10000000,
    }),
    isCompleted: validationUtil.BooleanSchema,
    order: z.number().optional(),
    skippedReason: validationUtil
      .stringSchemaFactory({
        fieldName: "Skipped Reason",
        toSanitize,
      })
      .nullable()
      .optional(),
    crudOperation: validationUtil.CrudOperationSchema,
  });
};

const updateFactorySSchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return createFactorySchema({ toSanitize })
    .partial()
    .extend({
      id: validationUtil.IDSchemaFactory({ toSanitize: false }).optional(),
    });
};

const QuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const userCardioSetsValidation = {
  createFactorySchema,
  updateFactorySSchema,
  QuerySchema,
};

export type TCreateUserCardioSetInput = z.infer<
  ReturnType<typeof createFactorySchema>
>;
export type TUpdateUserCardioSetInput = z.infer<
  ReturnType<typeof updateFactorySSchema>
>;
export type TUserCardioSetQuery = z.infer<typeof QuerySchema>;
