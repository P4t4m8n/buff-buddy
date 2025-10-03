import type { ReactNode } from "react";
import type { IEntity } from "../../../shared/models/entity.model";
import type { ICON_MODE } from "../consts/UI.const";
import type { LABEL_POSITION } from "../consts/styles";
import type { TButtonLinkStyle } from "./styles.model";

export interface IAppNav {
  label: string;
  path: string;
  icon?: ReactNode;
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

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonStyle?: TButtonLinkStyle | null;
}



interface IFilterInput<Filter> {
  name: keyof Filter;
  label: string;
}
export interface IFilterTextInput<Filter> extends IFilterInput<Filter> {
  value: string | string[] | undefined;
}
export interface IFilterCheckboxInput<Filter> extends IFilterInput<Filter> {
  isChecked: boolean | undefined;
}
