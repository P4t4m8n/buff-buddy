import { toTitle } from "../../utils/toTitle";
import Button from "./Button";
import GenericList from "./GenericList";
import IconTrash from "./Icons/IconTrash";

interface IGenericTagsProps<T> {
  items: T[];
  getTag: (item: T) => string;
  getKey: (item: T) => string;
  removeTag?: (e: React.MouseEvent, item: T) => void;
}

export default function GenericTags<T>({
  items,
  getTag,
  getKey,
  removeTag,
}: IGenericTagsProps<T>) {
  return (
    <>
      <GenericList
        items={items || []}
        ItemComponent={GenericTag}
        itemComponentProps={{ getTag, removeTag }}
        getKey={getKey}
        ulStyle="flex w-full overflow-x-auto gap-2 py-2"
      />
    </>
  );
}

interface IGenericTagProps<T> {
  item: T;
  getTag: (item: T) => string;
  removeTag?: (e: React.MouseEvent, item: T) => void;
}

function GenericTag<T>({ item, getTag, removeTag }: IGenericTagProps<T>) {
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
