export type TValidationError<T> = Partial<Record<keyof T, string>> | null;

export type TErrors<T> = Partial<Record<keyof T | "unknown", string>>;
