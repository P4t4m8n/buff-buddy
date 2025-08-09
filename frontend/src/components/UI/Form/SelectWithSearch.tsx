import React from "react";
import { twMerge } from "tailwind-merge";

import { useSelect } from "../../../hooks/shared/useSelect";

import { appUtil } from "../../../utils/app.util";

import Button from "../Button";
import Input from "./Input";
import Label from "./Label";
import IconArrow from "../Icons/IconArrow";

import type {
  ISelectAddComponentProps,
  ISelectItemComponentProps,
} from "../../../models/select.model";

interface SelectWithSearchProps<T, P> {
  options: readonly T[];
  error?: string | null;
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>;
  SelectedComponent?: React.ReactNode;
  handleSelect: (option: T, inputName?: P) => void;
  filterBy: (option: T) => string;
  AddComponent?: React.ComponentType<ISelectAddComponentProps>;
  SelectItemComponent: React.ComponentType<ISelectItemComponentProps<T>>;
}
export default function SelectWithSearch<T, P>({
  options,
  SelectedComponent,
  handleSelect,
  error,
  parentModelRef,
  AddComponent,
  SelectItemComponent,
  filterBy,
}: SelectWithSearchProps<T, P>) {
  const {
    optionsList,
    isOpen,
    modelRef,
    modelPositionClass,
    handleSearchChange,
    handleModel,
    onOptionClick,
  } = useSelect(options, filterBy, handleSelect, parentModelRef);

  const modelStyle = twMerge(
    "absolute z-10 shadow-[0px_0px_6px_1px_rgba(0,0,0,1)] bg-black-300 border rounded p-2 w-full grid grid-rows-[2rem_calc(100%-2rem)] gap-[.5rem] h-42",
    modelPositionClass
  );

  return (
    <div className="group relative" ref={modelRef}>
      <Button
        className="flex items-center justify-between w-full h-10 border rounded p-1 cursor-pointer "
        onClick={handleModel}
      >
        {SelectedComponent}

        <IconArrow className="w-6 h-6 group-has-[ul]:rotate-180 stroke-none fill-main-orange transition-transform duration-300" />
      </Button>
      {error ? (
        <Label htmlFor="order" className="text-sm text-red-orange">
          {error}
        </Label>
      ) : null}

      {/*
      //INFO:Not using the generic list because need to add the add component
      */}
      {isOpen ? (
        <div className={modelStyle}>
          <Input
            className="border-b w-full h-full pb-1 "
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          <ul className="grid grid-rows-[repeat(auto-fill,2rem)] gap-4 h-full overflow-auto pb-2">
            {AddComponent ? (
              <li className="w-full h-full">
                <AddComponent isPortal={true} parentRef={modelRef} />
              </li>
            ) : null}
            {optionsList.map((option) => (
              <React.Fragment key={appUtil.getTempId("select-index", option)}>
                <SelectItemComponent item={option} onClick={onOptionClick} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
