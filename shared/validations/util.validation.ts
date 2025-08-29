import { z, ZodType } from "zod";
import type { IValidationProps } from "../models/app.model";
import { CRUD_OPERATIONS, DAY_OF_WEEK } from "../consts/app.consts";

/**
 * Return an identity function or a sanitizer (lazily requiring 'sanitize-html')
 * that strips all HTML tags/attributes when sanitize=true.
 *
 * @param toSanitize - enable HTML sanitization (default: false)
 * @returns (input: string) => string
 * @throws If sanitize=true and 'sanitize-html' cannot be required
 */
const createSanitizer = (toSanitize = false) => {
  if (!toSanitize) return (v: string) => v;
  const sanitizeHtml = require("sanitize-html");
  return (val: string) =>
    sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} });
};
/**
 * Create a Zod string schema that optionally sanitizes, trims, collapses whitespace,
 * lowercases the value, and enforces min/max length.
 *
 * @param options - configuration object
 * @param options.minLength {number} Minimum allowed length after transforms (default: 0)
 * @param options.maxLength {number} Maximum allowed length after transforms (default: 100)
 * @param options.fieldName {string} Human-readable name used in error messages (required for clear messages)
 * @param options.sanitize {boolean} If true, strips all HTML tags/attributes using 'sanitize-html' (default: false).
 *                                  Throws if 'sanitize-html' cannot be required when enabled.
 * @returns {ZodType<string>} A Zod string schema
 */
const stringSchemaFactory = ({
  minLength = 0,
  maxLength = 100,
  fieldName,
  toSanitize = false,
}: IValidationProps): ZodType<string> => {
  const sanitizer = createSanitizer(toSanitize);
  return z
    .string({
      invalid_type_error: `${fieldName} is required.`,
      required_error: `${fieldName} is required.`,
    })
    .transform((val) => sanitizer(val))
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
/**
 * Create a Zod schema for an ID string.
 *
 * Transforms: "temp-" prefix -> "", optional sanitization, trim.
 * Validates: non-empty (min 1) and max 50 chars. Initial raw check yields "ID is required".
 *
 * @param options.sanitize - enable sanitization (default: false)
 * @returns  {ZodType<string>}schema for an ID string
 */
const IDSchemaFactory = ({ toSanitize = false }): ZodType<string> => {
  const sanitizer = createSanitizer(toSanitize);
  return z
    .string()
    .min(1, "ID is required")
    .transform((val) => (val.startsWith("temp-") ? "" : val))
    .transform((val) => sanitizer(val))
    .transform((val) => val.trim())
    .refine((val) => val.length >= 1, "ID must be at least 1 character long")
    .refine(
      (val) => val.length <= 50,
      "ID must be less than 50 characters long"
    );
};
/**
 * Create a Zod date validator customized with field-specific error messages.
 *
 * Validates that a value is present and is a real Date (not an invalid/NaN date).
 *
 * @param fieldName - The name of the field used to compose validation error messages.
 * @returns A Zod date schema that enforces presence and rejects invalid dates.
 */
const dateValidation = ({ fieldName }: { fieldName: string }) => {
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
/**
 * Create a Zod object schema that validates two date fields and ensures start <= end.
 *
 * @param startDate - object key for the start date
 * @param endDate - object key for the end date
 * @param fieldName - base name used in error messages
 * @returns Zod schema
 */
const refineDateRange = ({
  startDate,
  endDate,
  fieldName,
}: {
  startDate: string;
  endDate: string;
  fieldName: string;
}) => {
  return z
    .object({
      [startDate]: dateValidation({ fieldName: `${fieldName} start date` }),
      [endDate]: dateValidation({ fieldName: `${fieldName} end date` }),
    })
    .refine(
      (data) => data[startDate] <= data[endDate],
      `${fieldName} start date must be before or equal to end date`
    );
};
/**
 * Coerce to boolean (e.g. "true", 1) and default to false.
 */
const BooleanSchema = z.coerce.boolean().default(false);
/**
 * Zod schema validating CRUD operation enum values.
 */
const CrudOperationEnumSchema = z.enum(CRUD_OPERATIONS);
/**
 * Zod schema validating CRUD operation enum values.
 * Optional; if omitted or undefined, it defaults to "read".
 */
const CrudOperationSchema = z.optional(CrudOperationEnumSchema).default("read");
/**
 * Zod schema validating days of the week enum values.
 */
const DaysOfWeekEnumSchema = z.enum(DAY_OF_WEEK);
/**
 * Zod schema validating days of the week values.
 */
const DaysOfWeekSchema = z
  .array(DaysOfWeekEnumSchema)
  .max(7, "Maximum 7 days allowed")
  .transform((days) => [...new Set(days)]);

const conditionalOrderRefinement = (
  data: { order?: number | null; crudOperation?: string },
  ctx: z.RefinementCtx
) => {
  if (data.crudOperation === "delete") return;

  const order = data.order;
  // For create operations, order is required. For update, it's optional.
  if (!order && data.crudOperation !== "update") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Order is required",
      path: ["order"],
    });
    return;
  }

  if (!order) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Order is required",
      path: ["order"],
    });
    return;
  }

  if (!Number.isInteger(order)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Order must be a whole number",
      path: ["order"],
    });
    return;
  }
  if (order < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Order must be at least 1",
      path: ["order"],
    });
    return;
  }
  if (order > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Order cannot exceed 100",
      path: ["order"],
    });
    return;
  }

  return;
};

const conditionalWeightRefinement = (
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

const numberValidation = ({
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

const DateSchema = z
  .string()
  .transform((val) => new Date(val))
  .refine((date) => !isNaN(date.getTime()), "Invalid  date");

const OrderSchema = z.coerce
  .number()
  .int("Order must be a whole number")
  .min(1, "Order must be at least 1")
  .max(100, "Order cannot exceed 100");

const FilterSchema = z.object({
  skip: z.coerce.number().min(0).optional(),
  take: z.coerce.number().min(1).optional(),
});

export const validationUtil = {
  createSanitizer,
  refineDateRange,
  conditionalOrderRefinement,
  conditionalWeightRefinement,
  numberValidation,
  stringSchemaFactory,
  IDSchemaFactory,
  BooleanSchema,
  CrudOperationEnumSchema,
  CrudOperationSchema,
  DaysOfWeekEnumSchema,
  DaysOfWeekSchema,
  DateSchema,
  OrderSchema,
  FilterSchema,
};
