import type { IID, IEntityDates } from "./entity.model";
import type { IBaseFilter, ICrudOperation, TCrudOperation } from "./app.model";

interface IMusclesAliasEditDTO extends IID, IEntityDates {
  name?: string;
  language?: string | null;
  crudOperation?: TCrudOperation;
}

export interface IMuscleDTO extends IID, IEntityDates {
  name: string;
}
export interface IMuscleEditDTO extends IID, IEntityDates, ICrudOperation {
  name?: string;
  aliases?: IMusclesAliasEditDTO[];
}

export interface IMuscleFilter extends IBaseFilter {
  name?: string;
  aliases?: string | string[];
}
