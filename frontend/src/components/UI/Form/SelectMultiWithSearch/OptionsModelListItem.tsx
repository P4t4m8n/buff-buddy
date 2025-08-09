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
    <li className="w-full h-full">
      <Button
        onClick={(e) => handleOptionAdd(e, item)}
        className="w-full h-full flex cursor-pointer"
        type="button"
      >
        <p>{toTitle(filterBy(item))}</p>
        <IconPlus className=" h-8 aspect-square stroke-main-orange" />
      </Button>
    </li>
  );
}
