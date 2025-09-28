import type { ISelectItemComponentProps } from "../../../../models/select.model";
import { toTitle } from "../../../../utils/toTitle";
import Button from "../../Button";
import {IconPlus} from "../../Icons/IconPlus";

export default function GenericSelectItem<T>({
  item,
  inputName,
  onClick,
}: ISelectItemComponentProps<T>) {
  return (
    <li className="w-full h-full">
      <Button
        onClick={(e) => onClick(e, item, inputName)}
        className="w-full h-full flex cursor-pointer items-center justify-between "
      >
        {item ? toTitle(item) : "No Type Selected"}
        <IconPlus className=" h-8 aspect-square stroke-main-black" />
      </Button>
    </li>
  );
}
