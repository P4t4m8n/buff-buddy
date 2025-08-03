import { z } from "zod";
import {
  BooleanSchema,
  CrudOperationSchema,
  IDSchema,
  numberValidation,
  stringValidationAndSanitization,
} from "../../../shared/validations/shared.validations";

export const CreateUserCardioSetSchema = z.object({
  workTime: numberValidation({ fieldName: "Work Time" }),
  avgHeartRate: numberValidation({ fieldName: "Average Heart Rate" }),
  avgSpeed: numberValidation({ fieldName: "Average Speed" }),
  distance: numberValidation({ fieldName: "Distance" }),
  caloriesBurned: numberValidation({ fieldName: "Calories Burned" }),
  isCompleted: BooleanSchema,
  order: z.number().optional(),
  skippedReason: stringValidationAndSanitization({
    fieldName: "Skipped Reason",
  }),
  crudOperation: CrudOperationSchema,
});

export const UpdateUserCardioSetSchema =
  CreateUserCardioSetSchema.partial().extend({
    id: IDSchema,
  });

export const UserCardioSetParamsSchema = z.object({
  id: IDSchema,
});

export const UserCardioSetQuerySchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export type TCreateUserCardioSetInput = z.infer<
  typeof CreateUserCardioSetSchema
>;
export type TUpdateUserCardioSetInput = z.infer<
  typeof UpdateUserCardioSetSchema
>;
export type TUserCardioSetParams = z.infer<typeof UserCardioSetParamsSchema>;
export type TUserCardioSetQuery = z.infer<typeof UserCardioSetQuerySchema>;
