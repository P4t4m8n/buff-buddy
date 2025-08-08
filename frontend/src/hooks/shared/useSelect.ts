import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useModel } from "./useModel";

export const useSelect = <T>(
  options: readonly T[],
  filterBy: (option: T) => string,
  handleSelect: (option: T) => void,
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>
) => {
  const [optionsList, setOptionsList] = useState<T[]>([]);

  const [open, modelRef, setOpen] = useModel<HTMLDivElement>();
  const [modelPositionClass, setModelPositionClass] = useState(
    "top-[calc(100%+.25rem)]"
  );

  useEffect(() => {
    setOptionsList(options ? [...options] : []);
  }, [options]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();
    const filteredOptions = options?.filter((option) =>
      filterBy(option).toLowerCase().includes(searchValue)
    );
    setOptionsList(filteredOptions || []);
  };

  //TODO?? Improve this function to handle position better
  const handleModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!open && modelRef.current && parentModelRef?.current) {
      const parentRect = parentModelRef.current.getBoundingClientRect();
      const fieldRect = modelRef.current.getBoundingClientRect();
      const modelHeight = 128;
      const gap = 4;

      const spaceBelow = parentRect.bottom - fieldRect.bottom;
      const spaceAbove = fieldRect.top - parentRect.top;

      if (spaceBelow >= modelHeight + gap) {
        setModelPositionClass("top-[calc(100%+.25rem)]");
      } else if (spaceAbove >= modelHeight + gap) {
        setModelPositionClass("bottom-[calc(100%+.25rem)]");
      } else {
        setModelPositionClass("top-[calc(100%+.25rem)]");
      }
    }

    setOpen((prev) => !prev);
  };

  const onClick = (e: React.MouseEvent, option: T) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelect(option);
    setOpen(false);
  };

  const memorizedHook: {
    optionsList: T[];
    open: boolean;
    modelRef: React.RefObject<HTMLDivElement | null>;
    modelPositionClass: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClick: (e: React.MouseEvent, option: T) => void;
  } = {
    optionsList,
    open,
    modelRef,
    modelPositionClass,
    handleSearchChange,
    handleModel,
    onClick,
  };

  return memorizedHook;
};
