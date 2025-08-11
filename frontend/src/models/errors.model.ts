export type TValidationError<T> = Partial<Record<keyof T, string>> | null;

// export type TErrors<T> = Partial<Record<keyof T | "unknown", string>>;

export type TErrors<T> = {
  // For each key in the original type T...
  [K in keyof T]?: T[K] extends (infer U)[] // Is the property an array?
    ? string | TErrors<U>[] // If yes, the error type is an array of deep errors for the array's items.
    : T[K] extends object // Otherwise, is it an object?
    ? TErrors<T[K]> // If yes, the error type is a deep error object for that property's type.
    : string; // Otherwise, it's a primitive, so the error is a string.
} & { unknown?: string };
