import React from "react";
import Button from "../Button";
import IconArrow from "../Icons/IconArrow";
import Input from "./Input";
import Label from "./Label";
import { appUtil } from "../../../utils/app.util";
import type {
  ISelectAddComponentProps,
  ISelectItemComponentProps,
} from "../../../models/select.model";
import { twMerge } from "tailwind-merge";
import { useSelect } from "../../../hooks/shared/useSelect";

interface SelectWithSearchProps<T> {
  options: readonly T[];
  SelectedComponent?: React.ReactNode;
  handleSelect: (option: T) => void;
  error?: string | null;
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>;
  AddComponent?: React.ComponentType<ISelectAddComponentProps>;
  SelectItemComponent: React.ComponentType<ISelectItemComponentProps<T>>;
  filterBy: (option: T) => string;
}
export default function SelectWithSearch<T>({
  options,
  SelectedComponent,
  handleSelect,
  error,
  parentModelRef,
  AddComponent,
  SelectItemComponent,
  filterBy,
}: SelectWithSearchProps<T>) {
  const {
    optionsList,
    open,
    modelRef,
    modelPositionClass,
    handleSearchChange,
    handleModel,
    onClick,
  } = useSelect(options, filterBy, handleSelect, parentModelRef);

  const modelStyle = twMerge(
    "absolute z-10 shadow-[0px_0px_6px_1px_rgba(0,0,0,1)] bg-black-300 border rounded p-2 w-full grid grid-rows-[2rem_calc(100%-2rem)] gap-[.5rem] h-42",
    modelPositionClass
  );

  return (
    <div className="  group relative" ref={modelRef}>
      <Button
        className="flex items-center justify-between w-full h-10 border rounded p-1 cursor-pointer "
        onClick={handleModel}
      >
        <h3>{SelectedComponent}</h3>

        <IconArrow className="w-6 h-6 group-has-[ul]:rotate-180 " />
      </Button>
      {error ? (
        <Label htmlFor="order" className=" text-sm text-red-orange">
          {error}
        </Label>
      ) : null}
      {open ? (
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
                <SelectItemComponent item={option} onClick={onClick} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
