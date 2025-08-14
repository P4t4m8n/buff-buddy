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

  const handleError = useCallback(
    ({ error, emitToToast }: { error: unknown; emitToToast?: boolean }) => {
      const formattedErrors: TErrors<T> = {};
      if (error instanceof ZodError) {
        for (const issue of error.issues) {
          let current: any = formattedErrors;
          for (let i = 0; i < issue.path.length - 1; i++) {
            const key = issue.path[i];
            const nextKey = issue.path[i + 1];

            if (current[key] === undefined) {
              current[key] = typeof nextKey === "number" ? [] : {};
            }
            current = current[key];
          }
          current[issue.path[issue.path.length - 1]] = issue.message;
        }
        setErrors(formattedErrors as TErrors<T>);
      } else if (ClientError.isAppError(error)) {
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
    },
    []
  );

  return {
    errors,
    setErrors,
    clearErrors,
    handleError,
  };
}
