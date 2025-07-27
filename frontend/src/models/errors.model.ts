import type { ICoreSetEditDTO } from "../../../shared/models/set.model";

export type TErrorCoreSets = Partial<
  Record<keyof ICoreSetEditDTO, string>
> | null;

export type IValidationError<T> = Partial<Record<keyof T, string>> | null;
