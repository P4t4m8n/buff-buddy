import { useRef } from "react";
import Button from "./Button";
import ModelOverlay from "./ModelOverlay";
import { useModel } from "../../hooks/useModel";

interface ModelProps {
  button: {
    props: React.ButtonHTMLAttributes<HTMLButtonElement>;
    content: React.ReactNode;
  };
  children: React.ReactNode;
  withOverlay?: boolean;
}
export default function Model({
  button,
  children,
  withOverlay = true,
}: ModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  return (
    <>
      <Button
        {...button.props}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {button.content}
      </Button>
      {withOverlay ? (
        <ModelOverlay isOpen={isOpen}>{children}</ModelOverlay>
      ) : (
        { children }
      )}
    </>
  );
}
