import type { IIconProps } from "../../../models/UI.model";

export default function IconFire({ className }: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c-1.66 0-3-1.34-3-3 0-1.33.84-2.45 2-2.83" />
      <path d="M18.5 13.5c1.38 0 2.5-1.12 2.5-2.5 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.33" />
      <path d="M9 12c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-1.05.54-1.96 1.33-2.5" />
      <path d="M12 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      <path d="M19.5 17.5c1.38 0 2.5-1.12 2.5-2.5 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.33" />
      <path d="M12 12c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-1.05.54-1.96 1.33-2.5" />
    </svg>
  );
}