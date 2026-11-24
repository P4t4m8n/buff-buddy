"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../../prisma/generated/prisma");
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true, validationErrors) {
        super(message);
        // Set prototype explicitly for extending built-ins
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        this.status = statusCode;
        this.isOperational = isOperational;
        this.validationErrors = validationErrors;
        // Capture stack trace for better debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static create(message, statusCode = 500, isOperational = true, validationErrors) {
        const newError = new AppError(message, statusCode, isOperational, validationErrors);
        return newError;
    }
    static handleResponse(error) {
        const returnError = {};
        // Handle Zod validation errors
        if (error instanceof zod_1.ZodError) {
            returnError.status = 400;
            returnError.message = "Validation failed";
            returnError.validationErrors = {};
            for (const issue of error.issues) {
                const path = issue.path.join(".");
                if (path && !returnError.validationErrors[path]) {
                    returnError.validationErrors[path] = issue.message;
                }
            }
        }
        // Handle Prisma errors
        else if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
            const { code } = error;
            switch (code) {
                //Unique constraint failed
                case "P2002": {
                    returnError.status = 409;
                    returnError.message = "A record with this value already exists.";
                    returnError.validationErrors = {};
                    if (Array.isArray(error.meta?.target)) {
                        for (const field of error.meta.target) {
                            returnError.validationErrors[field] =
                                "This value must be unique.";
                        }
                    }
                    break;
                }
                //No record was found for an update
                case "P2025": {
                    returnError.status = 400;
                    returnError.message = "One or more referenced records not found";
                    break;
                }
                case "P2003": {
                    returnError.status = 400;
                    returnError.message =
                        "Foreign key constraint failed. Related record not found.";
                    break;
                }
                default: {
                    returnError.status = 400;
                    returnError.message = error.message || "Database error";
                    break;
                }
            }
        }
        // Handle custom AppError
        else if (error instanceof AppError && error?.status < 500) {
            returnError.status = error.status;
            returnError.validationErrors = error.validationErrors;
            returnError.message = error.message;
        }
        // Fallback for unknown errors
        else {
            const err = AppError.create(`${error}`, 500, false);
            returnError.status = err.status;
            returnError.message = err.message;
        }
        return {
            message: returnError.message,
            errors: returnError.validationErrors,
            status: returnError.status,
        };
    }
}
exports.AppError = AppError;
