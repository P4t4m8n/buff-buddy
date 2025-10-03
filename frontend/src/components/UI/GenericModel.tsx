//Lib
import { useContext } from "react";
import { createPortal } from "react-dom";
//Hooks
import { useModel } from "../../hooks/shared/useModel";
//Context
import { RootRefContext } from "../../hooks/context/rootRefContext";
//Utils
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
//UI
import ModelOverlay from "./ModelOverlay";
import Button from "./Button";
//Types
import type { IButtonProps } from "../../models/UI.model";
import type { IModelProps } from "../../models/model.model";
import type { TIconMode } from "../../models/UI.model";

interface IGenericModelProps<T extends HTMLElement, P> {
  modelProps?: P;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
  buttonProps?: IButtonProps;
  mode?: TIconMode;
  isOverlay?: boolean;
  modelInitialState?: boolean;
  Model: React.ComponentType<P & IModelProps<T>>;
  callBack?: null | (() => void);
}
export default function GenericModel<T extends HTMLElement, P>({
  modelProps,
  parentRef,
  isPortal = false,
  buttonProps,
  mode,
  isOverlay = true,
  modelInitialState = false,
  Model,
  callBack,
}: IGenericModelProps<T, P>) {
  const { isOpen, modelRef, setIsOpen, handleModel } = useModel<T>({
    callBack,
    modelInitialState,
  });

  const rootRef = useContext(RootRefContext);

  const getModel = () => {
    const props: P & IModelProps<T> = {
      ...(modelProps as P),
      handleModel,
      setIsOpen,
      modelRef,
    };

    if (isPortal && isOverlay) {
      return createPortal(
        <ModelOverlay isOpen={isOpen}>
          <Model {...props} />
        </ModelOverlay>,
        parentRef?.current || rootRef?.current || document.body
      );
    }

    if (isPortal) {
      return createPortal(
        <Model {...props} />,
        parentRef?.current || rootRef?.current || document.body
      );
    }

    if (isOverlay) {
      return (
        <ModelOverlay isOpen={isOpen}>
          <Model {...props} />
        </ModelOverlay>
      );
    }

    return <Model {...props} />;
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
