import toTitle  from "../../../../utils/toTitle";
import Button from "../../Button";
import IconTrash from "../../Icons/IconTrash";

interface ISelectItemComponentProps<T> {
  item: T;
  handleOptionRemove: (e: React.MouseEvent<HTMLButtonElement>, item: T) => void;
  filterBy: (option: T) => string;
}

export default function OptionSelectedItem<T>({
  item,
  handleOptionRemove,
  filterBy,
}: ISelectItemComponentProps<T>) {
  return (
    <li>
      <Button
        className="flex items-center border hover:border-error-red hover:text-error-red
                   transition-all duration-300 rounded p-1 cursor-pointer gap-2"
        onClick={(e) => handleOptionRemove(e, item)}
      >
        <p className="text-sm">{toTitle(filterBy(item))}</p>
        <IconTrash className="w-4 h-4 stroke-none fill-error-red" />
      </Button>
    </li>
  );
}
