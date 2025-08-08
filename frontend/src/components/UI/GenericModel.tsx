import React from "react";
import { useModel } from "../../hooks/shared/useModel";
import { createPortal } from "react-dom";
import ModelOverlay from "./ModelOverlay";
import Button, { type IButtonProps } from "./Button";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import type { TModelButtonIconMode } from "../../models/UI.model";

export interface IModelProps<T extends HTMLElement> {
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  modelRef?: React.RefObject<T | null>;
}

interface IGenericDialogProps<T extends HTMLElement, P> {
  Model: React.ComponentType<P & IModelProps<T>>;
  modelProps?: P;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
  buttonProps?: IButtonProps;
  mode?: TModelButtonIconMode;
  isOverlay?: boolean;
}
export default function GenericModel<T extends HTMLElement, P>({
  Model,
  modelProps,
  parentRef,
  isPortal = false,
  buttonProps,
  mode,
  isOverlay = true,
}: IGenericDialogProps<T, P>) {
  const [isOpen, modelRef, setOpen, handleModel] = useModel<T>();

  const getModel = () => {
    const props: P & IModelProps<T> = {
      ...(modelProps as P),
      handleModel,
      setOpen,
      modelRef,
    };
    return isPortal ? (
      createPortal(<Model {...props} />, parentRef?.current || document.body)
    ) : isOverlay ? (
      <ModelOverlay isOpen={isOpen}>
        <Model {...props} />
      </ModelOverlay>
    ) : (
      <Model {...props} />
    );
  };
  return (
    <>
      <Button onClick={handleModel} type="button" {...buttonProps}>
        {buttonProps?.children ?? ModelButtonIcon(mode)}
      </Button>
      {isOpen ? getModel() : null}
    </>
  );
}
