import { z } from "zod";
import { validationUtil } from "./util.validation";

const EmailSchema = (sanitizer: (val: string) => string) => {
  return z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => sanitizer(val))
    .transform((val) => val.trim())
    .transform((val) => val.toLowerCase())
    .refine((val) => val.length >= 1, "Email is required after sanitization")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Must be a valid email address"
    );
};

const GoogleIdSchema = (sanitizer: (val: string) => string) => {
  return z
    .string()
    .min(1, "Google ID is required")
    .transform((val) => sanitizer(val))
    .transform((val) => val.trim());
};

const ImageSchema = (sanitizer: (val: string) => string) => {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return sanitizer(val);
    })
    .transform((val) => val?.trim());
};

const PasswordSchema = (sanitizer: (val: string) => string) => {
  return z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .transform((val) => sanitizer(val))
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
    );
};

const signUpFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  const sanitizer = validationUtil.createSanitizer(toSanitize);

  return z
    .object({
      email: EmailSchema(sanitizer),

      password: PasswordSchema(sanitizer),
      confirmPassword: PasswordSchema(sanitizer),

      imgUrl: z
        .string()
        .optional()
        .transform((val) => {
          if (!val) return undefined;
          return sanitizer(val);
        })
        .transform((val) => val?.trim()),

      firstName: validationUtil.stringSchemaFactory({
        maxLength: 50,
        minLength: 1,
        fieldName: "First name",
        toSanitize,
      }),

      lastName: validationUtil.stringSchemaFactory({
        maxLength: 50,
        minLength: 1,
        fieldName: "Last name",
        toSanitize,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

const signInFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  const sanitizer = validationUtil.createSanitizer(toSanitize);

  return z.object({
    email: EmailSchema(sanitizer),

    password: z
      .string()
      .min(1, "Password is required")
      .max(128, "Password must be less than 128 characters"),
  });
};

const googleOAuthFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  const sanitizer = validationUtil.createSanitizer(toSanitize);

  return z.object({
    googleId: GoogleIdSchema(sanitizer),
    email: EmailSchema(sanitizer),
    imgUrl: ImageSchema(sanitizer),
    firstName: validationUtil.stringSchemaFactory({
      maxLength: 50,
      minLength: 1,
      fieldName: "First name",
      toSanitize,
    }),

    lastName: validationUtil.stringSchemaFactory({
      maxLength: 50,
      minLength: 1,
      fieldName: "Last name",
      toSanitize,
    }),
  });
};

const updateUserFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return z.object({
    firstName: validationUtil.stringSchemaFactory({
      maxLength: 50,
      minLength: 1,
      fieldName: "First name",
      toSanitize,
    }),

    lastName: validationUtil.stringSchemaFactory({
      maxLength: 50,
      minLength: 1,
      fieldName: "Last name",
      toSanitize,
    }),
  });
};

const changePasswordFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  const sanitizer = validationUtil.createSanitizer(toSanitize);

  return z
    .object({
      currentPassword: PasswordSchema(sanitizer),

      newPassword: PasswordSchema(sanitizer),

      confirmNewPassword: PasswordSchema(sanitizer),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword === data.newPassword, {
      message: "New password must be different from current password",
      path: ["newPassword"],
    });
};

export const authValidation = {
  signUpFactorySchema,
  signInFactorySchema,
  googleOAuthFactorySchema,
  updateUserFactorySchema,
  changePasswordFactorySchema,
};

export type TSignUpInput = z.infer<ReturnType<typeof signUpFactorySchema>>;
export type TSignInInput = z.infer<ReturnType<typeof signInFactorySchema>>;
export type TGoogleOAuthInput = z.infer<
  ReturnType<typeof googleOAuthFactorySchema>
>;
export type TUpdateUserInput = z.infer<
  ReturnType<typeof updateUserFactorySchema>
>;
export type TChangePasswordInput = z.infer<
  ReturnType<typeof changePasswordFactorySchema>
>;
