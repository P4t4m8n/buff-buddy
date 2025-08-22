import type { ReactNode } from "react";
import type { IEntity } from "../../../shared/models/entity.model";
import type { ICON_MODE } from "../consts/UI.const";
import type { LABEL_POSITION } from "../consts/styles";

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

export type TIconMode = (typeof ICON_MODE)[number];

export type TLabelPosition = (typeof LABEL_POSITION)[number];

export type TDebouncedFunction<F extends (...args: any[]) => any> = {
  (...args: Parameters<F>): ReturnType<F> | void;
  cancel: () => void;
  flush: () => ReturnType<F> | undefined;
};
