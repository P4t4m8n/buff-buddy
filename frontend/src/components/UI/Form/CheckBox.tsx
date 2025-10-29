import { twMerge } from "tailwind-merge";
import type { ICheckBoxProps } from "../../../models/UI.model";
import IconCheckMark from "../Icons/IconCheckMark";
import InputWithError from "./InputWithError";

export default function CheckBox({
  divStyle,
  labelText,
  error,
  ...props
}: ICheckBoxProps) {
  const ContainerStyle = twMerge("flex items-center gap-2", divStyle);
  return (
    <InputWithError
      divStyle={ContainerStyle}
      inputProps={{
        ...props,
        hidden: true,
        className: "peer",
        type: "checkbox",
      }}
      labelProps={{
        labelPosition: "input",
        className:
          "peer-checked:border-main-orange peer-checked:[&>svg]:w-5 peer-checked:[&>svg]:h-5 peer-checked:gap-2 peer-checked:[&>svg]:p-1 border border-gray-400 transition-all px-2 py-1 rounded flex items-center duration-500 w-fit cursor-pointer",
        htmlFor: props.id,
        children: (
          <>
            {labelText}
            <IconCheckMark className="w-0 h-0  stroke-black-900 bg-success-green rounded-full transition-all " />
          </>
        ),
      }}
      error={error}
    />
  );
}
