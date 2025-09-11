import { useState } from "react";

import { toTitle } from "../../../../utils/toTitle";

import InputWithError from "../../../UI/Form/InputWithError";
import Button from "../../../UI/Button";

import type { IModelProps } from "../../../../models/UI.model";
interface IFoodItemEditBrandProps extends IModelProps<HTMLDivElement> {
  handleEditBrand: (name: string) => void;
}
export default function FoodItemEditBrandModel({
  handleEditBrand,
  ...props
}: IFoodItemEditBrandProps) {
  const [name, setName] = useState<string | null>("");
  const { handleModel, setIsOpen } = props;

  const id = "food-item-edit-brand-name";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setName(value);
  };

  const onSave = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEditBrand(name ?? "");
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <div className="bg-black-800 p-4 border rounded grid grid-cols-2 grid-rows-2 gap-4 w-small">
      <InputWithError
        inputProps={{
          type: "text",
          name: "name",
          id: id,
          placeholder: "",
          value: toTitle(name),
          className: "h-10 pl-2 ",
          onChange: onChange,
        }}
        divStyle=" col-span-2"
        labelProps={{
          htmlFor: id,
          children: "Brand Name",
          isMoveUpEffect: true,
        }}
      />
      <Button buttonStyle="warning" onClick={handleModel}>
        Cancel
      </Button>
      <Button
        buttonStyle="save"
        type="button"
        className="place-self-end"
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  );
}
