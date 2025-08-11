import { z } from "zod";
import { stringValidation } from "./shared.validation";

export const CreateUserSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .max(255, "Email must be less than 255 characters")

      .transform((val) => val.trim())
      .transform((val) => val.toLowerCase())
      .refine((val) => val.length >= 1, "Email is required after sanitization")
      .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        "Must be a valid email address"
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")

      .refine(
        (val) => /(?=.*[a-z])/.test(val),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (val) => /(?=.*[A-Z])/.test(val),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (val) => /(?=.*\d)/.test(val),
        "Password must contain at least one number"
      )
      .refine(
        (val) => /(?=.*[@$!%*?&])/.test(val),
        "Password must contain at least one special character (@$!%*?&)"
      ),

    confirmPassword: z.string().min(1, "Password confirmation is required"),

    imgUrl: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return val;
      })
      .transform((val) => val?.trim()),

    firstName: stringValidation({
      maxLength: 50,
      minLength: 1,
      fieldName: "First name",
    }),

    lastName: stringValidation({
      maxLength: 50,
      minLength: 1,
      fieldName: "Last name",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => val.trim())
    .transform((val) => val.toLowerCase())
    .refine((val) => val.length >= 1, "Email is required after sanitization")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Must be a valid email address"
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must be less than 128 characters")
   
});

export const GoogleOAuthSchema = z.object({
  googleId: z
    .string()
    .min(1, "Google ID is required")

    .transform((val) => val.trim()),

  email: z
    .string()
    .min(1, "Email is required")

    .transform((val) => val.trim())
    .transform((val) => val.toLowerCase())
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Must be a valid email address"
    ),
  imgUrl: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val;
    })
    .transform((val) => val?.trim()),

  firstName: stringValidation({
    maxLength: 50,
    minLength: 1,
    fieldName: "First name",
  }).optional(),

  lastName: stringValidation({
    maxLength: 50,
    minLength: 1,
    fieldName: "Last name",
  }).optional(),
});

export const UpdateUserSchema = z.object({
  firstName: stringValidation({
    maxLength: 50,
    minLength: 1,
    fieldName: "First name",
  }).optional(),

  lastName: stringValidation({
    maxLength: 50,
    minLength: 1,
    fieldName: "Last name",
  }).optional(),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),
 
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "New password must be less than 128 characters")
    
      .refine(
        (val) => /(?=.*[a-z])/.test(val),
        "New password must contain at least one lowercase letter"
      )
      .refine(
        (val) => /(?=.*[A-Z])/.test(val),
        "New password must contain at least one uppercase letter"
      )
      .refine(
        (val) => /(?=.*\d)/.test(val),
        "New password must contain at least one number"
      )
      .refine(
        (val) => /(?=.*[@$!%*?&])/.test(val),
        "New password must contain at least one special character (@$!%*?&)"
      ),

    confirmNewPassword: z
      .string()
      .min(1, "Password confirmation is required")
   
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

