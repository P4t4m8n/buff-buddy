import type { IIconProps } from "../../../models/UI.model";

export default function IconFork({ className }: IIconProps) {
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
      <path d="M12 2v10" />
      <path d="M15 2.34A8 8 0 1 1 9 2.34" />
      <path d="M12 22v-4" />
      <path d="M12 18a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z" />
    </svg>
  );
}
