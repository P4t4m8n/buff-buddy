import type { IIconProps } from "../../../models/UI.model";

export default function IconWorkout({ className }: IIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g>
        <rect x="1.48" y="3.37" width="21.04" height="4.78"></rect>
        <rect x="1.48" y="8.15" width="21.04" height="14.35"></rect>
        <line x1="3.39" y1="14.85" x2="5.3" y2="14.85"></line>
        <line x1="5.3" y1="11.98" x2="5.3" y2="17.72"></line>
        <line x1="18.7" y1="11.98" x2="18.7" y2="17.72"></line>
        <line x1="15.83" y1="11.02" x2="15.83" y2="18.67"></line>
        <line x1="8.17" y1="11.02" x2="8.17" y2="18.67"></line>
        <line x1="8.17" y1="14.85" x2="15.83" y2="14.85"></line>
        <line x1="18.7" y1="14.85" x2="20.61" y2="14.85"></line>
        <line x1="12" y1="0.5" x2="12" y2="5.28"></line>
        <line x1="6.26" y1="0.5" x2="6.26" y2="5.28"></line>
        <line x1="17.74" y1="0.5" x2="17.74" y2="5.28"></line>
      </g>
    </svg>
  );
}
