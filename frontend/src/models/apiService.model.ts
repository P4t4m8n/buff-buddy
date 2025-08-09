export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
export type THttpPostResponse<T> = {
  massage: string;
  data: T;
};

export type THttpErrorResponse = {
  message?: string;
  errors?: Record<string, string>;
};

export type THttpMethod = (typeof HTTP_METHODS)[number];
