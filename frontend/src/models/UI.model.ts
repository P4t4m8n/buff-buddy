import type { ReactNode } from "react";
import type { IEntity } from "../../../shared/models/entity.model";

export interface IAppNav {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface IBaseFilter {
  skip?: number;
  page?: number;
}

export interface IBaseNameAndId extends IEntity {
  name?: string;
}

export interface IIconProps {
  className?: string;
}

export type TModelButtonIconMode = "create" | "edit" | "details" | "delete";
