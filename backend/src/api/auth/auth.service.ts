import { prisma } from "../../../prisma/prisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/services/Error.service";
import {
  TSignUpInput,
  TSignInInput,
  TGoogleOAuthInput,
} from "../../../../shared/validations/auth.validation";

export const authService = {
  signUp: async (dto: TSignUpInput | TGoogleOAuthInput) => {
    const { email, firstName, lastName } = dto;
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

    let passwordHash = null;
    let googleId = null;
    if ("password" in dto) {
      passwordHash = await bcrypt.hash(dto.password, saltRounds);
    } else if ("googleId" in dto) {
      googleId = dto.googleId;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: passwordHash,
        googleId: googleId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      throw AppError.create("User creation failed", 500);
    }
    const token = generateToken(user.id, false);
    return {
      user,
      token,
    };
  },

  signIn: async (dto: TSignInInput | TGoogleOAuthInput) => {
    const { email } = dto;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        passwordHash: true,
        googleId: true,
      },
    });

    if (!user) {
      throw AppError.create("Bad Request", 409);
    }

    let match = false;
    if ("password" in dto && user?.passwordHash) {
      match = await bcrypt.compare(dto?.password, user?.passwordHash || "");
    } else if ("googleId" in dto && user?.googleId) {
      match = user.googleId === dto.googleId;
    }
    if (!match) {
      throw AppError.create("Bad Request", 400);
    }

    const token = generateToken(user.id, false);
    const { lastName, firstName, id } = user;
    return {
      user: {
        id,
        firstName,
        lastName,
      },
      token,
    };
  },
  signInWithGoogle: async (dto: TGoogleOAuthInput) => {
    const { email, firstName, lastName, googleId } = dto;

    const user = await prisma.user.upsert({
      where: { email: email },
      update: { googleId: googleId },
      create: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
        imgUrl: dto.imgUrl,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      throw AppError.create("Google sign-in failed", 500);
    }

    const token = generateToken(user.id, false);
    return {
      user,
      token,
    };
  },

  validateToken: async (token: string) => {
    console.log("🚀 ~ token:", token)
    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw AppError.create("JWT_SECRET is not defined", 500);
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      isAdmin: boolean;
    };
    console.log("🚀 ~ decoded:", decoded)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, firstName: true, lastName: true, isAdmin: true },
    });

    if (!user) {
      throw AppError.create("User not found", 404);
    }

    return {
      ...user,
      isAdmin: user.isAdmin,
    };
  },

  deleteUser: async (userId: string) => {
    const user = await prisma.user.delete({
      where: { id: userId },
      select: { id: true, firstName: true, lastName: true },
    });

    if (!user) {
      throw AppError.create("User not found", 404);
    }

    return user;
  },
};

const generateToken = (userId: string, isAdmin: boolean) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw AppError.create("JWT_SECRET is not defined", 500);
  }

  const payload = {
    userId,
    isAdmin,
  };
  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};
// import { z } from "zod";
// import sanitizeHtml from "sanitize-html";
// import {
//   IDSchema,
//   stringValidationAndSanitization,
// } from "../../shared/validations/shared.validations";

// export const CreateUserSchema = z
//   .object({
//     email: z
//       .string()
//       .min(1, "Email is required")
//       .max(255, "Email must be less than 255 characters")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       )
//       .transform((val) => val.trim())
//       .transform((val) => val.toLowerCase())
//       .refine((val) => val.length >= 1, "Email is required after sanitization")
//       .refine(
//         (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//         "Must be a valid email address"
//       ),

//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(128, "Password must be less than 128 characters")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       )
//       .refine(
//         (val) => /(?=.*[a-z])/.test(val),
//         "Password must contain at least one lowercase letter"
//       )
//       .refine(
//         (val) => /(?=.*[A-Z])/.test(val),
//         "Password must contain at least one uppercase letter"
//       )
//       .refine(
//         (val) => /(?=.*\d)/.test(val),
//         "Password must contain at least one number"
//       )
//       .refine(
//         (val) => /(?=.*[@$!%*?&])/.test(val),
//         "Password must contain at least one special character (@$!%*?&)"
//       ),

