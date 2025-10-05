import type { IGetMetaData } from "../../../shared/models/metaData.model";
import { HTTP_METHODS } from "../consts/api.const";

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
