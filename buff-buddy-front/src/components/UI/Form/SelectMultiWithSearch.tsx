import { useEffect, useRef, useState } from "react";
import { useModel } from "../../../hooks/shared/useModel";
import IconArrow from "../Icons/IconArrow";
import IconTrash from "../Icons/IconTrash";
import IconPlus from "../Icons/IconPlus";
import Input from "./Input";
import Button from "../Button";
import type { TExerciseInfo } from "../../../../../shared/models/exercise.model";
import type { ChangeEvent, MouseEvent } from "react";
import { toTitle } from "../../../utils/toTitle";

interface SelectWithSearchProps {
  options: readonly string[];
  selectedOptions?: string[];
  inputName: TExerciseInfo;
  handleSelect: (inputName: TExerciseInfo, option: string) => void;
  parentModelRef?: React.RefObject<HTMLDivElement | Element | null>;
}

export default function SelectMultiWithSearch({
  options,
  selectedOptions,
  inputName,
  handleSelect,
  parentModelRef,
}: SelectWithSearchProps) {
  const [optionsList, setOptionsList] = useState<string[]>([]);
  const [optionsSelected, setOptionsSelected] = useState<string[]>([]);
  const modelRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useModel(modelRef);
  const [modelPositionClass, setModelPositionClass] = useState(
    "top-[calc(100%+.25rem)]"
  );

  useEffect(() => {
    setOptionsList(options ? [...options] : []);
  }, [options]);

  useEffect(() => {
    setOptionsSelected(selectedOptions ? [...selectedOptions] : []);
  }, [selectedOptions]);

  const handleOptionAdd = (
    e: MouseEvent<HTMLButtonElement>,
    option: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsSelected((prev) => [...prev, option]);
    setOptionsList((prev) =>
      prev.filter((selectedOption) => selectedOption !== option)
    );
    if (modelRef.current) modelRef.current.scrollTop = 0;
    handleSelect(inputName, option);
  };
  const handleOptionRemove = (
    e: MouseEvent<HTMLButtonElement>,
    option: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsSelected((prev) =>
      prev.filter((selectedOption) => selectedOption !== option)
    );
    setOptionsList((prev) => [...prev, option]);
    handleSelect(inputName, option);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();
    const filteredOptions = options?.filter((option) =>
      option?.toLowerCase().includes(searchValue)
    );
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
  //TODO?? Make the open button to cover the entire length and use relative positing for the selected options
  return (
    <div ref={modelRef} className="w-full h-fit relative">
      <div
        ref={fieldRef}
        className="inline-flex items-center gap-2 h-full w-full border rounded pl-2  min-h-10"
      >
        {optionsSelected.length ? (
          <ul className="p-2 w-full flex flex-wrap gap-2">
            {optionsSelected.map((option, index) => (
              <li key={index}>
                <button
                  className="flex items-center border rounded p-1 cursor-pointer"
                  onClick={(e) => handleOptionRemove(e, option)}
                >
                  <p>{toTitle(option)}</p>
                  <IconTrash className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>No selected options</div>
        )}
        <Button
          className=" cursor-pointer h-8 aspect-square ml-auto"
          onClick={handleModel}
        >
          <IconArrow
            className={`aspect-square h-full transition-all duration-500 ${
              open ? "rotate-180" : ""
            } `}
          />
        </Button>
      </div>
      {open ? (
        <div
          className={`absolute z-10 backdrop-blur-2xl 
            shadow-[0px_0px_6px_1px_rgba(0,0,0,1)]
             border rounded p-2 w-full grid grid-rows-[2rem_calc(100%-2rem)]
              gap-[.5rem] h-42 ${modelPositionClass}`}
        >
          <Input
            className="border-b w-full h-full pb-1 "
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          <ul className="grid grid-rows-[repeat(auto-fill,2rem)] gap-2 h-full overflow-auto">
            {optionsList.map((option, index) => (
              <li key={index} className="w-full h-full">
                <button
                  onClick={(e) => handleOptionAdd(e, option)}
                  className="w-full h-full flex cursor-pointer"
                >
                  <p>{toTitle(option)}</p>
                  <IconPlus className=" h-8 aspect-square stroke-main-black" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
