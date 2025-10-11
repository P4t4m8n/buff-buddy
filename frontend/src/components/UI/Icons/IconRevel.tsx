import type { IIconProps } from "../../../models/UI.model";

export const IconRevel = ({ className }: IIconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle
        cx="12"
        cy="12"
        r="3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
    </svg>
  );
};
