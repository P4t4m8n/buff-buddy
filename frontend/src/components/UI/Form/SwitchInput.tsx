import { twMerge } from "tailwind-merge";

import { appUtil } from "../../../utils/app.util";

import Input from "./Input";
import Label from "./Label";

const DEFAULT_AFTER_CONTENT_TEXT = {
  active: "Active",
  inactive: "Inactive",
};
interface IIsActiveInputProps {
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
  inputName: string;
  afterContentText?: {
    active: string;
    inactive: string;
  };
}

export default function SwitchInput({
  handleInputChange,
  isActive,
  afterContentText,
  inputName,
}: IIsActiveInputProps) {
  const safeAfter = afterContentText ?? DEFAULT_AFTER_CONTENT_TEXT;

  const mainClass =
    " relative w-24 h-10 rounded-full bg-error-red cursor-pointer transition-colors duration-[400ms] block peer-checked:bg-success-green";

  const before = `before:absolute before:left-1 before:top-1/2 before:h-6 before:w-6 before:translate-x-16 before:-translate-y-1/2
          before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-[400ms] before:content-['']
          peer-checked:before:translate-x-0`;

  const after = `after:absolute after:left-4 after:top-1/2 after:-translate-y-1/2 after:text-xs after:font-bold after:text-white
          after:transition-all after:duration-200  peer-checked:after:left-auto peer-checked:after:right-4 `;

  const afterAttrClass =
    "after:content-[attr(data-after-inactive)] peer-checked:after:content-[attr(data-after-active)]";

  const labelClass = twMerge(mainClass, before, after, afterAttrClass);

  const idName = inputName + appUtil.getTempId();

  const conditionalProps = handleInputChange
    ? { checked: isActive }
    : { defaultChecked: isActive };
    
  return (
    <Input
      onChange={handleInputChange}
      {...conditionalProps}
      type="checkbox"
      name={inputName}
      id={idName}
      divStyle="flex items-center "
      hidden
      className="hidden peer"
    >
      <Label
        htmlFor={idName}
        className={labelClass}
        data-after-inactive={safeAfter.inactive}
        data-after-active={safeAfter.active}
      ></Label>
    </Input>
  );
}
