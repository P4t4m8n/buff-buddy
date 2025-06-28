import React, { useMemo, useRef } from "react";
import { useModel } from "../../../hooks/shared/useModel";
import IconEdit from "../Icons/IconEdit";
import IconCreate from "../Icons/IconCreate";
import Button from "../Button";
import ModelOverlay from "../ModelOverlay";

interface WrapperModelProps<T> {
  item?: T;
  children?: React.ReactNode;
}

export default function WrapperEditModel<T>({
  item,
  children,
}: WrapperModelProps<T>) {
  const modelRef = useRef(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);
  const buttonIcon = useMemo(
    () =>
      item ? (
        <IconEdit
          className="fill-amber stroke-amber h-8 w-8
             group-hover:stroke-main-black transition-all duration-300"
        />
      ) : (
        <IconCreate
          className="fill-none stroke-amber h-8 w-8
             group-hover:stroke-main-black transition-all duration-300"
        />
      ),
    [item]
  );
  return (
    <>
      <Button
        onClick={handleModel}
        className="bg-main-black p-2 rounded  hover:bg-amber transition-all 
                     duration-300 group border-2 w-14 h-14 border-transparent
                      hover:border-main-black cursor-pointer"
      >
        {buttonIcon}
      </Button>
      {isOpen ? (
        <ModelOverlay isOpen={isOpen}>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                  setIsOpen,
                  modelRef,
                })
              : child
          )}
        </ModelOverlay>
      ) : null}
    </>
  );
}
