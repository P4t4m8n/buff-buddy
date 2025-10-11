//Lib
import { useState, useCallback } from "react";
import { ZodError } from "zod";
//Utils
import { emitEvent } from "../../utils/toast.util";
//Services
import { ClientError } from "../../services/ClientError.service";
//UI
import ToastError from "../../components/UI/Toast/ToastError";
//Types
import type { TErrors } from "../../models/errors.model";

export const useErrors = <T extends object>() => {
  const [errors, setErrors] = useState<TErrors<T> | null>({});

  const clearErrors = useCallback(() => {
    setErrors(null);
  }, []);

  const handleError = useCallback(
    ({ error, emitToToast }: { error: unknown; emitToToast?: boolean }) => {
      const formattedErrors: TErrors<T> = {};
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
      if (error instanceof ZodError) {
        for (const issue of error.issues) {
          let current: any = formattedErrors;
          for (let i = 0; i < issue.path.length - 1; i++) {
            const key = issue.path[i] as keyof TErrors<T>;
            const nextKey = issue.path[i + 1];

            if (current[key] === undefined) {
              current[key] = typeof nextKey === "number" ? [] : {};
            }
            current = current[key];
          }
          current[issue.path[issue.path.length - 1]] = issue.message;
        }
        setErrors(formattedErrors as TErrors<T>);
        return;
      }
      if (ClientError.isAppError(error)) {
        setErrors((prev) => ({
          ...(prev as TErrors<T>),
          ...error.errors,
          unknown: error.message,
        }));
        return;
      }
      setErrors((prev) => ({
        ...(prev as TErrors<T>),
        unknown: "An unknown error occurred while saving.",
      }));
    },
    []
  );

  const setSingleFiledError = ({
    key,
    error,
  }: {
    key: keyof TErrors<T>;
    error?: ZodError<Record<string, unknown>> | undefined;
  }) => {
    setErrors((prev) => {
      if (!prev) return {};
      if (error) {
        let _message = "";
        for (const issue of error.issues) {
          _message += `${issue.message} `;
        }
        return {
          ...(prev as TErrors<T>),
          [key]: _message,
        };
      }
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  return {
    errors,
    setErrors,
    clearErrors,
    handleError,
    setSingleFiledError,
  };
};
