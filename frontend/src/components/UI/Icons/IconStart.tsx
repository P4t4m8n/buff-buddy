import type { IIconProps } from "../../../models/UI.model";

export default function IconStart({ className }: IIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g stroke-width="2.56">
        <rect x="8" y="12" width="48" height="40" rx="11.96"></rect>
        <polyline points="28 40 36 32 28 24"></polyline>
      </g>
      <g>
        <rect x="8" y="12" width="48" height="40" rx="11.96"></rect>
        <polyline points="28 40 36 32 28 24"></polyline>
      </g>
    </svg>
  );
}
