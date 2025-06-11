import type { IEntity } from "./entity.model";

export interface IAppNav {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface IBaseFilter {
  skip?: number;
  page?: number;
}

export interface IBaseNameAndId extends IEntity {
  name?: string;
}
