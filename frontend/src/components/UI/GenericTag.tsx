import { toTitle } from "../../utils/toTitle";
import Button from "./Button";
import IconTrash from "./Icons/IconTrash";

interface IGenericTagProps<T> {
  item: T;
  getTag: (item?: T) => string;
  removeTag?: (e: React.MouseEvent, item: T) => void;
}

export default function GenericTag<T>({
  item,
  getTag,
  removeTag,
}: IGenericTagProps<T>) {
  const tag = getTag(item);
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow flex items-center gap-2
       bg-main-black text-main-orange shadow-black"
    >
      <p>{toTitle(tag)}</p>
      {removeTag ? (
        <Button
          className=" w-4 aspect-square"
          onClick={(e) => removeTag(e, item)}
        >
          <IconTrash className="stroke-main-orange fill-main-orange w-full aspect-square" />
        </Button>
      ) : null}
    </li>
  );
}
