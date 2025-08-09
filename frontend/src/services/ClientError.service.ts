import { ZodError } from "zod";

export class ClientError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;
  public readonly errors?: Record<string, string>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    errors?: Record<string, string>
  ) {
    super(message);

    // Set prototype explicitly for extending built-ins
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.status = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    // Capture stack trace for better debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public static create(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    validationErrors?: Record<string, string>
  ): ClientError {
    const newError = new ClientError(
      message,
      statusCode,
      isOperational,
      validationErrors
    );
    console.error(newError);
    return newError;
  }

  public static handleResponse(error: unknown) {
    const returnError: {
      status?: number;
      message?: string;
      errors?: Record<string, string>;
    } = {};

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      returnError.status = 400;
      returnError.message = "Validation failed";
      returnError.errors = {};
      for (const issue of error.issues) {
        const path = issue.path.join(".");
        if (path && !returnError.errors[path]) {
          returnError.errors[path] = issue.message;
        }
      }
    }

    // Handle custom AppError
    else if (error instanceof ClientError && error?.status < 500) {
      returnError.status = error.status;
      returnError.errors = error.errors;
      returnError.message = error.message;
    }
    // Fallback for unknown errors
    else {
      const err = ClientError.create(`${error}`, 500, false);
      returnError.status = err.status;
      returnError.message = err.message;
    }

    return {
      message: returnError.message,
      errors: returnError.errors,
      status: returnError.status,
    };
  }

  static isAppError(error: unknown): error is ClientError {
    return (
      error instanceof ClientError ||
      (error instanceof Error && "status" in error && "error" in error)
    );
  }
}
