import { twMerge } from "tailwind-merge";
import Input from "./Input";
import Label from "./Label";

interface InputWithErrorProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string | null;
}

export default function InputWithError({
  inputProps,
  labelProps,
  error,
}: InputWithErrorProps) {
  const labelErrorStyle = error
    ? `text-sm w-fit text-red-orange
     peer-[:not(:placeholder-shown)]:text-red-orange
                  peer-focus:text-red-orange`
    : "";

  const inputStyle = twMerge(
    "w-full h-10 peer outline-offset-0 pl-2 border-1 rounded",
    inputProps.className ?? ""
  );

  const labelStyle = twMerge(labelErrorStyle, labelProps.className ?? "");

  const divStyle = "rounded h-full border-black outline-black";
  return (
    <Input
    placeholder=""
      {...inputProps}
      className={inputStyle}
      divStyle={divStyle}
    >
      <Label isMoveUpEffect={true} {...labelProps} className={labelStyle}>
        {error ? error : labelProps.children}
      </Label>
    </Input>
  );
}
