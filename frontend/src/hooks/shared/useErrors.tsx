import { useState, useCallback } from "react";
import { emitEvent } from "../../utils/toast.util";
import { ClientError } from "../../services/ClientError.service";
import { ZodError } from "zod";
import type { TErrors } from "../../models/errors.model";
import ToastError from "../../components/UI/Toast/ToastError";

export function useErrors<T extends object>() {
  const [errors, setErrors] = useState<TErrors<T> | null>(null);

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  const handleError = useCallback((error: unknown, emitToToast?: boolean) => {
    emitEvent({ type: "error", cmp: "error" });
    if (error instanceof ZodError) {
      const formattedErrors: TErrors<T> = {};
      for (const issue of error.issues) {
        const path = issue.path.join(".") as keyof T;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      setErrors(formattedErrors);
    }
    if (ClientError.isAppError(error)) {
      setErrors((prev) => ({
        ...(prev as TErrors<T>),
        ...error.errors,
      }));
    } else {
      setErrors((prev) => ({
        ...(prev as TErrors<T>),
        unknown: "An unknown error occurred while saving.",
      }));
    }
    if (emitToToast) {
      emitEvent({
        type: "error",
        cmp: (
          <ToastError
            error={
              error instanceof Error
                ? error.message
                : "An unexpected error occurred"
            }
          />
        ),
      });
    }
  }, []);

  return {
    errors,
    setErrors,
    clearErrors,
    handleError,
  };
}
