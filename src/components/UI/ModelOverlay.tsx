/**
 * ModelOverlay component that renders a modal overlay.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the modal overlay.
 * @param {boolean} [isOpen] - Optional boolean to control the visibility of the modal overlay.
 *
 * @returns {JSX.Element} The rendered modal overlay component.
 */
interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
}
export default function ModelOverlay({ children, isOpen }: Props) {
  const style = `fixed top-0 left-0  bg-black/75 flex justify-center items-center  ${
    isOpen ? "z-40 h-screen w-screen" : "-z-40 opacity-0 h-0 w-0"
  } `;
  return <div className={style}>{children}</div>;
}
