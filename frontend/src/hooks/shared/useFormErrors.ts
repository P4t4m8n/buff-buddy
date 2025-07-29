import { useState, useCallback } from "react";
import { ApiError } from "../../utils/ApiError.util";

type TFormErrors<T> = Partial<Record<keyof T | "unknown", string>>;

export function useFormErrors<T extends object>() {
  const [errors, setErrors] = useState<TFormErrors<T> | null>(null);

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof ApiError) {
      setErrors((prev) => ({
        ...(prev as TFormErrors<T>),
        unknown: "An error occurred while processing your request.",
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
