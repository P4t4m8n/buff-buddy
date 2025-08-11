import { twMerge } from "tailwind-merge";
import Input from "../../components/UI/Form/Input";
import Label from "../../components/UI/Form/Label";

interface IIsActiveInputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}
export default function IsActiveInput({
  handleInputChange,
  isActive,
}: IIsActiveInputProps) {
  const mainClass =
    " relative w-24 h-10 rounded-full bg-error-red cursor-pointer transition-colors duration-[400ms] block peer-checked:bg-success-green";

  const before = `before:absolute before:left-1 before:top-1/2 before:h-6 before:w-6 before:translate-x-16 before:-translate-y-1/2
          before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-[400ms] before:content-['']
          peer-checked:before:translate-x-0`;

  const after = `after:absolute after:left-4 after:top-1/2 after:-translate-y-1/2 after:text-xs after:font-bold after:text-white
          after:transition-all after:duration-200 after:content-['Inactive']
          peer-checked:after:left-auto peer-checked:after:right-4 peer-checked:after:content-['Active']`;
  const labelClass = twMerge(mainClass, before, after);
  return (
    <Input
      onChange={handleInputChange}
      checked={isActive}
      type="checkBox"
      name="isActive"
      id="isActive"
      divStyle="flex items-center order-2 justify-self-end lg:justify-self-center"
      hidden
      className="hidden peer"
    >
      <Label htmlFor="isActive" className={labelClass}></Label>
    </Input>
  );
}
