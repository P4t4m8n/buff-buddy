import { twMerge } from "tailwind-merge";
import Input from "../Input";
import GenericList from "../../GenericList";
import OptionsModelListItem from "./OptionsModelListItem";

interface IOptionModelListProps<T> {
  modelPositionClass?: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optionsList: T[];
  handleOptionAdd: (e: React.MouseEvent<HTMLButtonElement>, option: T) => void;
  filterBy: (option: T) => string;
}

export default function OptionModelList<T>({
  modelPositionClass,
  handleSearchChange,
  optionsList,
  handleOptionAdd,
  filterBy,
}: IOptionModelListProps<T>) {
  const modelStyle = twMerge(
    "absolute shadow-[0px_0px_6px_1px_rgba(0,0,0,1)] border rounded p-2 w-full grid grid-rows-[2rem_calc(100%-2rem)] z-50 gap-[.5rem] h-42 bg-black-300 ",
    modelPositionClass
  );
  return (
    <div className={modelStyle}>
      <Input
        className="border-b w-full h-full pb-1 "
        onChange={handleSearchChange}
        placeholder="Search by name"
      />
      <GenericList
        items={optionsList}
        ulStyle="grid grid-rows-[repeat(auto-fill,2rem)] gap-2 h-full overflow-auto"
        ItemComponent={OptionsModelListItem}
        getKey={(item) => filterBy(item)}
        itemComponentProps={{
          handleOptionAdd,
          filterBy,
        }}
      />
    </div>
  );
}
