import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const conditionalOrderRefinement = (
  data: { order?: number; crudOperation?: string },
  ctx: z.RefinementCtx
) => {
  if (data.crudOperation !== "delete") {
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
        if (data.order < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Order must be at least 1",
            path: ["order"],
          });
        }
        if (data.order > 100) {
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
export const idSchema = ({ errorMsg }: { errorMsg: string }) => {
  return z
    .string()
    .min(1, errorMsg)
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    )
    .transform((val) => val.trim())
    .refine((val) => val.length >= 1, `${errorMsg} after sanitization`);
};

export const NotesSchema = z
  .string()
  .nullish()
  .optional()
  .transform((val) => {
    if (!val) return undefined;
    return sanitizeHtml(val, {
      allowedTags: [],
      allowedAttributes: {},
    });
  })
  .transform((val) => {
    if (!val) return undefined;
    return val.trim();
  })
  .transform((val) => {
    if (!val) return undefined;
    return val.replace(/\s+/g, " ");
  })
  .refine(
    (val) => !val || val.length <= 1000,
    "Notes must be less than 1000 characters"
  );

export const CrudOperationEnumSchema = z.enum([
  "create",
  "update",
  "edit",
  "delete",
  "read",
]);

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

export const NameSchema = z
  .string()
  .min(1, "Program name is required")
  .max(200, "Program name must be less than 200 characters")
  .transform((val) =>
    sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
  )
  .transform((val) => val.trim())
  .transform((val) => val.replace(/\s+/g, " "))
  .refine(
    (val) => val.length >= 1,
    "Program name is required after sanitization"
  )
  .refine(
    (val) => val.length <= 100,
    "Program name must be less than 100 characters"
  );

export const IDSchema = z
  .string()
  .min(1, "ID is required")
  .transform((val) =>
    sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
  )
  .transform((val) => val.trim())
  .refine((val) => val.length >= 1, "ID must be at least 1 character long")
  .refine((val) => val.length <= 50, "ID must be less than 50 characters long");
