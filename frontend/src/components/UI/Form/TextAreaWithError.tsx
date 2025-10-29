//Lib
import { twMerge } from "tailwind-merge";
//UI
import TextArea from "./TextArea";
import Label from "./Label";

interface TextAreaWithErrorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textAreaId?: string;
  error?: string;
}
export default function TextAreaWithError({
  textAreaId,
  error,
  ...props
}: TextAreaWithErrorProps) {
  const id = `${props.name}-${textAreaId ?? "default"}`;

  const labelErrorStyle = error
    ? `text-sm w-fit text-error-red
  peer-[:not(:placeholder-shown)]:text-error-red
  peer-focus:text-error-red`
    : "";

  const textAreaStyle = twMerge(
    "peer outline-offset-0 pl-2 resize-none w-full border-1 rounded",
    props.className ?? "",
    error ? "border-error-red" : ""
  );
  return (
    <TextArea
      {...props}
      id={id}
      rows={props.rows ?? 3}
      className={textAreaStyle}
      divStyle=" relative  h-auto col-span-full relative group "
    >
      <Label
        className={labelErrorStyle}
        labelPosition="textArea"
        isMoveUpEffect={true}
        htmlFor={id}
      >
        {error ? error : "Notes"}
      </Label>
    </TextArea>
  );
}
