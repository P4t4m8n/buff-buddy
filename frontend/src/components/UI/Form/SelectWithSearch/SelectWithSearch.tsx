import React from "react";
import { twMerge } from "tailwind-merge";

import { useSelect } from "../../../../hooks/shared/useSelect";

import { appUtil } from "../../../../utils/app.util";

import Button from "../../Button";
import Input from "../Input";
import IconArrow from "../../Icons/IconArrow";
import LabelWithError from "../LabelWithError";

import type {
  ISelectAddComponentProps,
  ISelectItemComponentProps,
} from "../../../../models/select.model";

interface SelectWithSearchProps<T, P> {
  options: readonly T[];
  error?: string | null;
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>;
  SelectedComponent?: React.ReactNode;
  AddComponent?: React.ComponentType<ISelectAddComponentProps>;
  SelectItemComponent: React.ComponentType<ISelectItemComponentProps<T>>;
  handleSelect: (option: T, inputName?: P) => void;
  filterBy: (option: T) => string;
}
export default function SelectWithSearch<T, P>({
  options,
  error,
  parentModelRef,
  SelectedComponent,
  AddComponent,
  SelectItemComponent,
  handleSelect,
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
  const selectedDivStyle = twMerge(
    "inline-flex items-center  w-full border rounded px-2 h-10",
    error
      ? "border-error-red text-error-red fill-error-red"
      : "fill-main-orange"
  );

  return (
    <div className="group relative" ref={modelRef}>
      <LabelWithError isMoveUpEffect={false} error={error ?? ""} />

      <Button className={selectedDivStyle} onClick={handleModel}>
        {SelectedComponent}

        <IconArrow className="w-6 h-6 group-has-[ul]:rotate-180 stroke-none  transition-transform duration-300 ml-auto " />
      </Button>

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
