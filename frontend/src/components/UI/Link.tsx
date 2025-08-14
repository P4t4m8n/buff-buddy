import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import { BUTTON_LINK_STYLES } from "../../consts/styles";

import type { LinkProps } from "react-router";
import type { TButtonLinkStyle } from "../../models/styles.model";
import type { TIconMode } from "../../models/UI.model";

interface ILinkProps extends LinkProps, React.RefAttributes<HTMLAnchorElement> {
  linkStyle?: TButtonLinkStyle | null;
  mode?: TIconMode;
}
export default function LinkComponent({
  linkStyle,
  mode,
  ...props
}: ILinkProps) {
  const style = linkStyle ? BUTTON_LINK_STYLES[linkStyle] : "";

  const className = twMerge(`cursor-pointer`, style, props.className);
  const children = props.children;
  return (
    <Link {...props} className={className}>
      {children ?? ModelButtonIcon(mode)}
    </Link>
  );
}
