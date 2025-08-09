import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { IValidationProps } from "../../../../shared/models/app.model";


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

export const stringValidationAndSanitization = ({
  minLength = 0,
  maxLength = 100,
  fieldName,
}: IValidationProps) => {
  return z
    .string()
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    )
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

export const numberValidation = ({
  minLength = 0,
  maxLength = 100,
  fieldName,
}: IValidationProps) => {
  return z
    .number()
    .min(minLength, `${fieldName} must be at least ${minLength}`)
    .max(maxLength, `${fieldName} cannot exceed ${maxLength}`);
};

export const CrudOperationEnumSchema = z.enum([
  "create",
  "update",
  "edit",
  "delete",
  "read",
]);

export const CrudOperationSchema = z
  .optional(CrudOperationEnumSchema)
  .default("read");

export const DaysOfWeekEnumSchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const DaysOfWeekSchema = z
  .array(DaysOfWeekEnumSchema)
  .max(7, "Maximum 7 days allowed")
  .transform((days) => [...new Set(days)]); // Remove duplicates

export const OrderSchema = z.coerce
  .number()
  .int("Order must be a whole number")
  .min(1, "Order must be at least 1")
  .max(100, "Order cannot exceed 100");

export const IDSchema = z
  .string()
  .min(1, "ID is required")
  .transform((val) => (val.startsWith("temp-") ? "" : val))
  .transform((val) =>
    sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
  )
  .transform((val) => val.trim())
  .refine((val) => val.length >= 1, "ID must be at least 1 character long")
  .refine((val) => val.length <= 50, "ID must be less than 50 characters long");

export const BooleanSchema = z.coerce.boolean().default(false);

export const DateSchema = z
  .string()
  .transform((val) => new Date(val))
  .refine((date) => !isNaN(date.getTime()), "Invalid  date");
