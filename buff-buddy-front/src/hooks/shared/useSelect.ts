import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import { useModel } from "./useModel";

export const useSelect = <T>(
  options:readonly T[],
  modelPosition: string,
  filterOptions: (searchValue: string) => T[],
  parentModelRef?: React.RefObject<HTMLDivElement | null>,
) => {
  const [optionsList, setOptionsList] = useState<T[]>(
    options ? [...options] : []
  );

  const modelRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useModel(modelRef);
  const [modelPositionClass, setModelPositionClass] = useState(modelPosition);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    const filteredOptions = filterOptions(searchValue);
    setOptionsList(filteredOptions || []);
  };

  //TODO?? Improve this function to handle position better
  const handleModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!open && fieldRef.current && parentModelRef?.current) {
      const fieldRect = fieldRef.current.getBoundingClientRect();
      const modelHeight = parentModelRef.current.clientHeight;
      const viewportHeight = window.innerHeight;
      const gap = 4;

      const spaceBelow = viewportHeight - fieldRect.bottom;
      const spaceAbove = fieldRect.top;

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

  const memorizedHook: [
    T[],
    React.RefObject<HTMLDivElement | null>,
    React.RefObject<HTMLDivElement | null>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    string,
    React.Dispatch<React.SetStateAction<string>>,
    (e: ChangeEvent<HTMLInputElement>) => void,
    (e: React.MouseEvent<HTMLButtonElement>) => void
  ] = [
    optionsList,
    modelRef,
    fieldRef,
    open,
    setOpen,
    modelPositionClass,
    setModelPositionClass,
    handleSearchChange,
    handleModel,
  ];
  return memorizedHook;
};
