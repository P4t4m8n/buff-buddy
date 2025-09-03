import { twMerge } from "tailwind-merge";

import { BUTTON_LINK_STYLES } from "../../consts/styles";

import type { IButtonProps } from "../../models/UI.model";

export default function Button({
  children,
  buttonStyle,
  ...props
}: IButtonProps) {
  const _buttonStyle = buttonStyle ? BUTTON_LINK_STYLES[buttonStyle] : "";
  const style = twMerge(`cursor-pointer`, _buttonStyle, props.className);

  return (
    <button {...props} className={style + " "}>
      {children}
    </button>
  );
}
