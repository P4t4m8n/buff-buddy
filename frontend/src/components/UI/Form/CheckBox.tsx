import Input from "./Input";
import Label from "./Label";
import IconCheckMark from "../Icons/IconCheckMark";

interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  divStyle?: string;
  labelText?: string;
}
export default function CheckBox({
  divStyle,
  labelText,
  ...props
}: ICheckBoxProps) {
  return (
    <Input {...props} hidden type="checkbox" className="peer">
      <Label
        className="peer-checked:border-main-orange peer-checked:[&>svg]:w-5 peer-checked:[&>svg]:h-5 peer-checked:[&>svg]:p-1
                   border border-gray-400 transition-all px-2 py-1 rounded flex items-center duration-500 gap-2 w-fit cursor-pointer"
        htmlFor={props.id}
      >
        {labelText}

        <IconCheckMark className="w-0 h-0  stroke-black-900 bg-success-green rounded-full  transition-all " />
      </Label>
    </Input>
  );
}
