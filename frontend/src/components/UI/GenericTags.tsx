import { toTitle } from "../../utils/toTitle";
import GenericList from "./GenericList";

interface IGenericTagsProps<T> {
  items: T[];
  getTag: (item: T) => string;
  getKey: (item: T) => string;
}

export default function GenericTags<T>({
  items,
  getTag,
  getKey,
}: IGenericTagsProps<T>) {
  return (
    <>
      <GenericList
        items={items || []}
        ItemComponent={GenericTag}
        itemComponentProps={{ getTag }}
        getKey={getKey}
        ulStyle="flex w-full overflow-x-auto gap-2 py-2"
      />
    </>
  );
}

interface IGenericTagProps<T> {
  item: T;
  getTag: (item: T) => string;
}

function GenericTag<T>({ item, getTag }: IGenericTagProps<T>) {
  const tag = getTag(item);
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow
       bg-main-black text-main-orange shadow-black"
    >
      {toTitle(tag)}
    </li>
  );
}