//     confirmPassword: z
//       .string()
//       .min(1, "Password confirmation is required")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       ),
//     imgUrl: z
//       .string()
//       .optional()
//       .transform((val) => {
//         if (!val) return undefined;
//         return sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} });
//       })
//       .transform((val) => val?.trim()),

//     firstName: stringValidationAndSanitization({
//       maxLength: 50,
//       minLength: 1,
//       fieldName: "First name",
//     }),

//     lastName: stringValidationAndSanitization({
//       maxLength: 50,
//       minLength: 1,
//       fieldName: "Last name",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export const SignInSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .max(255, "Email must be less than 255 characters")
//     .transform((val) =>
//       sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//     )
//     .transform((val) => val.trim())
//     .transform((val) => val.toLowerCase())
//     .refine((val) => val.length >= 1, "Email is required after sanitization")
//     .refine(
//       (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//       "Must be a valid email address"
//     ),

//   password: z
//     .string()
//     .min(1, "Password is required")
//     .max(128, "Password must be less than 128 characters")
//     .transform((val) =>
//       sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//     ),
// });

// export const GoogleOAuthSchema = z.object({
//   googleId: z
//     .string()
//     .min(1, "Google ID is required")
//     .transform((val) =>
//       sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//     )
//     .transform((val) => val.trim()),

//   email: z
//     .string()
//     .min(1, "Email is required")
//     .transform((val) =>
//       sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//     )
//     .transform((val) => val.trim())
//     .transform((val) => val.toLowerCase())
//     .refine(
//       (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//       "Must be a valid email address"
//     ),
//   imgUrl: z
//     .string()
//     .optional()
//     .transform((val) => {
//       if (!val) return undefined;
//       return sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} });
//     })
//     .transform((val) => val?.trim()),

//   firstName: stringValidationAndSanitization({
//     maxLength: 50,
//     minLength: 1,
//     fieldName: "First name",
//   }).optional(),

//   lastName: stringValidationAndSanitization({
//     maxLength: 50,
//     minLength: 1,
//     fieldName: "Last name",
//   }).optional(),
// });

// export const UpdateUserSchema = z.object({
//   firstName: stringValidationAndSanitization({
//     maxLength: 50,
//     minLength: 1,
//     fieldName: "First name",
//   }).optional(),

//   lastName: stringValidationAndSanitization({
//     maxLength: 50,
//     minLength: 1,
//     fieldName: "Last name",
//   }).optional(),
// });

// export const ChangePasswordSchema = z
//   .object({
//     currentPassword: z
//       .string()
//       .min(1, "Current password is required")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       ),

//     newPassword: z
//       .string()
//       .min(8, "New password must be at least 8 characters")
//       .max(128, "New password must be less than 128 characters")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       )
//       .refine(
//         (val) => /(?=.*[a-z])/.test(val),
//         "New password must contain at least one lowercase letter"
//       )
//       .refine(
//         (val) => /(?=.*[A-Z])/.test(val),
//         "New password must contain at least one uppercase letter"
//       )
//       .refine(
//         (val) => /(?=.*\d)/.test(val),
//         "New password must contain at least one number"
//       )
//       .refine(
//         (val) => /(?=.*[@$!%*?&])/.test(val),
//         "New password must contain at least one special character (@$!%*?&)"
//       ),

//     confirmNewPassword: z
//       .string()
//       .min(1, "Password confirmation is required")
//       .transform((val) =>
//         sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
//       ),
//   })
//   .refine((data) => data.newPassword === data.confirmNewPassword, {
//     message: "New passwords do not match",
//     path: ["confirmNewPassword"],
//   })
//   .refine((data) => data.currentPassword !== data.newPassword, {
//     message: "New password must be different from current password",
//     path: ["newPassword"],
//   });

// export const UserParamsSchema = z.object({
//   id: IDSchema,
// });

// export type TCreateUserInput = z.infer<typeof CreateUserSchema>;
// export type TSignInInput = z.infer<typeof SignInSchema>;
// export type TGoogleOAuthInput = z.infer<typeof GoogleOAuthSchema>;
// export type TUpdateUserInput = z.infer<typeof UpdateUserSchema>;
// export type TChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
// export type TUserParams = z.infer<typeof UserParamsSchema>;
