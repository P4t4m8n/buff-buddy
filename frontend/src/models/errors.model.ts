export type TValidationError<T> = Partial<Record<keyof T, string>> | null;
