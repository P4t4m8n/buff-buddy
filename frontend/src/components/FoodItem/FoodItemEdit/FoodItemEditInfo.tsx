import { memo, useState } from "react";
import { toTitle } from "../../../utils/toTitle";
import InputWithError from "../../UI/Form/InputWithError";
import GenericTags from "../../UI/GenericTags";
import Button from "../../UI/Button";
import {IconPlus} from "../../UI/Icons/IconPlus";
import type {
  IFoodItemInfoEditBase,
  TFoodItemInfo,
} from "../../../../../shared/models/foodItem.model";

interface IFoodItemInfoProps {
  name: TFoodItemInfo;
  items?: IFoodItemInfoEditBase[];
  foodItemToEditId?: string;
  addItem: (name: TFoodItemInfo, infoName: string) => void;
  removeItem: (name: TFoodItemInfo, infoName: string) => void;
}

function FoodItemEditInfoMemo({
  name,
  foodItemToEditId,
  items,
  addItem,
  removeItem,
}: IFoodItemInfoProps) {
  const [infoName, setValue] = useState<string>("");
  const inputId = `${name}-${foodItemToEditId}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);
  };

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(name, infoName);
  };

  const onDelete = (e: React.MouseEvent, item: IFoodItemInfoEditBase) => {
    e.preventDefault();
    removeItem(name, item.name ?? "");
  };

  const filteredItems =
    items?.filter((item) => item.crudOperation !== "delete") ?? [];
  return (
    <div className="h-20 grid w-full">
      <div className="flex gap-4 items-center  w-full">
        <InputWithError
          inputProps={{
            type: "text",
            name: name,
            id: inputId,
            placeholder: "",
            value: infoName,
            className: "h-10 pl-2",
            onChange,
          }}
          divStyle="w-full"
          labelProps={{
            htmlFor: inputId,
            children: `Add ${toTitle(name)}`,
            isMoveUpEffect: true,
          }}
        />
        <Button
          buttonStyle="save"
          className="p-1 w-10 h-10 flex flex-center"
          onClick={onAdd}
        >
          <IconPlus className="aspect-square  fill-main-orange stroke-main-orange" />
        </Button>
      </div>
      <GenericTags<IFoodItemInfoEditBase>
        items={filteredItems}
        getTag={(item) => item.name ?? ""}
        getKey={(item) => item.name ?? ""}
        removeTag={onDelete}
      />
    </div>
  );
}

export default memo(FoodItemEditInfoMemo);
