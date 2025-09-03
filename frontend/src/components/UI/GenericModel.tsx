import React from "react";
import { createPortal } from "react-dom";

import { useModel } from "../../hooks/shared/useModel";

import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import ModelOverlay from "./ModelOverlay";
import Button from "./Button";

import type { IButtonProps } from "../../models/UI.model";
import type { TIconMode } from "../../models/UI.model";

export interface IModelProps<T extends HTMLElement> {
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  modelRef?: React.RefObject<T | null>;
}

interface IGenericModelProps<T extends HTMLElement, P> {
  Model: React.ComponentType<P & IModelProps<T>>;
  modelProps?: P;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
  buttonProps?: IButtonProps;
  mode?: TIconMode;
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
}: IGenericModelProps<T, P>) {
  const { isOpen, modelRef, setIsOpen, handleModel } = useModel<T>();

  const getModel = () => {
    const props: P & IModelProps<T> = {
      ...(modelProps as P),
      handleModel,
      setIsOpen,
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
