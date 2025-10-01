import { twMerge } from "tailwind-merge";

import { BUTTON_LINK_STYLES } from "../../consts/styles";

import type { IButtonProps } from "../../models/UI.model";

export default function Button({
  children,
  buttonStyle,
  ...props
}: IButtonProps) {
  const _buttonStyle = buttonStyle ? BUTTON_LINK_STYLES[buttonStyle] : "";
  const disabled = props.disabled ? "opacity-50 cursor-not-allowed" : "";
  const style = twMerge(
    `cursor-pointer`,
    _buttonStyle,
    disabled,
    props.className
  );

  return (
    <button {...props} className={style + " "}>
      {children}
    </button>
  );
}
