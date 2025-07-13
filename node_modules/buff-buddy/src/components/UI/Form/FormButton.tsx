"use client";
import { useFormStatus } from "react-dom";
import Button from "../Button";

interface FormDisabledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
/**
 * A button component that is disabled when a form is in a pending state.
 *
 * @component
 * @param {FormDisabledButtonProps} props - The properties passed to the button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @returns {JSX.Element} The rendered button component.
 * </FormDisabledButton>
 */
export default function FormButton({
  children,
  ...props
}: FormDisabledButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      className={`bg-inherit border-1 p-2 hover:bg-main-orange
         hover:text-white rounded transition-all duration-300
         hover:cursor-pointer ${pending ? "opacity-50" : ""} ${props.className || ""}`}
    >
      {children}
    </Button>
  );
}
