"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const util_validation_1 = require("./util.validation");
const EmailSchema = (sanitizer) => {
    return zod_1.z
        .string()
        .min(1, "Email is required")
        .max(255, "Email must be less than 255 characters")
        .transform((val) => sanitizer(val))
        .transform((val) => val.trim())
        .transform((val) => val.toLowerCase())
        .refine((val) => val.length >= 1, "Email is required after sanitization")
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Must be a valid email address");
};
const GoogleIdSchema = (sanitizer) => {
    return zod_1.z
        .string()
        .min(1, "Google ID is required")
        .transform((val) => sanitizer(val))
        .transform((val) => val.trim());
};
const ImageSchema = (sanitizer) => {
    return zod_1.z
        .string()
        .optional()
        .transform((val) => {
        if (!val)
            return undefined;
        return sanitizer(val);
    })
        .transform((val) => val?.trim());
};
const PasswordSchema = (sanitizer) => {
    return zod_1.z
        .string()
        .min(1, "Password must be at least 8 characters")
        .max(128, "Password must be less than 128 characters")
        .transform((val) => sanitizer(val))
        .refine((val) => /(?=.*[a-z])/.test(val), "Password must contain at least one lowercase letter")
        .refine((val) => /(?=.*[A-Z])/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /(?=.*\d)/.test(val), "Password must contain at least one number");
    // .refine(
    //   (val) => /(?=.*[@$!%*?&])/.test(val),
    //   "Password must contain at least one special character (@$!%*?&)"
    // );
};
const signUpFactorySchema = ({ toSanitize }) => {
    const sanitizer = util_validation_1.validationUtil.createSanitizer(toSanitize);
    return zod_1.z
        .object({
        email: EmailSchema(sanitizer),
        password: PasswordSchema(sanitizer),
        confirmPassword: PasswordSchema(sanitizer),
        imgUrl: zod_1.z
            .string()
            .optional()
            .transform((val) => {
            if (!val)
                return undefined;
            return sanitizer(val);
        })
            .transform((val) => val?.trim()),
        firstName: util_validation_1.validationUtil.stringSchemaFactory({
            maxLength: 50,
            minLength: 1,
            fieldName: "First name",
            toSanitize,
        }),
        lastName: util_validation_1.validationUtil.stringSchemaFactory({
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
const signInFactorySchema = ({ toSanitize }) => {
    const sanitizer = util_validation_1.validationUtil.createSanitizer(toSanitize);
    return zod_1.z.object({
        email: EmailSchema(sanitizer),
        password: zod_1.z
            .string()
            .min(1, "Password is required")
            .max(128, "Password must be less than 128 characters"),
    });
};
const googleOAuthFactorySchema = ({ toSanitize }) => {
    const sanitizer = util_validation_1.validationUtil.createSanitizer(toSanitize);
    return zod_1.z.object({
        googleId: GoogleIdSchema(sanitizer),
        email: EmailSchema(sanitizer),
        imgUrl: ImageSchema(sanitizer),
        firstName: util_validation_1.validationUtil.stringSchemaFactory({
            maxLength: 50,
            minLength: 1,
            fieldName: "First name",
            toSanitize,
        }),
        lastName: util_validation_1.validationUtil.stringSchemaFactory({
            maxLength: 50,
            minLength: 1,
            fieldName: "Last name",
            toSanitize,
        }),
    });
};
const updateUserFactorySchema = ({ toSanitize }) => {
    return zod_1.z.object({
        firstName: util_validation_1.validationUtil.stringSchemaFactory({
            maxLength: 50,
            minLength: 1,
            fieldName: "First name",
            toSanitize,
        }),
        lastName: util_validation_1.validationUtil.stringSchemaFactory({
            maxLength: 50,
            minLength: 1,
            fieldName: "Last name",
            toSanitize,
        }),
    });
};
const changePasswordFactorySchema = ({ toSanitize, }) => {
    const sanitizer = util_validation_1.validationUtil.createSanitizer(toSanitize);
    return zod_1.z
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
exports.authValidation = {
    signUpFactorySchema,
    signInFactorySchema,
    googleOAuthFactorySchema,
    updateUserFactorySchema,
    changePasswordFactorySchema,
};
