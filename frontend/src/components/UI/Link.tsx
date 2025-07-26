import { Link, type LinkProps } from "react-router";
import type { TButtonLinkStyle } from "../../models/styles.model";
import { BUTTON_LINK_STYLES } from "../../consts/styles";
import { twMerge } from "tailwind-merge";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import type { TIconMode } from "../../../../shared/models/app.model";

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
