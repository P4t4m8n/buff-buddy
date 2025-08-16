import { useEffect, useState } from "react";

import { useModel } from "./useModel";

import type { ChangeEvent } from "react";

export const useSelect = <T, P>(
  options: readonly T[],
  filterBy: (option: T) => string,
  handleSelect?: ((option: T, inputName?: P) => void) | null,
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>
) => {
  const [optionsList, setOptionsList] = useState<T[]>([]);
  const modelBasePositionClass = "top-[calc(100%+.25rem)]";

  const {
    isOpen,
    modelRef,
    modelPositionClass,
    setIsOpen,
    handleModel,
    handleModelWithPosition,
  } = useModel<HTMLDivElement>(null, parentModelRef, modelBasePositionClass);

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

  const onOptionClick = (e: React.MouseEvent, option: T, inputName?: P) => {
    e.preventDefault();
    e.stopPropagation();
    if (handleSelect) handleSelect(option, inputName);
    setIsOpen(false);
  };

  const memorizedHook: {
    optionsList: T[];
    isOpen: boolean;
    modelRef: React.RefObject<HTMLDivElement | null>;
    modelPositionClass: string;
    handleModelWithPosition: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onOptionClick: (e: React.MouseEvent, option: T) => void;
    setOptionsList: React.Dispatch<React.SetStateAction<T[]>>;
  } = {
    optionsList,
    isOpen,
    modelRef,
    modelPositionClass,
    handleModelWithPosition,
    handleSearchChange,
    handleModel,
    onOptionClick,
    setOptionsList,
  };

  return memorizedHook;
};
