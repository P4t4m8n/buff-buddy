import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useModel } from "../../../hooks/useModel";
import { useSelect } from "../../../hooks/useSelect";
import Button from "../Button";
import IconArrow from "../Icons/IconArrow";
import IconPlus from "../Icons/IconPlus";
import Input from "./Input";

interface SelectWithSearchProps<T> {
  options: readonly T[];
  selectedOptionName?: string;
  inputName: string;
  handleSelect: (option: T) => void;
  filterOptions: (searchValue: string) => T[];

  parentModelRef?: React.RefObject<HTMLDivElement | null>;
  SelectedComponent?: React.ReactNode;
  SelectItemComponent: React.ComponentType<{
    option: T;
  }>;
}
export default function SelectWithSearch<T>({
  options,
  selectedOptionName,
  inputName,
  handleSelect,
  filterOptions,
  parentModelRef,
  SelectedComponent,
  SelectItemComponent,
}: SelectWithSearchProps<T>) {
  const [optionsList, setOptionsList] = useState<T[]>([]);

  const modelRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useModel(modelRef);
  const [modelPositionClass, setModelPositionClass] = useState(
    "top-[calc(100%+.25rem)]"
  );

  useEffect(() => {
    setOptionsList(options ? [...options] : []);
  }, [options]);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    const filteredOptions = filterOptions(searchValue);
    setOptionsList(filteredOptions || []);
  };

  //TODO:Improve this function to handle position better
  const handleModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!open && modelRef.current && parentModelRef?.current) {
      const fieldRect = modelRef.current.getBoundingClientRect();
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

  const onClick = (e: MouseEvent, option: T) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelect(option);
    setOpen(false);
  };

  return (
    <div className=" group relative" ref={modelRef}>
      <Button
        className="flex items-center justify-between w-full border rounded p-1 cursor-pointer "
        onClick={handleModel}
      >
        <h3>{SelectedComponent ? SelectedComponent : null}</h3>

        <IconArrow className="w-6 h-6 group-has-[ul]:rotate-180 " />
      </Button>
      {open ? (
        <div
          className={`absolute z-10 
                  shadow-[0px_0px_6px_1px_rgba(0,0,0,1)] bg-main-orange
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
                <Button
                  onClick={(e) => onClick(e, option)}
                  className="w-full h-full flex cursor-pointer"
                >
                  {SelectItemComponent ? (
                    <SelectItemComponent option={option} />
                  ) : null}
                  <IconPlus className=" h-8 aspect-square stroke-main-black" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
