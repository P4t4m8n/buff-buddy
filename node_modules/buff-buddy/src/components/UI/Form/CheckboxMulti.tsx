import type { ChangeEvent } from "react";
import Input from "./Input";
import Label from "./Label";

interface CheckboxMultiProps {
  options: string[];
  selectedOptions: string[];
  inputName: string;
  listStyle?: string;
  itemStyle?: string;
  onChange?: (e: ChangeEvent) => void;
}
export default function CheckboxMulti({
  options,
  selectedOptions,
  inputName,
  onChange,
}: CheckboxMultiProps) {
  return (
    <ul className="border rounded p-1  gap-2 w-full grid grid-cols-4 justify-center justify-items-center">
      {options.map((option) => (
        <li key={option}>
          <Input
            type="checkbox"
            name={inputName}
            value={option}
            defaultChecked={selectedOptions.includes(option)}
            divStyle="flex items-center gap-2"
            className=" cursor-pointer"
            onChange={onChange}
          >
            <Label>{option}</Label>
          </Input>
        </li>
      ))}
    </ul>
  );
}
