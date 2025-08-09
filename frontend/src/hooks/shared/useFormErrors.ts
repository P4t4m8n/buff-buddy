import { useState, useCallback } from "react";
import { emitEvent } from "../../utils/toast.util";
import { ClientError } from "../../services/ClientError.service";
import { ZodError } from "zod";

type TFormErrors<T> = Partial<Record<keyof T | "unknown", string>>;

export function useFormErrors<T extends object>() {
  const [errors, setErrors] = useState<TFormErrors<T> | null>(null);

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    emitEvent({ type: "error", cmp: "error" });
    if (error instanceof ZodError) {
      const formattedErrors: TFormErrors<T> = {};
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
        ...(prev as TFormErrors<T>),
        ...error.errors,
      }));
    } else {
      setErrors((prev) => ({
        ...(prev as TFormErrors<T>),
        unknown: "An unknown error occurred while saving.",
      }));
    }
  }, []);
  return {
    errors,
    setErrors,
    clearErrors,
    handleError,
  };
}
