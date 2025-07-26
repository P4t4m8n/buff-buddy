import type { ICoreSetEditDTO } from "../../../shared/models/set.model";

export type TErrorCoreSets = Partial<
  Record<keyof ICoreSetEditDTO, string>
> | null;
