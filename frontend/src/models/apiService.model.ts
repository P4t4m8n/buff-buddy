import type { IGetMetaData } from "../../../shared/models/metaData.model";
export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
export type THttpResponse<T> = {
  massage?: string;
  data: T;
  meta?: IGetMetaData;
};

export type THttpErrorResponse = {
  message?: string;
  errors?: Record<string, string>;
};

export type THttpMethod = (typeof HTTP_METHODS)[number];
