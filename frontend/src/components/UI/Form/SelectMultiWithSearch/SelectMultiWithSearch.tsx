import { useEffect, useState } from "react";
import IconArrow from "../../Icons/IconArrow";
import Button from "../../Button";
import { useSelect } from "../../../../hooks/shared/useSelect";
import { twMerge } from "tailwind-merge";
import GenericList from "../../GenericList";
import LabelWithError from "../LabelWithError";
import OptionModelList from "./OptionModelList";
import OptionSelectedItem from "./OptionSelectedItem";

interface ISelectMultiWithSearchProps<T, P> {
  options: readonly T[];
  error?: string;
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>;
  selectedOptions?: T[];
  inputName: P;
  handleSelect: (option: T, inputName?: P) => void;
  filterBy: (option: T) => string;
}

export default function SelectMultiWithSearch<T, P>({
  options,
  selectedOptions,
  inputName,
  handleSelect,
  parentModelRef,
  error,
  filterBy,
}: ISelectMultiWithSearchProps<T, P>) {
  const {
    optionsList,
    isOpen,
    modelRef,
    modelPositionClass,
    handleSearchChange,
    handleModelWithPosition,

    setOptionsList,
  } = useSelect(options, filterBy, null, parentModelRef);
  const [optionsSelected, setOptionsSelected] = useState<T[]>([]);

  useEffect(() => {
    setOptionsSelected(selectedOptions ? [...selectedOptions] : []);
  }, [selectedOptions]);

  const handleOptionAdd = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: T
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsSelected((prev) => [...prev, option]);
    setOptionsList((prev) =>
      prev.filter((selectedOption) => selectedOption !== option)
    );
    if (modelRef.current) modelRef.current.scrollTop = 0;
    handleSelect(option, inputName);
  };

  const handleOptionRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: T
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsSelected((prev) =>
      prev.filter((selectedOption) => selectedOption !== option)
    );
    setOptionsList((prev) => [...prev, option]);
    handleSelect(option, inputName);
  };

  const iconArrowStyle = twMerge(
    "w-6 h-6 stroke-none fill-main-orange transition-transform duration-300",
    isOpen ? "rotate-180" : ""
  );

  const selectedDivStyle = twMerge(
    "inline-flex items-center gap-2 w-full border rounded pl-2 h-10",
    error ? "border-error-red" : ""
  );

  return (
    <div ref={modelRef} className="w-full h-fit relative">
      <LabelWithError error={error} isMoveUpEffect={false} />
      <div className={selectedDivStyle}>
        {optionsSelected.length ? (
          <GenericList
            items={optionsSelected}
            ItemComponent={OptionSelectedItem}
            itemComponentProps={{
              handleOptionRemove,
              filterBy,
            }}
            getKey={(item) => filterBy(item) + "selected"}
            ulStyle=" w-full flex flex-wrap gap-2"
          />
        ) : (
          <p className="text-gray-500">No selected options</p>
        )}

        <Button
          className=" cursor-pointer h-8 aspect-square ml-auto"
          onClick={handleModelWithPosition}
        >
          <IconArrow className={iconArrowStyle} />
        </Button>
      </div>
      {isOpen ? (
        <OptionModelList
          modelPositionClass={modelPositionClass}
          handleSearchChange={handleSearchChange}
          optionsList={optionsList}
          handleOptionAdd={handleOptionAdd}
          filterBy={filterBy}
        />
      ) : null}
    </div>
  );
}
