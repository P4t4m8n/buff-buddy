import { z } from "zod";
import type { IToSanitize, IValidationProps } from "../models/app.model";
import { CRUD_OPERATIONS, DAY_OF_WEEK } from "../consts/app.consts";
import type { ZodObject } from "zod";
import type { $ZodRawIssue } from "zod/v4/core";

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
  toLowerCase = true,
}: IValidationProps): z.ZodType<
  string,
  string,
  z.core.$ZodTypeInternals<string, string>
> => {
  const sanitizer = createSanitizer(toSanitize);
  const y = z
    .string({
      error: createFieldErrorHandler(fieldName),
    })
    .transform<string>((val) => sanitizer(val))
    .transform<string>((val) => val.trim())
    .transform<string>((val) => val.replace(/\s+/g, " "))
    .transform<string>((val) => (toLowerCase ? val.toLowerCase() : val))
    .refine(
      (val) => val.length >= (minLength ?? 0),
      `${fieldName} must be at least ${minLength} characters long`
    )
    .refine(
      (val) => val.length <= maxLength,
      `${fieldName} must be less than ${maxLength} characters`
    );
  return y as z.ZodType<
    string,
    string,
    z.core.$ZodTypeInternals<string, string>
  >;
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
const IDSchemaFactory = ({ toSanitize = false }) => {
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
      error: createFieldErrorHandler(fieldName),
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
const validateFieldOnly = <V>({
  factory,
  field,
  value,
  toSanitize,
}: {
  factory: ({ toSanitize }: IToSanitize) => ZodObject<any>;
  field: string;
  value: V;
} & IToSanitize) => {
  const schema = factory({ toSanitize });
  const schemaField = schema.pick({ [field]: true });
  const result = schemaField.safeParse({ [field]: value });
  // console.dir( result.error,{depth:5})
  console.log(result);
  const { success, error, data } = result;
  return {
    isSuccess: success,
    error,
    data,
    field,
  };
};
const createFieldErrorHandler =
  (fieldName?: string) => (issue: $ZodRawIssue<any>) => {
    const { input } = issue;
    const isMissing = input === undefined || input === null;
    return {
      message: isMissing
        ? `${fieldName} is required.`
        : `${fieldName} is invalid.`,
    };
  };
/**
 * Coerce to boolean (e.g. "true", 1) and default to false.
 */
const BooleanSchema = z.coerce.boolean<any>().default(false);
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
      code: "custom",
      message: "Order is required",
      path: ["order"],
    });
    return;
  }

  if (!order) {
    ctx.addIssue({
      code: "custom",
      message: "Order is required",
      path: ["order"],
    });
    return;
  }

  if (!Number.isInteger(order)) {
    ctx.addIssue({
      code: "custom",
      message: "Order must be a whole number",
      path: ["order"],
    });
    return;
  }
  if (order < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Order must be at least 1",
      path: ["order"],
    });
    return;
  }
  if (order > 100) {
    ctx.addIssue({
      code: "custom",
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
      code: "custom",
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
  maxLength = 100000000,
  fieldName,
}: IValidationProps) => {
  return z.coerce
    .number<number>({
      error: createFieldErrorHandler(fieldName),
    })
    .min(minLength, `${fieldName} must be at least ${minLength}`)
    .max(maxLength, `${fieldName} cannot exceed ${maxLength}`);
};

const DateSchema = z.coerce
  .date<Date | string>()
  .refine((date) => !isNaN(date.getTime()), "Invalid date");

const OrderSchema = z.coerce
  .number<number>()
  .int("Order must be a whole number")
  .min(1, "Order must be at least 1")
  .max(100, "Order cannot exceed 100");

const FilterSchema = z.object({
  skip: z.coerce.number<number>().min(0).optional(),
  take: z.coerce.number<number>().min(1).optional().default(10),
});

export const validationUtil = {
  createSanitizer,
  refineDateRange,
  conditionalOrderRefinement,
  conditionalWeightRefinement,
  numberValidation,
  stringSchemaFactory,
  IDSchemaFactory,
  validateFieldOnly,
  BooleanSchema,
  CrudOperationEnumSchema,
  CrudOperationSchema,
  DaysOfWeekEnumSchema,
  DaysOfWeekSchema,
  DateSchema,
  OrderSchema,
  FilterSchema,
};
