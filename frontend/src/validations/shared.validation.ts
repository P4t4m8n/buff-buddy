import z from "zod";
import type { IValidationProps } from "../../../shared/models/app.model";
import {
  CRUD_OPERATIONS,
  DAY_OF_WEEK,
} from "../../../shared/consts/app.consts";

export const stringValidation = ({
  minLength = 0,
  maxLength = 100,
  fieldName,
}: IValidationProps) => {
  return z
    .string({
      invalid_type_error: `${fieldName} is required.`,
      required_error: `${fieldName} is required.`,
    })
    .transform((val) => val.trim())
    .transform((val) => val.replace(/\s+/g, " "))
    .transform((val) => val.toLowerCase())
    .refine(
      (val) => val.length >= (minLength ?? 0),
      `${fieldName} must be at least ${minLength} characters long`
    )
    .refine(
      (val) => val.length <= maxLength,
      `${fieldName} must be less than ${maxLength} characters`
    );
};

export const dateValidation = (fieldName: string) => {
  return z
    .date({
      invalid_type_error: `${fieldName} must be a valid date.`,
      required_error: `${fieldName} is required.`,
    })
    .refine(
      (date) => !isNaN(date.getTime()),
      `${fieldName} must be a valid date`
    );
};

export const refineDateRange = (
  startData: string,
  endDate: string,
  fieldName: string
) => {
  return z
    .object({
      [startData]: dateValidation(`${fieldName} start date`),
      [endDate]: dateValidation(`${fieldName} end date`),
    })
    .refine(
      (data) => data[startData] <= data[endDate],
      `${fieldName} start date must be before or equal to end date`
    );
};

export const CrudOperationEnumSchema = z.enum(CRUD_OPERATIONS);

export const CrudOperationSchema = z
  .optional(CrudOperationEnumSchema)
  .default("read");

export const DaysOfWeekEnumSchema = z.enum(DAY_OF_WEEK);

export const DaysOfWeekSchema = z
  .array(DaysOfWeekEnumSchema)
  .max(7, "Maximum 7 days allowed")
  .transform((days) => [...new Set(days)]);

export const IDSchema = z
  .string()
  .min(1, "ID is required")
  .transform((val) => (val.startsWith("temp-") ? "" : val))
  .transform((val) => val.trim())
  .refine((val) => val.length >= 1, "ID must be at least 1 character long")
  .refine((val) => val.length <= 50, "ID must be less than 50 characters long");

export const BooleanSchema = z.coerce.boolean().default(false);

export const conditionalOrderRefinement = (
  data: { order?: number | null; crudOperation?: string },
  ctx: z.RefinementCtx
) => {
  if (data.crudOperation !== "delete") {
    const order = data.order!;

    if (data.order === undefined) {
      // For create operations, order is required. For update, it's optional.
      if (data.crudOperation !== "update") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Order is required",
          path: ["order"],
        });
      }
    } else {
      if (!Number.isInteger(data.order)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Order must be a whole number",
          path: ["order"],
        });
      } else {
        if (order < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Order must be at least 1",
            path: ["order"],
          });
        }
        if (order > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Order cannot exceed 100",
            path: ["order"],
          });
        }
      }
    }
  }
};
export const conditionalWeightRefinement = (
  data: { weight?: number; isBodyWeight?: boolean },
  ctx: z.RefinementCtx
) => {
  if (data.isBodyWeight && data.weight && data.weight > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cannot have both weight and body weight set.",
      path: ["weight"],
    });
  }
  if (!data.isBodyWeight && (!data.weight || data.weight === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either weight must be set or isBodyWeight must be true.",
      path: ["weight"],
    });
  }
};

export const numberValidation = ({
  minLength = 0,
  maxLength = 100,
  fieldName,
}: IValidationProps) => {
  return z.coerce
    .number({
      invalid_type_error: `${fieldName} must be a number`,
      required_error: `${fieldName} is required`,
    })
    .min(minLength, `${fieldName} must be at least ${minLength}`)
    .max(maxLength, `${fieldName} cannot exceed ${maxLength}`);
};
export const OrderSchema = numberValidation({
  minLength: 1,
  maxLength: 100,
  fieldName: "Order",
});
