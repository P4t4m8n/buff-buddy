import { twMerge } from "tailwind-merge";
import Label from "./Label";
interface ILabelWithErrorProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: string;
  labelText: string;
  isMoveUpEffect?: boolean;
}

export default function LabelWithError({
  error,
  labelText,
  isMoveUpEffect = true,
  ...props
}: ILabelWithErrorProps) {
  const errorStyle = error
    ? `text-sm w-fit text-red-orange
     peer-[:not(:placeholder-shown)]:text-red-orange
                  peer-focus:text-red-orange`
    : "";

  const style = twMerge(errorStyle, props.className ?? "");
  return (
    <Label isMoveUpEffect={isMoveUpEffect} {...props} className={style}>
      {error ? error : labelText}
    </Label>
  );
}
