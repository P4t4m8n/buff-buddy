import { useState, useCallback } from "react";

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useFormErrors<T extends object>() {
  const [errors, setErrors] = useState<FormErrors<T> | null>(null);

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  return {
    errors,
    setErrors,
    clearErrors,
  };
}
