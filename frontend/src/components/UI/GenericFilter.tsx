//Lib
import { useState } from "react";
import { twMerge } from "tailwind-merge";
//Util
import { getTempId } from "../../../../shared/utils/getTempId";
//UI
import Button from "./Button";
import Input from "./Form/Input";
import Label from "./Form/Label";
import IconPlus from "./Icons/IconPlus";
import { IconSearch } from "./Icons/IconSearch";
//Types
import type {
  IFilterCheckboxInput,
  IFilterTextInput,
} from "../../models/UI.model";

interface IGenericFilterProps<Filter> {
  isLoading?: boolean;
  textInputs: IFilterTextInput<Filter>[];
  checkBoxInputs: IFilterCheckboxInput<Filter>[];
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
  children?: React.ReactNode;
}
export default function GenericFilter<Filter>({
  isLoading,
  textInputs,
  checkBoxInputs,
  onSearch,
  onResetForm,
  children,
}: IGenericFilterProps<Filter>) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSearch(e);
    setIsOpen(false);
  };

  const baseFormStyle =
    "transition-all duration-300 ease-in-out h-full flex md:row-span-2 pt-4 ";
  const isFormOpenStyle = isOpen
    ? "w-full md:w-small p-desktop bg-black-400 absolute inset-0 md:relative flex flex-col z-10 gap-4"
    : "pl-4 md:w-12  items-center md:items-start ";

  const formStyle = twMerge(baseFormStyle, isFormOpenStyle);

  return (
    <form onSubmit={onSubmit} className={formStyle}>
      {isOpen ? (
        <>
          <span className="inline-flex justify-between items-center w-full">
            <h2 className="text-lg">Filter & Search</h2>
            <Button
              className="border rounded-full w-8 h-8 p-1 flex-center"
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <IconPlus className="w-full stroke-main-orange rotate-45" />
            </Button>
          </span>

          {textInputs.map((input) => {
            const inputName = input.name.toString();
            const inputId = `${inputName}-generic-filter`;
            return (
              <Input
                key={inputName ?? getTempId()}
                defaultValue={input.value ?? ""}
                type="text"
                name={inputName}
                id={inputId}
                placeholder={`Search by ${input.label}...`}
                className="order-2 px-2 py-1 bg-black-900 "
                divStyle="h-fit w-full grid gap-1 "
              >
                <Label htmlFor={inputId}>{input.label}</Label>
              </Input>
            );
          })}

          {checkBoxInputs.map((input) => {
            const inputName = input.name.toString();
            const inputId = `${inputName}-generic-filter`;
            return (
              <Input
                key={inputName}
                type="checkbox"
                name={inputName}
                id={inputId}
                defaultChecked={!!input.isChecked}
                divStyle="flex items-center gap-2 "
                className=" cursor-pointer w-fit "
              >
                <Label htmlFor={inputId}> {input.label} </Label>
              </Input>
            );
          })}
          {children ? children : null}
          <div className="flex mt-auto gap-8 w-full">
            <Button
              type="reset"
              buttonStyle="warning"
              className="w-full"
              disabled={isLoading}
              onClick={onResetForm}
            >
              Reset
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              buttonStyle="save"
              className="w-full"
            >
              <p>Search</p>
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="border rounded-full w-8 h-8 p-1 flex-center"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IconSearch className="stroke-main-orange w-full" />
        </Button>
      )}
    </form>
  );
}
