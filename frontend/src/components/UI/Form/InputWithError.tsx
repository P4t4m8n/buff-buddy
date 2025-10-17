import { twMerge } from "tailwind-merge";
import Input from "./Input";
import Label from "./Label";
import type { TLabelPosition } from "../../../models/UI.model";
import { memo } from "react";

interface InputWithErrorProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & {
    labelPosition?: TLabelPosition;
    isMoveUpEffect?: boolean;
  };
  error?: string | null;
  divStyle?: string;
  children?: React.ReactNode;
}

function InputWithError({
  inputProps,
  labelProps,
  error,
  divStyle = "rounded h-full",
  children,
}: InputWithErrorProps) {
  const labelErrorStyle = error
    ? `text-sm w-fit text-error-red
  peer-[:not(:placeholder-shown)]:text-error-red
  peer-focus:text-error-red`
    : "";

  const inputStyle = twMerge(
    "w-full peer outline-offset-0 border-1 rounded",
    inputProps.className ?? "",
    error ? "border-error-red" : ""
  );

  const labelStyle = twMerge(labelErrorStyle, labelProps.className ?? "");
  const { labelPosition, ..._labelProps } = labelProps;




  return (
    <Input
      placeholder=""
      {...inputProps}
      className={inputStyle}
      divStyle={divStyle}
    >
      <Label
        labelPosition={labelPosition ?? "input"}
        {..._labelProps}
        className={labelStyle}
      >
        {error ? error : labelProps.children}
      </Label>
      {children}
      
    </Input>
  );
}

const propsEqual = (prev: InputWithErrorProps, next: InputWithErrorProps) => {
  const prevVal =
    prev.inputProps?.value ??
    prev.inputProps?.defaultValue ??
    prev.inputProps?.checked ??
    prev.inputProps.defaultChecked;
  const nextVal =
    next.inputProps?.value ??
    next.inputProps?.defaultValue ??
    next.inputProps?.checked ??
    next.inputProps.defaultChecked;
  if (prevVal !== nextVal) return false;
  if (prev.error !== next.error) return false;
  if (prev.inputProps?.name !== next.inputProps?.name) return false;
  if (prev.inputProps?.type !== next.inputProps?.type) return false;
  if (prev.children !== next.children) return false;
  return true;
};

export default memo(InputWithError, propsEqual);
