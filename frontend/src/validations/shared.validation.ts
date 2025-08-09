import z from "zod";
import type { IValidationProps } from "../../../shared/models/app.model";

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
