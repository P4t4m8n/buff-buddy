import { useRef, type ReactNode } from "react";
import { useModel } from "../../hooks/shared/useModel";
import Button, { type IButtonProps } from "../UI/Button";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import { createPortal } from "react-dom";
import ModelOverlay from "../UI/ModelOverlay";
import type { IEntity } from "../../models/entity.model";

interface EditModelProps<T extends IEntity> {
  data?: T;
  isPortal?: boolean;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  EditComponent: React.ComponentType<{
    data?: T;
    modelRef: React.RefObject<HTMLDivElement | null>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }>;
  buttonProps: IButtonProps;
  buttonChildren?: ReactNode;
  
}

export default function EditModel<T extends IEntity>({
  data,
  isPortal,
  parentRef,
  EditComponent,
  buttonProps,
  buttonChildren,
}: EditModelProps<T>) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const mode = data?.id ? "edit" : "create";

  const getModel = () => {
    const editProps = {
      data,
      modelRef,
      setIsOpen,
      handleModel,
    };
    return isPortal ? (
      createPortal(
        <EditComponent {...editProps} />,
        parentRef?.current || document.body
      )
    ) : (
      <ModelOverlay isOpen={isOpen}>
        <EditComponent {...editProps} />
      </ModelOverlay>
    );
  };

  return (
    <>
      <Button onClick={handleModel} {...buttonProps}>
        {buttonChildren ? buttonChildren : ModelButtonIcon(mode)}
      </Button>
      {isOpen ? getModel() : null}
    </>
  );
}
