import type { IIconProps } from "../../../models/UI.model";

export default function IconSubscription({ className }: IIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs></defs>
      <path d="M22.5,13.91v6.68a1.92,1.92,0,0,1-1.91,1.91,1.93,1.93,0,0,1-1.91-1.91V13.91Z"></path>
      <path d="M20.59,22.5H3.41A1.92,1.92,0,0,1,1.5,20.59V1.5H18.68V20.59a1.93,1.93,0,0,0,1.91,1.91Z"></path>
      <rect x="5.32" y="5.32" width="9.55" height="4.77"></rect>
      <line x1="4.36" y1="13.91" x2="8.18" y2="13.91"></line>
      <line x1="4.36" y1="17.73" x2="8.18" y2="17.73"></line>
      <rect x="11.05" y="13.91" width="3.82" height="3.82"></rect>
    </svg>
  );
}
