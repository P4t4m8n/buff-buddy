import { useState, useCallback } from "react";
import { ApiError } from "../../utils/ApiError.util";
import { emitEvent } from "../../utils/toast.util";

type TFormErrors<T> = Partial<Record<keyof T | "unknown", string>>;

export function useFormErrors<T extends object>() {
  const [errors, setErrors] = useState<TFormErrors<T> | null>(null);

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    emitEvent({ type: "error", cmp: "error" });
    if (error instanceof ApiError) {
      console.log("🚀 ~ useFormErrors ~ error:", error.errors);
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
