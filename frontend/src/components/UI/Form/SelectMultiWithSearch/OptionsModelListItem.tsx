import { toTitle } from "../../../../utils/toTitle";
import Button from "../../Button";
import IconPlus from "../../Icons/IconPlus";

interface IOptionsModelListItemProps<T> {
  item: T;
  handleOptionAdd: (e: React.MouseEvent<HTMLButtonElement>, option: T) => void;
  filterBy: (option: T) => string;
}

export default function OptionsModelListItem<T>({
  item,
  handleOptionAdd,
  filterBy,
}: IOptionsModelListItemProps<T>) {
  return (
    <li className="w-full h-full px-2">
      <Button
        onClick={(e) => handleOptionAdd(e, item)}
        className="w-full h-full flex cursor-pointer"
        type="button"
      >
        <p className="text-xs">{toTitle(filterBy(item))}</p>
        <IconPlus className=" h-2 aspect-square stroke-main-orange ml-auto" />
      </Button>
    </li>
  );
}
