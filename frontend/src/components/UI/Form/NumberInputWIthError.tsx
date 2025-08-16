import { twMerge } from "tailwind-merge";
import { toTitle } from "../../../utils/toTitle";
import Input from "./Input";
import Label from "./Label";
import LabelWithError from "./LabelWithError";

interface INumberInputWithErrorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  inputId?: string;
  value?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  divStyle?: string;
  label?: string;
}
export default function NumberInputWIthError({
  name,
  inputId,
  error,
  value,
  onChange,
  divStyle,
  label,
}: INumberInputWithErrorProps) {
  const containerStyle = divStyle
    ? divStyle
    : "inline-flex flex-col-reverse gap-1 items-center";

  const inputBase = "border w-input aspect-square rounded text-center ";
  const errorStyle = error ? "border-error-red animate-pulse" : "";

  const inputStyle = twMerge(inputBase, errorStyle);

  const id = `${name}-${inputId}`;

  return (
    <Input
      key={id}
      name={name}
      type="number"
      step="any"
      value={value}
      divStyle={containerStyle}
      className={inputStyle}
      min={0}
      onChange={onChange}
    >
      <LabelWithError
        isMoveUpEffect={false}
        error={error}
        htmlFor={id}
        labelText={toTitle(label)}
      />
    </Input>
  );
}
