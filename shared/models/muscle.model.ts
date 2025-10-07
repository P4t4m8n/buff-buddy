import type { IEntity, IEntityDates } from "./entity.model";
import type { IBaseFilter, TCrudOperation } from "./app.model";

interface IMusclesAliasEditDTO extends IEntity, IEntityDates {
  name?: string;
  language?: string | null;
  crudOperations?: TCrudOperation;
}

export interface IMuscleDTO extends IEntity, IEntityDates {
  name: string;
}
export interface IMuscleEditDTO extends IEntity, IEntityDates {
  name?: string;
  aliases?: IMusclesAliasEditDTO[];
}

export interface IMuscleFilter extends IBaseFilter {
  name?: string;
  aliases?: string | string[];
}
