import type { IEntity, IEntityDates } from "./entity.model";
import type { IBaseFilter, TCrudOperation } from "./app.model";

export interface IEquipmentDTO extends IEntity, IEntityDates {
  name: string;
  categories?: { name: string }[];
  crudOperations?: TCrudOperation;
}
export interface IEquipmentEditDTO extends IEntity, IEntityDates {
  name?: string;
  categories?: { name?: string; crudOperations?: TCrudOperation }[];
  crudOperations?: TCrudOperation;
}

export interface IEquipmentFilter extends IBaseFilter {
  name?: string;
  categories?: string | string[];
}
