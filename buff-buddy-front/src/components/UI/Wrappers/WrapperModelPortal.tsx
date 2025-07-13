import React, { useRef } from "react";
import { useModel } from "../../../hooks/shared/useModel";
import IconEdit from "../Icons/IconEdit";
import IconCreate from "../Icons/IconCreate";
import Button from "../Button";
import ModelOverlay from "../ModelOverlay";
import IconDetails from "../Icons/IconDetails";
import { createPortal } from "react-dom";

interface WrapperModelProps<T> {
  item?: T;
  children?: React.ReactNode;
  mode: "create" | "edit" | "details" | "delete" | "custom";
  customIcon?: React.ReactNode;
  buttonClass?: string;
  buttonStyle?: "model" | null;
}

interface ModelProps<T> {
  setIsOpen: (isOpen: boolean) => void;
  modelRef: React.RefObject<HTMLDivElement | null>;
  handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  item?: T;
}

export default function WrapperModelPortal<T>({
  item,
  children,
  mode = "create",
  customIcon,
  buttonClass,
  buttonStyle = "model",
}: WrapperModelProps<T>) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const getButtonIcon = () => {
    switch (mode) {
      case "create":
        return (
          <IconCreate
            className="fill-none stroke-amber h-full aspect-square
             group-hover:stroke-main-black transition-all duration-300"
          />
        );
      case "edit":
        return (
          <IconEdit
            className="fill-none stroke-amber h-full aspect-square
             group-hover:stroke-main-black transition-all duration-300"
          />
        );
      case "details":
        return (
          <IconDetails
            className="fill-amber stroke-amber h-full aspect-square
             group-hover:stroke-main-black group-hover:fill-main-black transition-all duration-300"
          />
        );
      case "custom":
        return customIcon;
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        onClick={handleModel}
        buttonStyle={buttonStyle}
        className={buttonClass || ""}
      >
        {getButtonIcon()}
      </Button>
      {isOpen
        ? createPortal(
            <ModelOverlay isOpen={isOpen}>
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(
                      child as React.ReactElement<ModelProps<T>>,
                      {
                        setIsOpen,
                        modelRef,
                        handleModel,
                        item,
                      }
                    )
                  : child
              )}
            </ModelOverlay>,
            document.body
          )
        : null}
    </>
  );
}
