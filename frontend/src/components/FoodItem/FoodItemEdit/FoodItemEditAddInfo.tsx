import { useState } from "react";
import type {
  IFoodItemInfoEditDTO,
  TFoodItemInfo,
} from "../../../../../shared/models/foodItem.model";
import { formUtil } from "../../../utils/form.util";
import toTitle  from "../../../utils/toTitle";
import InputWithError from "../../UI/Form/InputWithError";
import  IconPlus  from "../../UI/Icons/IconPlus";
import Button from "../../UI/Button";

interface IFoodItemEditAddInfoProps {
  handleFoodItemInfo: (
    option: IFoodItemInfoEditDTO,
    inputName?: TFoodItemInfo
  ) => void;
  inputName: TFoodItemInfo;
}
export default function FoodItemEditAddInfo({
  handleFoodItemInfo,
  inputName,
}: IFoodItemEditAddInfoProps) {
  const [foodItemInfoToEdit, setFoodItemInfoToEdit] =
    useState<IFoodItemInfoEditDTO | null>({
      name: "",
      crudOperation: "create",
    });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formUtil.handleInputChange(e, setFoodItemInfoToEdit);
  };
  const onAdd = () => {
    handleFoodItemInfo(foodItemInfoToEdit!, inputName);
  };

  const id = "name" + inputName;
  return (
    <div>
      <InputWithError
        inputProps={{
          type: "text",
          name: "name",
          id,
          placeholder: "",
          value: foodItemInfoToEdit?.name ?? "",
          className: "h-10 pl-2",
          onChange,
        }}
        divStyle="w-full"
        labelProps={{
          htmlFor: id,
          children: `Add ${toTitle(inputName)}`,
          isMoveUpEffect: true,
        }}
      />
      <Button
        buttonStyle="save"
        className="p-1 w-10 h-10 flex flex-center"
        onClick={onAdd}
        type="button"
      >
        <IconPlus className="aspect-square  fill-main-orange stroke-main-orange" />
      </Button>
    </div>
  );
}
